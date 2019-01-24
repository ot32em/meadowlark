function readEnv(envKey) {
    console.log('typeof(process.env[envKey]): ' + typeof(process.env[envKey]));

    let val;
    if(typeof(process.env[envKey]) !== 'undefined') {
        console.log('env key found ' + envKey);
        val = process.env[envKey];
    }
    else {
        console.log('env key not found ' + envKey);
        val = require('./confidential_env')[envKey];

    }
    console.log('val: ' + val);
    return val;
}

Object.keys(require('./confidential_env')).map(k => {
    console.log('file, key: ' + k);
});

Object.keys(process.env).map(k => {
    console.log('process env, key: ' + k);
});

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