
// 
class Controller {
    constructor(gridSize_, spriteSize_) {
        document.getElementById("canvas").width = gridSize_ * spriteSize_;
        document.getElementById("canvas").height = gridSize_ * spriteSize_;
        this.model = new Model(gridSize_)
        this.view = new View(spriteSize_)
        this.view.init(this.model)
    }

    click(x_, y_) {
        console.log("click("+x_+", "+y_+")")
        this.view.click(x_, y_)
    }

    // est appelé automatiquement quand la vue s'est mise à jour avec l'animation
    // Quand la vue s'est stabilisée, ca veut dire que l'animation en cours
    // est terminée et que la vue reflète bien le modèle
    // à ce stade, il faut pour le contrôleur, observer le modèle et le modifier
    // et éventuellement relancer une animation de la vue
    afterAnimation(context) { 
}
}