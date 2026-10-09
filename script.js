const nameInput = document.getElementById("birthdayName");
const personalizeBtn = document.getElementById("personalizeBtn");
const welcome = document.getElementById("welcome");
const sky = document.getElementById("sky");
const dialog = document.getElementById("giftDialog");
const dialogIcon = document.getElementById("dialogIcon");
const dialogTitle = document.getElementById("dialogTitle");
const dialogText = document.getElementById("dialogText");
const closeDialog = document.getElementById("closeDialog");
const confettiButton = document.getElementById("confettiButton");

const floatSymbols = ["✦", "♡", "✨", "🎈", "💗", "🎀", "⭐", "🌸"];
const gifts = {
  wish: {
    icon: "🎁",
    title: "A Birthday Wish",
    text: name => `Happy Birthday, ${name}! 🎂\n\nMay your new year be filled with laughter, lovely surprises, good health, and dreams that come true. May you always find a reason to smile and people who remind you how special you are. 💗`
  },
  letter: {
    icon: "💌",
    title: "A Little Letter",
    text: name => `Dear ${name},\n\nI hope you remember that you make the world a little brighter just by being you. Give yourself permission to dream big, laugh often, rest when you need to, and enjoy all the little things that make life beautiful.\n\nYou deserve kindness today and every day. 🌷`
  },
  joy: {
    icon: "🧸",
    title: "A Pocket of Joy",
    text: name => `A tiny reminder for ${name}:\n\nYou don't have to make every day perfect for it to be meaningful. Keep the memories that make you smile, keep learning new things, and never underestimate the magic of a fresh start. Sending you a pocketful of joy! ✨`
  },
  finale: {
    icon: "💝",
    title: "One Last Surprise",
    text: name => `Surprise, ${name}! 🎉\n\nThis is your reminder to celebrate yourself—not just today, but in all the little victories ahead. May the year ahead bring you beautiful moments, unexpected adventures, and plenty of reasons to say, “That was a wonderful day.”\n\nHappy Birthday! 💖`
  }
};

function getName() {
  return nameInput.value.trim() || "Birthday Star";
}

function personalize() {
  const name = getName();
  welcome.textContent = `A little wonderland made just for ${name}! 💗`;
  burstConfetti(22);
}

personalizeBtn.addEventListener("click", personalize);
nameInput.addEventListener("keydown", event => {
  if (event.key === "Enter") personalize();
});

function openGift(key) {
  const gift = gifts[key];
  if (!gift) return;

  dialogIcon.textContent = gift.icon;
  dialogTitle.textContent = gift.title;
  dialogText.textContent = gift.text(getName());

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    alert(`${gift.title}\n\n${gift.text(getName())}`);
  }
  burstConfetti(30);
}

document.querySelectorAll("[data-gift]").forEach(button => {
  button.addEventListener("click", () => openGift(button.dataset.gift));
});

closeDialog.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
confettiButton.addEventListener("click", () => burstConfetti(45));

function createFloatingDecorations() {
  const amount = window.innerWidth < 500 ? 16 : 27;
  for (let i = 0; i < amount; i++) {
    const item = document.createElement("span");
    item.className = "sparkle";
    item.textContent = floatSymbols[Math.floor(Math.random() * floatSymbols.length)];
    item.style.left = `${Math.random() * 100}%`;
    item.style.fontSize = `${13 + Math.random() * 19}px`;
    item.style.animationDuration = `${10 + Math.random() * 13}s`;
    item.style.animationDelay = `${-Math.random() * 22}s`;
    sky.appendChild(item);
  }
}

function burstConfetti(amount) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const bits = ["🎉", "✨", "💗", "🎊", "⭐", "🌸"];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.textContent = bits[Math.floor(Math.random() * bits.length)];
    piece.style.position = "fixed";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.top = "-35px";
    piece.style.fontSize = `${14 + Math.random() * 14}px`;
    piece.style.pointerEvents = "none";
    piece.style.zIndex = "9999";
    piece.style.transition = `transform ${1.4 + Math.random() * .8}s ease-in, opacity 1.8s ease-in`;
    document.body.appendChild(piece);

    requestAnimationFrame(() => {
      piece.style.transform = `translate(${Math.random() * 150 - 75}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 700 - 350}deg)`;
      piece.style.opacity = "0";
    });
    window.setTimeout(() => piece.remove(), 2400);
  }
}

createFloatingDecorations();

const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");
bgm.volume = 0.6;

function startMusic() {
  return bgm.play().then(removeUnlock).catch(() => {});
}

const unlockEvents = ["pointerdown", "keydown", "touchstart"];
function removeUnlock() {
  unlockEvents.forEach(e => document.removeEventListener(e, unlockMusic));
}
function unlockMusic(event) {
  if (event.target.closest && event.target.closest("#musicBtn")) return;
  startMusic();
}

// 1) try to autoplay right away (works on some desktop browsers)
startMusic();
// 2) if blocked, start on the first tap/click/key anywhere
unlockEvents.forEach(e => document.addEventListener(e, unlockMusic));

// 🎵 button still works as play/pause
musicBtn.addEventListener("click", () => {
  if (bgm.paused) bgm.play(); else bgm.pause();
  removeUnlock();
});
bgm.addEventListener("play", () => musicBtn.classList.add("playing"));
bgm.addEventListener("pause", () => musicBtn.classList.remove("playing"));
