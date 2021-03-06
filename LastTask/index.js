const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player{
    constructor(x,y , radius,color){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.
            radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
}

class bullet{
    constructor(x,y , radius,color,velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
        draw(){
            c.beginPath()
            c.arc(this.x, this.y, this.
                radius, 0, Math.PI * 2, false)
            c.fillStyle = this.color
            c.fill()
        }

        update(){
            this.draw()
            this.x = this.x + this.velocity.x
            this.y = this.y + this.velocity.y
        }
  }

  class Enemy{
    constructor(x,y , radius,color,velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
        draw(){
            c.beginPath()
            c.arc(this.x, this.y, this.
                radius, 0, Math.PI * 2, false)
            c.fillStyle = this.color
            c.fill()
        }

        update(){
            this.draw()
            this.x = this.x + this.velocity.x
            this.y = this.y + this.velocity.y
        }
  }

const x = canvas.width/2
const y = canvas.height/2

const player = new Player(x,y,30,'blue')

const bullets = []
const enemies = []
 
function spawnEnemy(){
    setInterval(() =>{
        const radius = 30
        const x = Math.random() < 0.5 ? 0 - radius : canvas
        .width +radius
        const y = Math.random() *canvas.height
        const color = 'green'

        const angle = Math.atan2(canvas.height /2 - y, 
        canvas.width /2 - x)
            
        
        const velocity = {
           x: Math.cos(angle),
           y: Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius,color,
            velocity ))
    },1000)
}
    
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0, canvas.width, canvas.height)
    player.draw()
    bullets.forEach((bullet)=>{
        bullet.update()
    
    })
    enemies.forEach(enemy =>{
        enemy.update()
    })    
    
}

addEventListener('click', (event)=>{
    const angle = Math.atan2(
        event.clientY - canvas.height /2,
        event.clientX - canvas.width /2
        
    )
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    bullets.push(
        new bullet(canvas.width /2, canvas.height/2,
        5,'red', velocity)
    )

})




animate()
spawnEnemy()

