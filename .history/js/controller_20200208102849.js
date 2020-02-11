
// 
class Controller {
    constructor(gridSize_, spriteSize_) {
        document.getElementById("canvas").width = gridSize_ * spriteSize_;
        document.getElementById("canvas").height = gridSize_ * spriteSize_;
        this.model = new Model(gridSize_)
        this.view = new View(spriteSize_, this)
        this.view.init(this.model)
        this.isSpriteSelected = false
        this.lastSelectedPosition = {}
    }

    click(x_, y_) {
        console.log("click("+x_+", "+y_+"), isSpriteSelected:" +this.isSpriteSelected)
        if(!this.isSpriteSelected) { // first selection
            this.isSpriteSelected = true;
            this.view.click(x_, y_)
            this.lastSelectedPosition.x = x_
            this.lastSelectedPosition.y = y_
        } else { // second selection
            this.isSpriteSelected = false;
            this.view.swap(x_, y_, this.lastSelectedPosition.x, this.lastSelectedPosition.y)
            console.log("second - isSpriteSelected:" +this.isSpriteSelected)
        }
    }

    // est appelé automatiquement quand la vue s'est mise à jour avec l'animation
    // Quand la vue s'est stabilisée, ca veut dire que l'animation en cours
    // est terminée et que la vue reflète bien le modèle
    // à ce stade, il faut pour le contrôleur, observer le modèle et le modifier
    // et éventuellement relancer une animation de la vue
    afterAnimation(context) { 

    }

    repackGrille(contexte) { // fait tomber et rebouche les trous en créant de nouveaux bonbons
    }

    repackColonne(col) { // repack une colonne: donne faux si pas besoin
    } // repackColonne
}