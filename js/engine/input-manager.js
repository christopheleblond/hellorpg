
InputManager = function(doc, canvasRef) {
    this._previousKeysPressed = []
    this.keysDown = []
    this.keysPressed = []
    this.mousePosition = { x: 0, y: 0 }
    this.mouseButtons = [false, false, false]
    this.deltaY = 0

    this.onkeydown = (e) => {
        if(!this.isKeyPressed(e.code)) {
            this.keysPressed.push(e.code)
        }
    }

    this.onkeyup = (e) => {                
        this.keysPressed.splice(this.keysPressed.indexOf(e.code), 1)     
    }

    this.isKeyPressed = (keyCode) => this.keysPressed.indexOf(keyCode) >= 0

    this.isKeyDown = (keyCode) => this.keysDown.indexOf(keyCode) >= 0

    this.onmousemove = (e) => {
        this.mousePosition = { x: e.offsetX, y: e.offsetY }
    }
    
    this.onmousedown = (e) => {
        e.preventDefault()
        this.mouseButtons[e.button] = true
    }

    this.onmouseup = (e) => {
        e.preventDefault()
        this.mouseButtons[e.button] = false
    }

    this.onmousewheel = (e) => {
        this.deltaY = e.deltaY
    }

    this.update = (dt) => {
        this.keysDown = [...this.keysPressed.filter(key => this._previousKeysPressed.indexOf(key) < 0)]
        this._previousKeysPressed = [...this.keysPressed]
    }

    // bindings
    doc.addEventListener("keydown", this.onkeydown, false)
    doc.addEventListener("keyup", this.onkeyup, false)
    canvasRef.addEventListener("mousemove", this.onmousemove)
    canvasRef.addEventListener("mousedown", this.onmousedown)
    canvasRef.addEventListener("mouseup", this.onmouseup)
    canvasRef.addEventListener("wheel", this.onmousewheel)    
}

var Inputs = new InputManager(document, canvasRef)

