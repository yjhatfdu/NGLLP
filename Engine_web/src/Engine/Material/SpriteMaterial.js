/**
 * Created by yjh on 15/12/25.
 */
///<reference path='../Core/Material.ts'/>
///<reference path='../Core/GlProgram.ts'/>
var Material;
(function (Material) {
    Material.createSpriteMaterial = function () {
        var spriteMaterial = new Core.Material();
        spriteMaterial.uniforms = [
            { name: 'texture', type: '1i', value: 0 }
        ];
        spriteMaterial.attributes = [
            { name: 'position', size: 3 },
            { name: 'uv', size: 2 },
            { name: 'opacity', size: 1 }
        ];
        spriteMaterial.autoBindAttrib = false;
        spriteMaterial.enableBlend = true;
        spriteMaterial.enableDepthTest = true;
        spriteMaterial.enableDepthWrite = false;
        var vst = "\n                attribute vec3 position;\n                attribute vec2 uv;\n                attribute float opacity;\n                uniform mat4 mvpMat;\n                varying float vOpacity;\n                varying vec2 uvCoord;\n                void main(){\n                    vec4 pos=vec4(position,1.0);\n                    gl_Position=mvpMat*pos;\n                    uvCoord=uv;\n                    vOpacity=opacity;\n                }\n            ";
        var fst = "\n                precision lowp float;\n                varying vec2 uvCoord;\n                uniform sampler2D texture;\n                varying float vOpacity;\n                void main(){\n                    vec4 color=texture2D(texture,uvCoord);\n                    color[3]=color[3]*vOpacity;\n                    gl_FragColor=color;\n                }\n            ";
        spriteMaterial.initProgram(vst, fst);
        return spriteMaterial;
    };
})(Material || (Material = {}));
