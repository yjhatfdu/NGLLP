System.register(['../Core/Material'], function(exports_1) {
    var Material_1;
    var CreateSpriteMaterial;
    return {
        setters:[
            function (Material_1_1) {
                Material_1 = Material_1_1;
            }],
        execute: function() {
            exports_1("CreateSpriteMaterial", CreateSpriteMaterial = function () {
                var spriteMaterial = new Material_1.Material();
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
            });
        }
    }
});
//export class SpriteMaterial extends Core.Material{
//
//    uniforms=[
//        {name:'texture',type:'1i',value:0}
//    ];
//    attributes=[
//        {name:'position',size:3},
//        {name:'uv',size:2},
//        {name:'opacity',size:1}
//    ];
//
//    constructor(){
//        super();
//        this.autoBindAttrib=false;
//        var vst=`
//            attribute vec3 position;
//            attribute vec2 uv;
//            attribute float opacity;
//            uniform mat4 mvpMat;
//            varying float vOpacity;
//            varying vec2 uvCoord;
//            void main(){
//                vec4 pos=vec4(position,1.0);
//                gl_Position=mvpMat*pos;
//                uvCoord=uv;
//                vOpacity=opacity;
//            }
//        `;
//        var fst=`
//            precision lowp float;
//            varying vec2 uvCoord;
//            uniform sampler2D texture;
//            varying float vOpacity;
//            void main(){
//                vec4 color=texture2D(texture,uvCoord);
//                color[3]=color[3]*vOpacity;
//                gl_FragColor=color;
//            }
//        `;
//        this.initProgram(vst,fst);
//        this.enableBlend=true;
//        this.enableDepthTest=true;
//        this.enableDepthWrite=false;
//    }
//
//}
//# sourceMappingURL=SpriteMaterial.js.map