AssetManagerClass = function(assetsDir, images, sounds) {
    this.dir = assetsDir
    this.images = images
    this.sprites = {}
    this.sounds = sounds
    this.music = false    
    this.loadImage = (i) => new Promise(resolve => {
        let img = new Image()
        img.id = i.id
        img.sprites = i.sprites
        img.src = this.dir + '/' + i.src
        resolve(img)
    })

    this.loadSound = (soundId, sound) => new Promise(resolve => {
        resolve(new Sound(soundId, this.dir + '/' + sound.src, sound.looping, sound.instances))
    })

    this.playSound = (soundId) => {
        this.sounds[soundId].play()
    }

    this.playMusic = (soundId) => {
        if(this.music) {
            this.music.stop()
        }        
        this.music = this.sounds[soundId]
        this.music.play()
    }

    this.load = () => Promise.all([
        Promise.all(Object.keys(this.images)
                .map(imageId => this.images[imageId])
                .map(i => this.loadImage(i).then(image => { console.log(`Image loaded: ${image.id}: ${image.src}`); return image })))
            .then(images => {
                this.images = {}
                images.forEach(i => this.images[i.id] = i)

                Object.keys(this.images)
                .filter(imageId => this.images[imageId]['sprites'])
                .map(imageId => this.images[imageId])
                .forEach(i => Object.keys(i.sprites).forEach(sId => {this.sprites[sId] = i.sprites[sId]; this.sprites[sId].img = i}))
            }),
        Promise.all(Object.keys(this.sounds)
                .map(soundId => this.loadSound(soundId, this.sounds[soundId]).then(s => { console.log(`Sound loaded: ${s.id}: ${s.src}`); return s })))
            .then(sounds => {
                this.sounds = {}
                sounds.forEach(s => this.sounds[s.id] = s)
            })
    ]).then(() => console.log('All assets loaded', this.sprites))
}
