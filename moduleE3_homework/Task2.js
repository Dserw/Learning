const checkUp = (num) => {
    if (num > 1000) {
        console.log("Данные неверны");
        return;
    }

    if (num < 2) {
        console.log("Не является простым числом");
        return;
    }

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            console.log("Не является простым числом");
            return;
        }
    }

    console.log("Простое число");
};


checkUp(0);
checkUp(1);
checkUp(2);
checkUp(29);
checkUp(1001);
checkUp(100);