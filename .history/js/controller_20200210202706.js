
// 
class Controller {
    constructor(gridSize_, spriteSize_) {
        document.getElementById("canvas").width = gridSize_ * spriteSize_;
        document.getElementById("canvas").height = gridSize_ * spriteSize_;
        context.width = document.getElementById("canvas").width;
        context.height = document.getElementById("canvas").height;
        this.model = new Model(gridSize_)
        this.view = new View(spriteSize_, this)
        this.view.updateFromModel(this.model)
        this.isFirstClick = false
        this.selectedPosition = {}
    }

    click(x_, y_) {
        // console.log("click("+x_+", "+y_+"), isFirstClick:" +this.isFirstClick)
        if(!this.isFirstClick) { // first selection 
            this.isFirstClick = true;
            this.selectedPosition.x = x_
            this.selectedPosition.y = y_
            this.view.selected(x_, y_)
            this.view.animate(context)

            // this.view.click(x_, y_)
        } else { // second selection
            if(this.selectedPosition.x != x_ && this.selectedPosition.y != y_) {
                this.isFirstClick = false;
                this.model.swap(x_, y_, this.selectedPosition.x, this.selectedPosition.y)
            }
            this.view.swap(x_, y_, this.selectedPosition.x, this.selectedPosition.y)
        }
    }

    // est appelé automatiquement quand la vue s'est mise à jour avec l'animation
    // Quand la vue s'est stabilisée, ca veut dire que l'animation en cours
    // est terminée et que la vue reflète bien le modèle
    // à ce stade, il faut pour le contrôleur, observer le modèle et le modifier
    // et éventuellement relancer une animation de la vue
    afterAnimation(context) { 
        console.log("controller -> afterAnimation")
        if(this.model.isExplodePossible()) {
            this.model.explode()
            this.view.updateFromModel(this.model)
            this.view.animate(context)
        } else {
            this.repackGrid()
        }
        document.addEventListener("click", onclick)
    }

    // fait tomber et rebouche les trous en créant de nouveaux bonbons
    repackGrid(context) { 
        console.log("controller -> repackGrid")
        for(let i in this.model.grid) {
            for(let j in this.model.gird[i]) {
                if(this.model.grid[i][j] == -1) {
                    this.model.grid[i][j] = this.model.getRandom();
                    this.view.createSprite(i, j, this.model.grid[i][j])
                }
            }
        }
        this.view.animate(context)
    }

    // repack une colonne: donne faux si pas besoin
    repackColumn(col) { 
        console.log("controller -> repackColumn")
    }
}