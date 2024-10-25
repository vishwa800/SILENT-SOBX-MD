const { cmd } = require('../command')
const fs = require('fs');
const path = require('path');
const {readEnv} = require('../lib/database')
const config = require('../config')
// List of bad words to check against
 // Replace with actual words
cmd({
  on: "body"
},
async (conn,mek, m, { from, body, isGroup, isAdmins, isBotAdmins, reply, sender }) => {
    try {
        const config = await readEnv();
        const badWords = ["wtf", "mia", "xxx","fuck","sex","huththa","pakaya","ponnaya","hutto"]
        if (!isGroup || isAdmins || !isBotAdmins) return; // Skip if not in group, or sender is admin, or bot is not admin
      
        const lowerCaseMessage = body.toLowerCase();
        const containsBadWord = badWords.some(word => lowerCaseMessage.includes(word));
        
        if (containsBadWord & config.ANTI_BAD_WORD === 'true') {
          await conn.sendMessage(from, { delete: mek.key }, { quoted: mek });
          await conn.sendMessage(from, { text: "🚫 ⚠️BAD WORDS NOT ALLOWED⚠️ 🚫" }, { quoted: mek });
        }
    } catch (error) {
        console.error(error)
        reply("An error occurred while processing the message.")
    }
})
// Regular expression to detect WhatsApp links
const whatsappLinkPattern = /https?:\/\/(chat\.whatsapp\.com|wa\.me)\/\S+/gi;
cmd({
  on: "body"
},
async (conn, mek, m, { from, body, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        const config = await readEnv();
        if (!isGroup || isAdmins || !isBotAdmins) return; // Skip if not in group, or sender is admin, or bot is not admin
        if (whatsappLinkPattern.test(body) & config.ANTI_LINK === 'true') {
                  await conn.sendMessage(from, { delete: mek.key }, { quoted: mek });
                  await conn.sendMessage(from, { text: "⚠️ LINK NOT ALLOWED IN THIS GROUP 🚫" }, { quoted: mek }); 
        }
    }catch (error) {
        console.error(error)
        reply("An error occurred while processing the message.")
    }
})

cmd({ on: 'message' }, async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const config = await readEnv();
    if (config.AUTO_REACT === 'true') {
      await conn.sendMessage(m.chat, { react: { text: '💖', key: m.key } });
    }
  } catch (error) {
    console.error(error);
  }
});

