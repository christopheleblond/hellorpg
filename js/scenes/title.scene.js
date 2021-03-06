Player = function(imageId) {
    this.imageId = imageId
    this.rect = { x: Screen.center.x, y: Screen.center.y, w: 90, h: 126 }    
    this.collider = { x: this.rect.x + 20, y: this.rect.y + 100, w: this.rect.w - 50, h: 20 }
    this.previousPos = {x: this.rect.x, y: this.rect.y }
    this.velocity = new Vector(0, 0)
    this.movement = { x: 0, y: 0 }
    this._walking = false
    this.speed = 200
    this.camera = mainCamera

    this.dir = ''
    this.sprite = 'right01' 

    this.animations = {
        idle: new SpritesAnimation(['down01'], 0),
        idleUp: new SpritesAnimation(['up01'], 0),
        idleDown: new SpritesAnimation(['down01'], 0),
        idleLeft: new SpritesAnimation(['left01'], 0),
        idleRight: new SpritesAnimation(['right01'], 0),
        walkingLeft: new SpritesAnimation([ 'left01', 'left02', 'left03'], 100),
        walkingRight: new SpritesAnimation([ 'right01', 'right02', 'right03'], 100),
        walkingUp: new SpritesAnimation([ 'up01', 'up02', 'up03'], 100),
        walkingDown: new SpritesAnimation([ 'down01', 'down02', 'down03'], 100),
    }
    this.animation = this.animations.idle

    this.inputManagement = () => {
        this._walking = false
        if(Inputs.isKeyPressed('ArrowUp')) {
            this.velocity.y = -1
            this.dir = 'U'            
        }
        if(Inputs.isKeyPressed('ArrowDown')) {
            this.velocity.y = 1
            this.dir = 'D'                        
        }
        if(Inputs.isKeyPressed('ArrowLeft')) {
            this.velocity.x = -1
            this.dir = 'L'            
        }
        if(Inputs.isKeyPressed('ArrowRight')) {
            this.velocity.x = 1
            this.dir = 'R'            
        }            
    }

    this.move = (dt) => {        
        this.movement = { x: this.velocity.x * this.speed * dt, y: this.velocity.y * this.speed * dt }

        this.rect.x += this.movement.x
        this.rect.y += this.movement.y
        this.rect.z = this.rect.y + this.rect.h
        this.previousPos = {x: this.rect.x, y: this.rect.y }

        this.collider.x = this.rect.x + 20
        this.collider.y = this.rect.y + 90

        this._walking = this.velocity.x !== 0 || this.velocity.y !== 0
    }

    this.clampTo = (rect) => {
        if(this.rect.x < rect.x) {
            this.rect.x = rect.x
        } else if(this.rect.x + this.rect.w > rect.w) {
            this.rect.x = rect.w - this.rect.w
        }
        if(this.rect.y < rect.y) {
            this.rect.y = rect.y
        }else if(this.rect.y + this.rect.h > rect.h) {
            this.rect.y = rect.h - this.rect.h
        }
    }

    this.updateSprite = () => {
        if(this.dir === 'U') {
            if(!this._walking) {
                this.animation = this.animations.idleUp 
            }else{
                this.animation = this.animations.walkingUp            
            }
            
        }else if(this.dir === 'D') {
            if(!this._walking) {
                this.animation = this.animations.idleDown
            }else{
                this.animation = this.animations.walkingDown
            }
            
        }else if(this.dir === 'L') {
            if(!this._walking) {
                this.animation = this.animations.idleLeft
            }else{
                this.animation = this.animations.walkingLeft
            }
            
        }else if(this.dir === 'R') {
            if(!this._walking) {
                this.animation = this.animations.idleRight
            }else{
                this.animation = this.animations.walkingRight
            }            
        }
        this.sprite = this.animation.currentSprite
    }

    this.update = (dt) => {

        this.velocity = { x: 0, y: 0 }
        
        this.inputManagement()

        this.move(dt)

        this.animation.update(dt)

        this.updateSprite()

        this.camera.pointTo(this.rect.x, this.rect.y)
    }
    this.draw = (ctx) => {                
        mainCamera.drawSprite(this.sprite, this.rect)        
    }

    this.onCollisionEnter = (other) => {}

    this.onCollision = (other) => {        
        let tmpX = { x: this.collider.x - this.movement.x, y: this.collider.y, w: this.collider.w, h: this.collider.h }
        let tmpY = { x: this.collider.x, y: this.collider.y - this.movement.y, w: this.collider.w, h: this.collider.h }
        
        if(Physics.checkCollisionRect2Rect(tmpX, other.rect)) {
            // Collision with x axis
            this.rect.y -= this.movement.y
        }
        if(Physics.checkCollisionRect2Rect(tmpY, other.rect)) {
            this.rect.x -= this.movement.x
        }        
    }

    this.onCollisionExit = (other) => {        
        
    }    

    registerCollider(new Collider('player', this.collider, false, this.onCollision, this.onCollisionEnter, this.onCollisionExit))
}

Pnj = function(props) {
    this.sprite = 'pnj_down01'
    this.rect = props.rect
    
    if(props.collider) {
        let collider = { x: this.rect.x + props.collider.offsetX, y: this.rect.y + props.collider.offsetY, w: this.rect.w + props.collider.offsetW, h: this.rect.h + props.collider.offsetH }
        this.collider = new Collider(props.collider.id, collider, props.collider.static)
        registerCollider(this.collider)
    }

    this.update = (dt) => {
        this.rect.z = this.rect.y + this.rect.h        
    }

    this.draw = (ctx) => {
        mainCamera.drawSprite(this.sprite, this.rect)
        mainCamera.strokeRectangle(this.collider.rect, 'lightgreen')
    }
}

elementsFactory.registerPrefab('Pnj', (props) => {
    return new Pnj(props)
})

TitleScene = function(){    
    this.sceneId = 'Title'
    this.player = new Player('player')
    this.camera = mainCamera
    this.map = null
    this.loaded = false
    this.obstacles = []
    
    this.menu = createUI([])

    this.start = () => {
        mapLoader.loadMap('floor1.json').then(map => {
            this.map = map
            this.map.build()
            this.camera.map = this.map            
            this.loaded = true            
        })        
    }
    this.update = (dt) => {      
        if(!this.loaded) return
        this.player.update(dt)
        this.player.clampTo({ x: this.map.margins.left, y: this.map.margins.top, w: this.map.size.width - this.map.margins.right, h: this.map.size.height - this.map.margins.bottom })

        this.menu.update(dt)
    }
    this.draw = (ctx) => {
        this.camera.cleanBuffer()

        if(!this.loaded) {
            printText('Loading', { x: Screen.width / 2, y: Screen.height / 2 }, 20, 'white')
            return
        }
        
        this.map.draw(ctx)        

        this.player.draw(ctx)        

        this.camera.render(ctx)

        this.menu.draw(ctx)
    }
    this.finish = () => {}    
}
