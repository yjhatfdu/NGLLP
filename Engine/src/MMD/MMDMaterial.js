System.register(['NGLLP/Core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Core_1;
    var MMDMaterial;
    return {
        setters:[
            function (Core_1_1) {
                Core_1 = Core_1_1;
            }],
        execute: function() {
            MMDMaterial = (function (_super) {
                __extends(MMDMaterial, _super);
                function MMDMaterial() {
                    _super.call(this, [
                        { name: 'bones', type: 'matrix4fv' },
                        { name: 'diffuse', type: '1f' },
                        { name: 'alpha', type: '1f' },
                        { name: 'shininess', type: '1f' },
                        { name: 'specular', type: '1f' },
                        { name: 'ambient', type: '3fv' },
                        { name: 'texture', type: '1i' },
                        { name: 'toonTexture', type: '1i' },
                        { name: 'edgeFlag', type: '1f' },
                    ], [
                        { name: 'position', size: 3 },
                        { name: 'uv', size: 2 },
                        { name: 'normal', size: 3 },
                        { name: 'boneNumber', size: 2, type: 'UNSIGNED_SHORT' },
                        { name: 'boneWeight', size: 1 },
                        { name: 'edgeFlag', size: 1, type: 'UNSIGNED_BYTE' }
                    ]);
                    this.autoBindAttrib = false;
                    this.enableBlend = false;
                    this.enableDepthTest = true;
                    this.enableDepthWrite = true;
                }
                return MMDMaterial;
            }(Core_1.Material));
            exports_1("MMDMaterial", MMDMaterial);
        }
    }
});
//# sourceMappingURL=MMDMaterial.js.map