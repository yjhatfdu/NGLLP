var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by yjh on 15/12/25.
 */
///<reference path='../Core/Material.ts'/>
///<reference path='../Core/GlProgram.ts'/>
var Material;
(function (Material) {
    var SpriteMaterial = (function (_super) {
        __extends(SpriteMaterial, _super);
        function SpriteMaterial() {
            _super.call(this);
            this.uniforms = [
                { name: 'posZ', type: '1f' },
                { name: 'texture', type: '1i', value: 0 }
            ];
            this.attributes = [
                { name: 'position', size: 2 },
                { name: 'uv', size: 2 },
                { name: 'opacity', size: 1 }
            ];
            this.autoBindAttrib = false;
            var vst = "\n                attribute vec2 position;\n                attribute vec2 uv;\n                attribute float opacity;\n                uniform mat4 mvpMat;\n                uniform float posZ;\n                varying float vOpacity;\n                varying vec2 uvCoord;\n                void main(){\n                    vec4 pos=vec4(position,posZ,1.0);\n                    gl_Position=mvpMat*pos;\n                    uvCoord=uv;\n                    vOpacity=opacity;\n                }\n            ";
            var fst = "\n                precision lowp float;\n                varying vec2 uvCoord;\n                uniform sampler2D texture;\n                varying float vOpacity;\n                void main(){\n                    vec4 color=texture2D(texture,uvCoord);\n                    color[3]=color[3]*vOpacity;\n                    gl_FragColor=color;\n                }\n            ";
            this.initProgram(vst, fst);
            this.enableBlend = true;
            this.enableDepthTest = true;
            this.enableDepthWrite = false;
        }
        return SpriteMaterial;
    })(Core.Material);
    Material.SpriteMaterial = SpriteMaterial;
})(Material || (Material = {}));
