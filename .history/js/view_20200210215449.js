
//
class View {

    constructor(spriteSize_, controller_) {
        this.spriteSize = spriteSize_
        this.controller = controller_
        this.grid = new Array()

        // this._selectedSprite = {}
    }

    //
    updateFromModel(model) {
        console.log("[View.updateFromModel]")
        for(let i in model.grid) {
            var row = []
            for(let j in model.grid[i]) {
                var sprite = new Sprite(model.grid[i][j], this.spriteSize, this.spriteSize)
                // var x = j - model.grid.length
                sprite.position(j*this.spriteSize, i*this.spriteSize)
                row.push(sprite)
            }
            this.grid.push(row)
        }
    }

    // intervertit deux cases dans la vue
    swap(x1_, y1_, x2_, y2_) {
        // console.log("[view.swap]")
        let gridX1 = this.gridIndex(x1_)
        let gridY1 = this.gridIndex(y1_)
        let gridX2 = this.gridIndex(x2_)
        let gridY2 = this.gridIndex(y2_)
        let sprite1 = this.grid[gridY1][gridX1]
        let sprite2 = this.grid[gridY2][gridX2]
        this.grid[gridY1][gridX1] = sprite2
        this.grid[gridY2][gridX2] = sprite1
        sprite1.moveTo(gridX2 * this.spriteSize, gridY2 * this.spriteSize)
        sprite2.moveTo(gridX1 * this.spriteSize, gridY1 * this.spriteSize)
        //sprite1.isSelected = false
        //sprite2.isSelected = false
        this.animate(context)
    }
    
    createSprite(x_, y_, obj_) {
        let sprite = new Sprite(obj_, this.spriteSize, this.spriteSize)
        sprite.position(y_ * this.spriteSize, x_ * this.spriteSize)
        // TODO moveTo for the animation
        this.grid[y_][x_] = sprite
    }

    selected(x_, y_, selected_) {
        this.grid[y_][x_].isSelected = selected_
    }

    //
    // click(x_, y_) {
    //     let gridX = this.gridIndex(x_)
    //     let gridY = this.gridIndex(y_)
    //     let sprite = this.grid[gridY][gridX]
    //     // console.log("gridX=" + gridX + ", gridY=" + gridY)
    //     // console.log(sprite)
    //     // if(this._selectedSprite != sprite) {

    //     // }
    //     if(!sprite.isSelected) {
    //         sprite.isSelected = true
    //         sprite.draw(context)
    //     }
    // }

    gridIndex(value_) {
        return Math.floor(value_ / this.spriteSize)
    }

    // anime les bonbons et quand c'est terminé, appelle le contrôleur
    animate(context_) {
        console.log("[View.animate], ", context_)
        document.removeEventListener("click", onclick)
        this.updateAll()
        this.drawAll(context_)
        var that = this
        if(this.isMoving()) {
            setTimeout(() => {that.animate(context_)}, 100)
        } else {
            this.controller.afterAnimation()
        }
    }

    //
    drawAll(context_) {
        console.log("[View.drawAll] ", context_)
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
        // console.log("View -> updateAll")
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
