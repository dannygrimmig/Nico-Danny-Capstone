let nav = document.getElementById("nav");
let navCenter = document.getElementById("navCenter");
let navright = document.getElementById("navRight");

window.addEventListener('scroll', () => {
    let y = document.body.scrollTop;
    if(y >= 40){
        nav.className="nav";
        navCenter.className="chunk center";
        navright.className="chunk right"
        
    }
    else{
        nav.className="nav transparent";
        navCenter.className="chunk center transparent";
        navright.className = "chunk right transparent";
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

setInterval(heroImage, 5000);
let heroIndex = 0;
let heroContainer = document.getElementById("hero");
let heroArr = [
    "https://allears.net/wp-content/uploads/2020/11/pooh-eating-gif.gif",
    "https://media0.giphy.com/media/K4x1ZL36xWCf6/giphy.gif",
    "https://i.gifer.com/origin/a5/a5569cd8a6d090e462d4a67be54302f9.gif",
    "https://media3.giphy.com/media/iZjoLdS1nwMRq/giphy.gif",
    "https://media0.giphy.com/media/yZaInh5c9AUZHE0ee7/giphy-downsized.gif",
]
function heroImage(){
    heroIndex++;
    if(heroIndex >= heroArr.length){
        heroIndex = 0;
    }
    heroContainer.style.backgroundImage = 'url(' +heroArr[heroIndex] + ')';
}