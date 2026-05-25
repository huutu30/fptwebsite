const https = require('https');

https.get('https://fptlapmang.id.vn', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    // Find ALL CSS files
    const cssMatches = html.match(/href="([^"]+\.css)"/g) || [];
    console.log('CSS files:', cssMatches);
    
    // Get main CSS
    const mainMatch = html.match(/href="(\/assets\/index[^"]+\.css)"/);
    if (!mainMatch) { console.log('No main CSS found!'); return; }
    
    const cssUrl = 'https://fptlapmang.id.vn' + mainMatch[1];
    console.log('\nFetching:', cssUrl);
    
    https.get(cssUrl, (res2) => {
      let css = '';
      res2.on('data', chunk => css += chunk);
      res2.on('end', () => {
        console.log('\n=== CSS ANALYSIS ===');
        console.log('Total size:', css.length, 'bytes');
        
        // Check for media queries
        const mediaMatches = css.match(/@media[^{]*/g) || [];
        console.log('\nMedia queries found:', mediaMatches.length);
        mediaMatches.forEach((m, i) => console.log(`  ${i+1}. ${m.trim()}`));
        
        // Check critical mobile rules
        console.log('\n=== CRITICAL MOBILE CHECKS ===');
        console.log('Has site-topbar display:none?', css.includes('site-topbar') && css.includes('display:none'));
        console.log('Has hamburger display:flex or block?', css.includes('hamburger'));
        console.log('Has nav-menu mobile styles?', css.includes('nav-menu'));
        
        // Check for unclosed comments
        const commentOpens = (css.match(/\/\*/g) || []).length;
        const commentCloses = (css.match(/\*\//g) || []).length;
        console.log('\nComment opens:', commentOpens, 'closes:', commentCloses, 'BALANCED?', commentOpens === commentCloses);
        
        // Show area around site-topbar
        const topbarIdx = css.indexOf('site-topbar');
        if (topbarIdx > -1) {
          console.log('\nCSS around site-topbar:', css.substring(topbarIdx - 50, topbarIdx + 200));
        }
      });
    });
  });
}).on('error', console.error);
