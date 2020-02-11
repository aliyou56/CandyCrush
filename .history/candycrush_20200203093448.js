
window.onload = function() {  
    var canvas = document.getElementById("canvas")
    var context = canvas.getContext("2d")
        
    var controller = new Controller(context)
    controller.view.animate(context)
    // result = new Array()
    // for(let i=0; i<4; i++) {
    //     let row = []
    //     for(let j=0; j<4; j++) {
    //         row.push(Math.floor((Math.random() * 5) +1))
    //     }
    //     result.push(row)
    // }
    // for(e of result) {
    //     //for(k of e) {
    //         this.console.log(e)
    //     //}
    // }
    //var b = new Sprite(1, 40, 40)
    //console.log("imagePat ->" + b.getImagePath())
}



// This class represent a sprite object (bonbon) in the candy crush game.
// It contains the type of the sprite, the width and the height.
// It contains also differents methods which allow it among others
// to update itself or to draw itself in a context.
class Sprite {

    // Constructor with type of the sprite, the width anf the height
    constructor(obj_, width_, height_) {
        this.obj = obj_
        this.width = width_
        this.height = height_

        this.isSelected = false
        this.x = this.toX = 0
        this.y = this.toY = 0
        this.pageX = this.pageY = 0
    }

    // Position the sprite at the given position (x_, y_)
    position(x_, y_) {
        this.x = this.toX = x_
        this.y = this.toY = y_
        this.pageX = x_ * 40
        this.pageY = y_ * 40
    }

    // Draw the sprite to it's current position in the given context.
    // TODO when isSelected
    draw(context) {
        var img = new Image()
        img.onload = function() {
            if(this.isSelected) {
    
            } else {
                context.drawImage(img, this.x, this.y, this.width, this.height);
            }
        }
        img.src = this.getImagePath()
    }

    //
    getImagePath() {
        var result = "images/"
        switch(this.obj) {
            case 1: result += "Blue"; break;
            case 2: result += "Green"; break;
            case 3: result += "Orange"; break;
            case 4: result += "Red"; break;
            case 5: result += "Yellow"; break;
            default:
        }
        return result + ".png"
    }

    //
    animate(context) {
        this.update()
        this.draw(context)
        if(this.isMoving()) {
            setTimeout(animate, 100)
        }
    }

    // Update the position (x, y) of the sprite with an offset of +/-5
    // when it's current position ios different from the new position
    // (toX, toY)
    update() {
        var offset = 5
        // if(this.x != this.toX) {
        //     this.x = (this.x < this.toX) ? this.x+offset : this.x-offset
        // }
        // if(this.y != this.toY) {
        //     this.y = (this.y < this.toY) ? this.y+offset : this.y-offset
        // }
        let toPageX = this.toX * 40
        let toPageY = this.toY * 40
        if(this.pageX != toPageX) {
            this.pageX = (this.pageX < toPageX) ? this.pageX+offset : this.pageX-offset
        }
        if(this.pageY != toPageY) {
            this.pageY = (this.pageY < toPageY) ? this.pageY+offset : this.pageY-offset
        }
    }

    // Return true if the sprite is in movement (when it doesn't
    // get to the position (toX, toY) ), false otherwise.
    isMoving() {
        return (this.x === this.toX && this.y === this.toY)
    }

    // Move the sprite to the given position (x_, y_)
    moveTo(x_, y_) {
        this.toX = x_
        this.toY = y_
        this.selected(false)
    }

    // Make the sprite selected or not.
    selected(isSelected_) {
        this.selected = isSelected_
    }
}



class Model {
    constructor() {
        console.log("Model -> constructor")
        this.score = 0
        this.board = this.init()
    }

    init() {
        console.log("Model -> init")
        var result = new Array()
        for(let i=0; i<5; i++) {
            let row = []
            for(let j=0; j<4; j++) {
                row.push(Math.floor((Math.random() * 5) +1))
            }
            result.push(row)
        }
        return result
    }
}



//
class View {
    constructor() {
        console.log("View -> constructor")
        this.board = new Array()
    }

    //
    init(model) {
        console.log("View -> init")
        for(let i in model.board) {
            var row = []
            for(let j in model.board[i]) {
                var sprite = new Sprite(model.board[i][j], 40, 40)
                var x = i - model.board.length
                var y = j - model.board[i].length
                sprite.position(x, y)
                sprite.moveTo(i, j)
                row.push(sprite)
            }
            this.board.push(row)
        }
    }

    //
    animate(context) {
        console.log("View -> animate")
        this.updateAll()
        this.drawAll(context)
        var that = this
        if(this.isMoving()) {
            setTimeout(() => {that.animate(context)}, 100)
        }
    }

    //
    drawAll(context) {
        console.log("View -> drawAll")
        context.fillStyle = "white"
        context.fillRect(0, 0, context.width, context.height);
        for(let row of this.board) {
            for(let sprite of row) {
                sprite.draw(context)
            }
        }
    }

    //
    updateAll() {
        console.log("View -> updateAll")
        for(let row of this.board) {
            for(let sprite of row) {
                sprite.update()
            }
        }
    }

    // Return true if at least a sprite is in movement, false otherwise
    isMoving() {
        for(let row of this.board) {
            for(let sprite of row) {
                if(sprite.isMoving()) {
                    return true
                }
            }
        }
        return false
    }
}

// 
class Controller {
    constructor(context_) {
        this.context = context_
        this.model = new Model()
        this.view = new View()
        this.view.init(this.model)
    }
}