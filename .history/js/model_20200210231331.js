
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
                row.push(this.getRandom())
            }
            result.push(row)
        }
        // console.table(result)
        return result
    }

    getRandom() {
        return Math.floor((Math.random() * 5) +1)
    }

    swap(x1_, y1_, x2_, y2_) {
        console.log("[Model.swap]: I'm swapping -> (",x1_,",",y1_,") by (",x2_,",",y2_,")")
        let tmp = this.grid[x1_][y1_]
        this.grid[x1_][y1_] = this.grid[x2_][y2_]
        this.grid[x2_][y2_] = tmp
    }

    explode() {
        console.log("[Model.explode]: I make an explosion, boom !!")
        let arrToBeExplode = this.possibleExplodeArray()
        if(arrToBeExplode.length > 0) {
            for(let e of arrToBeExplode) {
                let rowIdx = e[0]
                let colIdx = e[1]
                let count = e[2]
                if(e[3] === 'h') {
                    for(let i=0; i<count; i++) {
                        this.grid[rowIdx][colIdx+i] = -1
                    }
                } else { // vertical
                    for(let i=0; i<count; i++) {
                        this.grid[rowIdx+i][colIdx] = -1
                    }
                }
            }
            // console.log("[Model.explode]: result -> ", this.grid)
            this.score += arrToBeExplode.length
            console.log("[Model.explode]: score -> ", this.score)
        }
    }

    isExplodePossible() {
        console.log("[Model.isExplodePossible]: ??")
        for(let i=0; i<this.gridSize; i++) {
            // horizontal
            for(let j=0; j<(this.gridSize-2); j++) {
                let k1 = j+1; let k2 = j+1 
                let counterHorizontal = 1; let counterVertical = 1
                while(  k1<this.gridSize && this.grid[i][j] != -1
                    && this.grid[i][j] === this.grid[i][k1] ) {
                    k1++; counterHorizontal++
                }
                while( k2<this.gridSize && this.grid[i][j] != -1
                    && this.grid[j][i] === this.grid[k2][i] ) {
                    k2++; counterVertical++
                }
                if(counterHorizontal >= 3 || counterVertical >= 3) {
                    console.log("[Model.isExplodePossible]: Yes :)")
                    return true
                }
            }
        }
        console.log("[Model.isExplodePossible] : Nope ):")
        return false
    }

    //
    possibleExplodeArray() {
        console.log("[Model.possibleExplodeArray]: I provide with alignment array")
        let result = []
        for(let i=0; i<this.gridSize; i++) {
            // horizontal
            for(let j=0; j<(this.gridSize-2); j++) {
                let k = j+1 
                let counter = 1
                while(  k<this.gridSize && this.grid[i][j] != -1
                    && this.grid[i][j] === this.grid[i][k] ) {
                    k++; counter++
                }
                if(counter >= 3) {
                    result.push([i, j, counter, 'h'])
                    j += counter-1
                }
            }
            // vertical
            for(let j=0; j<(this.gridSize-2); j++) {
                let k = j+1 
                let counter = 1
                while( k<this.gridSize && this.grid[i][j] != -1 
                    && this.grid[j][i] === this.grid[k][i] ) {
                    k++; counter++
                }
                if(counter >= 3) {
                    result.push([j, i, counter, 'v'])
                    j += counter-1
                }
            }
        }
        console.log("[Model.possibleExplodeArray]: result -> ", result)
        return result
    }
}