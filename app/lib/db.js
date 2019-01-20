let mongoose = require('mongoose');
function connectDb(connectstring)
{
    mongoose.connect(connectstring,
        {
            'keepAlive': true,
            'useNewUrlParser': true,
        }
    ).then(
        () => {
            console.log('MongoDB is connected');
        },
        (err) => {
            console.log('Failed to connect MongoDB. Err: ' + err);
            throw 'db cannot connect';
        } 
    );
}

module.exports = {
    'connectDb': connectDb,
}