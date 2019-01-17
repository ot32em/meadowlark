let app = new require('express').Router();
let log = require('bole')('contact');
let escape = require('escape-html');

let adminConfig = require('../../config/site.js').admin;

app.get('/', function(req, res) {
	res.render('contact');
});

app.post('/', function(req, res) {
    let nodemailer = require('nodemailer');    
    let mailSenderConfig = require('../../config/confidential').mailsender;

	let usermail = {
		'name': escape(req.body.name),
		'subject': escape(req.body.subject) || '無主題',
		'email': escape(req.body.email),
		'text': escape(req.body.text),
	};
	if(!usermail.name || !usermail.email || !usermail.text)
	{
		let lacks = [];
		if(!usermail.name) lacks.push('名字');
		if(!usermail.email) lacks.push('電子郵件');
		if(!usermail.text) lacks.push('內文');

		req.session._flash = {'alert': 'danger', 'msg': `下列欄位不行空白 [${lacks.join(',')}]`};
		res.redirect('/contact');
		return;
	}
	let reply = {
		'subject': `User: ${usermail.name} Reply: ${usermail.subject}`,
        'html': 
            `name: ${usermail.name}<br />\r\n` +
            `subject: ${usermail.subject}<br />\r\n` +
            `email: ${usermail.email}<br />\r\n` +
			`text:<br />\r\n` +
			`<hr />\r\n` +
			`${usermail.text}\r\n` +
			`<br /><hr />\r\n`,
	};
	

	// https://stackoverflow.com/questions/48854066/missing-credentials-for-plain-nodemailer
	log.info(`user ${mailSenderConfig.username} pass: ${mailSenderConfig.password}`);
	let mailer = nodemailer.createTransport({
		'service': mailSenderConfig.service,
		'auth': {
			'user': mailSenderConfig.username,
			'pass': mailSenderConfig.password,
		},
	});

	mailer.sendMail({
		'from': mailSenderConfig.email,
		'to': adminConfig.email,
		'subject': reply.subject,
		'html': reply.html,
	}, function(err) {
		if(err) {
			req.session._flash = {'alert': 'danger', 'msg': '寄件發生問題。請連絡網站管理員。'};
			res.redirect(303, '/contact');
		} else {
			req.session._flash = {'alert': 'success', 'msg': '郵件已寄送'};
			res.redirect(303, '/contact');
		}		
	});

});

module.exports = app;
