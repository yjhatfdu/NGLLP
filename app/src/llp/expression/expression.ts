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
// console.log(build('1').toString());
// //1
