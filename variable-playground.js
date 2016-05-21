var person = {
    name:"Andrew",
    age:21
};

function updatePerson(obj){
    //will not work your need to use dot notation
    // obj={
    //     name:"Andrew",
    //     age:24
    // };
    
    obj.age = 24;
}

updatePerson(person);
console.log(person);

//Array Example
var grades=[15,88];
function addGrades(gradesArr){
    gradesArr.push(55);
    debugger;
    
    //gradesArr = [12,33,99];
    
}

addGrades(grades);
console.log(grades);