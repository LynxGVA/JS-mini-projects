const colorSwitch = document.querySelector(".color-switcher");
const colorBtns = colorSwitch.querySelectorAll(".color-btn");
const box = colorSwitch.querySelector(".block")

colorBtns.forEach(btn => {
    btn.addEventListener("click", event => {
        colorBtns.forEach(btn => {
            btn.classList.remove("active")
        })
        btn.classList.add("active");
        box.style.backgroundColor = event.target.dataset.color;
    })
});

/*
for(let i = 0; i < colorBtns.length; i++){
    colorBtns[i].addEventListener("click", function(event) {
        for(let i = 0; i < colorBtns.length; i++){
            colorBtns[i].classList.remove("active")
        }
        event.target.classList.add("active");
        box.style.backgroundColor = event.target.dataset.color;
    })
}
*/

const gallery = document.querySelector(".gallery");
const photo = gallery.querySelector(".photo");
const images = ["img/img1.png","img/img2.png","img/img3.png","img/img4.png","img/img5.png"];
const prevBtn = gallery.querySelector(".previous");
const nextBtn = gallery.querySelector(".next")
const text = gallery.querySelector(".text")
let current = 0;

nextBtn.addEventListener("click", () => {
    /*
    if(current >= images.length - 1 ){
        current = 0;
    }else{
        current++;
    }
    */
    current = (current + 1) % images.length;
    photo.src = images[current];
    text.textContent = (current + 1) + " / " + images.length;
})
prevBtn.addEventListener("click", () => {
    if(current <= 0){
        current = images.length - 1;
    }else{
        current--;
    }
    photo.src = images[current];
    text.textContent = (current + 1) + " / " + images.length;
})


const taskForm = document.querySelector(".task-form");
const inputTask = taskForm.querySelector(".input-task");
const btnSubmit = taskForm.querySelector(".add-task");
const taskList = taskForm.querySelector(".task-list")
taskForm.addEventListener("submit", event => {
    event.preventDefault();
    if(inputTask.value === "") return;
    const deleteBtn = document.createElement("button");
    //deleteBtn.style.cssText = "margin: 5px 10px; height: 30px; width: 50px;"
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "checkbox";
    li.appendChild(input);
    const text = document.createElement("span");
    text.textContent = inputTask.value;
    li.appendChild(text);
    li.appendChild(deleteBtn);
    taskList.appendChild(li)
    deleteBtn.addEventListener("click", () => {
        li.remove()
    })
    inputTask.value = "";
})

/*

var counter1 = 0;
setInterval(function(){
  counter1++;
  console.log("Seconds passed: " + counter1)
}, 1000);

setTimeout(function(){
  console.log("Timer is working!")
}, 2000)

*/

const overlay = document.querySelector(".overlay");
const modalWindow = overlay.querySelector(".modal");
const openModalBtn = document.querySelector(".open-modal");
const backBtn = modalWindow.querySelector(".back-btn")
function closeModal(){
    overlay.classList.remove("active");
    modalWindow.classList.remove("active");
}
openModalBtn.addEventListener("click", () => {
    overlay.classList.add("active");
    modalWindow.classList.add("active");
    backBtn.classList.add("active");
    backBtn.textContent = "Close";
    backBtn.addEventListener("click", closeModal)

    overlay.addEventListener("click", event => {
        if (event.target === modalWindow) return;
        closeModal();
    })
})

document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;
        closeModal();
    })


const sliderContainer = document.querySelector(".slider-container");
const slider = sliderContainer.querySelector(".slider");
const sliderValue = sliderContainer.querySelector(".value");
slider.addEventListener("input", () =>{
    sliderValue.textContent = slider.value;
})

