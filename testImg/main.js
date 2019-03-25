var fs = require('fs');
var bf = fs.readFileSync('./background.jpg');
console.log(bf)

fs.writeFileSync('./hah.png', bf);
