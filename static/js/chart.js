let chart;
const defaultDays = '7';

// لیست ۱۰ رمزارز معروف یا پرحجم
const top10Coins = [
  { id: "bitcoin", name: "Bitcoin" },
  { id: "ethereum", name: "Ethereum" },
  { id: "tether", name: "Tether" },
  { id: "binancecoin", name: "BNB" },
  { id: "ripple", name: "XRP" },
  { id: "cardano", name: "Cardano" },
  { id: "solana", name: "Solana" },
  { id: "dogecoin", name: "Dogecoin" },
  { id: "polkadot", name: "Polkadot" },
  { id: "litecoin", name: "Litecoin" }
];

// پر کردن select نمودار
function fillChartSymbolSelect() {
  const select = document.getElementById('symbol');
  select.innerHTML = '';
  top10Coins.forEach(c => {
    const option = document.createElement('option');
    option.value = c.id;
    option.textContent = c.name;
    select.appendChild(option);
  });
}

// گرفتن داده تاریخی از API
async function fetchData(symbol = 'bitcoin', days = defaultDays) {
  try {
    const res = await fetch(`/api/data?symbol=${symbol}&days=${days}`);
    const data = await res.json();
    return data.map(d => ({ x: new Date(d[0]), y: [d[1], d[2], d[3], d[4]] }));
  } catch (err) {
    console.error("Error fetching chart data:", err);
    return [];
  }
}


// پر کردن select تایم فریم
function fillDaysSelect() {
    const daysSelect = document.getElementById('days');
    daysSelect.innerHTML = '';
  
    const options = [
      { value: '1', text: '1D' },
      { value: '7', text: '1W' },
      { value: '30', text: '1M' }
    ];
  
    options.forEach(opt => {
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.text;
      daysSelect.appendChild(option);
    });
  }
  
  

// رندر یا آپدیت نمودار
async function renderChart() {
  const symbol = document.getElementById('symbol').value;
  const days = document.getElementById('days').value || defaultDays;

  const seriesData = await fetchData(symbol, days);

  const options = {
    chart: {
      type: 'candlestick',
      height: 400,
      toolbar: { show: true }
    },
    series: [{ data: seriesData }],
    xaxis: { type: 'datetime' },
    yaxis: { tooltip: { enabled: true } },
    tooltip: {
      enabled: true,
      shared: true,
      followCursor: true
    }
  };

  const chartContainer = document.querySelector(".chart-section #chart");

  if (chart) chart.updateOptions({ series: [{ data: seriesData }] });
  else chart = new ApexCharts(chartContainer, options), chart.render();
}

// Event Listener برای تغییر رمزارز و تایم‌فریم
document.getElementById('symbol').addEventListener('change', renderChart);
document.getElementById('days').addEventListener('change', renderChart);


  // load اولیه
  window.addEventListener('load', () => {
    fillChartSymbolSelect();
    fillDaysSelect();        // اضافه شد
    renderChart();
  });;
