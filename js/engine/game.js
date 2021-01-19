
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

        detectCollisions()

        this.inputManager.update(this.timer.deltaTime)

        this.camera.update(this.timer.deltaTime)

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

        if(DEBUG_COLLIDERS) {
            drawColliders(ctx)
        }
        Debug.draw()
    }
}
