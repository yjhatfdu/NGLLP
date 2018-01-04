/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.Note = (function() {
    
        /**
         * Properties of a Note.
         * @exports INote
         * @interface INote
         * @property {number|null} [starttime] Note starttime
         * @property {number|null} [endtime] Note endtime
         * @property {boolean|null} [longnote] Note longnote
         * @property {boolean|null} [parallel] Note parallel
         */
    
        /**
         * Constructs a new Note.
         * @exports Note
         * @classdesc Represents a Note.
         * @implements INote
         * @constructor
         * @param {INote=} [properties] Properties to set
         */
        function Note(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Note starttime.
         * @member {number} starttime
         * @memberof Note
         * @instance
         */
        Note.prototype.starttime = 0;
    
        /**
         * Note endtime.
         * @member {number} endtime
         * @memberof Note
         * @instance
         */
        Note.prototype.endtime = 0;
    
        /**
         * Note longnote.
         * @member {boolean} longnote
         * @memberof Note
         * @instance
         */
        Note.prototype.longnote = false;
    
        /**
         * Note parallel.
         * @member {boolean} parallel
         * @memberof Note
         * @instance
         */
        Note.prototype.parallel = false;
    
        /**
         * Creates a new Note instance using the specified properties.
         * @function create
         * @memberof Note
         * @static
         * @param {INote=} [properties] Properties to set
         * @returns {Note} Note instance
         */
        Note.create = function create(properties) {
            return new Note(properties);
        };
    
        /**
         * Encodes the specified Note message. Does not implicitly {@link Note.verify|verify} messages.
         * @function encode
         * @memberof Note
         * @static
         * @param {INote} message Note message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Note.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.starttime != null && message.hasOwnProperty("starttime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.starttime);
            if (message.endtime != null && message.hasOwnProperty("endtime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.endtime);
            if (message.longnote != null && message.hasOwnProperty("longnote"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.longnote);
            if (message.parallel != null && message.hasOwnProperty("parallel"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.parallel);
            return writer;
        };
    
        /**
         * Encodes the specified Note message, length delimited. Does not implicitly {@link Note.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Note
         * @static
         * @param {INote} message Note message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Note.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Note message from the specified reader or buffer.
         * @function decode
         * @memberof Note
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Note} Note
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Note.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Note();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.starttime = reader.int32();
                    break;
                case 2:
                    message.endtime = reader.int32();
                    break;
                case 3:
                    message.longnote = reader.bool();
                    break;
                case 4:
                    message.parallel = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Note message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Note
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Note} Note
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Note.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Note message.
         * @function verify
         * @memberof Note
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Note.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.starttime != null && message.hasOwnProperty("starttime"))
                if (!$util.isInteger(message.starttime))
                    return "starttime: integer expected";
            if (message.endtime != null && message.hasOwnProperty("endtime"))
                if (!$util.isInteger(message.endtime))
                    return "endtime: integer expected";
            if (message.longnote != null && message.hasOwnProperty("longnote"))
                if (typeof message.longnote !== "boolean")
                    return "longnote: boolean expected";
            if (message.parallel != null && message.hasOwnProperty("parallel"))
                if (typeof message.parallel !== "boolean")
                    return "parallel: boolean expected";
            return null;
        };
    
        /**
         * Creates a Note message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Note
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Note} Note
         */
        Note.fromObject = function fromObject(object) {
            if (object instanceof $root.Note)
                return object;
            var message = new $root.Note();
            if (object.starttime != null)
                message.starttime = object.starttime | 0;
            if (object.endtime != null)
                message.endtime = object.endtime | 0;
            if (object.longnote != null)
                message.longnote = Boolean(object.longnote);
            if (object.parallel != null)
                message.parallel = Boolean(object.parallel);
            return message;
        };
    
        /**
         * Creates a plain object from a Note message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Note
         * @static
         * @param {Note} message Note
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Note.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.starttime = 0;
                object.endtime = 0;
                object.longnote = false;
                object.parallel = false;
            }
            if (message.starttime != null && message.hasOwnProperty("starttime"))
                object.starttime = message.starttime;
            if (message.endtime != null && message.hasOwnProperty("endtime"))
                object.endtime = message.endtime;
            if (message.longnote != null && message.hasOwnProperty("longnote"))
                object.longnote = message.longnote;
            if (message.parallel != null && message.hasOwnProperty("parallel"))
                object.parallel = message.parallel;
            return object;
        };
    
        /**
         * Converts this Note to JSON.
         * @function toJSON
         * @memberof Note
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Note.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Note;
    })();
    
    $root.Channel = (function() {
    
        /**
         * Properties of a Channel.
         * @exports IChannel
         * @interface IChannel
         * @property {Array.<INote>|null} [notes] Channel notes
         */
    
        /**
         * Constructs a new Channel.
         * @exports Channel
         * @classdesc Represents a Channel.
         * @implements IChannel
         * @constructor
         * @param {IChannel=} [properties] Properties to set
         */
        function Channel(properties) {
            this.notes = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Channel notes.
         * @member {Array.<INote>} notes
         * @memberof Channel
         * @instance
         */
        Channel.prototype.notes = $util.emptyArray;
    
        /**
         * Creates a new Channel instance using the specified properties.
         * @function create
         * @memberof Channel
         * @static
         * @param {IChannel=} [properties] Properties to set
         * @returns {Channel} Channel instance
         */
        Channel.create = function create(properties) {
            return new Channel(properties);
        };
    
        /**
         * Encodes the specified Channel message. Does not implicitly {@link Channel.verify|verify} messages.
         * @function encode
         * @memberof Channel
         * @static
         * @param {IChannel} message Channel message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Channel.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.notes != null && message.notes.length)
                for (var i = 0; i < message.notes.length; ++i)
                    $root.Note.encode(message.notes[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };
    
        /**
         * Encodes the specified Channel message, length delimited. Does not implicitly {@link Channel.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Channel
         * @static
         * @param {IChannel} message Channel message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Channel.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Channel message from the specified reader or buffer.
         * @function decode
         * @memberof Channel
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Channel} Channel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Channel.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Channel();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.notes && message.notes.length))
                        message.notes = [];
                    message.notes.push($root.Note.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Channel message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Channel
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Channel} Channel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Channel.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Channel message.
         * @function verify
         * @memberof Channel
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Channel.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.notes != null && message.hasOwnProperty("notes")) {
                if (!Array.isArray(message.notes))
                    return "notes: array expected";
                for (var i = 0; i < message.notes.length; ++i) {
                    var error = $root.Note.verify(message.notes[i]);
                    if (error)
                        return "notes." + error;
                }
            }
            return null;
        };
    
        /**
         * Creates a Channel message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Channel
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Channel} Channel
         */
        Channel.fromObject = function fromObject(object) {
            if (object instanceof $root.Channel)
                return object;
            var message = new $root.Channel();
            if (object.notes) {
                if (!Array.isArray(object.notes))
                    throw TypeError(".Channel.notes: array expected");
                message.notes = [];
                for (var i = 0; i < object.notes.length; ++i) {
                    if (typeof object.notes[i] !== "object")
                        throw TypeError(".Channel.notes: object expected");
                    message.notes[i] = $root.Note.fromObject(object.notes[i]);
                }
            }
            return message;
        };
    
        /**
         * Creates a plain object from a Channel message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Channel
         * @static
         * @param {Channel} message Channel
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Channel.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.notes = [];
            if (message.notes && message.notes.length) {
                object.notes = [];
                for (var j = 0; j < message.notes.length; ++j)
                    object.notes[j] = $root.Note.toObject(message.notes[j], options);
            }
            return object;
        };
    
        /**
         * Converts this Channel to JSON.
         * @function toJSON
         * @memberof Channel
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Channel.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Channel;
    })();
    
    $root.BeatMap = (function() {
    
        /**
         * Properties of a BeatMap.
         * @exports IBeatMap
         * @interface IBeatMap
         * @property {Array.<IChannel>|null} [channels] BeatMap channels
         * @property {number|null} [speed] BeatMap speed
         */
    
        /**
         * Constructs a new BeatMap.
         * @exports BeatMap
         * @classdesc Represents a BeatMap.
         * @implements IBeatMap
         * @constructor
         * @param {IBeatMap=} [properties] Properties to set
         */
        function BeatMap(properties) {
            this.channels = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * BeatMap channels.
         * @member {Array.<IChannel>} channels
         * @memberof BeatMap
         * @instance
         */
        BeatMap.prototype.channels = $util.emptyArray;
    
        /**
         * BeatMap speed.
         * @member {number} speed
         * @memberof BeatMap
         * @instance
         */
        BeatMap.prototype.speed = 0;
    
        /**
         * Creates a new BeatMap instance using the specified properties.
         * @function create
         * @memberof BeatMap
         * @static
         * @param {IBeatMap=} [properties] Properties to set
         * @returns {BeatMap} BeatMap instance
         */
        BeatMap.create = function create(properties) {
            return new BeatMap(properties);
        };
    
        /**
         * Encodes the specified BeatMap message. Does not implicitly {@link BeatMap.verify|verify} messages.
         * @function encode
         * @memberof BeatMap
         * @static
         * @param {IBeatMap} message BeatMap message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BeatMap.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.channels != null && message.channels.length)
                for (var i = 0; i < message.channels.length; ++i)
                    $root.Channel.encode(message.channels[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.speed != null && message.hasOwnProperty("speed"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.speed);
            return writer;
        };
    
        /**
         * Encodes the specified BeatMap message, length delimited. Does not implicitly {@link BeatMap.verify|verify} messages.
         * @function encodeDelimited
         * @memberof BeatMap
         * @static
         * @param {IBeatMap} message BeatMap message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BeatMap.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a BeatMap message from the specified reader or buffer.
         * @function decode
         * @memberof BeatMap
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BeatMap} BeatMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BeatMap.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BeatMap();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.channels && message.channels.length))
                        message.channels = [];
                    message.channels.push($root.Channel.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.speed = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a BeatMap message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof BeatMap
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {BeatMap} BeatMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BeatMap.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a BeatMap message.
         * @function verify
         * @memberof BeatMap
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BeatMap.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.channels != null && message.hasOwnProperty("channels")) {
                if (!Array.isArray(message.channels))
                    return "channels: array expected";
                for (var i = 0; i < message.channels.length; ++i) {
                    var error = $root.Channel.verify(message.channels[i]);
                    if (error)
                        return "channels." + error;
                }
            }
            if (message.speed != null && message.hasOwnProperty("speed"))
                if (!$util.isInteger(message.speed))
                    return "speed: integer expected";
            return null;
        };
    
        /**
         * Creates a BeatMap message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BeatMap
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BeatMap} BeatMap
         */
        BeatMap.fromObject = function fromObject(object) {
            if (object instanceof $root.BeatMap)
                return object;
            var message = new $root.BeatMap();
            if (object.channels) {
                if (!Array.isArray(object.channels))
                    throw TypeError(".BeatMap.channels: array expected");
                message.channels = [];
                for (var i = 0; i < object.channels.length; ++i) {
                    if (typeof object.channels[i] !== "object")
                        throw TypeError(".BeatMap.channels: object expected");
                    message.channels[i] = $root.Channel.fromObject(object.channels[i]);
                }
            }
            if (object.speed != null)
                message.speed = object.speed | 0;
            return message;
        };
    
        /**
         * Creates a plain object from a BeatMap message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BeatMap
         * @static
         * @param {BeatMap} message BeatMap
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BeatMap.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.channels = [];
            if (options.defaults)
                object.speed = 0;
            if (message.channels && message.channels.length) {
                object.channels = [];
                for (var j = 0; j < message.channels.length; ++j)
                    object.channels[j] = $root.Channel.toObject(message.channels[j], options);
            }
            if (message.speed != null && message.hasOwnProperty("speed"))
                object.speed = message.speed;
            return object;
        };
    
        /**
         * Converts this BeatMap to JSON.
         * @function toJSON
         * @memberof BeatMap
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BeatMap.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return BeatMap;
    })();

    return $root;
});
