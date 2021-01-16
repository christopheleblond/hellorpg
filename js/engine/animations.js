
SpritesAnimation = function(sprites, duration) {    
    this.sprites = sprites
    this.duration = duration    
    this._currentSpriteIndex = 0
    this.currentSprite = this.sprites[0]
    this._lastSpriteChangeTime = Timer.timeInMillis

    this.update = (dt) => {   
        if(this.sprites.length > 1) {
            if(Timer.timeInMillis - this._lastSpriteChangeTime > this.duration) {
                this._currentSpriteIndex += 1
                this.currentSprite = this.sprites[ this._currentSpriteIndex % this.sprites.length ]
                this._lastSpriteChangeTime = Timer.timeInMillis
            }
        }             
    }
}

Animator = function(rootAnimation) {

    this.root = rootAnimation

    this.transitionTo = (transition) => {

    }

    this.update = (dt) => {

    }
}