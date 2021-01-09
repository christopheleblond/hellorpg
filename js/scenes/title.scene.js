SimpleSprite = function(imageId) {
    this.imageId = imageId
    this.rect = { x: Screen.center.x, y: Screen.center.y, w: 90, h: 126 }
    this.previousPos = {x: this.rect.x, y: this.rect.y }
    this.velocity = new Vector(0, 0)
    this.speed = 400
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

        this.camera.pointTo(this.rect.x, this.rect.y)
    }
    this.draw = (ctx) => {        
        mainCamera.fillRectangle({ x: 10, y: 10, w: 200, h: 100}, 'blue')

        mainCamera.fillRectangle({ x: Screen.width - 500, y: Screen.height - 100, w: 200, h: 100}, 'blue')

        mainCamera.drawSprite(this.sprite, this.rect)
    }
}

TitleScene = function(){    
    this.sceneId = 'Title'
    this.player = new SimpleSprite('player')
    this.camera = mainCamera
    this.map = new Map('demomap', 3000, 3000, mainCamera)

    this.start = () => {
        //playMusic('music01')
        this.camera.map = this.map
    }
    this.update = (dt) => {      
        this.player.update(dt)
    }
    this.draw = (ctx) => {
        this.map.draw(ctx)
        //this.camera.drawTexture('checker', Screen.rect)
        this.player.draw(ctx)

        printText(JSON.stringify(mainCamera.rect), {x: 0, y: 20}, 20, 'black')
    }
    this.finish = () => {}
}
