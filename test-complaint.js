// Test script for complaint API
const http = require('http');

const postData = JSON.stringify({
  name: "Test User",
  email: "test@example.com",
  mobile: "1234567890",
  role: "Parent",
  childName: "Test Child",
  age: "10",
  gender: "Male",
  description: "Test complaint for email verification",
  location: { lat: 19.0760, lng: 72.8777 }
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/complaint/create',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);

  res.setEncoding('utf8');
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    console.log('Response:', body);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end();