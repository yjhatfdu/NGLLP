/**
 * Created by yjh on 15/12/20.
 */
    ///<reference path='../Engine.ts'/>
namespace Core{
    export class GlProgram{
        static programCache={};
        static getProgram(vShaderText,fShaderText,flags?){
            var flag=GlProgram.getFlags(flags);
            vShaderText=flag+vShaderText;
            fShaderText=flag+fShaderText;
            var hash=window['md5'](vShaderText)+window['md5'](fShaderText);
            if(GlProgram.programCache[hash]){
                return GlProgram.programCache[hash]
            }
            var gl=Engine.render.gl;
            var vs=GlProgram.getShader(vShaderText,gl,true);
            var fs=GlProgram.getShader(fShaderText,gl,false);
            var program=gl.createProgram();
            gl.attachShader(program,vs);
            gl.attachShader(program,fs);
            gl.linkProgram(program);
            if(gl.getProgramParameter(program,gl.LINK_STATUS)){
                GlProgram.programCache[hash]=program;
                return  program
            }else{
                console.log(gl.getProgramInfoLog(program))
            }

        }
        private static getShader(source,gl,isVertex){
            var shader=gl.createShader(isVertex?gl.VERTEX_SHADER:gl.FRAGMENT_SHADER);
            gl.shaderSource(shader,source);
            gl.compileShader(shader);
            if(gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
                return shader
            }else{
              console.debug(gl.getShaderInfoLog(shader))
            }
        }
        private static getFlags(flags){
            if(!flags){
                return ''
            }
            var result='';
            for (var i in flags){
                result+=`#define ${i} ${flags[i]}\n`
            }
            return result;
        }
    }
}