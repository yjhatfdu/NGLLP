System.register(['../Engine', '../../../lib/md5'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Engine, md5;
    var GlProgram;
    return {
        setters:[
            function (Engine_1) {
                Engine = Engine_1;
            },
            function (md5_1) {
                md5 = md5_1;
            }],
        execute: function() {
            GlProgram = (function () {
                function GlProgram() {
                }
                GlProgram.getProgram = function (vShaderText, fShaderText, flags) {
                    var flag = GlProgram.getFlags(flags);
                    vShaderText = flag + vShaderText;
                    fShaderText = flag + fShaderText;
                    var hash = md5.digest(vShaderText) + md5.digest(fShaderText);
                    if (GlProgram.programCache[hash]) {
                        return GlProgram.programCache[hash];
                    }
                    var gl = Engine.render.gl;
                    var vs = GlProgram.getShader(vShaderText, gl, true);
                    var fs = GlProgram.getShader(fShaderText, gl, false);
                    var program = gl.createProgram();
                    gl.attachShader(program, vs);
                    gl.attachShader(program, fs);
                    gl.linkProgram(program);
                    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
                        GlProgram.programCache[hash] = program;
                        return program;
                    }
                    else {
                        console.log(gl.getProgramInfoLog(program));
                    }
                };
                GlProgram.getShader = function (source, gl, isVertex) {
                    var shader = gl.createShader(isVertex ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
                    gl.shaderSource(shader, source);
                    gl.compileShader(shader);
                    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                        return shader;
                    }
                    else {
                        console.debug(gl.getShaderInfoLog(shader));
                    }
                };
                GlProgram.getFlags = function (flags) {
                    if (!flags) {
                        return '';
                    }
                    var result = '';
                    for (var i in flags) {
                        result += "#define " + i + " " + flags[i] + "\n";
                    }
                    return result;
                };
                GlProgram.programCache = {};
                return GlProgram;
            }());
            exports_1("GlProgram", GlProgram);
        }
    }
});
//# sourceMappingURL=GlProgram.js.map