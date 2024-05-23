"use strict";

const depositButton = document.getElementById("deposit-button");
const depositAmount = document.getElementById("deposit-amount");
const errorMassage = document.getElementById("deposit-error");
const amount = document.getElementById("amount");
const balanceAmount = document.getElementById("balance-amount");
const expensesValue = document.getElementById("expenses-value");
let depositAmountNumber = 0;





depositButton.addEventListener("click", (e) => {
    e.preventDefault();
    depositAmountNumber = depositAmount.value;
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

// editebtn funtion 
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

expenseAmountBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
   
   
    if (!productTitle.value || !productPrice.value) {
        productError.classList.remove("hide");
        productError.innerText = "Expense value can'\t be empty";
        return;
    } else if (productTitle.value.trim().length <= 0 || productPrice.value <= 0) {
        productError.classList.remove("hide");
        productError.innerText = "In-valid data...";
        return;
    }
    if (parseInt(balanceAmount.innerText) <= 0 || parseInt(productPrice.value)> parseInt(balanceAmount.innerText)) {
        productError.classList.remove("hide");
        productError.innerText = "Please deposit in your account...";
        depositButton.disabled = false;
        return; // Stop further execution if balance is 0 or less
    }
    

    let expenditure = parseInt(productPrice.value);
    let sum = parseInt(expensesValue.innerText) + expenditure;
    const totalBalance = depositAmountNumber - sum;
    // 
    expensesValue.innerText = sum;
    balanceAmount.innerText = totalBalance;
    // 
    productListItem(productTitle.value, productPrice.value);
    // 
    productTitle.value = "";
    productPrice.value = "";
});