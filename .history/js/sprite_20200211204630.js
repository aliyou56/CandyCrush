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
        this._shrinkStep = 10
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
    animate(context_) {
        // console.log("[Sprite.animate] ")
        document.removeEventListener("click", onclick)
        this.update()
        this.draw(context_)
        if(this.isMoving()) {
            setTimeout(animate, 100)
        }
    }

    /**
     * Update the position (x, y) of the sprite with an offset of +/-5
     * when it's current position is different from the new position (toX, toY)
     */
    update() {
        var offset = this.width
        if(this.x != this.toX) {
            this.x = (this.x < this.toX) ? this.x+offset : this.x-offset
        }
        if(this.y != this.toY) {
            this.y = (this.y < this.toY) ? this.y+offset : this.y-offset
        } 
    }

    /**
     * Reduces the sprite size with a fixed step: _shrinkStep.
     */
    shrink() {
        this.x = this.x + this._shrinkStep/2
        this.y = this.y + this._shrinkStep/2
        this.width = this.width - this._shrinkStep
        this.height = this.height - this._shrinkStep
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
        return !( this.width > 0 && this.height > 0 )
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