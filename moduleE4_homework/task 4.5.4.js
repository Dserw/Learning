class ElectricAppliance {
  constructor(power) {
    this.power = power;
    this.isTurnedOn = false;
  }

  turnOn() {
    this.isTurnedOn = true;
    console.log(`The appliance is turned on. Power: ${this.power}W`);
  }

  turnOff() {
    this.isTurnedOn = false;
    console.log('The appliance is turned off.');
  }
}

class Lamp extends ElectricAppliance {
  constructor(power, color) {
    super(power);
    this.color = color;
  }

  changeColor(newColor) {
    this.color = newColor;
    console.log(`The lamp color is changed to ${this.color}.`);
  }
}

class Computer extends ElectricAppliance {
  constructor(power, brand) {
    super(power);
    this.brand = brand;
  }

  shutdown() {
    console.log(`${this.brand} computer is shutting down.`);
  }
}

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