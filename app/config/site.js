function readEnv(envKey) {
    return process.env[envKey] || require('./site_env.js')[envKey];
}

module.exports = {
    'admin': {
        'email': readEnv('SITE_ADMIN_EMAIL'),
    },
};