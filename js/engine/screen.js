var canvasRef = document.getElementById('canvas')
var ctx = canvasRef.getContext('2d')
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = true;

// Loading screen
printText('Loading', {x: canvasRef.width / 2, y: canvasRef.height / 2}, 20, Colors.WHITE, 'center')

CScreen = function(width, height, canvasRef, _doc) {    
    this.width = width
    this.height = height
    this.canvasRef = canvasRef

    this.marginRight = 30
    this.marginBottom = 30
    this.center = { x: this.width / 2, y: this.height / 2 }
    this.rect  = { x: 0, y: 0, w: this.width, h: this.height }

    this.clear = (ctx) => {
        ctx.clearRect(0,0, this.width, this.height)
    }

    this.resize = (w, h) => {        
        this.width = w - this.marginRight
        this.height = h - this.marginBottom
        this.canvasRef.width = this.width
        this.canvasRef.height = this.height
        this.canvasRef.style.backgroundColor = GameSettings.backgroundColor
        this.center = { x: this.width / 2, y: this.height / 2 }
        this.rect  = { x: 0, y: 0, w: this.width, h: this.height }
    }

    // bindings
    window.addEventListener('resize', e => {
        this.resize(window.innerWidth, window.innerHeight)
    })
}

var Screen = new CScreen(window.innerWidth, window.innerHeight, canvasRef)