const fs = require('fs');

const config = {
  apiUrl: process.env.API_URL || 'http://localhost:8080/vitality-api/v1',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
};

fs.writeFileSync(
  'src/assets/config.json',
  JSON.stringify(config, null, 2)
);

console.log('Generated src/assets/config.json');
console.log('  apiUrl:', config.apiUrl);
console.log('  googleClientId:', config.googleClientId ? '****' : '(empty)');
