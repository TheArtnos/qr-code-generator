// Get references to DOM elements
const textInput = document.getElementById("textInput");
const qrPlaceholder = document.querySelector(".qrcode-placeholder");
const imageQr = document.querySelector("img");
const generateBtn = document.querySelector(".generateBtn");
const qrOutput = document.querySelector(".qr-output");
const link = document.querySelector("a");

// Tab and Form elements
const textTab = document.getElementById("textTab");
const wifiTab = document.getElementById("wifiTab");
const cardTab = document.getElementById("cardTab");

const textForm = document.getElementById("text-form");
const wifiForm = document.querySelector(".wifi-form");
// Note: We need a placeholder for the vCard form in the HTML. I've added it below.
const cardForm = document.getElementById("card-form");

// Wi-Fi specific inputs
const ssidInput = document.getElementById("ssid");
const passInput = document.getElementById("password");
const encryptionInput = document.getElementById("encryption");
const isHidden = document.querySelector("#isHidden");

// --- 1. CLEANED UP TAB SWITCHING LOGIC ---

// Group tabs and forms for easy management
const allTabs = [textTab, wifiTab, cardTab];
const allForms = [textForm, wifiForm, cardForm];

// Function to reset all tabs and forms to their default state
function resetTabs() {
  allTabs.forEach((tab) => tab.classList.remove("active"));
  allForms.forEach((form) => form.classList.add("hidden"));
  qrOutput.classList.add("hidden"); // Hide QR on any tab switch
}

// Add click event for the Text/URL tab
textTab.addEventListener("click", () => {
  resetTabs();
  textTab.classList.add("active");
  textForm.classList.remove("hidden");
});

// Add click event for the Wi-Fi tab
wifiTab.addEventListener("click", () => {
  resetTabs();
  wifiTab.classList.add("active");
  wifiForm.classList.remove("hidden");
});

// Add click event for the Vcard tab
cardTab.addEventListener("click", () => {
  resetTabs();
  cardTab.classList.add("active");
  cardForm.classList.remove("hidden");
});

// --- 2. FIXED QR CODE GENERATION LOGIC ---

// Main function to handle QR generation based on the active tab
function handleGenerateClick() {
  if (textTab.classList.contains("active")) {
    generateTextQR();
  } else if (wifiTab.classList.contains("active")) {
    generateWifiQR();
  } else if (cardTab.classList.contains("active")) {
    generateVcardQR();
  }
  // Add logic for Vcard here if needed
  // else if (cardTab.classList.contains("active")) { ... }
}

// Single event listener for the generate button
generateBtn.addEventListener("click", handleGenerateClick);

// Function to show the QR Code output
const showQr = function (imageUrl) {
  if (!imageUrl) return; // Don't show if there's no URL

  imageQr.src = imageUrl;
  link.href = imageUrl; // Set download link

  qrOutput.classList.remove("hidden");
  qrPlaceholder.classList.add("has-code");
};

// Generate QR code for text or URL
const generateTextQR = function () {
  const text = textInput.value;
  if (text.length > 0) {
    const imageUrl = `https://quickchart.io/qr?text=${encodeURIComponent(
      text
    )}&dark=3a86ff&size=300`;
    showQr(imageUrl);
  }
};

// Generate QR code for Wi-Fi
const generateWifiQR = function () {
  const ssid = ssidInput.value;
  const pass = passInput.value;
  const encryption = encryptionInput.value;

  if (ssid.length > 0) {
    const wifiString = `WIFI:T:${encryption};S:${ssid};P:${pass};H:${isHidden.checked};;`;
    const imageUrl = `https://quickchart.io/qr?text=${encodeURIComponent(
      wifiString
    )}&dark=3a86ff&size=300`;
    showQr(imageUrl);
  }
};

const generateVcardQR = function () {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const website = document.getElementById("website").value;
  const company = document.getElementById("company").value;
  const jobTitle = document.getElementById("jobTitle").value;

  const pageUrl = "https://theartnos.github.io/qr-code-generator/vcard.html";

  const params = new URLSearchParams();
  if (firstName) params.append("fa", firstName);
  if (lastName) params.append("ln", lastName);
  if (phone) params.append("tel", phone);
  if (email) params.append("email", email);
  if (website) params.append("url", website);
  if (company) params.append("org", company);
  if (jobTitle) params.append("title", jobTitle);

  const finalUrlToEncode = `${pageUrl}?${params.toString()}`;

  const quickChartUrl = `https://quickchart.io/qr?text=${encodeURIComponent(
    finalUrlToEncode
  )}`;
  showQr(quickChartUrl);
  console.log(quickChartUrl);
};
