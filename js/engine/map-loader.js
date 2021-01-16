Map = function(camera) {
    this.camera = camera
    this.draw = (ctx) => {
        this.camera.drawImage(this.background, { x: 0, y: 0, w: this.size.width, h: this.size.height })
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
                res(Object.assign(new Map(mainCamera), json))
            })
        })    
}

var mapLoader = new MapLoader('/assets/maps', mainCamera)
