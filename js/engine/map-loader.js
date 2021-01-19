StaticElement = function(element) {
    this.id = element.id
    this.sprite = element.sprite
    this.rect = element.rect
    this.rect.z = this.rect.y + this.rect.h
    this.collider = element.collider
    if(this.collider) {
        this.collider = new Collider(this.id, { x: this.rect.x + this.collider.offsetX, y: this.rect.y + this.collider.offsetY, w: this.rect.w + this.collider.offsetW, h: this.rect.h + this.collider.offsetH }, () => {})
    }

    this.draw = (ctx) => {
        mainCamera.strokeRectangle(this.collider.rect, 'lightgreen')        
        mainCamera.drawImage(this.sprite, this.rect)
    }
}

ElementFactory = function() {
    this.prefabs = {}

    this.create = (prefabId, props) => {
        if(!!this.prefabs[prefabId]) {
            return this.prefabs[prefabId]['newInstance'](props)
        }
    }

    this.registerPrefab = (prefabId, newInstanceFn) => {
        this.prefabs[prefabId] = {
            prefabId: prefabId,
            newInstance: newInstanceFn
        }
    }
}

var elementsFactory = new ElementFactory()

Map = function(camera) {
    this.camera = camera
    this.staticElements = []
    this.elements = []

    this.build = () => {
        for(let i = 0; i < this.staticElements.length; i++) {
            const element = this.staticElements[i]            
            this.staticElements[i] = new StaticElement(element)

            if(this.staticElements[i].collider) {
                registerCollider(this.staticElements[i].collider)
            }
        }

        for(let i = 0; i < this.elements.length; i++) {
            const element = this.elements[i]

            this.elements[i] = elementsFactory.create(element.class, element)
        }
    }

    this.update = (dt) => {
        for(let i = 0; i < this.elements.length; i++) {
            this.elements[i].update(dt)
        }
    }

    this.draw = (ctx) => {        
        this.camera.drawImage(this.background, { x: 0, y: 0, w: this.size.width, h: this.size.height })

        for(const e of this.staticElements) {
            if(!!e['draw']) e.draw(ctx)
        }        

        for(const e of this.elements) {
            if(!!e['draw']) e.draw(ctx)
        }
    }
}

MapLoader = function(rootDir, camera) {
    this.rootDir = rootDir
    this.camera = camera
    this.maps = {}

    this.loadMap = (mapFile) => fetch(this.rootDir + '/' + mapFile)
        .then(resp => resp.json())
        .then(json => {
            return new Promise((res, rej) => {            
                const map = Object.assign(new Map(mainCamera), json)
                res(map)
            })
        })
}

var mapLoader = new MapLoader('/assets/maps', mainCamera)
