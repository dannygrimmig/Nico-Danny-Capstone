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