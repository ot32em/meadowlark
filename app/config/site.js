function readEnv(envKey) {
    return process.env[envKey] || require('./site_env.js')[envKey];
}

module.exports = {
    'admin': {
        'email': readEnv('SITE_ADMIN_EMAIL'),
    },
    'log': {
        'filename': readEnv('SITE_LOG_FILENAME'),
        'interval': readEnv('SITE_LOG_INTERVAL'),
        'dir': readEnv('SITE_LOG_DIR'),
    },
    'mailsender': {
        'enable': String(true).toLowerCase() == readEnv('SITE_MAILSENDER_ENABLE').toLowerCase(),
    },
};