function calculateBudget() {
    var monthlyIncome = parseFloat(document.getElementById("income").value) || 0;
    var additionalIncome = parseFloat(document.getElementById("additionalIncome").value) || 0;
    var rent = parseFloat(document.getElementById("rent").value) || 0;
    var utilities = parseFloat(document.getElementById("utilities").value) || 0;
    var groceries = parseFloat(document.getElementById("groceries").value) || 0;

    var totalIncome = monthlyIncome + additionalIncome;
    var totalExpenses = rent + utilities + groceries;

    var finalBudget = totalIncome - totalExpenses;

    document.getElementById("result").innerText = "Your budget is: $" + finalBudget.toFixed(2);

    var breakdownText = `Total Income: $${totalIncome.toFixed(2)}\n`
                       + `Total Expenses: $${totalExpenses.toFixed(2)}\n`
                       + ` - Rent/Mortgage: $${rent.toFixed(2)}\n`
                       + ` - Utilities: $${utilities.toFixed(2)}\n`
                       + ` - Groceries: $${groceries.toFixed(2)}`;
    document.getElementById("breakdown").innerText = breakdownText;
}