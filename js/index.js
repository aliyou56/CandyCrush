window.onload = function() {

    /**
     * indicates wether the initialization is finished or not.
     * The scoring rely on it. It starts only after the initialization.  
     */
    initializing = true 

    canvas = document.getElementById("canvas")
    context = canvas.getContext("2d");

    images_src = ["images/Blue.png", "images/Green.png", "images/Orange.png", "images/Red.png", "images/Yellow.png"]
    nbImages = images_src.length
    images = images_src.map(loadImage)

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
            game = new Controller(10, 50, context)
        }
    }, 0)

    document.addEventListener("click", onClick);
}

/**
 * Capture user click
 * @param {*} event 
 */
function onClick(event) { 
    if (event.target.id == "canvas") {
        let x = event.pageX - event.target.offsetLeft;
        let y = event.pageY - event.target.offsetTop;
        game.click(x,y)
    }
}
