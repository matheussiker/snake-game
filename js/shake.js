const canvas = document.getElementById('meuCanvas');
const ctx = canvas.getContext('2d');

const h1 = document.querySelector("h1")

const snake  = [
    {x: 240 , y: 300 },
    {x: 270 , y: 300 },
]

const randomNum = (min, max) =>{
    return Math.round(Math.random() * (max - min) + min)
}

const randomPositionW = () =>{
    const number = randomNum(0 , canvas.width - 30)
    return  Math.round(number/30) * 30
}
const randomPositionH = () =>{
    const number = randomNum(0 , canvas.height - 30)
    return  Math.round(number/30) * 30
}

const comida = {
    x: randomPositionW(0, 870),
    y: randomPositionH(0, 570),
    color: 'red'
}

let direcaoMove 
let loopId

const desenharcomida = () =>{
    ctx.shadowColor = comida.color
    ctx.shadowBlur = 40
    ctx.fillStyle = comida.color
    ctx.fillRect(comida.x, comida.y, 30, 30)
    ctx.shadowBlur = 0
}

const desenhar = () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);   
    ctx.fillStyle = '#d0d9d8';  

    snake.forEach((posisao, index) => {

        if(index == snake.length - 1){
            ctx.fillStyle = '#949292';
        }

        ctx.fillRect(posisao.x, posisao.y, 30,30)
    })
}
        
const moveSnake = () =>{

    if(!direcaoMove)return

    const cabeca = snake[snake.length -1]

    snake.shift()

    if(direcaoMove == "right"){
        snake.push({x:cabeca.x +30 ,y: cabeca.y})
    }

    if(direcaoMove == "left"){
        snake.push({x:cabeca.x -30 ,y: cabeca.y})
    }

    if(direcaoMove == "down"){
        snake.push({x:cabeca.x,y: cabeca.y + 30})
    }

    if(direcaoMove == "up"){
        snake.push({x:cabeca.x,y: cabeca.y - 30})
    }
}

const desenharGrid = () =>{
    ctx.lineWhidth = 0
    ctx.strokeStyle = "#000"
    for (let i = 30; i < canvas.width; i += 30){
        ctx.beginPath();
        ctx.lineTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()

        ctx.beginPath();
        ctx.lineTo(0, i)
        ctx.lineTo( canvas.width, i) 
        ctx.stroke()
    }
}

const chackEat = () =>{
    const cabeca = snake[snake.length -1]

    if(cabeca.x == comida.x && cabeca.y == comida.y){
        snake.push(cabeca)

        let x = randomPositionW()
        let y = randomPositionH()

        while (snake.find((position) => position.x == x &&  position.y == y)){
            x = randomPositionW()
            y = randomPositionH()
        }

        comida.x = x
        comida.y = y
    }
}

const checkColisao = () => {
    const cabeca = snake[snake.length -1]
    const neckindex =snake.length -2

    const wallColisao = cabeca.x < 0 -30 || cabeca.x > 900 || cabeca.y < 0 - 30  || cabeca.y > 600
 

    const selfconisao = snake.find((position, index) =>{
        return  index < neckindex && position.x == cabeca.x && position.y == cabeca.y    
    })

    if(wallColisao || selfconisao){
        alert("Você perdeu")
    }
}

const gameloop = () =>{
    clearInterval(loopId)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    desenhar()
    desenharcomida()
    moveSnake()
    chackEat()
    checkColisao()

    

    loopId = setTimeout(() =>{
        gameloop()
    },50)
}

gameloop()

document.addEventListener('keydown', ({key}) =>{
    if (key == 'ArrowRight' && direcaoMove != "left") {
        direcaoMove = "right"
    } 

    if (key === 'ArrowLeft'  && direcaoMove != "right") {
        direcaoMove = "left"
    }   

    if (key === 'ArrowUp'  && direcaoMove != "down"){
        direcaoMove = "up"
    }

    if (key === 'ArrowDown' && direcaoMove != "up"){
        direcaoMove = "down"
    }
})
