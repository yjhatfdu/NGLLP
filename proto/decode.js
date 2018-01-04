const BeatMap = require('./map').BeatMap;
const fs = require('fs');
const lzma=require('lzma');

let data=new Int8Array( fs.readFileSync('test.pb.json')).reverse();
let d=lzma.decompress(data);
let decompressed=new Uint8Array(new Int8Array(d).buffer).reverse();
let newMap=BeatMap.decode(decompressed);
process.stdout.write(JSON.stringify(newMap.toJSON(),null,2));