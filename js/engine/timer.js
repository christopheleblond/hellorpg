Clock = function() {
    this.time = 0
    this.timeInMillis = 0
    this.deltaTime = 0
    this.fps = 0
    this._previousFrameTime = Date.now()

    this.update = () => {  
        let now = Date.now()      
        this.deltaTime = (now - this._previousFrameTime) / 1000.0
        this.time += this.deltaTime
        this.timeInMillis += (now - this._previousFrameTime)
        this.fps = Math.floor(1.0 / this.deltaTime)
        this._previousFrameTime = now
    }

    this.draw = (ctx) => {
        if(GameSettings.showFps) {
            printText(this.fps + '', new Vector(20, 20), 20, Colors.WHITE)
        }        
    }
}

var Timer = new Clock()