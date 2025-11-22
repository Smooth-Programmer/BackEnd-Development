const cp = require('child_process');

cp.execSync('start chrome');

cp.execSync('calc');

cp.execSync('start chrome https://smooth-programmer.netlify.app');
