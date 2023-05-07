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
    "https://media0.giphy.com/media/KkLRkAnWA24SI/giphy.gif?cid=6c09b952243b8e3c8c70e9bbb62b6b50be25b0c20a994958&ep=v1_internal_gifs_gifId&rid=giphy.gif&ct=g",
    "https://media0.giphy.com/media/K4x1ZL36xWCf6/giphy.gif",
    "https://i.gifer.com/origin/a5/a5569cd8a6d090e462d4a67be54302f9.gif",
    "https://media2.giphy.com/media/yWTrzwWVS9x1zHPIwT/giphy.gif",
    "https://gifdb.com/images/high/ron-weasley-hungry-eating-tzf6maf4r9ow0ztc.gif",

]
function heroImage(){
    heroIndex++;
    if(heroIndex >= heroArr.length){
        heroIndex = 0;
    }
    heroContainer.style.backgroundImage = 'url(' +heroArr[heroIndex] + ')';
}