import fs from 'fs';
import path from 'path';

function toSlug(str) {
  str = str.toLowerCase();     
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
  str = str.replace(/(đ)/g, 'd');
  str = str.replace(/([^0-9a-z-\s])/g, '');
  str = str.replace(/(\s+)/g, '-');
  str = str.replace(/^-+/g, '');
  str = str.replace(/-+$/g, '');
  return str;
}

const fileUrl = new URL('file://' + path.resolve('src/data/newsData.js'));
import(fileUrl).then(module => {
    const NEWS_DATA = module.NEWS_DATA;
    const updatedData = NEWS_DATA.map(item => ({
        ...item,
        slug: `${toSlug(item.title)}-${item.id}.html`
    }));
    const fileContent = `// File này được tự động tạo từ script crawl dữ liệu fpt.vn\n\nexport const NEWS_DATA = ${JSON.stringify(updatedData, null, 2)};\n`;
    fs.writeFileSync('src/data/newsData.js', fileContent);
    console.log("Updated newsData.js with slugs");
});
