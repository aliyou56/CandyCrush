/**
 * The view of the candy crush game.
 */
class View {

    /**
     * Constructor with the size of the sprite and the controller
     * @param {*} spriteSize_ The size of the sprite
     * @param {*} controller_ The controller (allow to callback the gameEventsHandler)
     */
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
     * Animate all candies in the grid. When there is no more animation, it calls the
     * gameEventsHandler from the Controller.
     * 
     * @param {*} context_ The context on which to draw
     */
    animate(context_) {
        // console.log("[View.animate]")
        this.updateAll()
        this.drawAll(context_)
        if(this.isMoving()) {
            var that = this
            setTimeout(() => {that.animate(context_)}, 10)
        } else {
            this.controller.gameEventHandler(context_)
        }
    }
    
    /**
     * Animate candies shrinking. When there is no more animation, it calls the
     * gameEventsHandler from the Controller.
     * 
     * @param {*} context_ The context on which to draw
     * @param {*} removedCandies_ Array of removed candies
     */
    shrinkAnimation(context_, removedCandies_) {
        // console.log("[View.shrinkAnimation]: ", removedCandies_)
        this.shrink(removedCandies_)
        this.drawAll(context_)
        this.controller.updateScore()
        if(this.isShrinking(removedCandies_)) {
            let that = this
            setTimeout(() => { that.shrinkAnimation(context_, removedCandies_), 1000 } )
        } else {
            this.controller.gameEventHandler(context_)
        }
    }

    /**
     * @return true if at least one candy is shrinking, false otherwise
     * @param {*} removedCandies_ Array of removed candies
     */
    isShrinking(removedCandies_) {
        for(let rc of removedCandies_) {
            var [row, col, nb_elt, orientation] = rc
            if(orientation === 'h') {
                for(let i=0; i<nb_elt; i++) {
                    if(this.grid[row][col+i].isShrinking()) return true
                }
            } else {
                for(let i=0; i<nb_elt; i++) {
                    if(this.grid[row+i][col].isShrinking()) return true
                }
            }
        }
        return false;
    }

    /**
     * Shrink all candies in the given array.
     * @param {*} removedCandies_ Array of removed candies
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
     * swap two boxes in the view
     * @param {*} x1_ 
     * @param {*} y1_ 
     * @param {*} x2_ 
     * @param {*} y2_ 
     */
    swap(x1_, y1_, x2_, y2_) {
        // console.log("[view.swap]")
        let sprite1 = this.grid[x1_][y1_]
        let sprite2 = this.grid[x2_][y2_]
        this.grid[x1_][y1_] = sprite2
        this.grid[x2_][y2_] = sprite1
        sprite1.moveTo(y2_ * this.spriteSize, x2_ * this.spriteSize)
        sprite2.moveTo(y1_ * this.spriteSize, x1_ * this.spriteSize)
    }
    
    /**
     * Create a new sprite with the given information.
     * @param {*} x_ 
     * @param {*} y_ 
     * @param {*} obj_ 
     */
    createSprite(x_, y_, obj_) {
        let sprite = new Sprite(obj_, this.spriteSize, this.spriteSize)
        this.grid[x_][y_] = sprite
        let x = x_ - this.grid.length
        sprite.position(y_ * this.spriteSize, x * this.spriteSize)
        sprite.moveTo(y_ * this.spriteSize, x_ * this.spriteSize)
    }

    /**
     * Select or unselect a sprite.
     * @param {*} x_ 
     * @param {*} y_ 
     * @param {*} selected_ 
     */
    selected(x_, y_, selected_) {
        this.grid[x_][y_].isSelected = selected_
    }

    /**
     * Clear and draw all candies in the view
     * @param {*} context_ The context on which to draw
     */
    drawAll(context_) {
        // console.log("[View.drawAll]")
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
     * update all the candies (in movement)
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