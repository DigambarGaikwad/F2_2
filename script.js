// Fetch data from API using .then
function fetchDataWithThen() {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(response => response.json())
    .then(data => {
      renderData(data);
    })
    .catch(error => {
      console.log('Error fetching data:', error);
    });
}

// Fetch data from API using async/await
async function fetchDataWithAsync() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const data = await response.json();
    renderData(data);
  } catch (error) {
    console.log('Error fetching data:', error);
  }
}

// Render data in the table
function renderData(data) {
  const tableBody = document.getElementById('cryptoData');
  tableBody.innerHTML = '';

  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.symbol}</td>
      <td>${item.current_price}</td>
      <td>${item.total_volume}</td>
      <td>${item.market_cap}</td>
      <td>${item.price_change_percentage}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Search functionality
function search() {
  const searchInput = document.getElementById('searchInput');
  const searchText = searchInput.value.toLowerCase();

  const tableBody = document.getElementById('cryptoData');
  const rows = tableBody.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName('td');
    let match = false;

    for (let j = 0; j < cells.length; j++) {
      const cellText = cells[j].innerText.toLowerCase();

      if (cellText.includes(searchText)) {
        match = true;
        break;
      }
    }

    rows[i].style.display = match ? '' : 'none';
  }
}

// Sort by market cap
function sortByMarketCap() {
  const tableBody = document.getElementById('cryptoData');
  const rows = Array.from(tableBody.getElementsByTagName('tr'));

  rows.sort((a, b) => {
    const marketCapA = parseFloat(a.cells[4].innerText.replace(/[^0-9.-]+/g, ''));
    const marketCapB = parseFloat(b.cells[4].innerText.replace(/[^0-9.-]+/g, ''));
    return marketCapB - marketCapA;
  });

  tableBody.innerHTML = '';
  rows.forEach(row => tableBody.appendChild(row));
}

// Sort by percentage change
function sortByPercentageChange() {
  const tableBody = document.getElementById('cryptoData');
  const rows = Array.from(tableBody.getElementsByTagName('tr'));

  rows.sort((a, b) => {
    const changeA = parseFloat(a.cells[5].innerText.replace(/[^0-9.-]+/g, ''));
    const changeB = parseFloat(b.cells[5].innerText.replace(/[^0-9.-]+/g, ''));
    return changeB - changeA;
  });

  tableBody.innerHTML = '';
  rows.forEach(row => tableBody.appendChild(row));
}

// Fetch data on page load
fetchDataWithThen();
// Or, if you prefer async/await:
// fetchDataWithAsync();
