
window.onload = function() {  
    var canvas = document.getElementById("canvas")
    var context = canvas.getContext("2d")
    context.width = canvas.width;
    context.height = canvas.height;
        
    var controller = new Controller(context)
    controller.view.animate(context)
}

// This class represent a sprite object (bonbon) in the candy crush game.
// It contains the type of the sprite, the width and the height.
// It contains also different methods which allow it among others
// to update itself or to draw itself in a context.
class Sprite {

    // Constructor with type of the sprite, the width anf the height
    constructor(obj_, width_, height_) {
        this.obj = obj_
        this.width = width_
        this.height = height_

        this.isSelected = false
        this.x = 0
        this.y = 0
        this.toX = 0
        this.toY = 0
    }

    // Position the sprite at the given position (boardX_, boardY_) on the board
    position(x_, y_) {
        this.x = x_
        this.y = y_
        this.toX = x_
        this.toY = y_
    }

    // Draw the sprite to it's current position in the given context.
    // TODO when isSelected
    draw(context) {
        //console.log("Sprite->draw: obj="+this.obj+", "
        //    +"board("+this.boardX+", "+this.boardY+"), "
        //    +"page("+this.pageX+", "+this.pageY+"), ")
        var that = this
        var img = new Image()
        img.onload = function() {
            if(that.isSelected) {
    
            } else { 
                context.drawImage(img, that.x, that.y, that.width, that.height);
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
        if(this.x != this.toX) {
            this.x = (this.x < this.toX) ? this.x+offset : this.x-offset
        }
        if(this.y != this.toY) {
            this.y = (this.y < this.toY) ? this.y+offset : this.y-offset
        } 
    }

    // Return true if the sprite is in movement (when it doesn't
    // get to the position (toX, toY) ), false otherwise.
    isMoving() {
        return !(this.x === this.toX && this.y === this.toY)
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
        //console.log("Model -> constructor")
        this.score = 0
        this.board = this.init()
    }

    init() {
        // console.log("Model -> init")
        var result = new Array()
        for(let i=0; i<10; i++) {
            let row = []
            for(let j=0; j<10; j++) {
                row.push(Math.floor((Math.random() * 5) +1))
            }
            result.push(row)
        }
        // for(let e of result) {
        //     console.log(e)
        // }
        return result
    }
}



//
class View {
    constructor() {
        //console.log("View -> constructor")
        this.board = new Array()
    }

    //
    init(model) {
        // console.log("View -> init")
        for(let i in model.board) {
            var row = []
            for(let j in model.board[i]) {
                var sprite = new Sprite(model.board[i][j], 40, 40)
                var x = i - model.board.length
                //sprite.position(x, j)
                //sprite.moveTo(i, j)
                sprite.position(j*40, i*40)
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
        console.log("view.isMoving : " + this.isMoving())
        if(this.isMoving()) {
            setTimeout(() => {that.animate(context)}, 10)
        }
    }

    //
    drawAll(context) {
        console.log("View -> drawAll")
        //context.fillStyle = "white"
        context.clearRect(0, 0, context.width, context.height);
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

    // Return true if at least one sprite is in movement, false otherwise
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