//this script has the code to test the various operation of list

const fruits = [];
console.log(fruits);

//add to list
//push only adds element to the end of list
fruits.push('orange');
console.log(fruits);

fruits.push('apple');
console.log(fruits);

//unshift adds element to the start of list
fruits.unshift('mango');
console.log(fruits);

//splice adds element at given index
//splice takes 3 arguments - 
// 1. index at which element has to be inserted
// 2. count of elements to be deleted
// 3. element to be added 
fruits.splice(2, 0, "Papaya")
console.log(fruits);

fruits.splice(2, 2, "pineapple")
console.log(fruits);

fruits.splice(0, 1, "guava")
console.log(fruits);

//[ 'guava', 'orange', 'pineapple' ]
fruits.splice(2, 0, "grapes")
console.log(fruits);    //[ 'guava', 'orange', 'grapes', 'pineapple' ]

fruits.splice(0, 1, "kiwi")
console.log(fruits);    //[ 'kiwi', 'orange', 'grapes', 'pineapple' ]

const users = []
