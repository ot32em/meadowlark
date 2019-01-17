let log = require('bole')('mail');

function mail(reply, cb)
{
    let mailSenderConfig = require('../config/confidential').mailsender;
    let adminConfig = require('../config/site.js').admin;
    log.info(`user ${mailSenderConfig.username} pass: ${mailSenderConfig.password}`);

    let nodemailer = require('nodemailer');
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
        cb(err);
    });
}

// https://stackoverflow.com/questions/48854066/missing-credentials-for-plain-nodemailer

module.exports = mail;