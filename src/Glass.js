import { Lightning } from 'wpe-lightning-sdk'

import RefractionShader from './RefractionShader.js'

export default class Glass extends Lightning.Component {

  static _template() {
    return {
      rtt: true,
      shader: {
        type: RefractionShader,
      },
    }
  }

  _init() {
    this._diffuseTexture = new Lightning.textures.ImageTexture(this.stage)
    this._diffuseTexture.src = this.diffuse
    this._diffuseTexture.load()

    this._normalTexture = new Lightning.textures.ImageTexture(this.stage)
    this._normalTexture.src = this.normal
    this._normalTexture.load()

    this.patch({
      shader: {
        diffuse: this._diffuseTexture.source,
        normal: this._normalTexture.source,
      },
    })
  }

}
