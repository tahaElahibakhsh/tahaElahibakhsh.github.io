let allMarkets = [];
let watchlist = new Set();

async function fillMarketTable() {
    try {
        const res = await fetch("http://127.0.0.1:5000/markets");
        const data = await res.json();

        allMarkets = Object.values(data.result.symbols).filter(m => m.stats);
        renderTable("volume");

        setActiveButton("volume");
    } catch (err) {
        console.error(err);
        document.getElementById("markets-table-body").innerHTML =
            `<tr><td colspan="7">Error fetching data</td></tr>`; // تغییر تعداد ستون‌ها به 7
    }
}

function renderTable(sortBy, search="") {
    let markets = [...allMarkets];

    if (sortBy === "new") {
        markets.sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt));
    } else if (sortBy === "profit") {
        markets.sort((a,b)=> (b.stats["24h_ch"]||0)-(a.stats["24h_ch"]||0));
    } else if (sortBy === "volume") {
        markets.sort((a,b)=> (b.stats["24h_volume"]||0)-(a.stats["24h_volume"]||0));
    } else if (sortBy === "watchlist") {
        markets = markets.filter(m => watchlist.has(m.symbol));
    }

    if(search) {
        markets = markets.filter(m =>
            m.symbol.toLowerCase().includes(search.toLowerCase()) ||
            m.enName.toLowerCase().includes(search.toLowerCase())
        );
    }

    const tbody = document.getElementById("markets-table-body");
    tbody.innerHTML = "";

    markets.slice(0,10).forEach(m=> {
        const stats = m.stats;
        let ch24 = stats["24h_ch"] != null ? stats["24h_ch"] : "-";
        let chClass = "default-change";
        let chText = "-";

        if(ch24 !== "-" && ch24 != null) {
            const chNum = Number(ch24);
            if(!isNaN(chNum)) {
                chClass = chNum >= 0 ? "green" : "red";
                chText = chNum + "%";
            }
        }

        const lastPrice = stats.lastPrice ? Number(stats.lastPrice).toLocaleString() : "-";
        const vol24 = stats["24h_volume"] ? Number(stats["24h_volume"]).toLocaleString() : "-";
        const watchActive = watchlist.has(m.symbol) ? "active" : "";

        // اضافه کردن آیکون از API wallex
        const iconUrl = `https://api.wallex.ir/coins/${m.baseAsset}.svg`;

        tbody.innerHTML += `
            <tr>
                <td class="nf-td">
                    <img src="${iconUrl}" alt="${m.symbol}" class="crypto-icon">
                </td>
                <td class="nf-td">${m.symbol || "-"}</td>
                <td class="nf-td">${m.enName || "-"}</td>
                <td class="nf-td">${lastPrice}</td>
                <td class="nf-td ${chClass}">${chText}</td>
                <td class="nf-td">${vol24}</td>
                <td class="nf-td">
                    <div class="watch-box ${watchActive}" data-symbol="${m.symbol}"></div>
                </td>
            </tr>
        `;
    });

    addWatchListeners();
}

function addWatchListeners() {
    document.querySelectorAll(".watch-box").forEach(box => {
        box.addEventListener("click", () => {
            const symbol = box.dataset.symbol;
            if (watchlist.has(symbol)) watchlist.delete(symbol);
            else watchlist.add(symbol);
            renderTable(document.querySelector(".nf-sort-buttons .active")?.dataset.sort || "volume", 
                        document.getElementById("market-search").value);
        });
    });
}

const sortButtons = document.querySelectorAll(".btn1[data-sort]");
sortButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        setActiveButton(btn.dataset.sort);
        renderTable(btn.dataset.sort, document.getElementById("market-search").value);
    });
});

function setActiveButton(sortType) {
    sortButtons.forEach(b => b.classList.remove("active"));
    document.querySelector(`.btn1[data-sort="${sortType}"]`)?.classList.add("active");
}

document.getElementById("market-search").addEventListener("input", (e) => {
    const activeSort = document.querySelector(".nf-sort-buttons .active")?.dataset.sort || "volume";
    renderTable(activeSort, e.target.value);
});

window.addEventListener("load", fillMarketTable);
