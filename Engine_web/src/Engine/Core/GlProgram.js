System.register(['../Engine'], function(exports_1) {
    var Engine_1;
    var GlProgram;
    return {
        setters:[
            function (Engine_1_1) {
                Engine_1 = Engine_1_1;
            }],
        execute: function() {
            GlProgram = (function () {
                function GlProgram() {
                }
                GlProgram.getProgram = function (vShaderText, fShaderText, flags) {
                    var flag = GlProgram.getFlags(flags);
                    vShaderText = flag + vShaderText;
                    fShaderText = flag + fShaderText;
                    var hash = window['md5'](vShaderText) + window['md5'](fShaderText);
                    if (GlProgram.programCache[hash]) {
                        return GlProgram.programCache[hash];
                    }
                    var gl = Engine_1.Engine.render.gl;
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
            })();
            exports_1("GlProgram", GlProgram);
        }
    }
});
//# sourceMappingURL=GlProgram.js.map