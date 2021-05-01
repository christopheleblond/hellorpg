UI = function() {

    this.elements = []

    this.update = (dt) => {
        for(const e of this.elements) e.update(dt)
    }

    this.draw = (ctx) => {
        for(const e of this.elements) e.draw(ctx, Screen)
    }
}

UIPanel = function(anchors, offsets, sizes, backgroundColor, alpha) {
    this.offsets = offsets
    this.anchors = anchors
    this.color = backgroundColor
    this.alpha = alpha
    this._rect = {}

    this.update = (dt) => {
        this._rect = {x: 0, y: 0, w: Screen.width, h: Screen.height }
    }
    this.draw = (ctx, screen) => {
        fillRectangle(this._rect, this.color)
    }
}

function createUI(elements) {
    const ui = new UI()
    ui.elements = elements
    return ui
}