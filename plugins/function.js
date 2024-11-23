const { cmd } = require('../command')
const fs = require('fs');
const path = require('path');
const config = require('../config')
// List of bad words to check against
 // Replace with actual words
cmd({
  on: "body"
},
async (conn,mek, m, { from, body, isGroup, isAdmins, isBotAdmins, reply, sender }) => {
    try {
    
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

// Regular expression to detect various platform links
const linkPatterns = [
    /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,       // WhatsApp links
    /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,              // Telegram links
    /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi,              // YouTube links
    /https?:\/\/youtu\.be\/\S+/gi,                           // YouTube short links
    /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi,             // Facebook links
    /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi             // Instagram links
];

cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup || isAdmins || !isBotAdmins) return; // Skip if not in group, or sender is admin, or bot is not admin

        const containsLink = linkPatterns.some(pattern => pattern.test(body));

        if (containsLink && config.ANTI_LINK === 'true') {
            await conn.sendMessage(from, { delete: mek.key }, { quoted: mek }); // Delete the message
            await conn.sendMessage(from, { text: "⚠️ Links are not allowed in this group 🚫" }, { quoted: mek }); // Send warning
        }
    } catch (error) {
        console.error(error);
        reply("An error occurred while processing the message.");
    }
});
