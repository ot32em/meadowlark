let app = new require('express').Router();
let escape = require('escape-html');


app.get('/', function(req, res) {
	res.render('contact');
});


let mailSender = require('../../config/confidential').mailsender;
let admin = require('../../config/site.js').admin;
let enableMailsender = require('../../config/site.js').mailsender.enable;


app.post('/', function(req, res) {

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

	res.render('email/main_template', {
		'usermail': usermail,
		'layout': null,
	}, function(err, html) {
		if(!enableMailsender) {
			req.session._flash = {'alert': 'warn', 'msg': '郵件已暫停服務'};
			return res.redirect(303, '/contact');
		}
		if(err) {
			return res.status(500).render('500', {
				'msg': 'err: ' + err,
			});
		}
		let reply = {
			'subject': `顧客: ${usermail.name} 回覆: ${usermail.subject}`,
			'html': html
		};
		
		let mail = require('../../lib/mail')(admin, mailSender);
		mail.send(reply, function(err) {
			if(err) {
				req.session._flash = {'alert': 'danger', 'msg': '寄件發生問題。請連絡網站管理員。'};
				res.redirect(303, '/contact');
			} else {
				req.session._flash = {'alert': 'success', 'msg': '郵件已寄送'};
				res.redirect(303, '/contact');
			}
		});
	});

});

module.exports = app;
