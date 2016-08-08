/**
 * Created by yjh on 15/12/20.
 */
///<reference path='../Engine.ts'/>
import * as Engine from '../Engine'
import * as md5 from '../../../lib/md5'

export class GlProgram {
    static programCache = {};

    static getProgram(vShaderText, fShaderText, flags?) {
        let flag = GlProgram.getFlags(flags);
        vShaderText = flag + vShaderText;
        fShaderText = flag + fShaderText;
        let hash = md5.digest(vShaderText) + md5.digest(fShaderText);
        if (GlProgram.programCache[hash]) {
            return GlProgram.programCache[hash]
        }
        let gl = Engine.render.gl;
        let vs = GlProgram.getShader(vShaderText, gl, true);
        let fs = GlProgram.getShader(fShaderText, gl, false);
        let program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
            GlProgram.programCache[hash] = program;
            return program
        } else {
            console.log(gl.getProgramInfoLog(program))
        }

    }

    private static getShader(source, gl, isVertex) {
        let shader = gl.createShader(isVertex ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader
        } else {
            console.debug(gl.getShaderInfoLog(shader))
        }
    }

    private static getFlags(flags) {
        if (!flags) {
            return ''
        }
        var result = '';
        for (let i in flags) {
            result += `#define ${i} ${flags[i]}\n`
        }
        return result;
    }
}
