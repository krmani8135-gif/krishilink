// transactions.js - KrishiLink Transactions page

// Currently no transactions exist for a new farmer, so this stays empty.
// Later, replace this with a fetch() call to your backend, e.g.:
// const transactions = await fetch("http://localhost:5000/api/transactions").then(r => r.json());
const transactions = [];

const emptyState = document.getElementById("emptyState");
const txnList = document.getElementById("txnList");

function renderTransactions() {
  if (transactions.length === 0) {
    emptyState.style.display = "block";
    txnList.classList.remove("has-items");
    txnList.innerHTML = "";
    return;
  }

  emptyState.style.display = "none";
  txnList.classList.add("has-items");
  txnList.innerHTML = transactions.map(txn => `
    <div class="txn-row">
      <div>
        <div class="txn-crop">${txn.crop} — ${txn.quantity}</div>
        <div class="txn-meta">Buyer: ${txn.buyer} · ${txn.date}</div>
      </div>
      <span class="txn-status ${txn.statusClass}">${txn.status}</span>
    </div>
  `).join("");
}

// Tab filter (visual only for now — filtering logic can be added once real data exists)
document.querySelectorAll(".txn-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".txn-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

renderTransactions();
