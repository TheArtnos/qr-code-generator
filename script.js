const generateBtn = document.getElementById("generateVCardBtn");
const qrImage = document.getElementById("qr-image");

generateBtn.addEventListener("click", () => {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const website = document.getElementById("website").value;
  const company = document.getElementById("company").value;
  const jobTitle = document.getElementById("jobTitle").value;

  const pageUrl = "https://theartnos.github.io/qr-code-generator/vcard.html";

  const params = new URLSearchParams();
  if (firstName) params.append("fn", firstName);
  if (lastName) params.append("ln", lastName);
  if (phone) params.append("tel", phone);
  if (email) params.append("email", email);
  if (website) params.append("url", website);
  if (company) params.append("org", company);
  if (jobTitle) params.append("title", jobTitle);

  const finalUrlToEncode = `${pageUrl}?${params.toString()}`;

  const quickChartUrl = `https://quickchart.io/qr?text=${encodeURIComponent(
    finalUrlToEncode
  )}&size=250&format=png`;
  qrImage.src = quickChartUrl;
  console.log("QR Code URL:", quickChartUrl);
});
