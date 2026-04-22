 
window.addEventListener('load', () => {
    launchConfetti()
})

function launchConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ff0000', '#ff6347', '#fff', '#ffdf00']
    const duration = 6000
    const end = Date.now() + duration

    // Initial big burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    // Continuous side cannons
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        })

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        })
    }, 300)
}
 
const gifs = [
    "https://media.tenor.com/ReKE7CQyrhUAAAAj/hello-kitty.gif",
    "https://media1.tenor.com/m/Laac2fYpKBMAAAAC/huna04.gif"
];

let index = 0;

setInterval(() => {
    index = (index + 1) % gifs.length;
    document.getElementById("cat-gif").src = gifs[index];
}, 2000); // cambia cada 2 segundos
