
window.onload = function() {  
    init()
}

function init() { // démarrage du jeu

    image_src = ["images/Blue", "images/Green", "images/Orange", "images/Red", "images/Yellow"]
    nbImages = image_src.length
    images = []
    
    function loadImage(src_) {
        var img = new Image()
        img.onload = function() {
            console.log("image loaded -> ", src_)
            nbImages--
        }
        img.src = src_
        console.log("loading image -> ", src_)
        return img
    }
    
    function onclick(event) { // on intercepte le click souris
        // calcul des coordonnées de la souris dans le canvas
        if (event.target.id == "canvas") {
            let x = event.pageX - event.target.offsetLeft;
            let y = event.pageY - event.target.offsetTop;
            game.click(x,y)
        }
    }

    // variable globale
    context = document.getElementById("canvas").getContext("2d");
    context.width = document.getElementById("canvas").width;
    context.height = document.getElementById("canvas").height;

    document.addEventListener("click", onclick);

    var timerID = setInterval(function() {
        if(nbImages == 0) {
            clearInterval(timerID)
            game = new Controller(10, 50) // cree une grille de 10x10 avec des lutins de taille 50x50
            game.view.animate(context)
        }
    }, 0)
}


// // This class represent a sprite object (bonbon) in the candy crush game.
// // It contains the type of the sprite, the width and the height.
// // It contains also different methods which allow it among others
// // to update itself or to draw itself in a context.
// class Sprite {

//     // Constructor with type of the sprite, the width anf the height
//     constructor(obj_, width_, height_) {
//         this.obj = obj_
//         this.width = width_
//         this.height = height_

//         this.isSelected = false
//         this.x = 0
//         this.y = 0
//         this.toX = 0
//         this.toY = 0
//     }

//     // Position the sprite at the given position (x_, y_) on the grid
//     position(x_, y_) {
//         this.x = x_
//         this.y = y_
//         this.toX = x_
//         this.toY = y_
//     }

//     // Draw the sprite to it's current position in the given context.
//     draw(context) {
//         //console.log("Sprite->draw: obj="+this.obj+", "
//         // +"grid("+this.x+", "+this.y+"), to("+this.toX+", "+this.toX+"), ")
//         var that = this
//         var img = new Image()
//         img.onload = function() {
//             if(that.isSelected) {
//                 context.fillStyle = "black"
//                 context.globalAlpha = 0.2
//                 context.fillRect(that.x, that.y, that.width, that.height);
//                 context.globalAlpha = 1
//             } 
//             context.drawImage(img, that.x, that.y, that.width, that.height);
//         }
//         img.src = this.getImagePath()
//     }

//     // Return the path of the sprite image based on it's object.
//     getImagePath() {
//         var result = "images/"
//         switch(this.obj) {
//             case 1: result += "Blue"; break;
//             case 2: result += "Green"; break;
//             case 3: result += "Orange"; break;
//             case 4: result += "Red"; break;
//             case 5: result += "Yellow"; break;
//             default:
//         }
//         return result + ".png"
//     }

//     // 
//     animate(context) {
//         this.update()
//         this.draw(context)
//         if(this.isMoving()) {
//             setTimeout(animate, 100)
//         }
//     }

//     // Update the position (x, y) of the sprite with an offset of +/-5
//     // when it's current position is different from the new position (toX, toY)
//     update() {
//         var offset = this.width
//         if(this.x != this.toX) {
//             this.x = (this.x < this.toX) ? this.x+offset : this.x-offset
//         }
//         if(this.y != this.toY) {
//             this.y = (this.y < this.toY) ? this.y+offset : this.y-offset
//         } 
//     }

//     // Return true if the sprite is in movement (when it doesn't
//     // get to the position (toX, toY) ), false otherwise.
//     isMoving() {
//         return !(this.x === this.toX && this.y === this.toY)
//     }

//     // Move the sprite to the given position (x_, y_)
//     moveTo(x_, y_) {
//         this.toX = x_
//         this.toY = y_
//         this.isSelected = false
//     }
// }