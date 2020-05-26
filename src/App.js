import { Lightning, Utils } from 'wpe-lightning-sdk'

import Glass from './Glass.js'

export default class App extends Lightning.Component {
  static _template() {
    return {
      src: Utils.asset('images/starwars.jpeg'),

      Glass: {
        src: Utils.asset('images/starwars.jpeg'),
        diffuse: Utils.asset('images/sky-logo-diffuse-map.png'),
        normal: Utils.asset('images/sky-logo-refraction-map.png'),

        // can't load external images
        // diffuse: 'https://www.sky.com/assets2/sky-logo-diffuse-map.png',
        // normal: 'https://www.sky.com/assets2/sky-logo-refraction-map.png',
        type: Glass,
      }
    }
  }

  // Desired API (or something similar), if possible
  // static _template() {
  //   return {
  //     src: Utils.asset('images/starwars.jpeg'), // or any other lightning texture/component(s)
  //     shader: {
  //       diffuse: Utils.asset('images/sky-logo-diffuse-map.png'),
  //       normal: Utils.asset('images/sky-logo-refraction-map.png'),
  //       type: RefractionShader,
  //     },
  //   }
  // }

}
