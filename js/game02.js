
let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d'); // указали ,что игра 2D

// переменные для загрузки изображений
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

// Звук
let fly = new Audio();
let scoreAudio = new Audio();

fly.src = 'audio/fly.mp3';
scoreAudio.src = 'audio/score.mp3';


// подключаем изображения 
bird.src='img/bird.png';
bg.src='img/bg.png';
fg.src='img/fg.png';
pipeUp.src='img/pipeUp.png';
pipeBottom.src='img/pipeB.png';

// переменные для игры
// отступ между трубами
let gap =90;
// позиции птички
let xPos =10;
let yPos =150;
// гравитация
let grav =1;
// поднятие птички от нажатия кнопки
let pushUp =20;
// растояние до следующей трубы
let dis =20;
// когда начинать обрабатфывветь
let distance=125;
//
let score =0;


// масив труб
let pipe =[];
pipe[0] ={
    x : cvs.width,
    y :0,
}


// Функция управления игорой
document.addEventListener('keydown',moveUp)

function moveUp(){
    yPos-=pushUp;
    fly.play();
}

// отрисовка
function draw() {    
    ctx.drawImage(bg,0,0);   

    for(let i=0; i<pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x,  pipe[i].y);    
        ctx.drawImage(pipeBottom, pipe[i].x,  pipe[i].y +pipeUp.height +gap);  
        pipe[i].x--;

        // добавляем массив труб
        if(pipe[i].x == distance ){
            pipe.push({
                x : cvs.width + dis,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
            })

        }
        //||
       // yPos +bird.height >= cvs.height-fg.height

        // проверяем столкновение
        if(xPos + bird.width >= pipe[i].x &&
            xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height ||
                yPos + bird.height >= pipe[i].y + pipeUp.height +gap ) ){
                    
                    location.reload();
        }

        if(pipe[i].x == 5){
            score++;
            scoreAudio.play();
        }
    }

    ctx.drawImage(fg,0, cvs.height-fg.height);    
    ctx.drawImage(bird,xPos,yPos);
    yPos+=grav;
    ctx.filStyle = '#000';
    ctx.font = '24px Verdana';
    ctx.fillText('Score'+score, 10 , cvs.height-20)
    requestAnimationFrame(draw);
}

window.onload = function () {
    
    draw();
 }
