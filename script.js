       const API_URL = 'https://open-long-puck.glitch.me';
        const tbody = document.querySelector("tbody");
        const notificationArea = document.querySelector(".notif");

        const loadData = () => {
            return fetch(API_URL)
                .then(resp => resp.json())
                .catch(error => console.log(error.message));
        };

        const printData = (data) => {
            tbody.innerHTML = ""; // Clear the existing rows before printing new data
            data.forEach(x => {
                const row = document.createElement("tr");
                row.innerHTML =
                    `
                    <td>${x.brand}</td>
                    <td>${x.model}</td>
                    `;
                tbody.append(row);
           
            });
            console.log(data);
        };

        document.addEventListener('DOMContentLoaded', () => {
            loadData().then(printData);

            const form = document.getElementById("form");

            form.addEventListener("submit", (e) => {
                e.preventDefault();

                const brand = document.getElementById("brand").value;
                const model = document.getElementById("model").value;

                // Send a POST request using Fetch
                fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ brand, model }),
                })
                    .then(response => response.json())
                    .then(data => {
                        // Handle the response (e.g., show a success message)
                        console.log('Car has been added :):', data);
                        // Display success message in the notification area
                        displayNotification('Car has been added :)', 'success');
                        // Reload data after successful submission
                        loadData().then(printData);
                    })
                    .catch(error => {
                        // Handle errors
                        console.error('Error:', error);
                        // Display error message in the notification area
                        displayNotification('Error submitting data. Please try again.', 'error');
                    });
            });

            // Function to display notifications
            function displayNotification(message, type) {
                notificationArea.innerHTML = `<div class="${type}">${message}</div>`;
            }

        });
