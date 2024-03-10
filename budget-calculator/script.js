function calculateBudget() {
    var monthlyIncome = parseFloat(document.getElementById("income").value) || 0;
    var additionalIncome = parseFloat(document.getElementById("additionalIncome").value) || 0;
    var rent = parseFloat(document.getElementById("rent").value) || 0;
    var utilities = parseFloat(document.getElementById("utilities").value) || 0;
    var groceries = parseFloat(document.getElementById("groceries").value) || 0;
    var savingsGoal = parseFloat(document.getElementById("savingsGoal").value) || 0;
    var otherExpenses = parseFloat(document.getElementById("otherExpenses").value) || 0;
    var entertainment = parseFloat(document.getElementById("entertainment").value) || 0
    var transportation = parseFloat(document.getElementById("transportation").value) || 0

    var totalIncome = monthlyIncome + additionalIncome;
    var totalExpenses = rent + utilities + groceries + otherExpenses + entertainment + transportation;

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
drawChart();
}

function exportBudgetReport() {
    let data = document.getElementById("breakdown").innerText;
    let blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "budget_report.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function drawChart() {
    var rent = parseFloat(document.getElementById("rent").value) || 0;
    var utilities = parseFloat(document.getElementById("utilities").value) || 0;
    var groceries = parseFloat(document.getElementById("groceries").value) || 0;
    var otherExpenses = parseFloat(document.getElementById("otherExpenses").value) || 0;
    var savingsGoal = parseFloat(document.getElementById("savingsGoal").value) || 0;
    var entertainment = parseFloat(document.getElementById("entertainment").value) || 0;
    var transportation = parseFloat(document.getElementById("transportation").value) || 0;
    var totalExpenses = rent + utilities + groceries + otherExpenses + entertainment + transportation + savingsGoal;

    var ctx = document.getElementById('budgetChart').getContext('2d');

    if(window.myChart instanceof Chart)
    {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Rent/Mortgage', 'Utilities', 'Groceries', 'Entertainment', 'Transportation', 'Other', 'Savings Goal'],
            datasets: [{
                label: 'Expenses',
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)', 'rgb(75, 192, 192)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)', 'rgb(255, 159, 64)'],
                borderColor: 'rgb(255, 255, 255)',
                data: [rent, utilities, groceries, entertainment, transportation, otherExpenses, savingsGoal],
            }]
        },
        options: {}
    });
}