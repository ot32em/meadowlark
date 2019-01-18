let log = require('bole')('mail');

function mail(admin, mailSender)
{
	return {
		'send': function(reply, cb) {
			log.info(`user ${mailSender.username} pass: ${mailSender.password}`);

			let nodemailer = require('nodemailer');
			let mailer = nodemailer.createTransport({
				'service': mailSender.service,
				'auth': {
					'user': mailSender.username,
					'pass': mailSender.password,
				},
			});

			mailer.sendMail({
				'from': mailSender.email,
				'to': admin.email,
				'subject': reply.subject,
				'html': reply.html,
			}, function(err) {
				cb(err);
			});
		}
	};
}

// https://stackoverflow.com/questions/48854066/missing-credentials-for-plain-nodemailer

module.exports = mail;