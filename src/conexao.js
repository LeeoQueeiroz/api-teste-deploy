const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'ec2-54-86-224-85.compute-1.amazonaws.com',
        user: 'ynxamnisodtwss',
        password: '557f42cbcd28abf12f7087a9f8350a1ee3f301823b21bc75ec4cc127debc1b7b',
        database: 'd1ecc6o2htaahj'
    }
});

module.exports = knex;