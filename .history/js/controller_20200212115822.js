/**
 * 
 */
class Controller {

    /**
     * 
     */
    constructor(gridSize_, spriteSize_, context_) {
        canvas.width = context.width = gridSize_ * spriteSize_;
        canvas.height = context.height = gridSize_ * spriteSize_;
        this.context = context_

        this.model = new Model(gridSize_)
        this.view = new View(spriteSize_, this)
        this.view.syncWithModel(this.model)
        this.view.drawAll(this.context)

        this.isFirstClick = true
        this.selectedPosition = {}

        this.gameEventHandler(this.context) // start the game
    }

    /**
     * 
     */
    click(x_, y_) {
        // console.log("click("+x_+", "+y_+"), isFirstClick:" +this.isFirstClick)
        let y = Math.floor(x_ / this.view.spriteSize)
        let x = Math.floor(y_ / this.view.spriteSize)  
        if(this.isFirstClick) { // first selection 
            // console.log("first click")
            this.isFirstClick = false;
            this.selectedPosition.x = x
            this.selectedPosition.y = y
            this.view.selected(x, y, true)
            this.view.drawAll(context)
        } else { // second selection

            function isNeighbor(x1_, y1_, x2_, y2_) {
                if(x1_ === x2_ && y1_ === y2_) {
                    return false
                }
                return (
                    (x1_ === x2_ || x1_ === x2_ + 1 || x1_ === x2_ - 1) &&
                    (y1_ === y2_ || y1_ === y2_ + 1 || y1_ === y2_ - 1) 
                )
            }

            this.isFirstClick = true
            if( isNeighbor(x, y, this.selectedPosition.x, this.selectedPosition.y) ) {
                this.model.swap(x, y, this.selectedPosition.x, this.selectedPosition.y)
                if(!this.model.isAlignmentExist()) {
                    this.model.swap(x, y, this.selectedPosition.x, this.selectedPosition.y)
                    this.view.selected(this.selectedPosition.x, this.selectedPosition.y, false)
                    this.view.drawAll(context)
                } else {
                    this.view.swap(x, y, this.selectedPosition.x, this.selectedPosition.y)
                    this.view.animate(context)
                }
            } else {
                this.view.selected(this.selectedPosition.x, this.selectedPosition.y, false)
                this.view.drawAll(context)
            }
        }
    }

    updateScore() {
        document.getElementById("score").innerHTML = "Score: " + this.model.score
    }
    
    /** est appelé automatiquement quand la vue s'est mise à jour avec l'animation
     * Quand la vue s'est stabilisée, ca veut dire que l'animation en cours
     * est terminée et que la vue reflète bien le modèle
     * à ce stade, il faut pour le contrôleur, observer le modèle et le modifier
     * et éventuellement relancer une animation de la vue
    */
    gameEventHandler(context_) {
        console.log("[controller.gameEventHandler]")
        document.removeEventListener("click", onclick)

        if(this.model.isAlignmentExist()) {

            let spriteToBeRemoved = this.model.allAlignments()
            if(spriteToBeRemoved.length > 0) {
                this.view.shrinkAnimation(context_, spriteToBeRemoved)
                this.model.explode(spriteToBeRemoved)
            } else {
                this.view.syncWithModel(this.model)
            }

        } else {

            let isGridNotFull = false
            for(let col=0; col<this.model.grid[0].length; col++) {
                if(this.repackColumn(col)) {
                    isGridNotFull = true
                }
            } 
            // console.log("[controller.gameEventHandler]: isGridNotFull=", isGridNotFull)
            if(isGridNotFull) {
                this.view.syncWithModel(this.model)
                this.repackGrid(context_)
                this.view.animate(context_)
            } else {
                if(initializing) {
                    initializing = false
                    this.model.startScoring = true
                }
                document.addEventListener("click", onclick)
            }

        }
    }

    // fait tomber et rebouche les trous en créant de nouveaux bonbons
    /**
     * Complete the grid with 
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