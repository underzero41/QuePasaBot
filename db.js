const {Sequelize} = require('sequelize');
module.exports = new Sequelize(
    'QuePasaBot',
    'root',
    'root',
    {
        host: 'master.d07ccf0d-03b0-4bb7-b81d-8bbbf3285712.c.dbaas.selcloud.ru',
        port: '5432',
        dialect: 'postgres'
    }
)