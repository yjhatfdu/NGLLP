var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by yjh on 15/12/21.
 */
///<reference path='Sprite.ts'/>
var Core2D;
(function (Core2D) {
    var QuadrangleSprite = (function (_super) {
        __extends(QuadrangleSprite, _super);
        function QuadrangleSprite(imgItem, point0, point1, point2, point3) {
            _super.call(this);
            this.texture = imgItem.texture;
            _a = [point0, point1, point2, point3], this.p0 = _a[0], this.p1 = _a[1], this.p2 = _a[2], this.p3 = _a[3];
            var _a;
        }
        return QuadrangleSprite;
    })(Base.NodeBase);
})(Core2D || (Core2D = {}));
