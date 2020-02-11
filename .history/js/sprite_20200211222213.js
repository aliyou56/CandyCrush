/**
 * This class represent a sprite object in the candy crush game.
 * It contains the type of the sprite, the width and the height.
 * It contains also different methods which allow it among others
 * to update itself or to draw itself in a context.
 */
class Sprite {

    /**
     * Constructor with type of the sprite, the width anf the height
     * @param {*} obj_ The type of the sprite
     * @param {*} width_ The width of the sprite
     * @param {*} height_ The height of the sprite
     */
    constructor(obj_, width_, height_) {
        this.obj = obj_
        this.width = width_
        this.height = height_

        this.isSelected = false

        this.x = 0
        this.y = 0
        this.toX = 0
        this.toY = 0

        this._updateOffset = this.width
        this._shrinkStep = 4
    }

    /**
     * Position the sprite at the given position (x_, y_)
     * @param {*} x_ 
     * @param {*} y_ 
     */
    // Position the sprite at the given position (x_, y_) on the grid
    position(x_, y_) {
        this.x = x_; this.y = y_
        this.toX = x_; this.toY = y_
    }

    /**
     * Draw the sprite at it's current position (x, y) in the given context.
     * @param {*} context_ The context on which to draw 
     */
    draw(context_) {
        // console.log("[Sprite.draw] ")
        if(this.isSelected) {
            context_.fillStyle = "black"
            context_.globalAlpha = 0.2
            context_.fillRect(this.x, this.y, this.width, this.height);
            context_.globalAlpha = 1
        } 
        if(this.obj > 0) {
            context_.drawImage(images[this.obj-1], this.x, this.y, this.width, this.height);
        }
    }

    // 
    // animate(context_) {
    //     // console.log("[Sprite.animate] ")
    //     this.update()
    //     this.draw(context_)
    //     if(this.isMoving()) {
    //         setTimeout(animate, 100)
    //     }
    // }

    /**
     * Update the sprite' position (x, y) with a fixed offset +/- _updateOffset
     * when it's current position is different from the target position (toX, toY)
     */
    update() {
        if(this.x != this.toX) {
            this.x = (this.x < this.toX) ? this.x+this._updateOffset : this.x-this._updateOffset
        }
        if(this.y != this.toY) {
            this.y = (this.y < this.toY) ? this.y+this._updateOffset : this.y-this._updateOffset
        } 
    }

    /**
     * Reduces the sprite size with a fixed step: _shrinkStep.
     */
    shrink() {
        if(this.width > 0 && this.height > 0) {
        console.log("{Sprite.shrink]: in -> x=",this.x," y=", this.y, " w=", this.width, " h=", this.height)
        this.x += this._shrinkStep/2
        this.y += this._shrinkStep/2
        this.width -= this._shrinkStep
        this.height -= this._shrinkStep
        console.log("{Sprite.shrink]: out -> x=",this.x," y=", this.y, " w=", this.width, " h=", this.height)
        }
    }

    /**
     * @return true if the sprite is in movement (when it doesn't
     * get to the target position (toX, toY) ), false otherwise.
     */
    isMoving() {
        return !(this.x === this.toX && this.y === this.toY)
    }

    /**
     * @return true if the sprite is shrinking (when it's size (width, height) 
     * is not greater than 0), false otherwise.
     */
    isShrinking() {
        return !( //(this.x != this.toX || this.y != this.toY) &&
                  this.width > 0 && this.height > 0 
                )
    }

    /**
     * Move the sprite to the given position (toX_, toY_)
     * @param {*} toX_ The target X
     * @param {*} toY_ The target Y
     */
    moveTo(toX_, toY_) {
        this.toX = toX_; this.toY = toY_
    }
}