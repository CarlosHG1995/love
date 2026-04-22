const gifStages = [
    "https://media1.tenor.com/m/mmo7XUMgGDEAAAAd/tanabata-hello-kitty.gif", // 0 normal
    "https://media.tenor.com/ZW-ZssGbaKoAAAAi/huhu.gif",                  // 1 confused
    "https://media.tenor.com/VRQRj4W9qtEAAAAi/hello-kitty.gif",             // 2 pleading
    "https://media1.tenor.com/m/WyX_urNfFD0AAAAd/hello-kitty-no.giff",             // 3 sad
    "https://media1.tenor.com/m/nueVbeeVoPYAAAAC/hello-kitty-sanrio.gif",       // 4 sadder
    "https://media.tenor.com/qlLzFQ1vpoMAAAAi/hello-kitty.gif",             // 5 devastated
    "https://media1.tenor.com/m/BLQj8VbJH-8AAAAC/hello-kitty-hello-kitty-crying.gif",  // 6 very devastated
    "https://media.tenor.com/pCb4nfMSdykAAAAj/hello-kitty-crying.gif"  // 7 crying runaway
]

const noMessages = [
    "No",
    "¿Estás seguro? 🤔",
    "Por favor, cariñito... 🥺",
    "Si dices que no, me pondré muy triste...",
    "Estaré muy triste... 😢",
    "¿Por favor? 💔",
    "No me hagas esto...",
    "¡Última oportunidad! 😭",
    "De todos modos no podrás atraparme 😜"
]

const yesTeasePokes = [
    "intenta decir que no primero... apuesto a que quieres saber qué pasa 😏",
    "vamos, presiona no... solo una vez 👀",
    "te lo estás perdiendo 😈",
    "haz clic en no, te reto 😏"
]

let yesTeasedCount = 0

let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn') 
 

function handleYesClick() {
    if (!runawayEnabled) {
        // Tease her to try No first
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }
    window.location.href = 'yes.html'
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function handleNoClick() {
    noClickCount++

    // Cycle through guilt-trip messages
    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    // Grow the Yes button bigger each time
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // Shrink No button to contrast
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    // Swap cat GIF through stages
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    // Runaway starts at click 5
    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * maxX + margin / 2
    const randomY = Math.random() * maxY + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}
