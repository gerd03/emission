document.getElementById("testForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const plateNumber = document.getElementById("plateNumber").value.toUpperCase();
    const vehicleType = document.getElementById("vehicleType").value;
    const fuelType = document.getElementById("fuelType").value;
    const testResultDiv = document.getElementById("testResult");
    const successMessage = document.getElementById("successMessage");

    testResultDiv.classList.add("hidden");
    successMessage.classList.add("hidden");

    setTimeout(() => {
        const now = new Date();
        const dateTime = formatDateTime(now);

        const lastThreeDigits = Math.floor(Math.random() * (450 - 340 + 1)) + 340;
        const certificateNumber = `202507267000${lastThreeDigits}`;
        const referenceCode = lastThreeDigits.toString();
        const authenticationCode = "2D" + generateAuthCode(15) + "0630C";

        let opacity = vehicleType === "HEAVY EQUIPMENT"
            ? (Math.random() * (0.86 - 0.52) + 0.52).toFixed(2)
            : (Math.random() * (0.81 - 0.50) + 0.50).toFixed(2);

        successMessage.classList.remove("hidden");

        setTimeout(() => {
            successMessage.classList.add("hidden");
            testResultDiv.classList.remove("hidden");
            

            const result = `
                <p>DATE & TIME: ${dateTime}</p>
                <p>CERTIFICATE NUMBER: ${certificateNumber}</p>
                <p>REFERENCE CODE: ${referenceCode}</p>
                <p>AUTHENTICATION CODE: ${authenticationCode}</p>
                <p>PLATE NUMBER: ${plateNumber}</p>
                <p>VEHICLE TYPE: ${vehicleType}</p>
                <p>FUEL TYPE: ${fuelType}</p>
                <p>OPACITY: ${opacity}</p>
            `;
            testResultDiv.innerHTML = result;

            saveToHistory(plateNumber, result);
            loadHistory();
        }, 2000);
    }, 500);
});

function generateAuthCode(length) {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join("");
}

function formatDateTime(date) {
    let hours = date.getHours();
    let ampm = hours >= 12 ? "am" : "pm";
    return `${date.toISOString().substring(0, 10)} at ${hours % 12 || 12}:${date.getMinutes()} ${ampm}`;
}

function saveToHistory(plateNumber, data) {
    let history = JSON.parse(localStorage.getItem("testHistory")) || [];
    history.push({ plateNumber, data });
    localStorage.setItem("testHistory", JSON.stringify(history));
}

function loadHistory() {
    let historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
    let history = JSON.parse(localStorage.getItem("testHistory")) || [];
    history.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = item.plateNumber;
        li.onclick = () => document.getElementById("historyDetails").innerHTML = item.data;
        historyList.appendChild(li);
    });
}

document.getElementById("clearHistory").addEventListener("click", function() {
    localStorage.removeItem("testHistory");
    loadHistory();
});

loadHistory();
