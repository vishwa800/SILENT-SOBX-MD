const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')

cmd({
    pattern: "play",
    desc: "download songs",
    category: "download",
    react: "📩",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("please give me link or name 💫.*")
const search = await yts(q)
const data = search.videos[0]
const url = data.url

let desc = `*♻️SILENT-SOBX-MD SONG DOWNLOADER..📩*

🦄 ᴛɪᴛʟᴇ - ${data.title}

🦄 ᴠɪᴇᴡꜱ - ${data.views}

🦄 ᴅᴇꜱᴄʀɪᴘᴛɪᴏɴ - ${data.description}

🦄 ᴛɪᴍᴇ - ${data.timestamp}

🦄 ᴀɢᴏ - ${data.ago}


*🧬 BY SILENT-SOBX-MD WHATSAPP BOT*
`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//=========== audio download ===========

let down = await fg.yta(url)  
let downloadUrl = down.dl_url

//send audio
await conn.sendMessage(from,{audio:{url: downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})
await conn.sendMessage(from,{document:{url: downloadUrl},mimetype:"audio/mpeg",fileName:data.title + "mp3",caption:"MADE BY SILENT-SOBX-MD 🎵"},{quoted:mek})
}catch(e){
reply(`${e}`)
}
})

//=========== video-download ===========

cmd({
    pattern: "video1",
    desc: "download video",
    category: "download",
    react: "📩",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("*Please provide link or name 💫*")
const search = await yts(q)
const data = search.videos[0]
const url = data.url

let des = `*🎥SILENT-SOBX-MD VIDEO DOWNLOADER..📩*

🦄 ᴛɪᴛʟᴇ - ${data.title}

🦄 ᴠɪᴇᴡꜱ - ${data.views}

🦄 ᴅᴇꜱᴄʀɪᴘᴛɪᴏɴ - ${data.description}

🦄 ᴛɪᴍᴇ - ${data.timestamp}

🦄 ᴀɢᴏ - ${data.ago}


*🧬 BY SILENT-SOBX-MD WHATSAPP BOT*                    
`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:des},{quoted:mek});

//download video

let down = await fg.ytv(url)  
let downloadUrl = down.dl_url

//send video
await conn.sendMessage(from,{video:{url: downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from,{document:{url: downloadUrl},mimetype:"video/mp4",fileName:data.title + "mp4",caption:"MADE BY SILENT-SOBX-MD 🎬"},{quoted:mek})
    
}catch(a){
reply(`${a}`)
}
})
