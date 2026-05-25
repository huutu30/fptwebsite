const fs = require('fs');
const path = require('path');

// Cấu hình các thư mục và file muốn bỏ qua
const EXCLUDE_DIRS = new Set(['node_modules', '.git', 'dist', '.next', 'build', 'coverage', '.cache']);
const EXCLUDE_FILES = new Set(['project_map.txt', 'package-lock.json', '.DS_Store', 'thumbs.db', 'generate_map.js', 'generate_map.cjs']);

function generateTree(dir, prefix = '') {
    let result = '';
    let items = [];
    
    try {
        items = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
        return result;
    }

    // Lọc bỏ các thư mục và file không cần thiết
    const filteredItems = items.filter(item => {
        if (item.isDirectory() && EXCLUDE_DIRS.has(item.name)) return false;
        if (item.isFile() && EXCLUDE_FILES.has(item.name)) return false;
        return true;
    });

    // Sắp xếp: Thư mục lên trước, file theo sau, rồi xếp theo bảng chữ cái
    filteredItems.sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        return a.name.localeCompare(b.name);
    });

    filteredItems.forEach((item, index) => {
        const isLast = index === filteredItems.length - 1;
        const connector = isLast ? '└── ' : '├── ';
        const childPrefix = isLast ? '    ' : '│   ';

        result += `${prefix}${connector}${item.name}\n`;

        if (item.isDirectory()) {
            result += generateTree(path.join(dir, item.name), prefix + childPrefix);
        }
    });

    return result;
}

const rootDir = process.cwd();
const rootName = path.basename(rootDir);
console.log(`Đang quét cấu trúc dự án: ${rootName}...`);

const treeResult = `${rootName}/\n${generateTree(rootDir)}`;

fs.writeFileSync('project_map.txt', treeResult, 'utf-8');
console.log('Đã tạo thành công file project_map.txt với cấu trúc rút gọn!');
