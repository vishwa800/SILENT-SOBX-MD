const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')
cmd({
    pattern: "video",
    alias: ["ytv","ytmp4","darama"],
    desc: "To download videos.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Please give me a url or title")  
const search = await yts(q)
const data = search.videos[0];
const url = data.url
    
    
let desc = `
*_꩜ SILENT-SOBX-MD VIDEO DOWNLOADER ꩜_*

🎥 *VIDEO DATA FOUND!♻️* 

➥ *♻️ TITLE:* ${data.title} 
➥ *♻️ DURATION:* ${data.timestamp} 
➥ *♻️ VIEWS:* ${data.views} 
➥ *♻️ UPLOADED ON:* ${data.ago} 
➥ *♻️ LINK:* ${data.url} 

🎬 *ENJOY THE VIDEO BROUGHT TO YOU ♻️* 

> *UPLOADING BY SILENT-SOBX-MD BOT ♻️* 

> *© ᴄʀᴇᴀᴛᴇᴅ ʙʏ sɪʟᴇɴᴛʟᴏᴠᴇʀ⁴³²*
`

await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download video

let down = await fg.ytv(url)
let downloadUrl = down.dl_url

//send video message
await conn.sendMessage(from,{video: {url:downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"video/mp4",fileName:data.title + ".mp4",caption:"*© 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ*"},{quoted:mek})

}catch(e){
console.log(e)
  reply('${e}')
}
})

