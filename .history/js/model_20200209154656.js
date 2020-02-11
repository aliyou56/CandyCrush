
// 
class Model {

    // 
    constructor(gridSize_) {
        this.score = 0
        this.gridSize = gridSize_
        this.grid = this.init()
        console.log(this.isExplodePossible())
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
        // console.table(result)
        return result
    }

    explode() {

    }

    isExplodePossible() {
        var result = []
        for(let i=0; i<this.gridSize; i++) {
            // horizontal
            for(let j=0; j<(this.gridSize-2); j++) {
                let k = j+1 
                let counter = 1
                while( this.grid[i][j] === this.grid[i][k] ) {
                    k++; counter++
                }
                if(counter >= 3) {
                    result.push([i, j, counter, 'h'])
                }
                j += counter-1
            }
            // vertical
            // for(let j=0; j<(this.gridSize-2); j++) {
            //     let k = j+1 
            //     console.log("k="+k)
            //     let counter = 0
            //     while( this.grid[j][i] === this.grid[k][i] ) {
            //         k++; counter++
            //     }
            //     if(counter >= 2) {
            //         result.push([j, i, counter, 'v'])
            //     }
            //     j += counter
            // }
        }
        return result.length > 0 ? result : false
    }
}
// k = j+1
// let verticalCounter = 0
// while( this.grid[i][j] == this.grid[k][k] && k >= (this.gridSize-3) ) {
//     verticalCounter++
// }
// if(horizontalCounter >= 3) {

// }