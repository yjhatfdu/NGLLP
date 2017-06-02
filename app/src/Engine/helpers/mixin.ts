/**
 * Created by yjh on 2016/12/12.
 */
export function mixins(...list) {
    return function (target) {
        list.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                target.prototype[name] = baseCtor.prototype[name];
            });
        });
    }
}