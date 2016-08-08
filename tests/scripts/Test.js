/**
 * Created by yjh on 16/2/2.
 // */
///<reference path='../../Engine/API.d.ts'/>
System.register(['MMD/PMDLoader'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PMDLoader_1;
    var model;
    return {
        setters:[
            function (PMDLoader_1_1) {
                PMDLoader_1 = PMDLoader_1_1;
            }],
        execute: function() {
            model = new PMDLoader_1.PMDLoader();
            model.load('model/Miku_Hatsune_Ver2.pmd');
            window['test'] = model;
        }
    }
});
//# sourceMappingURL=Test.js.map