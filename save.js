const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Podstawowy katalog na serwerze dla danych
const BASE_PATH = '/home/pl/projekt-prod/data'; // Ścieżka katalogu danych na serwerze

// Endpoint do zapisywania plików
app.post('/save', (req, res) => {
  const { path: filePath, data } = req.body;

  // Tworzymy pełną ścieżkę na serwerze
  const fullPath = path.join(BASE_PATH, filePath);

  try {
    // Tworzenie katalogów, jeśli nie istnieją
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });

    // Zapis danych do pliku
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
    console.log(`Dane zapisane w pliku: ${fullPath}`);
    res.status(200).send({ message: 'Plik zapisany pomyślnie!' });
  } catch (error) {
    console.error(`Błąd zapisu pliku: ${error.message}`);
    res.status(500).send({ error: 'Błąd zapisu pliku' });
  }
});

// Uruchomienie serwera
const PORT = 3000; // Port, na którym będzie działał backend
app.listen(PORT, () => {
  console.log(`Serwer działa pod adresem http://localhost:${3000}`);
});
