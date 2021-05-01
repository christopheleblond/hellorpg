Vector = function(x, y) {
    this.x = x
    this.y = y    
}

Color = function(r, g, b, a = 1) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
    this.toString = () => `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
}

var Colors = {
    RED: new Color(255, 0, 0, 1),
    GREEN: new Color(0, 255, 0, 1),
    BLUE: new Color(0, 0, 255, 1),
    WHITE: new Color(255, 255, 255, 1),
    WHITE_50: new Color(255, 255, 255, 0.5)
}

Rectangle = function(position, w, h) {
    this.position = new Vector(position.x, position.y)
    this.w = w
    this.h = h
}

Circle = function(position, radius) {
    this.position = new Vector(position.x, position.y)
    this.radius = radius
}

// Drawing methods
function fillRectangle(rect, color) {
    ctx.beginPath()
    ctx.globalAlpha = color.a
    ctx.rect(rect.x, rect.y, rect.w, rect.h)
    ctx.fillStyle = color.toString()
    ctx.fill()
    ctx.closePath()
}

function strokeRectangle(rect, color) {
    ctx.beginPath()
    ctx.globalAlpha = color.a
    ctx.rect(rect.x, rect.y, rect.w, rect.h)
    ctx.strokeStyle = color.toString()
    ctx.stroke()
    ctx.closePath()
}

function printText(text, position, size, color, align = 'left') {
    ctx.beginPath()
    ctx.fillStyle = color.toString()
    ctx.font = size + 'px ' + GameSettings.DEFAULT_FONT
    ctx.textAlign = align
    ctx.fillText(text, position.x, position.y)
    ctx.closePath()
}

function drawImage(imageId, rect, alpha = 1) {
    let img = AssetManager.images[imageId]
    ctx.beginPath()
    ctx.globalAlpha = alpha
    ctx.drawImage(img, 0, 0, img.width, img.height, rect.x, rect.y, rect.w, rect.h)
    ctx.closePath()
}

function drawSprite(spriteId, rect, alpha = 1) {
    let sprite = AssetManager.sprites[spriteId]    
    ctx.beginPath()
    ctx.globalAlpha = alpha
    ctx.drawImage(sprite.img, sprite.x, sprite.y, sprite.w, sprite.h, rect.x, rect.y, rect.w, rect.h)
    ctx.closePath()
}

function drawTexture(spriteId, rect, alpha = 1) {    
    let sprite = AssetManager.images[spriteId]    
    ctx.beginPath()
    ctx.globalAlpha = alpha
    let cols = Math.floor(rect.w / sprite.width)    
    let rows = Math.floor(rect.h / sprite.height)
        
    for(let i = 0; i <= cols; i++) {
        for(let j = 0; j <= rows; j++) {
            ctx.drawImage(sprite, 0, 0, sprite.width, sprite.height, rect.x + i * sprite.width, rect.y + j * sprite.height, sprite.width, sprite.height)
        }
    }
    
    ctx.closePath()
}