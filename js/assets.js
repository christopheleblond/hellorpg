var IMAGES = {
    'checker': {
        id: 'checker',
        src: 'maps/map.png'
    },
    'healer': {
        id: 'healer',
        src: 'sprites/healer_f.png'
    },
    'mage': {
        id: 'mage',
        src: 'sprites/mage_m.png'
    },
    'ninja': {
        id: 'ninja',
        src: 'sprites/ninja_m.png',
        sprites: {
            up01: { x: 0, y: 0, w: 32, h: 36 },
            up02: { x: 32, y: 0, w: 32, h: 36 },
            up03: { x: 64, y: 0, w: 32, h: 36 },
            right01: { x: 0, y: 36, w: 32, h: 36 },
            right02: { x: 32, y: 36, w: 32, h: 36 },
            right03: { x: 64, y: 36, w: 32, h: 36 },
            down01: { x: 0, y: 72, w: 32, h: 36 },
            down02: { x: 32, y: 72, w: 32, h: 36 },
            down03: { x: 64, y: 72, w: 32, h: 36 },
            left01: { x: 0, y: 108, w: 32, h: 36 },
            left02: { x: 32, y: 108, w: 32, h: 36 },
            left03: { x: 64, y: 108, w: 32, h: 36 },
        }
    },
    'player': {
        id: 'player',
        src: 'sprites/player.png',
        sprites: {
            up01: { x: 0, y: 0, w: 90, h: 126 },
            up02: { x: 90, y: 0, w: 90, h: 126 },
            up03: { x: 180, y: 0, w: 90, h: 126 },
            right01: { x: 0, y: 126, w: 90, h: 126 },
            right02: { x: 90, y: 126, w: 90, h: 126 },
            right03: { x: 180, y: 126, w: 90, h: 126 },
            down01: { x: 0, y: 252, w: 90, h: 126 },
            down02: { x: 90, y: 252, w: 90, h: 126 },
            down03: { x: 180, y: 252, w: 90, h: 126 },
            left01: { x: 0, y: 378, w: 90, h: 126 },
            left02: { x: 90, y: 378, w: 90, h: 126 },
            left03: { x: 180, y: 378, w: 90, h: 126 },
        }
    }
}

var SPRITES = {
    ninja: {
        img: 'ninja',

    }
}

var SOUNDS = {
    'music01': {
        src: 'sounds/music.wav',
        looping: true
    },
    'music02': {
        src: 'sounds/music02.mp3',
        looping: true
    }
}

var AssetManager = new AssetManagerClass('assets', IMAGES, SOUNDS)

function playSound(soundId) {
    AssetManager.playSound(soundId)
}

function playMusic(soundId) {
    AssetManager.playMusic(soundId)
}