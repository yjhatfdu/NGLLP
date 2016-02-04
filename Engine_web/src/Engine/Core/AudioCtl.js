var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by yjh on 15/12/19.
 */
///<reference path='../Resource/ResourceItem.ts'/>
var Core;
(function (Core) {
    var AudioCtl = (function (_super) {
        __extends(AudioCtl, _super);
        function AudioCtl() {
            _super.call(this);
            this.isPlaying = false;
            this.currentTime = 0;
            this.startTime = 0;
            this.ctx = new (window['AudioContext'] || window['webkitAudioContext'])();
        }
        AudioCtl.prototype.startSession = function () {
            this.ctx.resume();
        };
        AudioCtl.prototype.loadBgm = function (item) {
            this.bgmBuffer = item.audioBuffer;
            this.duration = item.bgmDuration;
        };
        AudioCtl.prototype.playAudioItem = function (item) {
            var bufferSource = this.ctx.createBufferSource();
            bufferSource.buffer = item.audioBuffer;
            bufferSource.connect(this.ctx.destination);
            bufferSource.start(this.ctx.currentTime);
        };
        AudioCtl.prototype.play = function (delay) {
            if (!this.bgmBuffer || this.isPlaying) {
                return;
            }
            delay = delay || 0;
            if (delay > 0) {
                setTimeout(this.playNow.bind(this), delay * 1000);
            }
            this.ctx.resume();
            this.bgmSource = this.ctx.createBufferSource();
            this.bgmSource.buffer = this.bgmBuffer;
            this.bgmSource.connect(this.ctx.destination);
            if (delay == 0) {
                this.playNow();
            }
        };
        AudioCtl.prototype.playNow = function () {
            this.bgmSource.start(this.ctx.currentTime, this.currentTime, this.duration);
            this.startTime = this.ctx.currentTime - this.currentTime;
            this.isPlaying = true;
        };
        AudioCtl.prototype.pause = function () {
            if (!this.isPlaying) {
                return;
            }
            this.bgmSource.stop();
            this.currentTime = this.ctx.currentTime - this.startTime;
            this.isPlaying = false;
        };
        AudioCtl.prototype.seek = function (time) {
            this.currentTime = time;
            this.play(0);
        };
        AudioCtl.prototype.getBgmTime = function () {
            return this.ctx.currentTime - this.startTime;
        };
        AudioCtl.prototype.update = function () {
            if (this.isPlaying) {
                if (this.ctx.currentTime - this.startTime > this.duration) {
                    this.pause();
                    this.dispatchEvent("BgmEnd");
                }
            }
        };
        return AudioCtl;
    })(Base.EventBase);
    Core.AudioCtl = AudioCtl;
})(Core || (Core = {}));
//# sourceMappingURL=AudioCtl.js.map