const createAdder = (x) => {
    return (y) => {
        return x + y;
    };
};


const add5 = createAdder(5);
console.log(add5(10));

