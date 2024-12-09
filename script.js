const BASE_PATH = 'https://serwer2257936.home.pl/projekt-prod/data'; // Ścieżka do katalogu z danymi JSON na serwerze
const SYMBOLS = ['BTC', 'ETH', 'SOL']; // Obsługiwane kryptowaluty

// Wczytanie danych z pliku JSON z serwera
const loadData = async (symbol) => {
  const filePath = `${BASE_PATH}/${symbol}/prices.json`; // Ścieżka do pliku JSON
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Nie można załadować pliku: ${filePath}`);
    return await response.json();
  } catch (error) {
    console.error(`Błąd wczytywania danych dla ${symbol}:`, error.message);
    return [];
  }
};

// Wyświetlenie danych w tabeli na stronie
const displayData = async () => {
  const tableBody = document.getElementById('crypto-table-body');
  tableBody.innerHTML = ''; // Wyczyszczenie tabeli

  for (const symbol of SYMBOLS) {
    const data = await loadData(symbol);
    if (data.length === 0) {
      tableBody.innerHTML += `<tr><td>${symbol}</td><td colspan="5">Brak danych</td></tr>`;
      continue;
    }

    // Pobranie ostatniego wpisu z danych
    const latest = data[data.length - 1];

    // Dodanie wiersza do tabeli
    tableBody.innerHTML += `
      <tr>
        <td>${symbol}</td>
        <td>${latest.date}</td>
        <td>${latest.open.toFixed(2)}</td>
        <td>${latest.high.toFixed(2)}</td>
        <td>${latest.low.toFixed(2)}</td>
        <td>${latest.close.toFixed(2)}</td>
      </tr>
    `;
  }
};

// Obsługa przycisku aktualizacji (tylko odświeżenie danych)
document.getElementById('update-button').addEventListener('click', displayData);

// Automatyczne załadowanie danych po uruchomieniu strony
displayData();
