
//
class View {

    constructor(spriteSize_) {
        this.spriteSize = spriteSize_
        this.grid = new Array()
    }

    /**
     * Synchronized the view with the model.
     * @param {*} model The model with which to synchronize.
     */
    syncWithModel(model) {
        console.log("[View.updateFromModel]")
        if(this.grid.length == 0) {
            this.grid = new Array(model.grid.length)
        }
        for(let i in model.grid) {
            var row = []
            for(let j in model.grid[i]) {
                var sprite = new Sprite(model.grid[i][j], this.spriteSize, this.spriteSize)
                // var x = j - model.grid.length
                sprite.position(j*this.spriteSize, i*this.spriteSize)
                row.push(sprite)
            }
            this.grid[i] = row
        }
    }

    /**
     * anime les bonbons et quand c'est terminé, appelle le contrôleur
     * @param {*} context_ 
     * @param {*} callback_ 
     */
    animate(context_, callback_) {
        // console.log("[View.animate]")
        document.removeEventListener("click", onclick)
        this.updateAll()
        this.drawAll(context_)
        var that = this
        if(this.isMoving()) {
            setTimeout(() => {that.animate(context_, callback_)}, 100)
        } else {
            callback_()
        }
    }
    moveSpriteTo(gridX_, gridY_, toGridX_, toGridY_) {
        let screenX = toGridY_ * this.spriteSize
        let scrrenY = toGridX_ * this.spriteSize
        this.grid[gridY_][gridX_].moveTo(screenX, scrrenY)
    }

    // intervertit deux cases dans la vue
    swap(x1_, y1_, x2_, y2_) {
        // console.log("[view.swap]")
        let gridX1 = Math.floor(x1_ / this.spriteSize)
        let gridY1 = Math.floor(y1_ / this.spriteSize)
        let gridX2 = Math.floor(x2_ / this.spriteSize)
        let gridY2 = Math.floor(y2_ / this.spriteSize)
        let sprite1 = this.grid[gridY1][gridX1]
        let sprite2 = this.grid[gridY2][gridX2]
        this.grid[gridY1][gridX1] = sprite2
        this.grid[gridY2][gridX2] = sprite1
        sprite1.moveTo(gridX2 * this.spriteSize, gridY2 * this.spriteSize)
        sprite2.moveTo(gridX1 * this.spriteSize, gridY1 * this.spriteSize)
    }
    
    createSprite(x_, y_, obj_) {
        let sprite = new Sprite(obj_, this.spriteSize, this.spriteSize)
        this.grid[y_][x_] = sprite
        let x = x_ - model.grid.length
        sprite.position(y_ * this.spriteSize, x * this.spriteSize)
        sprite.moveTo(y_ * this.spriteSize, x_ * this.spriteSize)
    }

    selected(x_, y_, selected_) {
        this.grid[y_][x_].isSelected = selected_
    }

    //
    drawAll(context_) {
        console.log("[View.drawAll]")
        context_.fillStyle = "white"
        context_.fillRect(0, 0, context.width, context.height);
        //context.clearRect(0, 0, context.width, context.height);
        for(let row of this.grid) {
            for(let sprite of row) {
                sprite.draw(context_)
            }
        }
    }

    //
    updateAll() {
        // console.log("[View.updateAll]")
        for(let row of this.grid) {
            for(let sprite of row) {
                sprite.update()
            }
        }
    }

    // Return true if at least one sprite is in movement, false otherwise
    isMoving() {
        for(let row of this.grid) {
            for(let sprite of row) {
                if(sprite.isMoving()) {
                    return true
                }
            }
        }
        return false
    }
}