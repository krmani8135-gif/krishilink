
const savedUser = JSON.parse(localStorage.getItem("krishilink_user"));
if (savedUser) {
  const initials = savedUser.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  document.getElementById("sidebarName").innerText = savedUser.name;
  document.getElementById("sidebarRole").innerText = `${savedUser.role === "farmer" ? "Farmer" : "Buyer"} · ${savedUser.location}`;
  document.getElementById("sidebarAvatar").innerText = initials;

  const firstName = savedUser.name.split(" ")[0];
  const hour = new Date().getHours();
  const greetingWord = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const greetingEl = document.getElementById("greetingText");
  if (greetingEl) {
    greetingEl.innerText = `${greetingWord}, ${firstName} 👋`;
  }
}


document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("krishilink_user");
});



const trendLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"];
const trendData = [22, 23, 24, 23.5, 25, 26.5, 28];

const nearbyMarkets = [
  { market: "sabour APMC", crop: "Tomato", price: "₹28/kg" },
  { market: "Bhagalpur APMC", crop: "Tomato", price: "₹24/kg" },
  { market: "sabour Mandi", crop: "Tomato", price: "₹26/kg" },
  { market: "Bhagalpur Mandi", crop: "Tomato", price: "₹22/kg" },
];


const ctx = document.getElementById("trendChart");
if (ctx) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: trendLabels,
      datasets: [{
        label: "Price (₹/kg)",
        data: trendData,
        borderColor: "#1b6b3f",
        backgroundColor: "rgba(27,107,63,0.1)",
        fill: true,
        tension: 0.35,
        pointRadius: 3,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: "#eef2ee" } },
        x: { grid: { display: false } },
      },
    },
  });
}


const tableBody = document.getElementById("nearbyTable");
if (tableBody) {
  nearbyMarkets.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${item.market}</td><td>${item.crop}</td><td>${item.price}</td>`;
    tableBody.appendChild(row);
  });
}
