
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
}