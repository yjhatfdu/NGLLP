const http = require('http');
const BeatMapProto = require('./map');
const BeatMap = BeatMapProto.BeatMap;
const Channel = BeatMapProto.Channel;
const Note = BeatMapProto.Note;
const fs = require('fs');
const lzma = require('lzma');

function loadFile(fpath) {
    return new Promise((resolve, reject) => {
        fs.readFile(fpath, (err, bindata) => {
            if (err) {
                res.writeHead(404);
                res.end();
                reject(err);
                return;
            }
            let data = JSON.parse(bindata);
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
            let compressed = new Int8Array(lzma.compress(new Uint8Array(proto).reverse())).reverse();
            let b = Buffer.from(new Uint8Array(compressed.buffer));
            resolve(b);
        });
    })
}

const app = http.createServer(async (req, res) => {
    let result = await loadFile();
    res.writeHead(200);
    res.write(result);
    res.end();


});
app.listen(3500);