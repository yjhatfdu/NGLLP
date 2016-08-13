/**
 * Created by yjh on 16/8/11.
 */
import * as Engine from '../Engine'
export class FrameBuffer {
    private gl:WebGLRenderingContext;
    texture:WebGLTexture;
    fbo;
    size:number;

    /**
     *
     * @param size
     * @param percision 'UNSIGNED_BYTE'|'FLOAT'|'HALF_FLOAT'
     */
    constructor(size = 128, percision?:string) {
        this.gl = Engine.render.gl;
        this.size = size;
        this.texture = this.gl.createTexture();
        Engine.render.currentGlTexture[0] = null;
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D,
            0, this.gl.RGBA,
            size, size,
            0, this.gl.RGBA,
            percision ? this.gl[percision] : this.gl.UNSIGNED_BYTE,
            null
        );
        this.fbo = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.texture, 0);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        this.setFilter('NEAREST', 'NEAREST')
    }

    use() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo);
        this.gl.viewport(0, 0, this.size, this.size)
    }

    release() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        this.gl.viewport(0, 0, Engine.render.p * Engine.render.width, Engine.render.p * Engine.render.height)
    }

    /**
     *
     * @param min 'NEAREST'|'LINEAR'
     * @param mag 'NEAREST'|'LINEAR'
     */
    setFilter(min:string, mag:string) {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        Engine.render.currentGlTexture[0] = null;
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl[min]);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl[mag]);
    }
}