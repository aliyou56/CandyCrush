/**
 * The controller of the candy crush game
 */
class Controller {

    /**
     * Constructor with the size of the grid, the size of a sprite
     * and the context for drawing.
     * 
     * @param {*} gridSize_ The size of the grid (model)
     * @param {*} spriteSize_ The size of a sprite
     * @param {*} context_ The context
     */
    constructor(gridSize_, spriteSize_, context_) {
        canvas.width = context.width = gridSize_ * spriteSize_;
        canvas.height = context.height = gridSize_ * spriteSize_;
        this.context = context_

        this.model = new Model(gridSize_)
        this.view = new View(spriteSize_)
        this.view.syncWithModel(this.model)
        this.view.drawAll(this.context)

        this.isFirstClick = true
        this.selectedSprite = {}
        this.isSwap = false

        this.gameEventHandler(this.context) // start the game
    }

    /**
     * called when a click event has been detected on the gird.
     */
    click(x_, y_) {
        // console.log("click("+x_+", "+y_+"), isFirstClick:" +this.isFirstClick)
        let y = Math.floor(x_ / this.view.spriteSize)
        let x = Math.floor(y_ / this.view.spriteSize)  
        if(this.isFirstClick) { // first selection 
            this.isFirstClick = false;
            this.selectedSprite.x = x; this.selectedSprite.y = y
            this.view.selected(x, y, true)
            this.view.drawAll(context)
        } else { // second selection

            function areNeighbors(x1_, y1_, x2_, y2_) {
                if(x1_ === x2_ && y1_ === y2_) {
                    return false
                }
                return (
                    (x1_ === x2_ || x1_ === x2_ + 1 || x1_ === x2_ - 1) &&
                    (y1_ === y2_ || y1_ === y2_ + 1 || y1_ === y2_ - 1) 
                )
            }

            this.isFirstClick = true
            this.view.selected(this.selectedSprite.x, this.selectedSprite.y, false)
            if( areNeighbors(x, y, this.selectedSprite.x, this.selectedSprite.y) ) {
                this.model.swap(x, y, this.selectedSprite.x, this.selectedSprite.y)
                if(this.model.isAlignmentExist()) {
                    this.view.swap(x, y, this.selectedSprite.x, this.selectedSprite.y)
                    this.isSwap = true
                    this.gameEventHandler(this.context)
                    this.isSwap = false
                } else {
                    this.model.swap(x, y, this.selectedSprite.x, this.selectedSprite.y)
                    this.view.drawAll(this.context)
                }
            } else {
                this.view.drawAll(this.context)
            }
        }
    }

    /** 
     * This method handle all game events. It's called after every
     * animation such as moving or shrinking animations.
     * If there is an alignment, it launch the animation of shrinking 
     * and explode alignments found in the model.
     * If no alignment is found, it repack column and grid if the
     * grid is not full.
     */
    gameEventHandler(context_) {
        // console.log("[controller.gameEventHandler]")
        document.removeEventListener("click", onClick)
        var that = this
        if(that.isSwap) {
            that.view.animate(context_, callback)
        } else {
            callback()
        }
        document.addEventListener("click", onClick)

        function updateScore() {
           document.getElementById("score").innerHTML = "Score: " + that.model.score
        }

        function callback() {
            if(that.model.isAlignmentExist()) {

                let alignments = that.model.allAlignments()
                if(alignments.length > 0) {
                    that.view.shrinkAnimation(context_, alignments, callback, updateScore)
                    that.model.explode(alignments)
                } else {
                    that.view.syncWithModel(that.model)
                }
            } else {
                let isGridNotFull = false
                for(let col=0; col<that.model.grid[0].length; col++) {
                    if(that.repackColumn(col)) {
                        isGridNotFull = true
                    }
                } 
                
                if(isGridNotFull) {
                    that.view.syncWithModel(that.model)
                    that.repackGrid()
                    that.view.animate(context_, callback)
                } else {
                    if(initializing) {
                        initializing = false
                        that.model.startScoring = true
                    }
                }
            }
        }
    }

    /**
     * Drops new candies in the grid to complete it.
     */
    repackGrid() { 
        // console.log("[Controller.repackGrid]")
        for(let col=0; col<this.model.grid[0].length; col++) {
            let row = 0
            while(row < this.model.grid.length && this.model.grid[row][col] === -1) {
                this.model.grid[row][col] = this.model.getRandom();
                this.view.createSprite(row, col, this.model.grid[row][col])
                row++
            }
        }
    }

    /**
     * Repack the given column. 
     * 
     * @param {*} col_ The colum to repack
     * @return true if there is at least one empty row, false otherwise
     */
    repackColumn(col_) { 
        // console.log("[Controller.repackColumn]")
        let lastEmptyRow = this.model.grid.length-1
        while(lastEmptyRow >= 0 && this.model.grid[lastEmptyRow][col_] != -1) {
            lastEmptyRow--
        }
        if(lastEmptyRow >= 0) {
            for(let row=lastEmptyRow-1; row>=0; row--) {
                if(this.model.grid[row][col_] != -1) {
                    this.model.swap(row, col_, lastEmptyRow, col_);
                    lastEmptyRow--
                }
            }
        }
        return (lastEmptyRow >= 0)
    }
}