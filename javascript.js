//const body = document.querySelector(body);

const container = document.createElement('div');
const bigContainer = document.querySelector('.bigContainer');

//bigContainer.classList.add('bigContainer');
//document.body.appendChild(bigContainer);


container.setAttribute('style', 'padding:0; max-width:640px; max-height:640px; border: 20px solid rgba(60, 60, 60, 1); width:fit-content; height:fit-content; display:flex; flex-wrap:wrap; background:black; margin-left: auto; margin-right:auto;')
bigContainer.appendChild(container);
container.classList.add('container');


let parameters = 640/16;

for(let i = 0; i<16*16; i++){
    let square=document.createElement('div')
    square.setAttribute('style', `width:${parameters}px; height:${parameters}px; background:white; border:1px solid rgba(0,0,0,0.1); box-sizing:border-box; padding:0; margin:0;`);
    container.appendChild(square);
    square.classList.add('sqClass');
    square.setAttribute('id', `${i}`);
    console.log(square.id);
}

const sqClasses = document.querySelectorAll('.sqClass');
sqClasses.forEach((aSquare) => aSquare.addEventListener('mousedown', () => {
    /*if(e.type==='mousedown'){
        container.classList.add('hvr');
        changeColor(aSquare.id);
    }
    else if(e.type==='mouseenter' && container.classList.contains('hvr')){
        changeColor(aSquare.id);
    }
    else if(e.type==='mouseup'){
        container.classList.remove('hvr');
    }*/
    container.classList.add('hvr');
    changeColor(aSquare.id);


}));

sqClasses.forEach((aSquare) => aSquare.addEventListener('mouseenter', () => {
    if(container.classList.contains('hvr')){
        changeColor(aSquare.id);
    }


}));

sqClasses.forEach((aSquare) => aSquare.addEventListener('mouseup', () => {
    
    container.classList.remove('hvr');


}));

function changeColor(sqId){
    console.log(sqId);
    let anotherSq=document.getElementById(`${sqId}`);
    anotherSq.style.backgroundColor= 'black';
} 