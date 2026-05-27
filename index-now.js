const { google } = require('googleapis');
const key = require('./service-account.json');

async function notifyGoogle() {
  const auth = new google.auth.GoogleAuth({
    credentials: key,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const authClient = await auth.getClient();
  const indexing = google.indexing('v3');

  try {
    const res = await indexing.urlNotifications.publish({
      auth: authClient,
      requestBody: {
        url: 'https://fptwifitocdo.com/',
        type: 'URL_UPDATED',
      },
    });
    console.log('✅ Thành công! Phản hồi:', res.status);
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
  }
}

notifyGoogle();