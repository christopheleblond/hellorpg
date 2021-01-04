SimpleSprite = function(imageId) {
    this.imageId = imageId
    this.rect = { x: Screen.center.x, y: Screen.center.y, w: 32, h: 36 }
    this.previousPos = {x: this.rect.x, y: this.rect.y }
    this.velocity = new Vector(0, 0)
    this.speed = 100
    this.camera = mainCamera

    this.dir = ''
    this.sprite = 'right01'

    this.update = (dt) => {
        this.velocity = { x: 0, y: 0}
        if(Inputs.isKeyPressed('ArrowUp')) {
            this.velocity.y = -1
        }
        if(Inputs.isKeyPressed('ArrowDown')) {
            this.velocity.y = 1
        }
        if(Inputs.isKeyPressed('ArrowLeft')) {
            this.velocity.x = -1
        }
        if(Inputs.isKeyPressed('ArrowRight')) {
            this.velocity.x = 1
        }

        this.rect.x += this.velocity.x * this.speed * dt
        this.rect.y += this.velocity.y * this.speed * dt

        if(this.rect.x > this.previousPos.x) {
            this.dir = 'R'
            this.sprite = 'right01'
        }else if(this.rect.x < this.previousPos.x) {
            this.dir = 'L'
            this.sprite = 'left01'
        }
        if(this.rect.y > this.previousPos.y) {
            this.dir += 'D'
            this.sprite = 'down01'
        }else if(this.rect.y < this.previousPos.y) {
            this.dir += 'U'
            this.sprite = 'up01'
        }        
        this.previousPos = {x: this.rect.x, y: this.rect.y }

        //this.camera.rect.x = this.rect.x
        //this.camera.rect.y = this.rect.y
    }
    this.draw = (ctx) => {        
        drawSprite(this.sprite, this.rect)
    }
}

TitleScene = function(){    
    this.sceneId = 'Title'
    this.player = new SimpleSprite('ninja')
    this.camera = mainCamera

    this.start = () => {
        //playMusic('music01')
    }
    this.update = (dt) => {      
        this.player.update(dt)
    }
    this.draw = (ctx) => {
        drawTexture('checker', this.camera.rect)
        this.player.draw(ctx)
    }
    this.finish = () => {}
}
