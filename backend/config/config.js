require('dotenv').config();

const {DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, DB_DRIVER} = process.env;
console.log(DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, DB_DRIVER)
console.log(process.env.DB_NAME)
module.exports = {
    "development": {
        "username": DB_USER,
        "password": DB_PASSWORD,
        "database": DB_NAME,
        "host": DB_HOST,
        "dialect": DB_DRIVER
    },
    "test": {
        "username": DB_USER,
        "password": DB_PASSWORD,
        "database": DB_NAME,
        "host": DB_HOST,
        "dialect": DB_DRIVER
    },
    "production": {
        "username": DB_USER,
        "password": DB_PASSWORD,
        "database": DB_NAME,
        "host": DB_HOST,
        "dialect": DB_DRIVER
    }
}
