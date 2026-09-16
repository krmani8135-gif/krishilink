// buyers.js - KrishiLink Verified Buyers page

const verifiedBuyers = [
  { name: "Mani Kumar", phone: "6204739424", location: "Patna, Bihar", crops: "Wheat, Rice" },
  { name: "Anand Kumar", phone: "6200630037", location: "Patna, Bihar", crops: "Vegetables" },
  { name: "Raja Kumar", phone: "8298520079", location: "Patna, Bihar", crops: "Onion, Tomato" },
  { name: "Mukul Kumar", phone: "7717709361", location: "Patna, Bihar", crops: "Cotton, Soybean" },
  { name: "Samrat Kumar", phone: "9264170275", location: "Patna, Bihar", crops: "Fruits, Grains" },
];

function getInitials(name) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

const grid = document.getElementById("buyerGrid");

grid.innerHTML = verifiedBuyers.map(buyer => `
  <div class="buyer-card">
    <div class="buyer-top">
      <div class="buyer-avatar">${getInitials(buyer.name)}</div>
      <div>
        <div class="buyer-name">${buyer.name}</div>
        <div class="buyer-badge">✓ Verified</div>
      </div>
    </div>
    <div class="buyer-info">📍 ${buyer.location}</div>
    <div class="buyer-info">🌾 Buys: ${buyer.crops}</div>
    <div class="buyer-phone">📞 ${buyer.phone}</div>
    <div class="buyer-actions">
      <a href="tel:${buyer.phone}" class="btn-call">Call</a>
      <a href="https://wa.me/91${buyer.phone}" class="btn-whatsapp" target="_blank">WhatsApp</a>
    </div>
  </div>
`).join("");
