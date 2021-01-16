function registerScene(scene) {
    currentGame.scenes[scene.sceneId] = scene
}

function setScene(sceneId) {
    currentGame.sceneId = sceneId
}