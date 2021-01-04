var canvasRef = document.getElementById('canvas')
var ctx = canvasRef.getContext('2d')

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

Clock = function() {
    this.time = 0
    this.deltaTime = 0
    this.fps = 0
    this._previousFrameTime = Date.now()

    this.update = () => {  
        let now = Date.now()      
        this.deltaTime = (now - this._previousFrameTime) / 1000.0
        this.time += this.deltaTime
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

Camera = function(position, size) {
    this.position = position
    this.size = size
    this.rect = { x: this.position.x - this.size, y: this.position.y - this.size, w: this.size * 2, h: this.size * 2 }
    this.center = { x: this.rect.x + (this.rect.w / 2), y: this.rect.y + (this.rect.h / 2) }        

    this.update = (dt) => {

    }

    this.worldToScreen = (wpos) => ({ x: wpos.x - this.rect.x, y: wpos.y - this.rect.y })
    this.screenToWorld = (spos) => ({ x: this.rect.x + spos.x, y: this.rect.y + spos.y })

    this.fillRectangle = (rect, color) => {
        let screenPos = this.worldToScreen(rect)
        fillRectangle({ x: screenPos.x, y: screenPos.y, w: rect.w, h: rect.h}, color)
    }
}

var mainCamera = new Camera({x: 0, y: 0}, 1)

Game = function() {
    // Display management
    this.screenRef = Screen
    this.ctx = ctx

    // Timer
    this.timer = Timer

    // Camera
    this.camera = mainCamera

    // Assets management
    this.assetManager = AssetManager

    // Inputs management
    this.inputManager = Inputs

    // Scene management
    this.scenes = {}
    this._previousSceneId = ''
    this.sceneId = ''

    this.start = () => {
        window.requestAnimFrame = window.requestAnimationFrame 
                        || window.webkitRequestAnimationFrame
                        || window.mozRequestAnimationFrame
                        || ((callback) => {
                            setTimeout(callback, 1000 / 60)
                        })

        // Init Screen sizes
        this.screenRef.resize(window.innerWidth, window.innerHeight)                        

        // Start main loop
        this.assetManager.load()
        .then(() => this.run())
        
        if(!this.sceneId) {
            let ids = Object.keys(this.scenes)
            this.sceneId = ids[0]
        }
    }

    this.run = () => {
        
        this.update()
        
        this.draw(this.ctx)
        
        // Looping
        window.requestAnimFrame(this.run)
    }

    this.update = (dt) => {
        this.timer.update()

        this.inputManager.update(this.timer.deltaTime)

        // Update logic
        if(this.sceneId != this._previousSceneId) {            
            if(this.scenes[this._previousSceneId] && !!this.scenes[this._previousSceneId]['finish']) {
                console.log('Finishing ', this._previousSceneId)
                this.scenes[this._previousSceneId].finish()
                console.log('Finished ', this._previousSceneId)
            } 
        
            this._previousSceneId = this.sceneId

            if(this.scenes[this.sceneId] && !!this.scenes[this.sceneId]['start']){
                console.log('Starting ', this.sceneId)
                this.scenes[this.sceneId].start()
                console.log('Started ', this.sceneId)
            }
        }
        if(this.sceneId !== '') {
            this.scenes[this.sceneId].update(this.timer.deltaTime)
        }
    }

    this.draw = (ctx) => {        
        this.screenRef.clear(this.ctx)
        this.timer.draw(ctx)

        if(this.sceneId !== '') {
            this.scenes[this.sceneId].draw(ctx)                        
        }
    }
}

function registerScene(scene) {
    currentGame.scenes[scene.sceneId] = scene
}

function setScene(sceneId) {
    currentGame.sceneId = sceneId
}

Sound = function(id, src, looping, instances = 1) {
    this.id = id
    this.src = src
    this.instances = instances
    this.audioElements = []
    this.instance = 0
    this.looping = looping

    this.play = () => {
        this.audioElements[this.instance].currentTime = 0
        this.audioElements[this.instance].play()
        this.instance = (this.instance+1) % this.instances
    }

    this.stop = () => this.audioElements[this.instance].pause()

    // Create all audio elements for this sounds
    for(let i = 0; i < instances; i++) {
        this.audioElements.push(document.createElement('audio'))
        this.audioElements[i].src = this.src        
        this.audioElements[i].setAttribute("preload", "auto")
        this.audioElements[i].setAttribute("controls", "none")
        this.audioElements[i].setAttribute("loop", this.looping)
        this.audioElements[i].style.display = "none"        
        document.body.appendChild(this.audioElements[i])
    }
}

AssetManagerClass = function(assetsDir, images, sounds) {
    this.dir = assetsDir
    this.images = images
    this.sprites = {}
    this.sounds = sounds
    this.music = false    
    this.loadImage = (i) => new Promise(resolve => {
        let img = new Image()
        img.id = i.id
        img.sprites = i.sprites
        img.src = this.dir + '/' + i.src
        resolve(img)
    })

    this.loadSound = (soundId, sound) => new Promise(resolve => {
        resolve(new Sound(soundId, this.dir + '/' + sound.src, sound.looping, sound.instances))
    })

    this.playSound = (soundId) => {
        this.sounds[soundId].play()
    }

    this.playMusic = (soundId) => {
        if(this.music) {
            this.music.stop()
        }        
        this.music = this.sounds[soundId]
        this.music.play()
    }

    this.load = () => Promise.all([
        Promise.all(Object.keys(this.images)
                .map(imageId => this.images[imageId])
                .map(i => this.loadImage(i).then(image => { console.log(`Image loaded: ${image.id}: ${image.src}`); return image })))
            .then(images => {
                this.images = {}
                images.forEach(i => this.images[i.id] = i)

                Object.keys(this.images)
                .filter(imageId => this.images[imageId]['sprites'])
                .map(imageId => this.images[imageId])
                .forEach(i => Object.keys(i.sprites).forEach(sId => {this.sprites[sId] = i.sprites[sId]; this.sprites[sId].img = i}))
            }),
        Promise.all(Object.keys(this.sounds)
                .map(soundId => this.loadSound(soundId, this.sounds[soundId]).then(s => { console.log(`Sound loaded: ${s.id}: ${s.src}`); return s })))
            .then(sounds => {
                this.sounds = {}
                sounds.forEach(s => this.sounds[s.id] = s)
            })
    ]).then(() => console.log('All assets loaded', this.sprites))
}

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
