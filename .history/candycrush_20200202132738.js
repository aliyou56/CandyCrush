
window.onload = function() {

}

//
class Rectangle {
    constructor(width_, height_) {
        this.width = width_
        this.height = height_
    }
}

// La classe Sprite représente un objet (bonbon) dans le jeu candy crush
// Elle contient le type de bonbon, sa largeur et sa hauteur. Elle contient
// également différentes méthodes lui permettant notement de se mettre à 
// jour et de se dessiner dans un context.
class Sprite {

    // Constructeur avec le type de bonbon, la largeur et la hauteur
    constructor(obj_, width_, height_) {
        this.obj = obj_
        this.width = width_
        this.height = height_
        this.isSelected = false
    }

    position(x1_, y1_) {

    }

    selected(isSelected_) {

    }

    isMoving() {

    }

    moveTo(x_, y_) {

    }

    update() {

    }

    // Dessine le sprite à sa position courante
    draw(context) {
        if(this.isSelected) {

        } else {
            
        }
    }

    animate(context) {
        this.update()
        this.draw(context)
        if(this.isMoving()) {
            setTimeout(animate, 100)
        }
    }
}


//
class View {
    constructor() {

    }
}

// 
class Model {
    constructor() {

    }
}

// 
class Controller {
    constructor() {

    }
}