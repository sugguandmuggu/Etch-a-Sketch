//const body = document.querySelector(body);

const container = document.createElement('div');
const bigContainer = document.querySelector('.bigContainer');
const sizeButton=document.querySelector('.sizeButton');

//bigContainer.classList.add('bigContainer');
//document.body.appendChild(bigContainer);
sizeButton.addEventListener('click', ()=>{
    promptSize();
})

let sqPerSide=16;



function promptSize(){
    sqPerSide = prompt("Enter the number of squares per side (Maximum limit is 100)");
    if(sqPerSide>100){
        sqPerSide=100;
    }
    clearGrid();
    createGrid();
}

container.setAttribute('style', 'padding:0; max-width:640px; max-height:640px; border: 20px solid rgba(60, 60, 60, 1); width:fit-content; height:fit-content; display:flex; flex-wrap:wrap; background:black; border-radius:5px;')
bigContainer.appendChild(container);
container.classList.add('container');

function changeColor(sqId){
    console.log(sqId);
    let anotherSq=document.getElementById(`${sqId}`);
    anotherSq.style.backgroundColor= 'black';
} 

function clearGrid(){
    while(container.firstChild){
        container.removeChild(container.lastChild)
    }
}

function createGrid(){
    let parameters = 640/sqPerSide;
    for(let i = 0; i<sqPerSide*sqPerSide; i++){
        let square=document.createElement('div')
        square.setAttribute('style', `width:${parameters}px; height:${parameters}px; background:white; border:1px solid rgba(0,0,0,0.1); box-sizing:border-box; padding:0; margin:0;`);
        container.appendChild(square);
        square.classList.add('sqClass');
        square.setAttribute('id', `${i}`);
        console.log(square.id);
    }
    eventListeners();
}

function eventListeners(){
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
}

createGrid();