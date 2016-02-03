/**
 * Created by yjh on 15/12/20.
 */
/**
 * Created by yjh on 15/11/19.
 */
    ///<reference path='Render.ts'/>
    ///<reference path='GlProgram.ts'/>

     namespace Core{
        export class Material extends Base.ObjectBase{
            render;
            program;
            enableBlend=false;
            enableDepthTest=false;
            enableDepthWrite=false;
            uniformList=[];
            attributeList={};
            IBO;
            gl;
            mvpMat;
            textures=[];
            uniforms=[];
            attributes=[];
            autoBindAttrib=true;
            constructor(uniformList?,attributeList?){
                super();
                this.gl=Engine.render.gl;
                this.uniformList=uniformList||this.uniformList;
                this.attributeList=attributeList||this.attributeList;
            }
            initProgram(vst,fst,flags?){
                this.program=GlProgram.getProgram(vst,fst,flags);
                this.gl.useProgram(this.program);
                this.bindUniform('mvpMat','Matrix4fv');
                this.bindUniforms(this.uniforms);
                this.bindAttributes(this.attributes);
            }
            bindUniform(name,type,value?){
                this.uniformList.push({name:name,location:this.gl.getUniformLocation(this.program,name),func:this.gl['uniform'+type].bind(this.gl),ismat:type.indexOf('Matrix')>=0,value:value})
            }
            bindUniforms(list){
                for(var i =0;i<list.length;i++){
                    this.bindUniform(list[i].name,list[i].type,list[i].value)
                }
            }
            bindAttribute(name,size){
                this.attributeList[name]={name:name,location:this.gl.getAttribLocation(this.program,name),size:size}
            }
            bindVBO(name,vbo){
                var attrib=this.attributeList[name];
                if(!attrib){return}
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER,vbo);
                this.gl.enableVertexAttribArray(attrib.location);
                this.gl.vertexAttribPointer(attrib.location,attrib.size,this.gl.FLOAT,false,0,0)
            }
            bindIBO(IBO){
                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,IBO);
            }
            bufferIBO(data){
                if(!this.IBO){
                    this.IBO=this.gl.createBuffer();
                }
                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.IBO);
                this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,data,this.gl.STATIC_DRAW)
            }
            bindAttributes(list){
                for(var i =0;i<list.length;i++){
                    this.bindAttribute(list[i].name,list[i].size)
                }
            }
            bufferData(name,data,dynamic=false){
                var attrib=this.attributeList[name];
                if(!attrib.vbo){
                    attrib.vbo=this.gl.createBuffer();
                }
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER,attrib.vbo);
                this.gl.bufferData(this.gl.ARRAY_BUFFER,data,dynamic?this.gl.DYNAMIC_DRAW:this.gl.STATIC_DRAW);
                this.gl.enableVertexAttribArray(attrib.location);
                this.gl.vertexAttribPointer(attrib.location,attrib.size,this.gl.FLOAT,false,0,0)
            }

            bindTexture(texture,index){
                this.textures[index]=texture;
            }
            active(push=false){
                if(push){
                    Engine.render.materialStack.push(this)
                }else{
                    Engine.render.materialStack[Engine.render.materialStack.length-1]=this
                }
                this.gl.useProgram(this.program);
                if(this.enableBlend){
                    this.gl.enable(this.gl.BLEND)
                }else{
                    this.gl.disable(this.gl.BLEND)
                }
                if(this.enableDepthTest){
                    this.gl.enable(this.gl.DEPTH_TEST)
                }else{
                    this.gl.disable(this.gl.DEPTH_TEST)
                }
                this.gl.depthMask(this.enableDepthWrite);
                //bind uniforms
                for(var i=0;i<this.uniformList.length;i++){
                    var uniform=this.uniformList[i];
                    if(uniform.ismat){
                        uniform.func(uniform.location,false,uniform.value||this[uniform.name]||0)
                    }else{
                        uniform.func(uniform.location,uniform.value||this[uniform.name]||0)
                    }

                }
                //bind attributes
                if(this.autoBindAttrib){
                    for(var j in this.attributeList){
                        var attrib=this.attributeList[j];
                        if(!attrib.vbo){
                            continue
                        }
                        this.gl.bindBuffer(this.gl.ARRAY_BUFFER,attrib.vbo);
                        this.gl.enableVertexAttribArray(attrib.location);
                        this.gl.vertexAttribPointer(attrib.location,attrib.size,this.gl.FLOAT,false,0,0)
                    }
                }


                if(this.IBO){
                    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.IBO)
                }

                //bind textures
                for(var i=0;i<this.textures.length;i++){
                    if(this.textures[i]){
                        this.gl.activeTexture(this.gl.TEXTURE0+i);
                        this.gl.bindTexture(this.gl.TEXTURE_2D,this.textures[i])
                    }
                }

            }
            popMaterial(){
                Engine.render.materialStack.pop();
                Engine.render.materialStack[Engine.render.materialStack.length-1].active()
            }
        }
    }
