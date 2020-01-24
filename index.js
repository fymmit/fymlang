const { compile } = require('./src/fymlang');

const fileName = process.argv[2];
const isWin = process.platform === 'win32';

compile(fileName, isWin);
