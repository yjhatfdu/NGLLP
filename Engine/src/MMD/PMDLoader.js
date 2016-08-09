System.register(['../Network/HTTP', './sijs'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var HTTP_1, sijs_1;
    var size_Int8, size_Uint8, size_Uint16, size_Uint32, size_Float32, slice, PMDLoader, Vertex, Material, Bone, IK, Morph, RigidBody, Joint;
    return {
        setters:[
            function (HTTP_1_1) {
                HTTP_1 = HTTP_1_1;
            },
            function (sijs_1_1) {
                sijs_1 = sijs_1_1;
            }],
        execute: function() {
            /**
             * Created by yjh on 16/3/28.
             */
            size_Int8 = Int8Array.BYTES_PER_ELEMENT;
            size_Uint8 = Uint8Array.BYTES_PER_ELEMENT;
            size_Uint16 = Uint16Array.BYTES_PER_ELEMENT;
            size_Uint32 = Uint32Array.BYTES_PER_ELEMENT;
            size_Float32 = Float32Array.BYTES_PER_ELEMENT;
            slice = Array.prototype.slice;
            PMDLoader = (function () {
                function PMDLoader() {
                }
                PMDLoader.prototype.load = function (url) {
                    var _this = this;
                    HTTP_1.GET(url, null, 'arraybuffer').then(function (result) { return _this.parse(result); });
                };
                PMDLoader.prototype.parse = function (buffer) {
                    var offset = 0;
                    var length = buffer.byteLength;
                    var view = new DataView(buffer, 0);
                    offset = this.checkHeader(buffer, view, offset);
                    offset = this.getName(buffer, view, offset);
                    offset = this.getVertices(buffer, view, offset);
                    offset = this.getTriangles(buffer, view, offset);
                    offset = this.getMaterials(buffer, view, offset);
                    offset = this.getBones(buffer, view, offset);
                    offset = this.getIKs(buffer, view, offset);
                    offset = this.getMorphs(buffer, view, offset);
                    offset = this.getMorphOrder(buffer, view, offset);
                    offset = this.getBoneGroupNames(buffer, view, offset);
                    offset = this.getBoneTable(buffer, view, offset);
                    if (offset >= length) {
                        return;
                    }
                    offset = this.getEnglishFlag(buffer, view, offset);
                    if (this.english_flag) {
                        offset = this.getEnglishName(buffer, view, offset);
                        offset = this.getEnglishBoneNames(buffer, view, offset);
                        offset = this.getEnglishMorphNames(buffer, view, offset);
                        offset = this.getEnglishBoneGroupNames(buffer, view, offset);
                    }
                    if (offset >= length) {
                        return;
                    }
                    offset = this.getToonFileNames(buffer, view, offset);
                    if (offset >= length) {
                        return;
                    }
                    offset = this.getRigidBodies(buffer, view, offset);
                    return offset = this.getJoints(buffer, view, offset);
                };
                PMDLoader.prototype.checkHeader = function (buffer, view, offset) {
                    if (view.getUint8(0) !== 'P'.charCodeAt(0) ||
                        view.getUint8(1) !== 'm'.charCodeAt(0) ||
                        view.getUint8(2) !== 'd'.charCodeAt(0) ||
                        view.getUint8(3) !== 0x00 ||
                        view.getUint8(4) !== 0x00 ||
                        view.getUint8(5) !== 0x80 ||
                        view.getUint8(6) !== 0x3F) {
                        throw 'File is not PMD';
                    }
                    offset += 7 * size_Uint8;
                    return offset;
                };
                ;
                PMDLoader.prototype.getName = function (buffer, view, offset) {
                    var tempBuffer = new Uint8Array(buffer, offset, 276);
                    this.modelName = sijs_1.sjisArrayToString(tempBuffer.slice(0, 20));
                    this.comment = sijs_1.sjisArrayToString(tempBuffer.slice(20, 256));
                    return offset += 276 * size_Uint8;
                };
                ;
                PMDLoader.prototype.getVertices = function (buffer, view, offset) {
                    var i, length;
                    length = view.getUint32(offset, true);
                    offset += size_Uint32;
                    var _i, _results;
                    _results = [];
                    for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                        _results.push(new Vertex(buffer, view, offset + i * Vertex.size));
                    }
                    this.verticles = _results;
                    return offset += length * Vertex.size;
                };
                ;
                PMDLoader.prototype.getTriangles = function (buffer, view, offset) {
                    var i, length, _i;
                    length = view.getUint32(offset, true);
                    offset += size_Uint32;
                    this.triangles = new Uint16Array(length);
                    for (i = _i = 0; _i < length; i = _i += 3) {
                        this.triangles[i + 1] = view.getUint16(offset + i * size_Uint16, true);
                        this.triangles[i] = view.getUint16(offset + (i + 1) * size_Uint16, true);
                        this.triangles[i + 2] = view.getUint16(offset + (i + 2) * size_Uint16, true);
                    }
                    return offset += length * size_Uint16;
                };
                ;
                PMDLoader.prototype.getMaterials = function (buffer, view, offset) {
                    var i, length;
                    length = view.getUint32(offset, true);
                    offset += size_Uint32;
                    var _i, _results;
                    _results = [];
                    for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                        _results.push(new Material(buffer, view, offset + i * Material.size));
                    }
                    this.materials = _results;
                    return offset += length * Material.size;
                };
                ;
                PMDLoader.prototype.getBones = function (buffer, view, offset) {
                    var i, length;
                    length = view.getUint16(offset, true);
                    offset += size_Uint16;
                    this.bones = (function () {
                        var _i, _results;
                        _results = [];
                        for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                            _results.push(new Bone(buffer, view, offset + i * Bone.size));
                        }
                        return _results;
                    })();
                    return offset += length * Bone.size;
                };
                ;
                PMDLoader.prototype.getIKs = function (buffer, view, offset) {
                    var i, ik, length;
                    length = view.getUint16(offset, true);
                    offset += size_Uint16;
                    this.iks = (function () {
                        var _i, _results;
                        _results = [];
                        for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                            ik = new IK(buffer, view, offset);
                            offset += ik.getSize();
                            _results.push(ik);
                        }
                        return _results;
                    })();
                    return offset;
                };
                ;
                PMDLoader.prototype.getMorphs = function (buffer, view, offset) {
                    var i, length, morph;
                    length = view.getUint16(offset, true);
                    offset += size_Uint16;
                    this.morphs = (function () {
                        var _i, _results;
                        _results = [];
                        for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                            morph = new Morph(buffer, view, offset);
                            offset += morph.getSize();
                            _results.push(morph);
                        }
                        return _results;
                    })();
                    return offset;
                };
                ;
                PMDLoader.prototype.getMorphOrder = function (buffer, view, offset) {
                    var i, length;
                    length = view.getUint8(offset);
                    offset += size_Uint8;
                    this.morph_order = (function () {
                        var _i, _results;
                        _results = [];
                        for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                            _results.push(view.getUint16(offset + i * size_Uint16, true));
                        }
                        return _results;
                    })();
                    return offset += length * size_Uint16;
                };
                ;
                PMDLoader.prototype.getBoneGroupNames = function (buffer, view, offset) {
                    var block, i, length;
                    length = view.getUint8(offset);
                    offset += size_Uint8;
                    block = new Uint8Array(buffer, offset, 50 * length);
                    this.bone_group_names = (function () {
                        var _i, _results;
                        _results = [];
                        for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                            _results.push(sijs_1.sjisArrayToString(slice.call(block, i * 50, (i + 1) * 50)));
                        }
                        return _results;
                    })();
                    return offset += length * 50 * size_Uint8;
                };
                ;
                PMDLoader.prototype.getBoneTable = function (buffer, view, offset) {
                    var bone, i, length;
                    length = view.getUint32(offset, true);
                    offset += size_Uint32;
                    this.bone_table = (function () {
                        var _i, _results;
                        _results = [];
                        for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                            bone = {};
                            bone.index = view.getUint16(offset, true);
                            offset += size_Uint16;
                            bone.group_index = view.getUint8(offset);
                            offset += size_Uint8;
                            _results.push(bone);
                        }
                        return _results;
                    })();
                    return offset;
                };
                ;
                PMDLoader.prototype.getEnglishFlag = function (buffer, view, offset) {
                    this.english_flag = view.getUint8(offset);
                    return offset += size_Uint8;
                };
                ;
                PMDLoader.prototype.getEnglishName = function (buffer, view, offset) {
                    var block;
                    block = new Uint8Array(buffer, offset, 20 + 256);
                    this.english_name = sijs_1.sjisArrayToString(slice.call(block, 0, 20));
                    this.english_comment = sijs_1.sjisArrayToString(slice.call(block, 20, 20 + 256));
                    return offset += (20 + 256) * size_Uint8;
                };
                ;
                PMDLoader.prototype.getEnglishBoneNames = function (buffer, view, offset) {
                    var block, i, length;
                    length = this.bones.length;
                    block = new Uint8Array(buffer, offset, 20 * length);
                    this.english_bone_names = (function () {
                        var _i, _results;
                        _results = [];
                        for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                            _results.push(sijs_1.sjisArrayToString(slice.call(block, i * 20, (i + 1) * 20)));
                        }
                        return _results;
                    })();
                    return offset += length * 20 * size_Uint8;
                };
                ;
                PMDLoader.prototype.getEnglishMorphNames = function (buffer, view, offset) {
                    var block, i, length;
                    length = this.morphs.length - 1;
                    if (length < 0) {
                        length = 0;
                    }
                    block = new Uint8Array(buffer, offset, 20 * length);
                    this.english_morph_names = (function () {
                        var _i, _results;
                        _results = [];
                        for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                            _results.push(sijs_1.sjisArrayToString(slice.call(block, i * 20, (i + 1) * 20)));
                        }
                        return _results;
                    })();
                    return offset += length * 20 * size_Uint8;
                };
                ;
                PMDLoader.prototype.getEnglishBoneGroupNames = function (buffer, view, offset) {
                    var block, i, length;
                    length = this.bone_group_names.length;
                    block = new Uint8Array(buffer, offset, 50 * length);
                    this.english_bone_group_names = (function () {
                        var _i, _results;
                        _results = [];
                        for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                            _results.push(sijs_1.sjisArrayToString(slice.call(block, i * 50, (i + 1) * 50)));
                        }
                        return _results;
                    })();
                    return offset += length * 50 * size_Uint8;
                };
                ;
                PMDLoader.prototype.getToonFileNames = function (buffer, view, offset) {
                    var block, i;
                    block = new Uint8Array(buffer, offset, 100 * 10);
                    this.toon_file_names = (function () {
                        var _i, _results;
                        _results = [];
                        for (i = _i = 0; _i < 10; i = ++_i) {
                            _results.push(sijs_1.sjisArrayToString(slice.call(block, i * 100, (i + 1) * 100)));
                        }
                        return _results;
                    })();
                    return offset += 100 * 10 * size_Uint8;
                };
                ;
                PMDLoader.prototype.getRigidBodies = function (buffer, view, offset) {
                    var i, length;
                    length = view.getUint32(offset, true);
                    offset += size_Uint32;
                    this.rigid_bodies = (function () {
                        var _i, _results;
                        _results = [];
                        for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                            _results.push(new RigidBody(buffer, view, offset + i * RigidBody.size));
                        }
                        return _results;
                    })();
                    return offset += length * RigidBody.size;
                };
                ;
                PMDLoader.prototype.getJoints = function (buffer, view, offset) {
                    var i, length;
                    length = view.getUint32(offset, true);
                    offset += size_Uint32;
                    this.joints = (function () {
                        var _i, _results;
                        _results = [];
                        for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                            _results.push(new Joint(buffer, view, offset + i * Joint.size));
                        }
                        return _results;
                    })();
                    return offset += length * Joint.size;
                };
                ;
                return PMDLoader;
            }());
            exports_1("PMDLoader", PMDLoader);
            Vertex = (function () {
                function Vertex(buffer, view, offset) {
                    this.x = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.y = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.z = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.nx = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.ny = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.nz = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.u = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.v = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.bone_num1 = view.getUint16(offset, true);
                    offset += size_Uint16;
                    this.bone_num2 = view.getUint16(offset, true);
                    offset += size_Uint16;
                    this.bone_weight = view.getUint8(offset);
                    offset += size_Uint8;
                    this.edge_flag = view.getUint8(offset);
                    offset += size_Uint8;
                }
                Vertex.size = size_Float32 * 8 + size_Uint16 * 2 + size_Uint8 * 2; //38
                return Vertex;
            }());
            exports_1("Vertex", Vertex);
            Material = (function () {
                function Material(buffer, view, offset) {
                    var i, tmp;
                    tmp = [];
                    tmp[0] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[1] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[2] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.diffuse = new Float32Array(tmp);
                    this.alpha = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.shininess = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[0] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[1] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[2] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.specular = new Float32Array(tmp);
                    tmp[0] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[1] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[2] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.ambient = new Float32Array(tmp);
                    this.toon_index = view.getInt8(offset);
                    offset += size_Int8;
                    this.edge_flag = view.getUint8(offset);
                    offset += size_Uint8;
                    this.face_vert_count = view.getUint32(offset, true);
                    offset += size_Uint32;
                    this.texture_file_name = sijs_1.sjisArrayToString((function () {
                        var _i, _results;
                        _results = [];
                        for (i = _i = 0; _i < 20; i = ++_i) {
                            _results.push(view.getUint8(offset + size_Uint8 * i));
                        }
                        return _results;
                    })());
                }
                Material.size = size_Float32 * 11 + size_Uint8 * 2 + size_Uint32 + size_Uint8 * 20;
                return Material;
            }());
            exports_1("Material", Material);
            Bone = (function () {
                function Bone(buffer, view, offset) {
                    var tmp;
                    this.name = sijs_1.sjisArrayToString(new Uint8Array(buffer, offset, 20));
                    offset += size_Uint8 * 20;
                    this.parent_bone_index = view.getUint16(offset, true);
                    offset += size_Uint16;
                    this.tail_pos_bone_index = view.getUint16(offset, true);
                    offset += size_Uint16;
                    this.type = view.getUint8(offset);
                    offset += size_Uint8;
                    this.ik_parent_bone_index = view.getUint16(offset, true);
                    offset += size_Uint16;
                    tmp = [];
                    tmp[0] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[1] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[2] = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.head_pos = new Float32Array(tmp);
                }
                Bone.size = size_Uint8 * 21 + size_Uint16 * 3 + size_Float32 * 3;
                return Bone;
            }());
            exports_1("Bone", Bone);
            IK = (function () {
                function IK(buffer, view, offset) {
                    var chain_length, i;
                    this.bone_index = view.getUint16(offset, true);
                    offset += size_Uint16;
                    this.target_bone_index = view.getUint16(offset, true);
                    offset += size_Uint16;
                    chain_length = view.getUint8(offset);
                    offset += size_Uint8;
                    this.iterations = view.getUint16(offset, true);
                    offset += size_Uint16;
                    this.control_weight = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.child_bones = (function () {
                        var _i, _results;
                        _results = [];
                        for (i = _i = 0; 0 <= chain_length ? _i < chain_length : _i > chain_length; i = 0 <= chain_length ? ++_i : --_i) {
                            _results.push(view.getUint16(offset + size_Uint16 * i, true));
                        }
                        return _results;
                    })();
                }
                IK.prototype.getSize = function () {
                    return size_Uint16 * 3 + size_Uint8 + size_Float32 + size_Uint16 * this.child_bones.length;
                };
                ;
                return IK;
            }());
            exports_1("IK", IK);
            Morph = (function () {
                function Morph(buffer, view, offset) {
                    var data, i, vert_count;
                    this.name = sijs_1.sjisArrayToString(new Uint8Array(buffer, offset, 20));
                    offset += size_Uint8 * 20;
                    vert_count = view.getUint32(offset, true);
                    offset += size_Uint32;
                    this.type = view.getUint8(offset);
                    offset += size_Uint8;
                    this.vert_data = (function () {
                        var _i, _results;
                        _results = [];
                        for (i = _i = 0; 0 <= vert_count ? _i < vert_count : _i > vert_count; i = 0 <= vert_count ? ++_i : --_i) {
                            data = {};
                            data.index = view.getUint32(offset, true);
                            offset += size_Uint32;
                            data.x = view.getFloat32(offset, true);
                            offset += size_Float32;
                            data.y = view.getFloat32(offset, true);
                            offset += size_Float32;
                            data.z = -view.getFloat32(offset, true);
                            offset += size_Float32;
                            _results.push(data);
                        }
                        return _results;
                    })();
                }
                Morph.prototype.getSize = function () {
                    return size_Uint8 * 21 + size_Uint32 + (size_Uint32 + size_Float32 * 3) * this.vert_data.length;
                };
                ;
                return Morph;
            }());
            exports_1("Morph", Morph);
            RigidBody = (function () {
                function RigidBody(buffer, view, offset) {
                    var tmp;
                    this.name = sijs_1.sjisArrayToString(new Uint8Array(buffer, offset, 20));
                    offset += size_Uint8 * 20;
                    this.rel_bone_index = view.getUint16(offset, true);
                    offset += size_Uint16;
                    this.group_index = view.getUint8(offset);
                    offset += size_Uint8;
                    this.group_target = view.getUint8(offset);
                    offset += size_Uint8;
                    this.shape_type = view.getUint8(offset, true);
                    offset += size_Uint8;
                    this.shape_w = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.shape_h = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.shape_d = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp = [];
                    tmp[0] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[1] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[2] = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.pos = new Float32Array(tmp);
                    tmp[0] = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[1] = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[2] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.rot = new Float32Array(tmp);
                    this.weight = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.pos_dim = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.rot_dim = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.recoil = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.friction = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.type = view.getUint8(offset);
                    offset += size_Uint8;
                }
                RigidBody.size = size_Uint8 * 23 + size_Uint16 * 2 + size_Float32 * 14;
                return RigidBody;
            }());
            exports_1("RigidBody", RigidBody);
            Joint = (function () {
                function Joint(buffer, view, offset) {
                    var tmp;
                    this.name = sijs_1.sjisArrayToString(new Uint8Array(buffer, offset, 20));
                    offset += size_Uint8 * 20;
                    this.rigidbody_a = view.getUint32(offset, true);
                    offset += size_Uint32;
                    this.rigidbody_b = view.getUint32(offset, true);
                    offset += size_Uint32;
                    tmp = [];
                    tmp[0] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[1] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[2] = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.pos = new Float32Array(tmp);
                    tmp[0] = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[1] = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[2] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.rot = new Float32Array(tmp);
                    tmp[0] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[1] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[2] = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.constrain_pos_1 = new Float32Array(tmp);
                    tmp[0] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[1] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[2] = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.constrain_pos_2 = new Float32Array(tmp);
                    tmp[0] = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[1] = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[2] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.constrain_rot_1 = new Float32Array(tmp);
                    tmp[0] = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[1] = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[2] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.constrain_rot_2 = new Float32Array(tmp);
                    tmp[0] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[1] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[2] = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.spring_pos = new Float32Array(tmp);
                    tmp[0] = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[1] = -view.getFloat32(offset, true);
                    offset += size_Float32;
                    tmp[2] = view.getFloat32(offset, true);
                    offset += size_Float32;
                    this.spring_rot = new Float32Array(tmp);
                }
                Joint.size = size_Int8 * 20 + size_Uint32 * 2 + size_Float32 * 24;
                return Joint;
            }());
            exports_1("Joint", Joint);
        }
    }
});
//# sourceMappingURL=PMDLoader.js.map