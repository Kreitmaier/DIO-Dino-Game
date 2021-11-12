const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
let pontos = 0;


function handleKeyUp(event){
    if(event.keyCode === 32){ // Nr 32 Faz referencia a Tecla do Teclado no caso o "Espaço" - É possivel pesquisar mais teclas em: keycode.info
        if(!isJumping){
            jump();
        }
        
    }

}

function jump(){
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if(position <= 0 ){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
                
            }, 20);
        }else{
            position += 20;
            dino.style.bottom = position + 'px';
        }
        

    }, 20);
}

function createCactus(dificult){
    const cactus = document.createElement('div');
    const score = document.getElementById('pontos');
    
    let cactusPosition = 1000;
    let randomTime = Math.random() * 5000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(()=>{

        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
            pontos++;
            score.innerText = pontos;
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){

            clearInterval(leftInterval);
            document.body.innerHTML = `<div class="container-gameover"><h1 class="game-over">FIM DE JOGO</h1>
                                       <h1 class="game-over">Você fez um total de ${pontos} ponto(s).</h1>
                                       `;
        }else{
            cactusPosition -= dificult;
            cactus.style.left = cactusPosition + 'px';
        }
            
        
    }, 20);

    setTimeout(()=> {createCactus(dificult)}, randomTime); //tive que fazer desta forma para poder passa o parâmetro e não travar.
}

//Start App
const btnStart = document.getElementById('start');

btnStart.addEventListener('click', () => {
    const radiosDificult = document.getElementsByName('cactus-dificult');

    radiosDificult.forEach(radio => {
        if(radio.checked){
            return createCactus(radio.value); 
            
        } 
    })
   
    btnStart.disabled = true;
    
});

//jump's function
document.addEventListener('keyup', handleKeyUp);


