
window.onload = function() {

    // variable globale
    context = document.getElementById("canvas").getContext("2d");
    context.width = document.getElementById("canvas").width;
    context.height = document.getElementById("canvas").height;

    images_src = ["images/Blue.png", "images/Green.png", "images/Orange.png", "images/Red.png", "images/Yellow.png"]
    nbImages = images_src.length
    images = []
    
    for(let src of images_src) {
        images.push(loadImage(src))
    }

    function loadImage(src_) {
        var img = new Image()
        img.onload = function() {
            // console.log("image loaded -> ", src_)
            nbImages--
        }
        img.src = src_
        // console.log("loading image -> ", src_)
        return img
    }
    
    var timerID = setInterval(function() {
        if(nbImages == 0) {
            clearInterval(timerID)
            game = new Controller(10, 50) // cree une grille de 10x10 avec des lutins de taille 50x50
            game.view.animate(context)
        }
    }, 0)

    function onclick(event) { 
        if (event.target.id == "canvas") {
            let x = event.pageX - event.target.offsetLeft;
            let y = event.pageY - event.target.offsetTop;
            game.click(x,y)
        }
    }

    document.addEventListener("click", onclick);
}