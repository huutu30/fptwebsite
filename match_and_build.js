const fs = require('fs');

const products = JSON.parse(fs.readFileSync('C:\\Users\\hp\\.gemini\\antigravity\\brain\\65d30b83-98eb-433a-a0c6-300fed227362\\scratch\\products_list.json', 'utf-8'));
const crawled = JSON.parse(fs.readFileSync('C:\\Users\\hp\\.gemini\\antigravity\\brain\\65d30b83-98eb-433a-a0c6-300fed227362\\scratch\\crawled_summary.json', 'utf-8'));

// Helper to normalize names for mapping
function normalize(str) {
  if (!str) return '';
  return str.toLowerCase()
    .replace(/[^a-z0-9]/g, '') // remove spaces, dashes, etc
    .trim();
}

const manualMapping = {
  // codebase_id -> crawled_name
  'giga': 'Internet Giga',
  'sky': 'Internet Sky',
  'meta': 'Internet Meta',
  'giga-f1': 'Internet Giga F1',
  'sky-f1': 'Internet Sky F1',
  'meta-f1': 'Internet Meta F1',
  'sky-f2': 'Internet Sky F2',
  'sky-f3': 'Internet Sky F3',
  'meta-f2': 'Internet Meta F2',
  'meta-f3': 'Internet Meta F3',
  'fpt-an-tam': 'FPT An Tâm',
  'an-tam': 'FPT An Tâm',
  'combo-giga': 'Combo Giga',
  'combo-sky': 'Combo Sky',
  'combo-meta': 'Combo Meta',
  'combo-giga-f1': 'Combo Giga F1',
  'combo-sky-f1': 'Combo Sky F1',
  'combo-meta-f1': 'Combo Meta F1',
  'combo-meta-f2': 'Combo Meta F2',
  'combo-meta-f3': 'Combo Meta F3',
  'combo-an-tam': 'Combo An Tâm',
  'combo-giga-lite': 'Combo Giga Lite',
  'combo-giga-f1-lite': 'Combo Giga F1 Lite',
  'combo-giga-f2-lite': 'Combo Giga F2 Lite',
  'combo-giga-f3-lite': 'Combo Giga F3 Lite',
  'combo-sky-lite': 'Combo Sky Lite',
  'combo-sky-f1-lite': 'Combo Sky F1 Lite',
  'combo-sky-f2-lite': 'Combo Sky F2 Lite',
  'combo-sky-f3-lite': 'Combo Sky F3 Lite',
  'combo-meta-lite': 'Combo Meta Lite',
  'combo-meta-f1-lite': 'Combo Meta F1 Lite',
  'combo-meta-f2-lite': 'Combo Meta F2 Lite',
  'combo-meta-f3-lite': 'Combo Meta F3 Lite',
  'combo-fgame-lite': 'Combo F-Game Lite',
  'combo-fgame-f1-lite': 'Combo F-Game F1 Lite',
  'combo-fgame-f2-lite': 'Combo F-Game F2 Lite',
  'combo-fgame-f3-lite': 'Combo F-Game F3 Lite',
  'fgame-f1': 'F-Game F1',
  'f-game': 'Internet F-Game',
  'lux500': 'Lux500',
  'lux800': 'Lux800',
  'c-lux500': 'Combo thể thao Lux500',
  'c-lux800': 'Combo thể thao Lux800',
  's300-biz': 'Super300 Biz',
  's300-biz-plus': 'Super300 Biz Plus',
  's500-biz': 'Super500 Biz',
  's500-biz-plus': 'Super500 Biz Plus',
  's600-biz': 'Super600 Biz',
  's600-biz-plus': 'Super600 Biz Plus',
  's800-biz': 'Super800 Biz',
  's800-biz-plus': 'Super800 Biz Plus',
  'c-the-thao-sky': 'Combo thể thao Sky',
  'c-the-thao-meta': 'Combo thể thao Meta',
  'c-the-thao-sky-f1': 'Combo thể thao Sky F1',
  'c-the-thao-meta-f1': 'Combo thể thao Meta F1',
  'c-the-thao-sky-f2': 'Combo thể thao Sky F2',
  'c-the-thao-meta-f2': 'Combo thể thao Meta F2',
  'c-the-thao-sky-f3': 'Combo thể thao Sky F3',
  'c-the-thao-meta-f3': 'Combo thể thao Meta F3',
  'c-the-thao-lux500': 'Combo thể thao Lux500',
  'c-the-thao-lux800': 'Combo thể thao Lux800',
  'c-the-thao-speedx2': 'Combo thể thao SpeedX2',
  'c-the-thao-speedx2-pro': 'Combo thể thao SpeedX2 Pro',
  'c-the-thao-speedx10': 'Combo thể thao SpeedX10',
  'c-the-thao-speedx10-pro': 'Combo thể thao SpeedX10 Pro',
  'skyeyes3-play4-1cam': 'SkyEyes3 Play4 ( 1 cam)',
  'skyeyes3-iq4s-1cam': 'SkyEyes3 IQ4S ( 1 cam)',
  'gigaeyes3-play4-1cam': 'GigaEyes3 Play 4 ( 1 cam)',
  'gigaeyes3-iq4s-1cam': 'GigaEyes3 IQ4S ( 1 cam)',
  'gigaeyes7-play4-1cam': 'GigaEyes7 Play 4 ( 1 cam)',
  'gigaeyes7-iq4s-1cam': 'GigaEyes7 IQ4S ( 1 cam)',
  'skyeyes3-play4-2-5cam': 'SkyEyes3 Play4 ( 2 - 5 cam)',
  'skyeyes3-iq4s-2-5cam': 'SkyEyes3 IQ4S ( 2 - 5 cam)',
  'gigaeyes3-play4-2-5cam': 'GigaEyes3 Play4 ( 2 - 5 cam)',
  'gigaeyes3-iq4s-2-5cam': 'GigaEyes3 IQ4S ( 2 - 5 cam)',
  'gigaeyes7-play4-2-5cam': 'GigaEyes7 Play4 ( 2 - 5 cam)',
  'gigaeyes7-iq4s-2-5cam': 'GigaEyes7 IQ4S ( 2 - 5 cam)',
  'triple-gigaeyes3-play4-fptplay': 'Triple GigaEyes3 Play4 - FPT Play',
  'triple-gigaeyes3-iq4s-fptplay': 'Triple GigaEyes3 IQ4S - FPT Play',
  'triple-skyeyes3-play4-fptplay': 'Triple SkyEyes3 Play4 - FPT Play',
  'triple-skyeyes3-iq4s-fptplay': 'Triple SkyEyes3 IQ4S - FPT Play',
  'speedx2-pro-iq4s': 'FPT SpeedX2 Pro - IQ4S',
  'speedx2-eyes3-iq4s': 'FPT SpeedX2 Eyes3 IQ4S',
  'speedx10-iq4s': 'FPT SpeedX10 - IQ4S',
  'speedx10-pro-iq4s': 'FPT SpeedX10 Pro - IQ4S',
  'speedx10-eyes3-iq4s': 'FPT SpeedX10 Eyes3 IQ4S',
  'speedx10-pro': 'FPT SpeedX10 Pro',
  'speedx10': 'FPT SpeedX10',
  'speedx2': 'FPT SpeedX2',
  'speedx2-pro': 'FPT SpeedX2 Pro',
  'skyeyes3-f1-play4-tnb': 'SkyEyes3 F1 - Play 4',
  'skyeyes3-f1-iq4s-tnb': 'SkyEyes3 F1 - IQ4S',
  'skyeyes3-f2-play4-tnb': 'SkyEyes3 F2 - Play 4',
  'skyeyes3-f3-play4-tnb': 'SkyEyes3 F3 - Play 4',
  'skyeyes3-f2-iq4s-tnb': 'SkyEyes3 F2 - IQ4S',
  'skyeyes3-f3-iq4s-tnb': 'SkyEyes3 F3 - IQ4S',
};

// Check if any product is not matched, or matches successfully
const matched = {};
const unmatched = [];

products.forEach(p => {
  const crawledName = manualMapping[p.id] || p.name;
  // Look up crawledName in the crawled package names list
  let foundInCrawled = false;
  
  // Let's check first province "ha-noi" just to see if it exists
  if (crawled['ha-noi'] && crawled['ha-noi'].packages[crawledName]) {
    foundInCrawled = true;
  } else {
    // Check other provinces
    for (const provData of Object.values(crawled)) {
      if (provData.packages[crawledName]) {
        foundInCrawled = true;
        break;
      }
    }
  }
  
  if (foundInCrawled) {
    matched[p.id] = crawledName;
  } else {
    unmatched.push(p);
  }
});

console.log('Matched count:', Object.keys(matched).length);
console.log('Unmatched count:', unmatched.length);
console.log('Unmatched products:', unmatched.map(p => `${p.id} (${p.name})`));
