const https = require('https');
https.get('https://fptlapmang.id.vn', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/href=\"([^\"]+\.css)\"/);
    if (match) {
      console.log('Found CSS:', match[1]);
      let cssUrl = match[1];
      if (!cssUrl.startsWith('http')) {
        cssUrl = 'https://fptlapmang.id.vn' + (cssUrl.startsWith('/') ? '' : '/') + cssUrl;
      }
      https.get(cssUrl, (res2) => {
        let css = '';
        res2.on('data', chunk => css += chunk);
        res2.on('end', () => {
          console.log('Contains box-sizing:', css.includes('box-sizing:border-box') || css.includes('box-sizing: border-box'));
        });
      });
    } else {
      console.log('No CSS file found in HTML');
    }
  });
}).on('error', console.error);
