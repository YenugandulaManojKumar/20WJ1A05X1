const express = require('express');
const axios = require('axios');
const { performance } = require('perf_hooks');
const app = express();
const PORT = 3000;

app.use(express.json());

const VALID_URL_REGEX = /^(http|https):\/\/[^ "]+$/;
const TIMEOUT_MS = 500;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls) {
    return res.status(400).json({ error: 'At least one URL is required.' });
  }

  const validUrls = urls.filter(url => VALID_URL_REGEX.test(url));

  const responses = [];

  const startTime = performance.now();
  const promises = validUrls.map(async (url, index) => {
    try {
      const response = await axios.get(url, { timeout: TIMEOUT_MS });
      responses.push({
        url,
        number: index + 1,
        data: response.data
      });
    } catch (error) {
      responses.push({
        url,
        error: 'Request failed or timed out'
      });
    }
  });

  await Promise.all(promises);
  const endTime = performance.now();

  res.json({
    processingTime: endTime - startTime,
    responses: responses.sort((a, b) => a.number - b.number)
  });
});

app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
})
