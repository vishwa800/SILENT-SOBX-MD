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
