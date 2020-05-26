import { Lightning } from 'wpe-lightning-sdk';

export default class RefractionShader extends Lightning.shaders.WebGLDefaultShader {

  constructor(context) {
    super(context);
    this._diffuse = this._normal = null;
  }

  setupUniforms(operation) {
    super.setupUniforms(operation);

    this._setUniform('uScrollOffset', 0, this.gl.uniform1f);
    this._setUniform('uAmount', 0, this.gl.uniform1f);
    this._setUniform('uDiffuse', 1, this.gl.uniform1i);
    this._setUniform('uNormal', 2, this.gl.uniform1i);

    const w = operation.getRenderWidth();
    const h = operation.getRenderHeight();
    this._setUniform('resolution', new Float32Array([w, h]), this.gl.uniform2fv);
  }

  beforeDraw(operation) {
    let diffuseTexture = this._diffuse ? this._diffuse.nativeTexture : null;
    let normalTexture = this._normal ? this._normal.nativeTexture : null;

    let gl = this.gl;

    gl.activeTexture(gl.TEXTURE0 + 1);
    gl.bindTexture(gl.TEXTURE_2D, diffuseTexture);
    gl.activeTexture(gl.TEXTURE0 + 2);
    gl.bindTexture(gl.TEXTURE_2D, normalTexture);
    gl.activeTexture(gl.TEXTURE0);
  }

  set diffuse(v) {
    this._diffuse = v;
    this.redraw();
  }

  set normal(v) {
    this._normal = v;
    this.redraw();
  }

}

RefractionShader.vertexShaderSource = `
  attribute vec2 aVertexPosition;
  uniform vec2 resolution;
  attribute vec2 aTextureCoord;
  varying vec2 vTextureCoord;
  void main() {
    // convert the rectangle from pixels to 0.0 to 1.0
    vec2 zeroToOne = aVertexPosition / resolution;
    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;
    // convert from 0->2 to -1->+1 (clipspace)
    vec2 clipSpace = zeroToTwo - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    vTextureCoord = aTextureCoord;
  }
`;

RefractionShader.fragmentShaderSource = `
  #ifdef GL_ES
  precision lowp float;
  #endif

  uniform float uScrollOffset;
  uniform float uAmount;

  // our textures
  uniform sampler2D uNormal;
  uniform sampler2D uDiffuse;
  uniform sampler2D uReflection;

  varying vec2 vTextureCoord;

  void main() {
    vec4 diffuse = texture2D(uDiffuse, vTextureCoord);
    vec4 normal = texture2D(uNormal, vTextureCoord);

    float u = normal.r * 16.0;
    float v = normal.g * 16.0;
    u += floor(normal.b * 16.0) * 16.0;
    v += mod(normal.b * 255.0, 16.0) * 16.0;
    u = u / 255.0;
    v = v / 255.0;

    vec2 p = vec2(u, v + uScrollOffset);
    vec4 reflect = texture2D(uReflection, p);
    reflect.a = normal.a;

    vec4 col = mix(diffuse, reflect, normal.a - diffuse.a);
    col.a += normal.a;

    gl_FragColor = col;
  }
`;
