var LevelStore = require("<res>/level1.json")

var Level = Phlux.createStore("level1", {
    data: {
        tiles: {
        // tiles go here
        }
       },
       
       createRoom: function(rx, ry, data)
       {
            var level = levelStore
            var tiles = level.layers[0].data
            for(var tx = 0; tx < level.width; tx++)