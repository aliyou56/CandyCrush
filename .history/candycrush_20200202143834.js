
window.onload = function() {    
    //var b = new Sprite(1, 40, 40)
    //console.log("imagePat ->" + b.getImagePath())
}

//
class Rectangle {
    constructor(width_, height_) {
        this.width = width_
        this.height = height_
    }
}

// La classe Sprite représente un objet (bonbon) dans le jeu candy crush
// Elle contient le type de bonbon, sa largeur et sa hauteur. Elle contient
// également différentes méthodes lui permettant notement de se mettre à 
// jour et de se dessiner dans un context.
class Sprite {

    // Constructeur avec le type de bonbon, la largeur et la hauteur
    constructor(obj_, width_, height_) {
        this.obj = obj_
        this.width = width_
        this.height = height_

        this.isSelected = false
        this.x = this.toX = 0
        this.y = this.toY = 0
    }

    animate(context) {
        this.update()
        this.draw(context)
        if(this.isMoving()) {
            setTimeout(animate, 100)
        }
    }

    position(x1_, y1_) {
        this.x = this.toX = x1_
        this.y = this.toY = y_
    }

    // Dessine le sprite à sa position courante
    // TODO when isSelected
    draw(context) {
        var img = new Image()
        img.onload = function() {
            if(this.isSelected) {
    
            } else {
                context.drawImage(img, this.x, this.y, this.width, this.height);
            }
        }
        img.src = getImagePath()
    }

    getImagePath() {
        var result = "images/"
        switch(this.obj) {
            case 1: result += "Blue"; break;
            case 2: result += "Green"; break;
            case 3: result += "Orange"; break;
            case 4: result += "Red"; break;
            case 5: result += "Yellow"; break;
            default:
        }
        return result + ".png"
    }

    // Update the position (x, y) of the sprite with an offset of +/-5
    // when it's current position ios different from the new position
    // (toX, toY)
    update() {
        var offset = 5
        if(this.x != this.toX) {
            this.x = (this.x < this.toX) ? this.x+offset : this.x-offset
        }
        if(this.y != this.toY) {
            this.y = (this.y < this.toY) ? this.y+offset : this.y-offset
        }
    }

    // Return true if the sprite is in movement (when it doesn't
    // get to the position (toX, toY) ), false otherwise.
    isMoving() {
        return (this.x === this.toX && this.y === this.toY)
    }

    // Move the sprite to the given position (x_, y_)
    moveTo(x_, y_) {
        this.toX = x_
        this.toY = y_
        this.selected(false)
    }

    // Make the sprite selected or not.
    selected(isSelected_) {
        this.selected = isSelected_
    }
}

//
class View {
    constructor() {

    }
}

// 
class Model {
    constructor() {

    }
}

// 
class Controller {
    constructor() {

    }
}