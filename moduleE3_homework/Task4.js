const printNumber = (start, end) => {
    let current = start;

    const intervalId = setInterval(() => {
        console.log(current);
        if (current === end) {
            clearInterval(intervalId);
        }
        current++;
    }, 1000);
};

printNumber(5, 15);