const fs = require('fs');
const path = require('path');

let map;

try {
    console.log("尝试加载 map.js 文件...");
    const mapfile = require('./map.js');
    console.log("map.js 文件加载成功，内容为:", mapfile);
    map = mapfile.nameMapping;
    console.log("nameMapping 值为:", map);
} catch (error) {
    console.error("加载 map.js 文件时出错:", error);
    process.exit(1);
}

console.log(map);

// 配置路径
const notesDir = path.join(__dirname, 'static', 'note');
const outputPath = path.join(__dirname, 'directory-structure.json');

function rename(mane) {
    // console.log(mane);
    if (map && map.hasOwnProperty(mane)) {
        return map[mane];
    } else {
        return mane;
    }
}

// 递归扫描目录并构建结构
function scanDirectory(dirPath, basePath = '') {
    const items = [];
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
        // 跳过隐藏文件
        if (file.startsWith('.')) return;
        
        const fullPath = path.join(dirPath, file);
        const relativePath = path.join(basePath, file);
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
            const children = scanDirectory(fullPath, relativePath);
            items.push({
                name: file,
                path: '/static/note/' + relativePath.replace(/\\/g, '/') + '/',
                type: 'directory',
                children
            });
        } else {
            items.push({
                name: rename(file),
                path: '/static/note/' + relativePath.replace(/\\/g, '/'),
                type: 'file'
            });
        }
    });
    
    // 排序：文件在前，目录在后，然后按字母和数字顺序
    items.sort((a, b) => {
        if (a.type !== b.type) {
            return a.type === 'file' ? -1 : 1;
        }
        
        // 提取名称中的数字部分进行比较
        const aMatches = a.name.match(/(\D*)(\d*)(\D*)/);
        const bMatches = b.name.match(/(\D*)(\d*)(\D*)/);
        
        if (aMatches && bMatches) {
            // 先比较非数字部分
            const textCompare = aMatches[1].localeCompare(bMatches[1], undefined, { sensitivity: 'base' });
            if (textCompare !== 0) return textCompare;
            
            // 再比较数字部分（转为数值比较）
            const aNum = aMatches[2] ? parseInt(aMatches[2], 10) : 0;
            const bNum = bMatches[2] ? parseInt(bMatches[2], 10) : 0;
            if (aNum !== bNum) return aNum - bNum;
            
            // 最后比较剩余部分
            return aMatches[3].localeCompare(bMatches[3], undefined, { sensitivity: 'base' });
        }
        
        // 默认使用字母数字排序
        return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });
    
    return items;
}

try {
    console.log(`开始扫描目录: ${notesDir}`);
    const structure = scanDirectory(notesDir);
    fs.writeFileSync(outputPath, JSON.stringify(structure, null, 2));
    console.log(`目录结构已生成: ${outputPath}`);
} catch (error) {
    console.error('生成目录结构时出错:', error);
    process.exit(1);
}
