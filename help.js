// help.js - KrishiLink Help & Support page

// FAQ accordion toggle
document.querySelectorAll(".faq-item").forEach(item => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

// Complaint form submit (demo — later POST this to backend /api/complaints)
document.getElementById("complaintForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const issueType = document.getElementById("issueType").value;
  const txnId = document.getElementById("txnId").value.trim();
  const details = document.getElementById("details").value.trim();

  if (!issueType || !details) {
    document.getElementById("complaintMessage").innerText = "Please fill required fields.";
    return;
  }

  // TODO: replace with real API call, e.g.
  // fetch("http://localhost:5000/api/complaints", { method: "POST", ... })

  document.getElementById("complaintMessage").innerText =
    "✅ Complaint submitted. Our team will contact you within 24 hours.";
  document.getElementById("complaintForm").reset();
});
