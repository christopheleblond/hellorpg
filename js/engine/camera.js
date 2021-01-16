Camera = function(position, size) {
    this.position = position
    this.size = size
    this.rect = { x: this.position.x - this.size.w, y: this.position.y - this.size.h, w: this.size.w * 2, h: this.size.h * 2 }
    this.map = null
    this.target = null

    this.update = (dt) => {
        
    }

    this.clampToMap = () => {
        if(this.rect.x < 0) {
            this.rect.x = 0
            this.position.x = this.rect.x + this.size.w            
        }else if(this.rect.x + this.rect.w > this.map.size.width) {
            this.rect.x = this.map.size.width - this.rect.w
            this.position.x = this.rect.x + this.size.w
        }
        if(this.rect.y < 0) {
            this.rect.y = 0
            this.position.y = this.rect.y + this.size.h
        }else if(this.rect.y + this.rect.h > this.map.size.height) {
            this.rect.y = this.map.size.height - this.rect.h
            this.position.y = this.rect.y + this.size.h
        }
    }

    this.pointTo = (x, y) => {
        this.position = { x: x, y: y }
        this.rect = { x: this.position.x - this.size.w, y: this.position.y - this.size.h, w: this.size.w * 2, h: this.size.h * 2 }
        if(this.map) {            
            this.clampToMap()
        }
        
    }

    this.worldToScreen = (wpos) => ({ x: wpos.x - this.position.x + this.size.w, y: wpos.y - this.position.y + this.size.h})
    this.screenToWorld = (spos) => ({ x: this.position.x + spos.x, y: this.position.y + spos.y })

    this.fillRectangle = (rect, color) => {
        let screenPos = this.worldToScreen(rect)
        fillRectangle({ x: screenPos.x, y: screenPos.y, w: rect.w, h: rect.h}, color)
    }

    this.strokeRectangle = (rect, color) => {
        let screenPos = this.worldToScreen(rect)
        strokeRectangle({ x: screenPos.x, y: screenPos.y, w: rect.w, h: rect.h }, color)
    }

    this.printText = (text, position, size, color, align = 'left')  => {
        printText(text, this.worldToScreen(position), size, color, align)
    }

    this.drawImage = (imageId, rect = false, alpha = 1) => {
        let screenPos = this.worldToScreen(rect)
        drawImage(imageId, { x: screenPos.x, y: screenPos.y, w: rect.w, h: rect.h }, alpha = 1)
    }

    this.drawSprite = (spriteId, rect, alpha = 1) => {
        let screenPos = this.worldToScreen(rect)
        drawSprite(spriteId, { x: screenPos.x, y: screenPos.y, w: rect.w, h: rect.h }, alpha = 1)
    }

    this.drawTexture = (spriteId, rect, alpha = 1) => {
        let screenPos = this.worldToScreen(rect)
        drawTexture(spriteId, { x: screenPos.x, y: screenPos.y, w: rect.w, h: rect.h }, alpha = 1)
    }
}

var mainCamera = new Camera({x: Screen.width / 2, y: Screen.height / 2}, { w: Screen.width / 2, h: Screen.height / 2})
