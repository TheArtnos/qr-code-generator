window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const firstName = params.get("fn") || "";
  const lastName = params.get("ln") || "";
  const phone = params.get("tel") || "";
  const email = params.get("email") || "";
  const website = params.get("url") || "";
  const company = params.get("org") || "";
  const jobTitle = params.get("title") || "";

  if (firstName || lastName) {
    const parts = [firstName, lastName].filter(Boolean);

    document.getElementById("name").textContent = parts.join(" ");
    console.log(firstName, lastName);
  }

  if (jobTitle) document.getElementById("jobTitle").textContent = jobTitle;

  if (phone) {
    const el = document.getElementById("phone");
    el.innerHTML += `<a href="tel:${phone}">${phone}</a>`;
  }
  if (email) {
    const el = document.getElementById("email");
    el.innerHTML += `<a href="mailto:${email}">${email}</a>`;
  }
  if (website) {
    const el = document.getElementById("website");
    el.innerHTML += `<a href="${website}" target="_blank">${website}</a>`;
  }
  if (company) {
    const el = document.getElementById("company");
    el.innerHTML += `${company}`;
  }
});
