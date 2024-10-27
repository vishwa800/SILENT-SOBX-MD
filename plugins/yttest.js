const config = require('../config')
const { ytaudio, ytvideo } = require('@bochilteam/ytdl-core')
const fs = require('fs')
const { getBuffer, getGroupAdmins, getRandom, getsize, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')
const { cmd, commands } = require('../command')
var sizetoo = "_This file size is too big_"
const yts = require("yt-search")
let wm = config.FOOTER
let newsize = config.MAX_SIZE * 1024 * 1024

cmd({
  pattern: "come",
  alias: ["ytmp3"],
  use: '.come lelena',
  react: "♻️",
  desc: 'Download audio songs from youtube',
  category: "download",
  filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
  try {
    if (!q) return await reply('*Please enter a query or a url!*')
    const url = q.replace(/\?si=[^&]*/, '');
    const res = await yts(url);
    const video = res.videos[0];
    let caption = ` 
*Y T - S O N G*
 
*Title* : ${video.title}
*Views* : ${video.views}
*Duration* : ${video.timestamp}
*URL* : ${video.url}
 
`
    const audio = await ytaudio(video.url, 'highest')
    if (audio.size > newsize) return reply(sizetoo)
    await conn.sendMessage(from, { audio: audio, caption: caption })
  } catch (e) {
    console.log(e)
    reply('*Error !!*')
  }
});
