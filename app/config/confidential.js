function readEnv(envKey) {
    return process.env[envKey] || require('./confidential_env.js')[envKey];
}

module.exports = {
    'secretCookie': readEnv('CONFIDENTIALS_SECRETCOOKIE'),
    'mailsender': {
        'service': readEnv('CONFIDENTIALS_MAILSENDER_SERVICE'),
        'email': readEnv('CONFIDENTIALS_MAILSENDER_EMAIL'),
        'username': readEnv('CONFIDENTIALS_MAILSENDER_USERNAME'),
        'password': readEnv('CONFIDENTIALS_MAILSENDER_PASSWORD'),
    },
    'mongodb': {
        'development': {
            'connectstring': readEnv('CONFIDENTIALS_MONGODB_DEVELOPMENT_CONNECTSTRING'), 
        },
        'production': {
            'connectstring': readEnv('CONFIDENTIALS_MONGODB_PRODUCTION_CONNECTSTRING'),
        }
    }
};