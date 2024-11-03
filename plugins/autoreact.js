const fs = require('fs');
const path = require('path');
const {readEnv} = require('../lib/database')
const config = require('../config')
cmd({
  on: "body"
},
async(conn, mek, m,{from, isReact, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
function addReactions(m, isReact, senderNumber, botNumber) {
  const botReactions = ["🥰", "😳", "🤭", "😘", "🤗", "😹"];
  const userReactions = [
    "😊", "😁", "😃", "😄", "😆", "🤣",
    "🎉", "🎊", "👏", "💕", "😍", "🙌",
    "😳", "😁", "💖", "🩷", "🥰", "🥹",
    "🤩", "🤯", "🚀", "🔥", "💥", "👽", "🤖", "💻",
    "🎁", "📦", "🕰️", "📆"
  ];

  if (!isReact && senderNumber === botNumber) {
    m.react(botReactions[Math.floor(Math.random() * botReactions.length)]);
  } else if (!isReact && senderNumber !== botNumber) {
    m.react(userReactions[Math.floor(Math.random() * userReactions.length)]);
  }
        }

    } catch (error) {
        console.error(error)
        reply("An error occurred while processing the message.")
    }
})
