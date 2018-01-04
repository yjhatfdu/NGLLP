if (process.stdout.isTTY) {
    process.stderr.write('Cannot output to tty\n');
    process.exit(1);
}
const BeatMapProto = require('./map');
const BeatMap = BeatMapProto.BeatMap;
const Channel = BeatMapProto.Channel;
const Note = BeatMapProto.Note;
const fs = require('fs');
const lzma=require('lzma');
let data = JSON.parse(fs.readFileSync('./test.json'));
let newMap = new BeatMap();
newMap.speed = data.speed;
newMap.channels = data.lane.map(lane => {
    let channel = new Channel();
    channel.notes = lane.map(n => {
        let note = new Note();
        note.start = n.starttime;
        note.end = n.endtime;
        note.longNote = n.longnote;
        note.parallel = n.parallel;
        return note
    });
    return channel;
});

let proto = BeatMap.encode(newMap).finish();
let compressed=new Int8Array(lzma.compress(new Uint8Array(proto).reverse())).reverse();
let b=Buffer.from(new Uint8Array(compressed.buffer));
process.stdout.write(b);
