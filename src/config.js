require('dotenv').config()

module.exports = {
    uri: 'https://www.newegg.com/p/pl?N=100007709%20601357247',
    email: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    userMail: process.env.USER_MAIL,
    interval: 5 * 1000 * 60
}