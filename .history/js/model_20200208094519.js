
// 
class Model {

    // 
    constructor(girdSize_) {
        this.score = 0
        this.girdSize = gridSize_
        this.grid = this.init()
    }

    init() {
        // console.log("Model -> init")
        var result = new Array()
        for(let i=0; i<this.gridSize; i++) {
            let row = []
            for(let j=0; j<this.gridSize_; j++) {
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

    }
}