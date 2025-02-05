const fs = require('fs');
const fetch = require('node-fetch');

const REFRESH_TOKEN = process.env.CHROME_REFRESH_TOKEN;
const CLIENT_ID = process.env.CHROME_CLIENT_ID;
const CLIENT_SECRET = process.env.CHROME_CLIENT_SECRET;
const APP_ID = process.env.CHROME_APP_ID;
const ZIP_FILE_PATH = './extension.zip';

async function getAccessToken() {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function uploadExtension(accessToken) {
  const zipFile = fs.readFileSync(ZIP_FILE_PATH);

  const response = await fetch(
    `https://www.googleapis.com/upload/chromewebstore/v1.1/items/${APP_ID}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-goog-api-version': '2',
        'Content-Length': zipFile.length,
        'Content-Type': 'application/zip',
      },
      body: zipFile,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to upload extension: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

async function publishExtension(accessToken) {
  const response = await fetch(
    `https://www.googleapis.com/chromewebstore/v1.1/items/${APP_ID}/publish`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-goog-api-version': '2',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to publish extension: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

(async () => {
  try {
    const accessToken = await getAccessToken();
    const uploadResponse = await uploadExtension(accessToken);
    console.log('Upload Response:', uploadResponse);

    if (uploadResponse.uploadState === 'SUCCESS') {
      const publishResponse = await publishExtension(accessToken);
      console.log('Publish Response:', publishResponse);
    } else {
      console.error('Upload failed:', uploadResponse);
    }
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();
