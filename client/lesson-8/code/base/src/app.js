const fs = require('fs');
const path = require('path');

const DIST_BUILD_PATH = path.join(__dirname, 'dist', 'server');
const BUILD_PATH = path.join(__dirname, 'server');
const buildFolders = [
    BUILD_PATH,
    DIST_BUILD_PATH
];

(function requireServer() {
    const found = buildFolders.some(folder => {
        const exists = fs.existsSync(folder);
        if (exists) {
            require(path.join(folder, 'server.js'));
        }
        return exists;
    });
})()
