
Sound = function(id, src, looping, instances = 1) {
    this.id = id
    this.src = src
    this.instances = instances
    this.audioElements = []
    this.instance = 0
    this.looping = looping

    this.play = () => {
        this.audioElements[this.instance].currentTime = 0
        this.audioElements[this.instance].play()
        this.instance = (this.instance+1) % this.instances
    }

    this.stop = () => this.audioElements[this.instance].pause()

    // Create all audio elements for this sounds
    for(let i = 0; i < instances; i++) {
        this.audioElements.push(document.createElement('audio'))
        this.audioElements[i].src = this.src        
        this.audioElements[i].setAttribute("preload", "auto")
        this.audioElements[i].setAttribute("controls", "none")
        this.audioElements[i].setAttribute("loop", this.looping)
        this.audioElements[i].style.display = "none"        
        document.body.appendChild(this.audioElements[i])
    }
}
