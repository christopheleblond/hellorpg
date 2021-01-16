Debug = {
    elements: [],
    x: 0,
    y: 13,
    size: 14,
    color: 'white',
    draw: () => {
        let offsetY = Debug.y
        for(let e of Debug.elements) {
            printText(e.id + ': ' + JSON.stringify(e.obj), {x: Debug.x, y: offsetY }, Debug.size, e.color, 'left')
            offsetY += Debug.size + 3
        }        
    },
    print: (id, obj, color = Debug.color) => Debug.elements.push({id: id, obj: obj, color: color })
}
