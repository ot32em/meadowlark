let app = require('../meadowlark.js');

let bole = require('bole');
let log = bole('server');

bole.output({
	'level': 'debug',
	'stream': process.stdout,
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
	log.info(`Server is up. Port: ${ app.get("port") }. Press ctrl + c to close`);
});
