/**
 * Created by yjh on 15/12/15.
 */
    ///<reference path='../Base.ts'/>

    namespace Core {
        export class Render extends Base.NodeBase {

            designResolution:Array<number>=[1024,768];
            width:number=0;
            height:number=0;

            p:number = 1;
            container:HTMLElement;
            canvas:HTMLCanvasElement;
            gl;
            vpMatrix;
            materialStack=[];
            constructor() {
                super();
                this.root=this;
                this.p = Engine.settings.pixelRatio;
                this.container = Engine.settings.container;
                this.canvas=document.createElement('canvas');
                this.container.appendChild(this.canvas);
                this.canvas.style.width=this.canvas.style.height="100%";
                this.setupGL();
                this.resize();
                this.dispatchEvent('InitFinished');
                this.update();
            }

            setupGL(){
                this.gl=this.canvas.getContext('webgl')||this.canvas.getContext('experimental-webgl');
                if(!this.gl){
                    throw "WebGL Not Support"
                }
                this.gl.clearColor(0.0,0.0,0.0,1.0);
                this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA);
                var hf=this.gl.getExtension('OES_texture_half_float');
                this.gl['HALF_FLOAT']=hf.HALF_FLOAT_OES;
                this.gl.getExtension('OES_texture_float');
                this.gl.clear(this.gl.COLOR_BUFFER_BIT)
            }

            resize(){
                this.canvas.width=(this.width=this.canvas.offsetWidth)*this.p;
                this.canvas.height=(this.width=this.canvas.offsetWidth)*this.p;
                this.gl.viewport(0,0,this.width*this.p,this.height*this.p)
            }
            update(){
                window.requestAnimationFrame(this.update.bind(this));
                this.gl.clear(this.gl.COLOR_BUFFER_BIT);
                Engine.audioCtl.update();
                this.dispatchEvent("BeforeUpdate");
                super.update(0);
                this.dispatchEvent("AfterUpdate")
            }
        }
}