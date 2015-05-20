var HeroData = Phlux.createStore({
    data:{
        x: 10, 
        y: 5,
        acceleration: {
            x: 50,
            y: 25
        },
        deacceleration: 5,
        velocity: {
            x: 0,
            y: 0
        },
        fallingSpeed: 8,
        maxVelocity: {
            x: 0.25, y: 3
        },
        color: "red",
        jumpingHeight: {
            current: 0,
            maximum: 3,
        },
        jumpCoolDown: 0
    },
    update: function(delta) {
        var hero = this.data
        // input handling
        if(Keyb.isDown("W") || Keyb.isDown("<up>")){
            if(hero.jumpingHeight.current < hero.jumpingHeight.maximum && hero.jumpCoolDown <= 0) {
                hero.velocity.y -= hero.acceleration.y * delta
            }
        }
        if(Keyb.isDown("A") || Keyb.isDown("<left>")){
            hero.velocity.x -= hero.acceleration.x * delta
        }
        if(Keyb.isDown("S") || Keyb.isDown("<down>")){
            hero.velocity.y += hero.acceleration.y * delta
        }
        if(Keyb.isDown("D") || Keyb.isDown("<right>")){
            hero.velocity.x += hero.acceleration.x * delta
        }
        // gravity
        hero.velocity.y += hero.fallingSpeed * delta
        
        // maximum velocity
        if(hero.velocity.x > hero.maxVelocity.x){
            hero.velocity.x = hero.maxVelocity.x
        }
        if(hero.velocity.x < -hero.maxVelocity.x){
            hero.velocity.x = -hero.maxVelocity.x
        }
        if(hero.velocity.y > hero.maxVelocity.y){
            hero.velocity.y = hero.maxVelocity.y
        }
        if(hero.velocity.y < -hero.maxVelocity.y){
            hero.velocity.y = -hero.maxVelocity.y
        }
       
        // translation
        hero.x += hero.velocity.x
        
        if(hero.y + hero.velocity.y < HEIGHT - 1){
            hero.y += hero.velocity.y
        }else {
            hero.y = HEIGHT - 1
            if(hero.jumpingHeight.current > 0) {
                hero.jumpingHeight.current = 0
                hero.jumpCoolDown = .3
            }
            hero.velocity.y = 0
        }
        
        if(hero.velocity.y < 0){
            hero.jumpingHeight.current += -hero.velocity.y
        }
        
        // jumpCoolDown
        if(hero.jumpCoolDown > 0){
            hero.jumpCoolDown -= delta 
        }
        
        // deacceleration
        if(hero.velocity.x > 0){
            hero.velocity.x -= hero.deacceleration * delta
            if(hero.velocity.x < 0){
                hero.velocity.x = 0
            }
        }else if(hero.velocity.x < 0){
            hero.velocity.x += hero.deacceleration * delta
            if(hero.velocity.x > 0){
                hero.velocity.x = 0
            }
        }
        
        if(hero.velocity.y > 0){
            hero.velocity.y -= hero.deacceleration * delta
            if(hero.velocity.y < 0){
                hero.velocity.y = 0
            }
        }else if(hero.velocity.y < 0){
            hero.velocity.y += hero.deacceleration * delta
            if(hero.velocity.y > 0){
                hero.velocity.y = 0
            }
        }
        if(hero.jumpingHeight.current < hero.jumpingHeight.maximum){
            hero.color = "red"
        }else {
            hero.color = "blue"
        }
        this.trigger()
    }
})

Tickly.loop(function(delta) {
    HeroData.update(delta)
})

var Hero = React.createClass({	
    mixins: [
        Phlux.connectStore(HeroData, "hero")
    ],
    render: function()  {
        var width = 1 + (this.state.hero.velocity.y * 0.75)
        var height = 1 - (this.state.hero.velocity.y * 0.75)
        var myStyles = {
            backgroundColor: this.state.hero.color,
            width: width + "em",
            height: height + "em",
            position: "absolute",
            top: this.state.hero.y - (height / 2) + "em",
            left: this.state.hero.x - (width / 2) + "em"
        }
        return(
            <div style = {myStyles}>
            
            </div>
        )
    }
})
 
module.exports = Hero
