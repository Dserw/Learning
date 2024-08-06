const mylt = (x, n) => {
    let result = 1;
    for (let i = 0; i < n; i++) {
        result *= x;
    }
    return result;
};

console.log(mylt(2, 3));
console.log(mylt(5, 4));
