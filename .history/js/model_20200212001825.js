
// 
class Model {

    /**
     * 
     * @param {*} gridSize_ 
     */
    constructor(gridSize_) {
        this.score = 0
        this.gridSize = gridSize_
        this.grid = this.init()
        this.startScoring = false
    }

    /**
     * 
     */
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

    /**
     * 
     */
    getRandom() {
        return Math.floor((Math.random() * 5) +1)
    }

    /**
     * 
     * @param {*} x1_ 
     * @param {*} y1_ 
     * @param {*} x2_ 
     * @param {*} y2_ 
     */
    swap(x1_, y1_, x2_, y2_) {
        // console.log("[Model.swap]: I'm swapping -> (",x1_,",",y1_,") by (",x2_,",",y2_,")")
        let tmp = this.grid[x1_][y1_]
        this.grid[x1_][y1_] = this.grid[x2_][y2_]
        this.grid[x2_][y2_] = tmp
    }

    /**
     * Remove all the alignments from the model
     * @param {*} arrToBeRemoved_  Array of alignments to be removed.
     */
    explode(arrToBeRemoved_) {
        if(arrToBeRemoved_.length > 0) {
            for(let e of arrToBeRemoved_) {
                var [row, col, count, orientation] = e
                if(orientation === 'h') {
                    for(let i=0; i<count; i++) {
                        this.grid[row][col+i] = -1
                    }
                } else { // vertical
                    for(let i=0; i<count; i++) {
                        this.grid[row+i][col] = -1
                    }
                }
                if(this.startScoring) this.score += count
            }
            // console.log("[Model.explode]: result -> ", this.grid)
            console.log("[Model.explode]: I made an explosion, boom !! score -> ", this.score)
        }
    }

    /**
     * Checks if an alignment exists in the model.
     * @return true if one alignment found, false otherwise.
     */
    isAlignmentExist() {
        for(let i=0; i<this.gridSize; i++) {
            // horizontal
            for(let j=0; j<(this.gridSize-2); j++) {
                let k1 = j+1; let k2 = j+1 
                let counterHorizontal = 1; let counterVertical = 1
                while(  k1<this.gridSize && this.grid[i][j] != -1 && this.grid[i][k1] != -1
                    && this.grid[i][j] === this.grid[i][k1] ) {
                    k1++; counterHorizontal++
                }
                while( k2<this.gridSize && this.grid[j][i] != -1 
                    && this.grid[j][i] === this.grid[k2][i] ) {
                    k2++; counterVertical++
                }
                if(counterHorizontal >= 3 || counterVertical >= 3) {
                    console.log("[Model.isAlignmentExist]: Yes")
                    return true
                }
            }
        }
        console.log("[Model.isAlignmentExist] : Nope")
        return false
    }

    /**
     * @return an array containing all the alignments in the model.
     *      alignment format: [ row, col, nb_elements, orientation (h|v) ]
     */
    allAlignments() {
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
                while( k<this.gridSize && this.grid[j][i] != -1 
                    && this.grid[j][i] === this.grid[k][i] ) {
                    k++; counter++
                }
                if(counter >= 3) {
                    result.push([j, i, counter, 'v'])
                    j += counter-1
                }
            }
        }
        console.log("[Model.allAlignments]: ", result)
        return result
    }
}