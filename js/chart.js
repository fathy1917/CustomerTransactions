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

