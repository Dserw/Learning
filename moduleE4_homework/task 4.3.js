// Task 4.3.1
//Написать, функцию, которая принимает в качестве аргумента объект и 
// выводит в консоль все ключи и значения только собственных свойств. Данная функция не должна возвращать значение.
function displayOwnProperties(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      console.log(`${key}: ${obj[key]}`);
    }
  }
}

// Task 4.3.2
// Написать функцию, которая принимает в качестве аргументов строку и объект, 
// а затем проверяет есть ли у переданного объекта свойство с данным именем. Функция должна возвращать true или false.
function isPropertyExist(obj, propertyName) {
  return obj.hasOwnProperty(propertyName);
}

// Task4.3.3
//Написать функцию, которая создает пустой объект, но без прототипа.
function createEmptyObjectWithoutPrototype() {
    return Object.create(null);
}
