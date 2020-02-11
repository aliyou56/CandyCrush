
//
class View {

    constructor(spriteSize_, controller_) {
        this.spriteSize = spriteSize_
        this.controller = controller_
        this.grid = new Array()
    }

    // intervertit deux cases dans la vue
    swap(x1_, y1_, x2_, y2_) {
        let gridX1 = this.gridIndex(x1_)
        let gridY1 = this.gridIndex(y1_)
        let gridX2 = this.gridIndex(x2_)
        let gridY2 = this.gridIndex(y1_)
        let sprite1 = this.getSpriteFromPosition(x1_, y1_)
        let sprite2 = this.getSpriteFromPosition(x2_, y2_)
        sprite1.position(gridX2 * this.spriteSize, gridY2 * this.spriteSize)
        sprite1.isSelected = false
        sprite2.position(gridX1 * this.spriteSize, gridY1 * this.spriteSize)
        sprite2.isSelected = false
        sprite1.draw(context)
        sprite2.draw(context)
    }
    
    newSprite(x_, y_, obj_) {

    }

    //
    click(x_, y_) {
        let sprite = this.getSpriteFromPosition(x_, y_)
        // console.log(sprite)
        if(!sprite.isSelected) {
            sprite.isSelected = true
            sprite.draw(context)
        }
    }

    gridIndex(value_) {
        return Math.floor(value_ / this.spriteSize)
    }

    getSpriteFromPosition(x_, y_) {
        let gridX = Math.floor(x_ / this.spriteSize)
        let gridY = Math.floor(y_ / this.spriteSize)
        // console.log("gridX=" + gridX + ", gridY=" + gridY)
        return this.grid[gridY][gridX]
    }

    //
    init(model) {
        // console.log("View -> init")
        for(let i in model.grid) {
            var row = []
            for(let j in model.grid[i]) {
                var sprite = new Sprite(model.grid[i][j], this.spriteSize, this.spriteSize)
                var x = i - model.grid.length
                //sprite.position(x, j)
                //sprite.moveTo(i, j)
                sprite.position(j*this.spriteSize, i*this.spriteSize)
                row.push(sprite)
            }
            this.grid.push(row)
        }
    }

    // anime les bonbons et quand c'est terminé, appelle le contrôleur
    animate(context) {
        // console.log("View -> animate")
        this.updateAll()
        this.drawAll(context)
        var that = this
        console.log("view.isMoving : " + this.isMoving())
        if(that.isMoving()) {
            setTimeout(() => {that.animate(context)}, 10)
        } else {
            that.controller.afterAnimation()
        }
    }

    //
    drawAll(context) {
        // console.log("View -> drawAll")
        //context.fillStyle = "white"
        context.clearRect(0, 0, context.width, context.height);
        for(let row of this.grid) {
            for(let sprite of row) {
                sprite.draw(context)
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
