'use strict'

const config = require('./config')
const ScraperService = require('./services/ScraperService')
const NotificationService = require('./services/NotificationService')

let isItInStock = ''

async function run () {
    try {
        const stockInfo = await ScraperService.getStockInfo()
        console.log(new Date().toString(), `Current stock info ${stockInfo}`)
        if (isItInStock === '') {
            isItInStock = stockInfo
        } else if (isItInStock !== stockInfo) {
            isItInStock = stockInfo
            await NotificationService.sendStockNotification()
            console.log('I Should Have Sent A Mail')
        }
        console.log('Next check: ', new Date(Date.now() + config.interval).toString())
        setTimeout(run, config.interval)
    } catch (err) {
        try {
            await NotificationService.sendErrorNotification(err)
        } catch (err) {
            console.error('Sending error notification failed')
        }
        console.error(err)
        console.log('Program exit')
        process.exitCode = 1
    }
}

run()