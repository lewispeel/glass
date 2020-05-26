Hello, firstly thanks for looking at this and helping me.

The effect I'm trying to achieve is a glass refraction effect see [here](https://user-images.githubusercontent.com/4982001/33995822-15de2298-e0d7-11e7-849e-d13cdb34f15e.png).

I've been given some assets from another developer at Sky who used in the past to create the [same effect](https://medium.com/@beclamide/advanced-realtime-glass-refraction-simulation-with-webgl-71bdce7ab825) using WebGL. I think I have all the pieces but I'm struggling to integrate them into Lightning. I have something working but it's not working as I expect, also the API could be improved. At the moment I've had to create a `Glass` component because I have to create the image textures for diffuse/normal maps on the fly...as I don't think it's nice to have the developer do that every time they want this effect.

- The effect is pixelated/distorted for some reason.
- I'd like to use the shader to affect whatever is underneath it (recursively), is that possible?
- Is there a way to achieve this effect without wrapping the shader in a component?
- The refraction images are stretched but I'd like to prevent that.
