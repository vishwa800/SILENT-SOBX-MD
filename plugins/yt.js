const config = require('../config')
const dl = require('@bochilteam/scraper')
const fs = require('fs')
const { getBuffer, getGroupAdmins, getRandom, getsize, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')
const { cmd, commands } = require('../command')
var sizetoo = "_This file size is too big_"
const yts = require("ytsearch-venom")
let wm = config.FOOTER
let newsize = config.MAX_SIZE * 1024 * 1024

cmd({
  pattern: "song",
  alias: ["ytmp3", "play"],
  use: '.song lelena',
  react: "🪄",
  desc: 'Download audios from youtube',
  category: "download",
  filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Please enter a query or a url!*')
    const url = q.replace(/\?si=[^&]*/, '');
    var results = await yts(url);
    var result = results.videos[0]
    let caption = ` 
*Y T - S O N G*
 
*Title* : ${result.title}
*Views* : ${result.views}
*Duration* : ${result.duration}
*URL* : ${result.url}
 
`
    const audio = await dl.youtubedl(result.url)
    const video = await dl.youtubedlv2(result.url)
    if (audio.size > newsize) return reply(sizetoo)
    if (video.size > newsize) return reply(sizetoo)
    await conn.sendMessage(from, { audio: audio, caption: caption + 'Audio' })
    await conn.sendMessage(from, { video: video, caption: caption + 'Video' })
  } catch (e) {
    console.log(e)
    reply('*Error !!*')
  }
})
