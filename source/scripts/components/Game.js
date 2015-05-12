var GameFrame = require("<scripts>/components/GameFrame")
var Hero = require("<scripts>/components/Hero")

var Game = React.createClass({
    render: function() {
        return (
            <GameFrame>
                <Hero/>
            </GameFrame>
        )
    }
})

module.exports = Game
