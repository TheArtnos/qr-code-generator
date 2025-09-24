// Get references to DOM elements
const textInput = document.getElementById("textInput");
const qrPlaceholder = document.querySelector(".qrcode-placeholder");
const imageQr = document.querySelector("img");
const generateBtn = document.querySelector(".generateBtn");
const qrOutput = document.querySelector(".qr-output");
const textTab = document.getElementById("textTab");
const wifiTab = document.getElementById("wifiTab");
const textForm = document.getElementById("text-form");
const wifiForm = document.querySelector(".wifi-form");
const ssidInput = document.getElementById("ssid");
const passInput = document.getElementById("password");
const encryptionInput = document.getElementById("encryption");
const isHidden = document.querySelector("#isHidden");
const link = document.querySelector("a");

// When the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // When clicking the "Text / URL" tab
  textTab.addEventListener("click", () => {
    textTab.classList.add("active"); // Activate text tab
    wifiTab.classList.remove("active"); // Deactivate Wi-Fi tab

    textForm.classList.remove("hidden"); // Show text form
    wifiForm.classList.add("hidden"); // Hide Wi-Fi form
  });

  // When clicking the "Wi-Fi" tab
  wifiTab.addEventListener("click", () => {
    wifiTab.classList.add("active"); // Activate Wi-Fi tab
    textTab.classList.remove("active"); // Deactivate text tab

    wifiForm.classList.remove("hidden"); // Show Wi-Fi form
    textForm.classList.add("hidden"); // Hide text form

    qrOutput.classList.remove("block"); // Hide previous QR
    qrOutput.classList.add("hidden");

    passInput.value = ssidInput.value = ""; // Clear Wi-Fi inputs
    textInput.value = ""; // Clear text input
  });
});

// Generate QR code for text or URL
const generateQR = function (e) {
  e.preventDefault();
  if (textInput.value.length > 0) {
    // imageQr.src = `https://quickchart.io/qr?text=${textInput.value}&size=300`; // Set QR image
    imageQr.src = ` https://quickchart.io/qr?text=https%3A%2F%2Ftheartnos.github.io%2Fqr-code-generator%2Fwifi.html&dark=3a86ff&size=300`; // Set QR image

    downloadQr(imageQr.src); // Prepare download link

    qrOutput.classList.remove("hidden"); // Show QR output
    qrOutput.classList.add("block");
    qrPlaceholder.classList.add("has-code");
    qrOutput.style.marginTop = "3rem";
  }
};

// Generate QR code for Wi-Fi
const generateWifiQR = function (e) {
  e.preventDefault();
  if (
    passInput.value.length >= 8 && // Password must be at least 8 characters
    ssidInput.value.length > 0 && // SSID must not be empty
    passInput.value.length > 0 // Password must not be empty
  ) {
    const ssid = ssidInput.value;
    const pass = passInput.value;
    const encryption = encryptionInput.value;

    // Generate Wi-Fi QR with standard format
    imageQr.src = `https://quickchart.io/qr?text=WIFI:T:${encryption};S:${ssid};P:${pass};H:${isHidden.checked};;`;

    downloadQr(imageQr.src); // Prepare download link

    qrOutput.classList.remove("hidden"); // Show QR output
    qrOutput.classList.add("block");
    qrPlaceholder.classList.add("has-code");
    qrOutput.style.marginTop = "3rem";
  } else {
    console.log("error"); // Invalid input case
  }
};

// Function to set the download link for the QR
const downloadQr = (dl) => (link.href = dl);

// Add events to Generate button
generateBtn.addEventListener("click", generateQR);
generateBtn.addEventListener("click", generateWifiQR);


const test = document.querySelector(".test");

test.textContent = textInput.value;
