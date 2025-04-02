const fs = require('fs');
const path = require('path');

// Read the JSON file
const importData = require('../sanity-import.json');

// Create output stream for the NDJSON file
const outputStream = fs.createWriteStream(path.join(__dirname, '../sanity-import.ndjson'));

// Write categories first
importData.categories.forEach(category => {
  outputStream.write(JSON.stringify(category) + '\n');
});

// Write products next
importData.products.forEach(product => {
  outputStream.write(JSON.stringify(product) + '\n');
});

outputStream.end();

console.log('Conversion completed! Created sanity-import.ndjson'); 