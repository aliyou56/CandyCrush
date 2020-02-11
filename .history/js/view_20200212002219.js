/**
 * 
 */
class View {

    constructor(spriteSize_, controller_) {
        this.spriteSize = spriteSize_
        this.controller = controller_
        this.grid = new Array()
    }

    /**
     * Synchronized the view with the model.
     * @param {*} model The model with which to synchronize.
     */
    syncWithModel(model) {
        // console.log("[View.syncWithModel]")
        if(this.grid.length == 0) {
            this.grid = new Array(model.grid.length)
        }
        for(let i in model.grid) {
            var row = []
            for(let j in model.grid[i]) {
                var sprite = new Sprite(model.grid[i][j], this.spriteSize, this.spriteSize)
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
    animate(context_) {
        // console.log("[View.animate]")
        this.updateAll()
        this.drawAll(context_)
        if(this.isMoving()) {
            var that = this
            setTimeout(() => {that.animate(context_)}, 100)
        } else {
            this.controller.gameEventHandler(context_)
        }
    }
    
    /**
     * 
     */
    shrinkAnimation(context_, removedCandies_) {
        // console.log("[View.shrinkAnimation]: ", removedCandies_)
        this.shrink(removedCandies_)
        this.drawAll(context_)
        if(this.isShrinking(removedCandies_)) {
            let that = this
            setTimeout(() => { that.shrinkAnimation(context_, removedCandies_), 1000 } )
        } else {
            this.controller.gameEventHandler(context_)
        }
    }

    /**
     * 
     * @param {*} removedCandies_ 
     */
    isShrinking(removedCandies_) {
        for(let rc of removedCandies_) {
            var [row, col, nb_elt, orientation] = rc
            if(orientation === 'h') {
                for(let i=0; i<nb_elt; i++) {
                    if(this.grid[row][col+i].isShrinking()) {
                        // console.log("[View.isShrinking]: true")
                        return true
                    }
                }
            } else {
                for(let i=0; i<nb_elt; i++) {
                    if(this.grid[row+i][col].isShrinking()) {
                        // console.log("[View.isShrinking]: true")
                        return true
                    }
                }
            }
        }
        // console.log("[View.isShrinking]: false")
        return false;
    }

    /**
     * 
     * @param {*} removedCandies_ 
     */
    shrink(removedCandies_) {
        // console.log("[View.shrink]: ")
        for(let rc of removedCandies_) {
            var [row, col, nb_elt, orientation] = rc
            if(orientation === 'h') {
                for(let i=0; i<nb_elt; i++) {
                    this.grid[row][col+i].shrink()
                }
            } else {
                for(let i=0; i<nb_elt; i++) {
                    this.grid[row+i][col].shrink()
                }
            }
        }
    }

    /**
     * intervertit deux cases dans la vue
     * @param {*} x1_ 
     * @param {*} y1_ 
     * @param {*} x2_ 
     * @param {*} y2_ 
     */
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
        this.grid[x_][y_] = sprite
        let x = x_ - this.grid.length
        sprite.position(y_ * this.spriteSize, x * this.spriteSize)
        sprite.moveTo(y_ * this.spriteSize, x_ * this.spriteSize)
    }

    /**
     * 
     * @param {*} x_ 
     * @param {*} y_ 
     * @param {*} selected_ 
     */
    selected(x_, y_, selected_) {
        this.grid[x_][y_].isSelected = selected_
    }

    /**
     * 
     * @param {*} context_ 
     */
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

    /**
     * 
     */
    updateAll() {
        // console.log("[View.updateAll]")
        for(let row of this.grid) {
            for(let sprite of row) {
                sprite.update()
            }
        }
    }

    /**
     * @return true if at least one sprite is in movement, false otherwise
     */
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