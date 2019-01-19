let app = require('../meadowlark.js');

function run(cb)
{
	app.set('port', process.env.PORT || 3000);
	app.listen(app.get('port'), function() {
		console.log(`Server is up. pid: %d, port: %d, env: %s`,
			process.pid, app.get("port"), app.get("env")
		);
		if(cb) cb();
	});
}

if(module == require.main)
{
	run(() => console.log('Press ctrl + c to close'));
}
else
{
	module.exports = {
		'run': run
	};
}