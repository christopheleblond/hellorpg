var Physics = {
    checkCollisionRect2Rect: (rect1, rect2) => {
        return rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.h + rect1.y > rect2.y
    },
    collisionWithTopEdge: (rect1, rect2) => {
        return rect1.y < rect2.y + rect2.h
    },
    collisionWithRightEdge: (rect1, rect2) => {
        return rect1.x < rect2.x + rect2.w
    },
    collisionWithBottomEdge: (rect1, rect2) => {
        return rect1.y + rect1.h > rect2.y
    },
    collisionWithLeftEdge: (rect1, rect2) => {
        return rect1.x + rect1.w > rect2.x
    }
}

var colliders = []

Collider = function(id, rect, static, onCollisionCallback, onCollisionEnter, onCollisionExit) {
    this.id = id
    this.rect = rect
    this.static = static
    this.onCollision = onCollisionCallback
    this.onCollisionEnter = onCollisionEnter
    this.onCollisionExit = onCollisionExit
    this.collisions = []
}

function registerCollider(collider) {
    if(colliders.findIndex(c => c.id === collider.id) === -1) {
        colliders.push(collider)
    }
}

function detectCollisions() {        
    for(let ca of colliders) {
        for(let cb of colliders) {
            if(ca.id === cb.id || (ca.static && cb.static)) {
                continue
            }    
            
            let colIndex = ca.collisions.findIndex(c => c.id === cb.id)
            if(!!ca['onCollision'] && Physics.checkCollisionRect2Rect(ca.rect, cb.rect)) {
                if(!!ca['onCollisionEnter'] && colIndex === -1) {
                    ca.collisions.push(cb)
                    ca.onCollisionEnter(cb)
                }
                
                ca.onCollision(cb)

            }else if(colIndex >= 0) {
                ca.collisions.splice(colIndex, 1)
                if(!!ca['onCollisionExit']) {
                    ca.onCollisionExit(cb)
                }                
            }
        }
    }
}