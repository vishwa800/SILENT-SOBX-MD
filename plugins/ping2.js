const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
const config = require('../config')


const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '*_🪄Pinging..._*' })
        const endTime = Date.now()
        const ping = endTime - startTime
        await conn.sendMessage(from, { text: `*♻️ Speed... : ${ping}ms*`}, { quoted: message })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
}) 
