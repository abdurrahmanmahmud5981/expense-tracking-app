// Strict mode for better error checking
"use strict";

const depositButton = document.getElementById("deposit-button");
const depositAmount = document.getElementById("deposit-amount");
const errorMassage = document.getElementById("deposit-error");
const amount = document.getElementById("amount");
const balanceAmount = document.getElementById("balance-amount");
const expensesValue = document.getElementById("expenses-value");
let depositAmountNumber = 0;




// Event listener for deposit button click
depositButton.addEventListener("click", (e) => {
    e.preventDefault();
    depositAmountNumber = depositAmount.value; // Get the deposit amount from input
    // Validate deposit amount input
    if (depositAmountNumber === "") {
        errorMassage.classList.remove('hide');
        errorMassage.innerText = ` Deposit value can't be empty.... `;
    } else if (depositAmountNumber < 1) {
        errorMassage.classList.remove('hide');
        errorMassage.innerText = ` In-valid deposit value.... `;
    } else {
        errorMassage.classList.add('hide');
        amount.innerText = depositAmountNumber;
        balanceAmount.innerText = depositAmountNumber - expensesValue.innerText;
        depositAmount.value = "";
        depositButton.disabled = true;

    }
});





const expenseAmountBtn = document.getElementById("expense-amount-button");
const productTitle = document.getElementById("product-title");
const productPrice = document.getElementById("user-amount");
const productError = document.getElementById("product-title-error");
const list = document.getElementById("list");

//
// Function to modify or remove an expense item
const modifyElement = (element, edit = false) => {
    let currentBalance = balanceAmount.innerText;
    let currentExpense = expensesValue.innerText;
    let parentDiv = element.parentElement;
    let editProductPrice = parentDiv.querySelector(".amount").innerText;
    // 
    if (edit) {
        let editProductTitle = parentDiv.querySelector(".product").innerText;
        productTitle.value = editProductTitle;
        productPrice.value = editProductPrice;
    }
    // 
    balanceAmount.innerText = parseInt(currentBalance) + parseInt(editProductPrice);
    expensesValue.innerText = parseInt(currentExpense) - parseInt(editProductPrice);
    parentDiv.remove();

};
// 
// Function to create and append a new expense item to the list
const productListItem = (expensName, expensPrice) => {
    // creating product list  
    let createList = document.createElement("div");
    createList.classList.add("sublist-content", "flex-space");
    createList.innerHTML = `<p class="product">${expensName}</p> <p class="amount">${expensPrice}</p>`;
    //creating edit button
    let editBtn = document.createElement("button");
    editBtn.classList.add("edit", "fa-solid", "fa-pen-to-square");
    editBtn.style.fontSize = "1.2em";
    // 
    editBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modifyElement(e.target, true);
    });
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete", "fa-solid", "fa-trash-can");
    deleteBtn.style.fontSize = "1.2em";
    deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modifyElement(e.target);
    });
    //    
    createList.appendChild(editBtn);
    createList.appendChild(deleteBtn);
    // 
    list.appendChild(createList);


};


// Event listener for adding a new expense
expenseAmountBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //
    if (!productTitle.value || !productPrice.value) {
        productError.classList.remove("hide");
        productError.innerText = "Expense value can'\t be empty";
        return;
    }


    // Function to check if a string contains at least one alphabetic character
    function containsLetters(letter) {
        for (let i = 0; i < letter.length; i++) {
            let char = letter[i].toLowerCase();
            if (char >= 'a' && char <= 'z') {
                return true;
            }
        }
        return false;
    }
    // Check if the product title is empty or does not contain any letters
    if (!productTitle.value || !containsLetters(productTitle.value)) {
        productError.classList.remove("hide");
        productError.innerText = "Product title must include some letters.";
        return;
    }

    //
    if (!productTitle.value || !productPrice.value) {
        productError.classList.remove("hide");
        productError.innerText = "Expense value can'\t be empty";
        return;
    }

    // Check if productPrice is empty or less than or equal to zero
    else if (productTitle.value.trim().length <= 0 || productPrice.value <= 0) {
        productError.classList.remove("hide");
        productError.innerText = "In-valid data...";
        return;
    }

    // Check if there is enough balance to cover the expense
    if (parseInt(balanceAmount.innerText) <= 0 || parseInt(productPrice.value) > parseInt(balanceAmount.innerText)) {
        productError.classList.remove("hide");
        productError.innerText = "Please deposit in your account...";
        depositButton.disabled = false;
        return; // Stop further execution if balance is 0 or less
    }

    // Calculate new expenses and balance
    let expenditure = parseInt(productPrice.value);
    let newExpenses = parseInt(expensesValue.innerText) + expenditure;
    const newBalance = depositAmountNumber - newExpenses;
    // 
    // Update the expenses and balance on the UI
    expensesValue.innerText = newExpenses;
    balanceAmount.innerText = newBalance;
    // 
    // Add the new expense to the list
    productListItem(productTitle.value, productPrice.value);
    // 
    // Clear the input fields
    productTitle.value = "";
    productPrice.value = "";
});