
// 
class Model {

    // 
    constructor(gridSize_) {
        this.score = 0
        this.gridSize = gridSize_
        this.grid = this.init()
    }

    init() {
        // console.log("Model -> init")
        var result = new Array()
        for(let i=0; i<this.gridSize; i++) {
            let row = []
            for(let j=0; j<this.gridSize; j++) {
                row.push(Math.floor((Math.random() * 5) +1))
            }
            result.push(row)
        }
        // for(let e of result) {
        //      console.log(e)
        // }
        return result
    }

    explode() {

    }

    isExplodePossible() {
        var result = []
        for(let i=0; i<this.gridSize; i++) {
            for(let j=0; j<this.gridSize; j++) {
                let k = j+1 
                let counter = 0
                while( this.grid[i][j] == this.grid[i][k] && k >= (this.gridSize-3) ) {
                    counter++
                }
                j = counter
                if(counter >= 3) {

                }
            }
        }
    }
}
// k = j+1
// let verticalCounter = 0
// while( this.grid[i][j] == this.grid[k][k] && k >= (this.gridSize-3) ) {
//     verticalCounter++
// }
// if(horizontalCounter >= 3) {

// }