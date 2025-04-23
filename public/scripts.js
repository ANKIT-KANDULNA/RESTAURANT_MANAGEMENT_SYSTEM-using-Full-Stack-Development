let orderList = {};

async function orderDish(dishName, price, qtyId) {
  const qty = parseInt(document.getElementById(qtyId).value, 10);

  await fetch('/bill/addToBill', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dish_name: dishName, qty: qty, price: price })
  });

  if (!orderList[dishName]) {
    orderList[dishName] = { qty: 0, price: price };
  }
  orderList[dishName].qty += qty;
  refreshBillTable();
}

function refreshBillTable() {
  const tableBody = document.querySelector("#billTable tbody");
  tableBody.innerHTML = "";

  Object.keys(orderList).forEach((dish) => {
    const row = document.createElement("tr");
    const dishData = orderList[dish];

    const dishTd = document.createElement("td");
    dishTd.innerText = dish;
    row.appendChild(dishTd);

    const qtyTd = document.createElement("td");
    qtyTd.innerText = dishData.qty;
    row.appendChild(qtyTd);

    const priceTd = document.createElement("td");
    priceTd.innerText = dishData.price;
    row.appendChild(priceTd);

    const removeOneTd = document.createElement("td");
    const removeOneBtn = document.createElement("button");
    removeOneBtn.innerText = "Remove One";
    removeOneBtn.onclick = function () {
      removeOneDish(dish);
    };
    removeOneTd.appendChild(removeOneBtn);
    row.appendChild(removeOneTd);

    const removeAllTd = document.createElement("td");
    const removeAllBtn = document.createElement("button");
    removeAllBtn.innerText = "Remove All";
    removeAllBtn.onclick = function () {
      removeAllDish(dish);
    };
    removeAllTd.appendChild(removeAllBtn);
    row.appendChild(removeAllTd);

    tableBody.appendChild(row);
  });
}

function removeOneDish(dishName) {
  if (orderList[dishName]) {
    orderList[dishName].qty -= 1;
    if (orderList[dishName].qty <= 0) {
      delete orderList[dishName];
    }
    refreshBillTable();
  }
}

function removeAllDish(dishName) {
  if (orderList[dishName]) {
    delete orderList[dishName];
  }
  refreshBillTable();
}

function calculateTotal() {
  let total = 0;
  Object.keys(orderList).forEach((dish) => {
    const dishData = orderList[dish];
    total += dishData.qty * dishData.price;
  });
  document.getElementById("totalAmount").innerText = total;

  // Show the payment section after calculating the total
  document.getElementById("paymentSection").style.display = "block";
  document.getElementById("feedbackButton").style.display = "inline-block";  // Show feedback button
}

async function makePayment(paymentMethod) {
  const totalAmount = parseInt(document.getElementById("totalAmount").innerText, 10);

  // Send payment data to the server
  const response = await fetch('/payment/makePayment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ payment_method: paymentMethod, amount: totalAmount }),
  });

  const result = await response.json();
  if (result.success) {
    alert("Payment Successful!");
    // Hide payment section after success
    document.getElementById("paymentSection").style.display = "none";
  } else {
    alert("Payment failed, please try again.");
  }
}

function showFeedbackForm() {
  document.getElementById("feedbackSection").style.display = "block";
}

async function submitFeedback() {
  const feedbackMessage = document.getElementById("feedbackMessage").value;
  const dishName = "Example Dish";  // This can be dynamically set based on the user's last ordered item

  // Send feedback data to the server
  const response = await fetch('/feedback/submitFeedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: feedbackMessage, dish_name: dishName })
  });

  const result = await response.json();
  if (result.success) {
    alert("Feedback submitted successfully!");
    // Hide feedback section after submission
    document.getElementById("feedbackSection").style.display = "none";
  } else {
    alert("Failed to submit feedback, please try again.");
  }
}