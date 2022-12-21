const http = require('https');

async function downloadSpeed() {
const startTime = Date.now();

http.get('https://eu.httpbin.org/stream-bytes/500000', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/octet-stream/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected application/octet-stream but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    res.resume();
    return;
  }

  res.setEncoding('binary');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    const endTime = Date.now();
    const downloadTime = endTime - startTime;
    const downloadSpeed = (rawData.length / downloadTime) * 1000;

return downloadSpeed;
 
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);

});

}

module.exports = {
  downloadSpeed,
};
