const fs = require('fs');

const env = {
  baseUrl: process.env.baseURL,
  cloudinaryUrl: process.env.cloudinaryUrl,
  googleClientID: process.env.googleClientID,
};

const content = `window.__env = ${JSON.stringify(env, null, 2)};`;

fs.writeFileSync('src/assets/env.js', content);
console.log('✅ env.js created');