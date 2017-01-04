function getName(fn) {
    return typeof fn !== 'function' ?
        undefined : fn.name || /function (.+)\(/.exec(fn + '')[1]
}

function Student() {}
var o = new Student();
var name = getName(o.constructor);
console.log(name);