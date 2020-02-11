
// 
class Controller {
    constructor(gridSize_, spriteSize_) {
        canvas.width = context.width = gridSize_ * spriteSize_;
        canvas.height = context.height = gridSize_ * spriteSize_;
        this.model = new Model(gridSize_)
        this.view = new View(spriteSize_, this)
        this.view.updateFromModel(this.model)
        this.isFirstClick = false
        this.selectedPosition = {}
    }

    click(x_, y_) {
        // console.log("click("+x_+", "+y_+"), isFirstClick:" +this.isFirstClick)
        // TODO
        let x = Math.floor(x_ / 50)
        let y = Math.floor(y_ / 50)  
        if(!this.isFirstClick) { // first selection 
            this.isFirstClick = true;
            this.selectedPosition.x = x
            this.selectedPosition.y = y
            this.view.selected(x, y, true)
            this.view.animate(context)
        } else { // second selection
            if(this.selectedPosition.x != x && this.selectedPosition.y != y
                && (x === this.selectedPosition.x + 1 || x === this.selectedPosition.x - 1 )
                && (y === this.selectedPosition.y + 1 || y === this.selectedPosition.y - 1 )) {
                this.isFirstClick = false;
                this.model.swap(x, y, this.selectedPosition.x, this.selectedPosition.y)
                if(!this.model.isExplodePossible()) {
                    this.model.swap(x, y, this.selectedPosition.x, this.selectedPosition.y)
                    this.view.selected(this.selectedPosition.x, this.selectedPosition.y, false)
                    this.view.animate(context)
                } else {
                    this.view.swap(x, y, this.selectedPosition.x, this.selectedPosition.y)
                    this.view.animate(context)
                }
            }
        }
    }

    // est appelé automatiquement quand la vue s'est mise à jour avec l'animation
    // Quand la vue s'est stabilisée, ca veut dire que l'animation en cours
    // est terminée et que la vue reflète bien le modèle
    // à ce stade, il faut pour le contrôleur, observer le modèle et le modifier
    // et éventuellement relancer une animation de la vue
    afterAnimation(context_) { 
        console.log("controller -> afterAnimation")
        // boss++
        // if(boss < 20){
        if(this.model.isExplodePossible()) {
            this.model.explode()
            this.view.updateFromModel(this.model)
            this.view.drawAll(context_)
        } else {
            this.repackGrid(context_)
        }
        document.addEventListener("click", onclick)
    // }
    }

    // fait tomber et rebouche les trous en créant de nouveaux bonbons
    repackGrid(context_) { 
        console.log("[Controller.repackGrid]")
        for(let i in this.model.grid[0].length) {
            repackColumn(i)
        }
        // for(let i in this.model.grid) {
        //     for(let j in this.model.gird[i]) {
        //         if(this.model.grid[i][j] === -1) {
        //             this.model.grid[i][j] = this.model.getRandom();
        //             this.view.createSprite(i, j, this.model.grid[i][j])
        //         }
        //     }
        // // }
        this.view.drawAll(context_)
    }

    // repack une colonne: donne faux si pas besoin
    repackColumn(col) { 
        console.log("[Controller.repackColumn]")
        let lastEmptySpriteIdx = this.model.grid.length
        while(lastEmptySpriteIdx > 0 && this.model.gird[lastEmptySpriteIdx][col] != -1) {
            lastEmptySpriteIdx--
        }
        if(lastEmptySpriteIdx > 0) {
            for(let row=lastEmptySpriteIdx-1; row<0; row--) {
                if(this.model.gird[row][col] != -1) {
                    this.model.swap(lastEmptySpriteIdx, col, row, col);
                    this.view.moveTo(row, col, lastEmptySpriteIdx, col)
                    lastEmptySpriteIdx++
                }
            }
        }

        // for(let row in this.model.grid.length) {
        //     if(this.model.grid[row][col] === -1) {
        //         this.model.grid[row][col] = this.model.getRandom();
        //         this.view.createSprite(row, col, this.model.grid[i][j])
        //     }
        // }
    }
}