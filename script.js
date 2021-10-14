"use strict";
const budgetForm = document.querySelector(".budget-form");
const balanceLeft = document.querySelector(".balance");
const expenseForm = document.querySelector(".item-description-form");
const total = document.querySelector(".total");
const bills = document.querySelector(".bills");
const clothing = document.querySelector(".clothing");
const entertainment = document.querySelector(".entertainment");
const food = document.querySelector(".food");
const itemsTable = document.querySelector(".item-table-body");

const budgetBuddyDataBase = {
  budget: 0,
  remainingBalance: 0,
  total: 0,
  bills: 0,
  clothing: 0,
  entertainment: 0,
  food: 0,

  expenses: [
    {
      description: "dog",
      category: "bills",
      amount: 21,
    },
  ],
};

budgetForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const budgetInput = document.querySelector("#budget").value;
  budgetBuddyDataBase.budget = parseFloat(budgetInput);
  budgetBuddyDataBase.remainingBalance = parseFloat(budgetInput);
  balanceLeft.textContent = `$${budgetBuddyDataBase.remainingBalance}`;
});

const createTable = () => {
  //   itemsTable.innerHTML = "<tr>
  //   <th class="item-header">Item</th>
  //   <th class="item-header">Category</th>
  //   <th class="item-header">Amount ($)</th>
  //   <th class="item-header"></th>
  // </tr>)";

  budgetBuddyDataBase.expenses.forEach((expense) => {
    const newItem = document.createElement("tr");
    const description = document.createElement("td");
    const category = document.createElement("td");
    const amount = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    description.textContent = expense.description;
    category.textContent = expense.category;
    amount.textContent = `$${expense.amount}`;
    itemsTable.append(newItem);
    newItem.append(description, category, amount);
  });
};

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let description = document.querySelector("#item-description").value;
  let category = document.querySelector("#category").value;
  let amount = parseFloat(document.querySelector("#amount").value);
  budgetBuddyDataBase.expenses.push({
    description,
    category,
    amount,
  });
  budgetBuddyDataBase.total += amount;
  budgetBuddyDataBase[category] += amount;

  budgetBuddyDataBase.remainingBalance =
    budgetBuddyDataBase.budget - budgetBuddyDataBase.total;
  console.log(budgetBuddyDataBase);
  if (budgetBuddyDataBase.remainingBalance < 0) {
    alert("You have exceeded your budget");
  }
  balanceLeft.textContent = `$${budgetBuddyDataBase.remainingBalance}`;
  total.textContent = `$${budgetBuddyDataBase.total}`;
  bills.textContent = `$${budgetBuddyDataBase.bills}`;
  clothing.textContent = `$${budgetBuddyDataBase.clothing}`;
  entertainment.textContent = `$${budgetBuddyDataBase.entertainment}`;
  food.textContent = `$${budgetBuddyDataBase.food}`;
  createTable();
});
