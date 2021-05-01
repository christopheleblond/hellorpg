var IMAGES = {
    'demomap': {
        id: 'demomap',
        src: 'sprites/map.png'
    },
    'floor1': {
        id: 'floor1',
        src: 'maps/HelloRPG_floor1.png'
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
    },
    'pnj': {
        id: 'pnj',
        src: 'sprites/pnj.png',
        sprites: {
            pnj_up01: { x: 0, y: 0, w: 90, h: 126 },
            pnj_up02: { x: 90, y: 0, w: 90, h: 126 },
            pnj_up03: { x: 180, y: 0, w: 90, h: 126 },
            pnj_right01: { x: 0, y: 126, w: 90, h: 126 },
            pnj_right02: { x: 90, y: 126, w: 90, h: 126 },
            pnj_right03: { x: 180, y: 126, w: 90, h: 126 },
            pnj_down01: { x: 0, y: 252, w: 90, h: 126 },
            pnj_down02: { x: 90, y: 252, w: 90, h: 126 },
            pnj_down03: { x: 180, y: 252, w: 90, h: 126 },
            pnj_left01: { x: 0, y: 378, w: 90, h: 126 },
            pnj_left02: { x: 90, y: 378, w: 90, h: 126 },
            pnj_left03: { x: 180, y: 378, w: 90, h: 126 },
        }
    },
    'table': {
        id: 'table',
        src: 'sprites/table.png'
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