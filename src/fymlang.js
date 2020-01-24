const fs = require('fs');
const vm = require('vm');

const keywords = [
    'print',
];

const compile = (fileName, isWin) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) return console.log('Error', err);
        let error = false;
        let output = '';
        const lines = isWin ? data.split('\r\n') : data.split('\n');
        lines.forEach((line, i) => {
            if (line.length !== 0) {
                const [keyword, ...rest] = line.split(' ');
                const variables = rest.filter(x => x.includes('$'));
                const content = rest.map(x => variables.includes(x) ? '${' + x.substring(1) + '}' : x).join(' ');
                if (keywords.includes(keyword)) {
                    switch (keyword) {
                        case 'print': {
                            output += `console.log(\`${content}\`)`;
                        }
                    }
                } else {
                    output += `var ${keyword} = '${content}'`;
                }
                if (error) return;
                output += ';';
            };
        })
        if (!error) {
            const script = new vm.Script(output);
            script.runInThisContext();
        }
    });
}

module.exports = { compile };
