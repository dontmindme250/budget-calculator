function calculateBudget() {
    var monthlyIncome = parseFloat(document.getElementById("income").value) || 0;
    var additionalIncome = parseFloat(document.getElementById("additionalIncome").value) || 0;
    var rent = parseFloat(document.getElementById("rent").value) || 0;
    var utilities = parseFloat(document.getElementById("utilities").value) || 0;
    var groceries = parseFloat(document.getElementById("groceries").value) || 0;
    var savingsGoal = parseFloat(document.getElementById("savingsGoal").value) || 0;
    var otherExpenses = parseFloat(document.getElementById("otherExpenses").value) || 0;

    var totalIncome = monthlyIncome + additionalIncome;
    var totalExpenses = rent + utilities + groceries + otherExpenses;

    var moneyLeft = totalIncome - totalExpenses;
    var finalBudget = moneyLeft - savingsGoal;

    if (finalBudget >= 0) {
        document.getElementById("result").innerText = "Your budget is: $" + finalBudget.toFixed(2) + ". You can put $" + moneyLeft.toFixed(2) + " into your savings goals.";
    } else {
        document.getElementById("result").innerText = "Your budget is: $" + finalBudget.toFixed(2) + ". Unfortunately, you are over budget and may need to review your expenses.";
    }

    var breakdownText = `Total Income: $${totalIncome.toFixed(2)}\n`
                       + `Total Expenses (excluding savings goal): $${totalExpenses.toFixed(2)}\n`
                       + ` - Rent/Mortgage: $${rent.toFixed(2)}\n`
                       + ` - Utilities: $${utilities.toFixed(2)}\n`
                       + ` - Groceries: $${groceries.toFixed(2)}\n`
                       + ` - Other Expenses: $${otherExpenses.toFixed(2)}\n`
                       + `Savings Goal: $${savingsGoal.toFixed(2)}`
                       + `\nMoney left for Savings Goal: $${moneyLeft.toFixed(2)}`;
    document.getElementById("breakdown").innerText = breakdownText;
}