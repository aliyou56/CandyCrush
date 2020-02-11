
// This class represent a sprite object in the candy crush game.
// It contains the type of the sprite, the width and the height.
// It contains also different methods which allow it among others
// to update itself or to draw itself in a context.
class Sprite {

    // Constructor with type of the sprite, the width anf the height
    constructor(obj_, width_, height_) {
        this.obj = obj_
        this.width = width_
        this.height = height_

        this.isSelected = false
        this.x = 0
        this.y = 0
        this.toX = 0
        this.toY = 0
    }

    // Position the sprite at the given position (x_, y_) on the grid
    position(x_, y_) {
        this.x = x_
        this.y = y_
        this.toX = x_
        this.toY = y_
    }

    // Draw the sprite to it's current position in the given context.
    draw(context_) {
        // console.log("[Sprite.draw] ", context_)
        if(this.isSelected) {
            context_.fillStyle = "black"
            context_.globalAlpha = 0.2
            context_.fillRect(this.x, this.y, this.width, this.height);
            context_.globalAlpha = 1
        } 
        context_.drawImage(images[this.obj-1], this.x, this.y, this.width, this.height);
    }

    // 
    animate(context_) {
        console.log("[Sprite.animate] ", context_)
        document.removeEventListener("click", onclick)
        this.update()
        this.draw(context_)
        if(this.isMoving()) {
            setTimeout(animate, 100)
        }
    }

    // Update the position (x, y) of the sprite with an offset of +/-5
    // when it's current position is different from the new position (toX, toY)
    update() {
        var offset = this.width
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
        return !(this.x === this.toX && this.y === this.toY)
    }

    // Move the sprite to the given position (x_, y_)
    moveTo(x_, y_) {
        this.toX = x_
        this.toY = y_
        // this.isSelected = false
    }
}