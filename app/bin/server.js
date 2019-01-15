let app = require('../meadowlark.js');

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
	console.log(`Server is up. Port: ${ app.get("port") }. Press ctrl + c to close`);
});
