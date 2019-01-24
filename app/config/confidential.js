function readEnv(envKey) {
    let val;
    if(typeof(process.env[envKey]) !== 'undefined') 
        val = process.env[envKey];    
    else 
        val = require('./confidential_env')[envKey];
    return val;
}

module.exports = {
    'secretCookie': readEnv('CONFIDENTIAL_SECRETCOOKIE'),
    'mailsender': {
        'service': readEnv('CONFIDENTIAL_MAILSENDER_SERVICE'),
        'email': readEnv('CONFIDENTIAL_MAILSENDER_EMAIL'),
        'username': readEnv('CONFIDENTIAL_MAILSENDER_USERNAME'),
        'password': readEnv('CONFIDENTIAL_MAILSENDER_PASSWORD'),
    },
    'mongodb': {
        'development': {
            'connectstring': readEnv('CONFIDENTIAL_MONGODB_DEVELOPMENT_CONNECTSTRING'), 
        },
        'production': {
            'connectstring': readEnv('CONFIDENTIAL_MONGODB_PRODUCTION_CONNECTSTRING'),
        }
    }
};