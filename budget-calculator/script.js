function getValueById(id) {
    return parseFloat(document.getElementById(id).value) || 0;
}

function setTextContentById(id, text) {
    document.getElementById(id).innerText = text;
}

document.addEventListener("DOMContentLoaded", function() {
    displayCalculationHistory();
});

function calculateBudget() {
    var monthlyIncome = getValueById("income");
    var additionalIncome = getValueById("additionalIncome");
    var rent = getValueById("rent");
    var utilities = getValueById("utilities");
    var groceries = getValueById("groceries");
    var savingsGoal = getValueById("savingsGoal");
    var otherExpenses = getValueById("otherExpenses");
    var entertainment = getValueById("entertainment");
    var transportation = getValueById("transportation");
    var pets = getValueById("pets");
    var childCare = getValueById("childCare");
    var healthInsurance = getValueById("healthInsurance");
    var loans = getValueById("loans");

    var totalIncome = monthlyIncome + additionalIncome;
    var totalExpenses = rent + utilities + groceries + otherExpenses + entertainment + transportation + pets + childCare + healthInsurance + loans;

    var moneyLeft = totalIncome - totalExpenses;
    var finalBudget = moneyLeft - savingsGoal;
    var resultText = finalBudget >= 0 ? 
        `Your budget is: $${finalBudget.toFixed(2)}. You can put $${moneyLeft.toFixed(2)} into your savings goals.` : 
        `Your budget is: $${finalBudget.toFixed(2)}. Unfortunately, you are over budget and may need to review your expenses.`;

    setTextContentById("result", resultText);

    var breakdownText = `Total Income: $${totalIncome.toFixed(2)}\n`
                       + `Total Expenses (excluding savings goal): $${totalExpenses.toFixed(2)}\n`
                       + ` - Rent/Mortgage: $${rent.toFixed(2)}\n`
                       + ` - Utilities: $${utilities.toFixed(2)}\n`
                       + ` - Groceries: $${groceries.toFixed(2)}\n`
                       + ` - Other Expenses: $${otherExpenses.toFixed(2)}\n`
                       + `Savings Goal: $${savingsGoal.toFixed(2)}`
                       + `\nMoney left for Savings Goal: $${moneyLeft.toFixed(2)}`;
    setTextContentById("breakdown", breakdownText);

drawChart();

    var calculationHistory = {
        datetime: new Date().toISOString(),
        inputs: { monthlyIncome, additionalIncome, rent, utilities, groceries, savingsGoal, otherExpenses, entertainment, transportation, pets, childCare, healthInsurance, loans },
        outputs: { totalIncome, totalExpenses, moneyLeft, finalBudget, resultText }
    };
    storeInLocalStorage(calculationHistory);
}

function storeInLocalStorage(calculation) {
    let history = localStorage.getItem("budgetCalculationHistory");
    if (history) {
        history = JSON.parse(history);
    } else {
        history = [];
    }
    history.push(calculation);
    localStorage.setItem("budgetCalculationHistory", JSON.stringify(history));
}

function displayCalculationHistory() {
    let history = localStorage.getItem("budgetCalculationHistory");
    if (history) {
        history = JSON.parse(history);
        let historyElement = document.getElementById("calculationHistory");
        historyElement.innerHTML = ""; // Clear previous history
        history.forEach(item => {
            let entry = document.createElement("div");
            entry.innerHTML = `<strong>Calculation Date:</strong> ${item.datetime}<br>
                               <strong>Final Budget:</strong> ${item.outputs.finalBudget.toFixed(2)}<br>
                               <hr>`;
            historyElement.appendChild(entry);
        });
    }
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
    var ctx = document.getElementById('budgetChart').getContext('2d');
    var categories = ['Rent/Mortgage', 'Utilities', 'Groceries', 'Entertainment', 'Transportation', 'Other Expenses', 'Savings Goal'];
    var expenses = [
        getValueById("rent"), 
        getValueById("utilities"), 
        getValueById("groceries"), 
        getValueById("entertainment"), 
        getValueById("transportation"), 
        getValueById("otherExpenses"),
        getValueById("savingsGoal")
    ];

    if(window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)', 'rgb(75, 192, 192)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)', 'rgb(255, 159, 64)'],
                borderColor: 'rgb(255, 255, 255)',
                data: expenses,
            }]
        }
    });
}

document.getElementById("toggleOptionalExpenses").addEventListener("click", function() {
    var optionalExpensesSection = document.getElementById("optionalExpenses");
    if (optionalExpensesSection.style.display === "none") {
        optionalExpensesSection.style.display = "block";
        this.textContent = "Hide Optional Expenses";
    } else {
        optionalExpensesSection.style.display = "none";
        this.textContent = "Show Optional Expenses";
    }
});