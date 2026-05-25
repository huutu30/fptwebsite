const fs = require('fs');

const files = [
  'e:/fpt-2026/src/pages/smart-device/SmartHome.jsx',
  'e:/fpt-2026/src/pages/smart-device/Camera.jsx',
  'e:/fpt-2026/src/pages/internet/GiaDinh.jsx',
  'e:/fpt-2026/src/pages/internet/CaNhan.jsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('useRegisterModal')) {
    content = content.replace(/import React(.*?) from 'react';/, "import React$1 from 'react';\nimport { useRegisterModal } from '../../context/RegisterContext';");
  }
  
  content = content.replace(/(export default function \w+\(.*?\)\s*\{)/, "$1\n  const { openModal } = useRegisterModal();");

  content = content.replace(/<Link[^>]*to=\{\`\/dang-ky\?product=\$\{encodeURIComponent\((.*?)\)\}\`\}[^>]*>([\s\S]*?)<\/Link>/g, 
    "<button onClick={() => openModal($1)} className={styles.btnSecondary}>$2</button>");

  content = content.replace(/<Link to="\/dang-ky\?product=([^"]*)" className=\{styles\.tableCta\}>Đăng ký<\/Link>/g,
    "<button onClick={() => openModal(decodeURIComponent('$1'))} className={styles.tableCta}>Đăng ký</button>");
    
  fs.writeFileSync(file, content);
}
console.log('Done!');
