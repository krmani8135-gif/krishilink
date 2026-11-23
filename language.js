const translations = {
    en: {
        dashboard: "Dashboard",
        price: "Price Intelligence",
        buyers: "Verified Buyers",
        sell: "Sell My Crop",
        transactions: "Transactions",
        fpo: "FPO Hub",
        profit: "Profit Calculator",
        alerts: "Price Alerts",
        reviews: "Buyer Reviews",
        help: "Help & Support",
        logout: "Logout"
    },

    hi: {
        dashboard: "डैशबोर्ड",
        price: "मूल्य जानकारी",
        buyers: "सत्यापित खरीदार",
        sell: "फसल बेचें",
        transactions: "लेन-देन",
        fpo: "FPO हब",
        profit: "लाभ कैलकुलेटर",
        alerts: "मूल्य अलर्ट",
        reviews: "खरीदार समीक्षा",
        help: "मदद और सहायता",
        logout: "लॉगआउट"
    },

    mr: {
        dashboard: "डॅशबोर्ड",
        price: "किंमत माहिती",
        buyers: "सत्यापित खरेदीदार",
        sell: "पीक विका",
        transactions: "व्यवहार",
        fpo: "FPO हब",
        profit: "नफा कॅल्क्युलेटर",
        alerts: "किंमत अलर्ट",
        reviews: "खरेदीदार समीक्षा",
        help: "मदत आणि समर्थन",
        logout: "लॉगआउट"
    }
};

document.addEventListener("DOMContentLoaded", function () {

    const languageSelect = document.querySelector(".lang-select");

    let currentLanguage =
        localStorage.getItem("krishilink_language") || "en";

    if (languageSelect) {

        languageSelect.value = currentLanguage;

        languageSelect.addEventListener("change", function () {

            localStorage.setItem(
                "krishilink_language",
                this.value
            );

            translatePage(this.value);
        });
    }

    translatePage(currentLanguage);
});

function translatePage(language) {

    document.querySelectorAll("[data-i18n]").forEach(function (element) {

        const key = element.getAttribute("data-i18n");

        if (translations[language] &&
            translations[language][key]) {

            element.textContent =
                translations[language][key];
        }
    });
}