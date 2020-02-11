
//
class View {

    constructor(spriteSize_, controller_) {
        this.spriteSize = spriteSize_
        this.controller = controller_
        this.grid = new Array()
    }

    // intervertit deux cases dans la vue
    swap(x1, y1, x2, y2) {

    }
    
    newSprite(x_, y_, obj_) {

    }

    // dessine la vue sans animation
    show(context) { 

    }

    //
    click(x_, y_) {
        let gridX = Math.floor(x_ / this.spriteSize)
        let gridY = Math.floor(y_ / this.spriteSize)
        let sprite = this.grid[gridY][gridX]
        // console.log("gridX=" + gridX + ", gridY=" + gridY)
        // console.log(sprite)
        if(!sprite.isSelected) {
            sprite.isSelected = true
            sprite.draw(context)
        }
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
        if(this.isMoving()) {
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
