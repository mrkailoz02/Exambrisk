const fs = require('fs');

function logSearchRequest(searchQuery) {
  const logMessage = `Search Query: ${searchQuery}, Timestamp: ${new Date().toISOString()}\n`;
  fs.appendFile('search-logs.txt', logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

module.exports = { logSearchRequest };
