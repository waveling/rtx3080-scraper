'use strict'

const config = require('../config')
const cheerio = require('cheerio')
const rp = require('request-promise')

async function getStockInfo () {
    const response = await rp({
        uri: config.uri
    })
    const $ = cheerio.load(response)
    const stockInfo = $('.item-promo').text()
    if (stockInfo === '') throw new Error('No stock info found')
    return stockInfo
}

module.exports = {
    getStockInfo
}