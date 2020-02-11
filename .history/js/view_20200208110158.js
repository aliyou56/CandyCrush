
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
        let gridY2 = this.gridIndex(y2_)
        let sprite1 = this.grid[gridY1][gridX1]
        let sprite2 = this.grid[gridY2][gridX2]
        this.grid[gridY1][gridX1] = sprite2
        this.grid[gridY2][gridX2] = sprite1
        sprite1.position(gridX2 * this.spriteSize, gridY2 * this.spriteSize)
        sprite2.position(gridX1 * this.spriteSize, gridY1 * this.spriteSize)
        sprite1.isSelected = false
        sprite2.isSelected = false
         console.log(sprite1)
         console.log(sprite2)
        sprite1.draw(context)
        sprite2.draw(context)
    }
    
    newSprite(x_, y_, obj_) {

    }

    //
    click(x_, y_) {
        let gridX = this.gridIndex(x_)
        let gridY = this.gridIndex(y_)
        let sprite = this.grid[gridY][gridX]
        // console.log("gridX=" + gridX + ", gridY=" + gridY)
        // console.log(sprite)
        if(!sprite.isSelected) {
            sprite.isSelected = true
            sprite.draw(context)
        }
    }

    gridIndex(value_) {
        return Math.floor(value_ / this.spriteSize)
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
