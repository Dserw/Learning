// Реализовать следующее консольное приложение подобно примеру, который разбирался в видео. Реализуйте его на прототипах.
// Определить иерархию электроприборов. Включить некоторые в розетку. Посчитать потребляемую мощность. 
// Таких приборов должно быть, как минимум, два (например, настольная лампа и компьютер). Выбрав прибор, подумайте, какими свойствами он обладает.
// План:
// Определить родительскую функцию с методами, которые включают/выключают прибор из розетки.
// Создать делегирующую связь [[Prototype]] для двух конкретных приборов.
// У каждого из приборов должны быть собственные свойства и, желательно, методы, отличные от родительских методов.
// Создать экземпляры каждого прибора.
// Вывести в консоль и посмотреть результаты работы, гордиться собой. :)
// Общие требования:
// Имена функций, свойств и методов должны быть информативными.
// Соблюдать best practices:
// использование camelCase нотации для переменных и методов, PascalCase для названия функций-конструкторов и классов;
// информативные имена (а не a, b);
// четкая связь между классом и его экземплярами (класс описывает множество, а экземпляр конкретную реализацию);
// использование синтаксиса ES6 (кроме функции-конструкторов) и т. д.

// Родительская функция для электроприборов
function ElectricAppliance(power) {
  this.power = power;
  this.isTurnedOn = false;
}
// Методы для включения и выключения электроприбора
ElectricAppliance.prototype.turnOn = function() {
  this.isTurnedOn = true;
  console.log(`The appliance is turned on. Power: ${this.power}W`);
};
ElectricAppliance.prototype.turnOff = function() {
  this.isTurnedOn = false;
  console.log('The appliance is turned off.');
};

// Конкретный электроприбор: лампа
function Lamp(power, color) {
  ElectricAppliance.call(this, power);
  this.color = color;
}
// Наследование прототипов
Lamp.prototype = Object.create(ElectricAppliance.prototype);
Lamp.prototype.constructor = Lamp;
// Дополнительный метод для лампы
Lamp.prototype.changeColor = function(newColor) {
  this.color = newColor;
  console.log(`The lamp color is changed to ${this.color}.`);
};
// Конкретный электроприбор: компьютер
function Computer(power, brand) {
  ElectricAppliance.call(this, power);
  this.brand = brand;
}
// Наследование прототипов
Computer.prototype = Object.create(ElectricAppliance.prototype);
Computer.prototype.constructor = Computer;
// Дополнительный метод для компьютера
Computer.prototype.shutdown = function() {
  console.log(`${this.brand} computer is shutting down.`);
};
// Создаем экземпляры приборов
const deskLamp = new Lamp(30, 'Blue');
const desktopComputer = new Computer(500, 'Dell');
// Проверяем работу методов
deskLamp.turnOn();
deskLamp.changeColor('Red');
deskLamp.turnOff();
desktopComputer.turnOn();
desktopComputer.shutdown();
desktopComputer.turnOff();
