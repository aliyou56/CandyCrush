
class Model {

    constructor(girdSize_) {
        this.score = 0
        this.grid = this.init(girdSize_)
    }

    init(gridSize_) {
        // console.log("Model -> init")
        var result = new Array()
        for(let i=0; i<gridSize_; i++) {
            let row = []
            for(let j=0; j<gridSize_; j++) {
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