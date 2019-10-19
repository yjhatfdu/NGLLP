import * as parser from './parser'

declare module 'fs'
const functionMap = {};

const varSet = new Set([
    'channel',
    'progress',
    'x',
    'y'
]);

export function build(exp) {
    return new Function('channel', 'progress', 'x', 'y', 'return ' + compile(parser.parse(exp)))
}

function compile(node) {
    switch (node.type) {
        case 'func': {
            let f = Math[node.name];
            if (f) {
                return 'Math.' + node.name + '(' + node.children.map(compile).join(',') + ')';
            }
            f = functionMap[node.name];
            if (!f) {
                throw new Error("Not support function " + node.name)
            }
            return f + '(' + compile(node.children.map(compile).join(',')) + ')';
        }
        case 'const': {
            return node.value.toString()
        }
        case 'plus': {
            return compile(node.children[0]) + '+' + compile(node.children[1])
        }
        case 'minus': {
            return compile(node.children[0]) + '-' + compile(node.children[1])
        }
        case 'mul': {
            return compile(node.children[0]) + '*' + compile(node.children[1])
        }
        case 'div': {
            return compile(node.children[0]) + '/' + compile(node.children[1])
        }
        case 'uminus': {
            return '-' + compile(node.children[0])
        }
        case 'pow': {
            return 'Math.pow(' + compile(node.children[0]) + ',' + compile(node.children[1]) + ')'
        }
        case 'var': {
            if (!varSet.has(node.name)) {
                throw new Error("Not support variable " + node.name)
            }
            return node.name
        }
        case 'lt': {
            return `${compile(node.children[0])}<${compile(node.children[1])}`
        }
        case 'lte': {
            return `${compile(node.children[0])}<=${compile(node.children[1])}`
        }
        case 'gt': {
            return `${compile(node.children[0])}>${compile(node.children[1])}`
        }
        case 'gte': {
            return `${compile(node.children[0])}>=${compile(node.children[1])}`
        }
        case 'eq': {
            return `${compile(node.children[0])}==${compile(node.children[1])}`
        }
        case 'neq': {
            return `${compile(node.children[0])}!==${compile(node.children[1])}`
        }
        case 'and': {
            return `${compile(node.children[0])}&&${compile(node.children[1])}`
        }
        case 'or': {
            return `${compile(node.children[0])}||${compile(node.children[1])}`
        }
        case 'not': {
            return `!${compile(node.children[0])}`
        }
        case 'tri': {
            return `${compile(node.children[0])}?${compile(node.children[1])}:${compile(node.children[2])}`
        }
        case 'bracket': {
            return `(${compile(node.children[0])})`
        }
        default: {
            console.log(JSON.stringify(node));
            throw new Error("Not support node type " + node.type)
        }
    }
}

// console.log(build('-1.246334*cos(channel*0.125*PI)*progress').toString());
// //-1.246334*Math.cos(channel*0.125*3.141592653589793)*progress
//
// console.log(build('0.501466-1.246334*sin(channel*0.125*PI)*progress').toString());
// //0.501466-1.246334*Math.sin(channel*0.125*3.141592653589793)*progress
//
// console.log(build('0.37537*progress'));
// //0.37537*progress
//
// console.log(build('round(acos(-x / sqrt(x^2 + (0.501466 - y)^2)) / PI * 8)').toString());
// //Math.round(Math.acos(-x/Math.sqrt(Math.pow(x,2)+Math.pow(0.501466-y,2)))/3.141592653589793*8)
//
//console.log(build('cos(channel*0.25*PI)*min(0,progress-0.5)*2').toString());
// //1

// console.log(build('(0.58183107*channel-1.16366214*sign(channel-3.5)-2.03640874)*progress').toString());


// function a(channel, progress, x, y
// ) {
//     return (0.58183107 * channel - 1.16366214 * Math.sign(channel - 3.5) - 2.03640874) * progress
// }
// let b = 0;
// for (let i = 0; i < 100000000; i++) {
//     b = a(0, 1, 0, 0)
// }
// console.time('100000000 times');
// for (let i = 0; i < 100000000; i++) {
//     b = a(0, 1, 0, 0)
// }
// console.timeEnd('100000000 times');
// console.log(b);
