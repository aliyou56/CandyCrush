
window.onload = function() {    
    //var b = new Sprite(1, 40, 40)
    //console.log("imagePat ->" + b.getImagePath())
}



// This class represent a sprite object (bonbon) in the candy crush game.
// It contains the type of the sprite, the width and the height.
// It contains also differents methods which allow it among others
// to update itself or to draw itself in a context.
class Sprite {

    // Constructor with type of the sprite, the width anf the height
    constructor(obj_, width_, height_) {
        this.obj = obj_
        this.width = width_
        this.height = height_

        this.isSelected = false
        this.x = this.toX = 0
        this.y = this.toY = 0
    }

    // Position the sprite at the given position (x_, y_)
    position(x_, y_) {
        this.x = this.toX = x_
        this.y = this.toY = y_
    }

    // Draw the sprite to it's current position in the given context.
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

    //
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

    //
    animate(context) {
        this.update()
        this.draw(context)
        if(this.isMoving()) {
            setTimeout(animate, 100)
        }
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
    
    constructor() {}

    animate(context) {
        this.updateAll()
        this.drawAll(context)
        var that = this
        if(this.isMoving()) {
            setTimeout(() => {that.animate(context)}, 100)
        }
    }

    drawAll(context) {

    }

    updateAll() {

    }

    // Return true if at least a sprite is in movement, false otherwise
    isMoving() {

    }
}

//
// class Rectangle {
//     constructor(width_, height_) {
//         this.width = width_
//         this.height = height_
//     }
// }
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