const filterProducts = document.querySelector(".filter-products");
const inputFields = filterProducts.querySelectorAll(".filter-products-checkbox");
const productsFilteredList = filterProducts.querySelector(".productsFilteredList");
const products = [
    { name: "Apple", category: "Fruits"},
    { name: "Banana", category: "Fruits"},
    { name: "Carrot", category: "Vegetables"},
    { name: "Tomato", category: "Vegetables"},
    { name: "Cola", category: "Drinks"},
    { name: "Sprite", category: "Drinks"},
 ]

 inputFields.forEach(input => {
    input.addEventListener("change", () => {
        const listOfInputs = Array.from(inputFields);
        const checkedInputs = listOfInputs.filter(input => {
            return (input.checked === true)
        })
        const inputsCategories = checkedInputs.map(input => {
            return (input.value)
        })
        const filteredProducts = products.filter(product => {
            return (inputsCategories.includes(product.category))
        })

        productsFilteredList.innerHTML = "";
        filteredProducts.forEach(product => {
            const li = document.createElement("li");
            li.textContent = product.name;
            productsFilteredList.appendChild(li);
        })
        
    })
 })

 /*
 const calculator = document.querySelector(".calculator");
 const calculatorResult = calculator.querySelector(".calc-result");
 const calculatorOperationsDiv = calculator.querySelector(".calc-operations");
 const calculatorOperations = calculatorOperationsDiv.querySelectorAll("button")
 const calculatorNumbersDiv = calculator.querySelector(".calc-numbers");
 const calculatorNumbers = calculatorNumbersDiv.querySelectorAll("button");
 let isSecondNumber = false;
 calculatorResult.textContent = ""
 let firstNumber = 0;
 let secondNumber = 0;
 let operator = null;

 calculatorNumbers.forEach(number => {
    number.addEventListener("click", () => {
        if (isSecondNumber === false) {
            if (calculatorResult.textContent !== "") calculatorResult.textContent = ""
            const currentValue = number.textContent;
            calculatorResult.textContent += currentValue;
            firstNumber = calculatorResult.textContent;
        } 
        else if (isSecondNumber === true) {
            const currentValue = number.textContent;
            calculatorResult.textContent += currentValue;
            secondNumber = (secondNumber || "") + currentValue;
        }
    })
 })

 calculatorOperations.forEach(operation => {
            operation.addEventListener("click", () => {
                if (operation.textContent !== "=" && operation.textContent !== "C"){
                    firstNumber = Number(firstNumber)
                    operator = operation.textContent;
                    calculatorResult.textContent += operation.textContent;
                    isSecondNumber = true
                }
                else if (operation.textContent === "=" && secondNumber != null){
                    secondNumber = Number(secondNumber);
                    isSecondNumber = false;
                    if (operator === "+"){
                        calculatorResult.textContent = "Result: " + (firstNumber + secondNumber);
                    }
                    else if (operator === "-"){
                        calculatorResult.textContent = "Result: " + (firstNumber - secondNumber);
                    }
                    else if (operator === "/"){
                        calculatorResult.textContent = "Result: " + (firstNumber / secondNumber);
                    }
                    else if (operator === "*"){
                        calculatorResult.textContent = "Result: " + (firstNumber * secondNumber);
                    }
                    secondNumber = 0;
                }
                else if (operation.textContent === "C"){
                    calculatorResult.textContent = ""
                    firstNumber = 0;
                    secondNumber = 0;
                }
            })
        })
*/

 const calculator = document.querySelector(".calculator");
 const calculatorResult = calculator.querySelector(".calc-result");
 const calculatorOperationsDiv = calculator.querySelector(".calc-operations");
 const calculatorOperations = calculatorOperationsDiv.querySelectorAll("button")
 const calculatorNumbersDiv = calculator.querySelector(".calc-numbers");
 const calculatorNumbers = calculatorNumbersDiv.querySelectorAll("button");
 calculatorResult.textContent = ""
 let currentResult = 0;
 let currentInput = "";
 let operator = null;
 let justCalculated = false;

function calculate(a, b, op){
    if (op === "+") return a + b;
    if (op === "-") return a - b;
    if (op === "*") return a * b;
    if (op === "/" && b === 0) return "Error";
    if (op === "/") return a / b;
    return b;
}


 calculatorNumbers.forEach(number => {
    number.addEventListener("click", () => {
        if (justCalculated){
            calculatorResult.textContent = "";
            currentInput = ""
            operator = null;  
            justCalculated = false;
        }
        currentInput += number.textContent;
        calculatorResult.textContent += number.textContent
    })
 })

 calculatorOperations.forEach(operation => {
    operation.addEventListener("click", () => {
        if (operation.textContent === "=") {
            if (operator === null || currentInput === "") return;
            currentResult = calculate(currentResult, Number(currentInput), operator)
            calculatorResult.textContent = currentResult;
            currentInput = ""
            operator = null;  
            justCalculated = true;
            return;  
        }

        if (operation.textContent === "C"){
            calculatorResult.textContent = "";
            currentResult = 0;
            currentInput = ""
            operator = null;  
            return; 
        }

        if (currentInput === "") return;

        if (operator !== null && currentInput !== ""){
            currentResult = calculate(currentResult, Number(currentInput), operator)
        }else if (operator === null && currentInput !== ""){
            currentResult = Number(currentInput)
        }
        currentInput = "";
        operator = operation.textContent
        calculatorResult.textContent += operation.textContent

    })
 })
 









