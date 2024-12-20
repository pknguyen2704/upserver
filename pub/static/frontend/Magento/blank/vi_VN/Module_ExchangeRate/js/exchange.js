document.addEventListener('DOMContentLoaded', function () {
    // Fetch exchange rates when the button is clicked
    document.getElementById("fetchRates").addEventListener("click", function () {
        const apiKey = "3ead446c6aa4b044be06b377"; // Replace with your API key
        const baseCurrency = "VND";

        const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.result === "success") {
                    displayResults(data.conversion_rates);
                } else {
                    alert(`Error: ${data["error-type"]}`);
                }
            })
            .catch((error) => {
                console.error("Error fetching the data:", error);
                alert("An error occurred while fetching the data.");
            });
    });

    // Function to display exchange rates and handle the conversion
    function displayResults(conversionRates) {
        const currencyNames = {
            USD: "United States Dollar",
            EUR: "Euro",
            GBP: "British Pound Sterling",
            JPY: "Japanese Yen",
            AUD: "Australian Dollar",
            CAD: "Canadian Dollar",
            CNY: "Chinese Yuan",
            VND: "Vietnamese Dong",
        };

        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "<h2>Exchange Rates (1 VND: ?):</h2>";
        const ratesList = document.createElement("ul");

        // Populate the currency dropdown
        const currencySelect = document.getElementById("currencySelect");
        currencySelect.innerHTML = "";

        for (const [currency, fullName] of Object.entries(currencyNames)) {
            if (conversionRates[currency]) {
                const vndEquivalent = (1 / conversionRates[currency]).toFixed(4);
                const listItem = document.createElement("li");
                listItem.textContent = `1 ${fullName} (${currency}) = ${vndEquivalent} VND`;
                ratesList.appendChild(listItem);

                const option = document.createElement("option");
                option.value = currency;
                option.textContent = `${fullName} (${currency})`;
                currencySelect.appendChild(option);
            }
        }

        resultsDiv.appendChild(ratesList);

        // Handle the currency conversion
        document.getElementById("calculateButton").addEventListener("click", function () {
            const selectedCurrency = currencySelect.value;
            const vndInput = parseFloat(document.getElementById("vndInput").value);

            if (!selectedCurrency) {
                alert("Please select a currency.");
                return;
            }

            if (isNaN(vndInput) || vndInput <= 0) {
                alert("Please enter a valid amount of VND.");
                return;
            }

            const exchangeRate = conversionRates[selectedCurrency];
            const convertedAmount = (vndInput * exchangeRate).toFixed(4);

            document.getElementById("conversionResult").textContent = `${vndInput} VND = ${convertedAmount} ${selectedCurrency}`;
        });
    }
});
