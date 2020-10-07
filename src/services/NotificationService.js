'use strict'

const config = require('../config')
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: "FastMail",
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
})

async function sendStockNotification () {
    await transporter.sendMail({
        from: 'RTX Scraper',
        to: config.userMail,
        subject: `RTX Scraper: Stock available!`,
        text: 'https://www.newegg.com/p/pl?N=100007709%20601357247'
    })
}

async function sendErrorNotification(err) {
    await transporter.sendMail({
        from: 'RTX Scraper',
        to: config.userMail,
        subject: 'RTX Scraper Error!',
        text: `Error message:\n\n${err}`
    })
}

module.exports = {
    sendStockNotification,
    sendErrorNotification
}