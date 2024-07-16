document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('transactionChart').getContext('2d');

    const data = {
        labels: ["2022-01-01", "2022-01-02"],
        datasets: [{
            label: 'Total Transaction Amount',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: [3500, 3125] 
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    const myChart = new Chart(ctx, config);
});

document.addEventListener('DOMContentLoaded', function () {
    const customerTable = document.getElementById('customerTableBody');
    const filterNameInput = document.getElementById('filterName');
    const filterAmountInput = document.getElementById('filterAmount');

    const data = {
        customers: [
            { id: 1, name: "Ahmed Ali" },
            { id: 2, name: "Aya Elsayed" },
            { id: 3, name: "Mina Adel" },
            { id: 4, name: "Sarah Reda" },
            { id: 5, name: "Mohamed Sayed" }
        ],
        transactions: [
            { id: 1, customer_id: 1, date: "2022-01-01", amount: 1000 },
            { id: 2, customer_id: 1, date: "2022-01-02", amount: 2000 },
            { id: 3, customer_id: 2, date: "2022-01-01", amount: 550 },
            { id: 4, customer_id: 3, date: "2022-01-01", amount: 500 },
            { id: 5, customer_id: 2, date: "2022-01-02", amount: 1300 },
            { id: 6, customer_id: 4, date: "2022-01-01", amount: 750 },
            { id: 7, customer_id: 3, date: "2022-01-02", amount: 1250 },
            { id: 8, customer_id: 5, date: "2022-01-01", amount: 2500 },
            { id: 9, customer_id: 5, date: "2022-01-02", amount: 875 }
        ]
    };

    displayTable(data.customers, data.transactions);

    filterNameInput.addEventListener('input', () => filterTable(data.customers, data.transactions));
    filterAmountInput.addEventListener('input', () => filterTable(data.customers, data.transactions));

    function displayTable(customers, transactions) {
        let tableHTML = '';
        customers.forEach(customer => {
            transactions.filter(transaction => transaction.customer_id === customer.id)
                    .forEach(transaction => {
                tableHTML += `
                    <tr>
                        <td>${customer.name}</td>
                        <td>${transaction.date}</td>
                        <td>${transaction.amount}</td>
                    </tr>
                `;
            });
        });
        customerTable.innerHTML = tableHTML;
    }

    function filterTable(customers, transactions) {
        const filterName = filterNameInput.value.toLowerCase();
        const filterAmount = parseFloat(filterAmountInput.value);

        const filteredTransactions = transactions.filter(transaction => {
            const customer = customers.find(c => c.id === transaction.customer_id);
            const customerName = customer.name.toLowerCase();
            return customerName.includes(filterName) &&
                (isNaN(filterAmount) || transaction.amount >= filterAmount);
        });

        displayTable(customers, filteredTransactions);
    }

    function calculateTotalTransactionsPerDay(transactions, customerId) {
        const dailyTransactions = {};

        transactions.forEach(transaction => {
            if (transaction.customer_id === customerId) {
                const date = transaction.date;
                if (!dailyTransactions[date]) {
                    dailyTransactions[date] = 0;
                }
                dailyTransactions[date] += transaction.amount;
            }
        });

        return dailyTransactions;
    }

    customerTable.addEventListener('click', (event) => {
        const selectedCustomerName = event.target.closest('tr').querySelector('td:first-child').textContent;
        const selectedCustomerId = data.customers.find(customer => customer.name === selectedCustomerName).id;

        const dailyTransactions = calculateTotalTransactionsPerDay(data.transactions, selectedCustomerId);
        
        updateChart(Object.keys(dailyTransactions), Object.values(dailyTransactions));
    });

    function updateChart(labels, dataValues) {
        const ctx = document.getElementById('transactionChart').getContext('2d');
        
        if (window.myChart !== undefined)
            window.myChart.destroy();

        window.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Transaction Amount',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    data: dataValues
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

});
