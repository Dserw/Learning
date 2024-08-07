const analyze = (arr) => {
    let evenCount = 0;
    let oddCount = 0;
    let zeroCount = 0;

    arr.forEach(element => {
        if (typeof element === 'number') {
            if (element === 0) {
                zeroCount++;
            } else if (element % 2 === 0) {
                evenCount++;
            } else {
                oddCount++;
            }
        }
    });

    console.log(`Четных элементов: ${evenCount}`);
    console.log(`Нечетных элементов: ${oddCount}`);
    console.log(`Нулевых элементов: ${zeroCount}`);
};

// Пример вызова функции с различными значениями в массиве
const exampl = [1, 2, 3, 4, 0, 'a', null, 5, 6, 0, 7, 8, 9, 0];
analyze(exampl);