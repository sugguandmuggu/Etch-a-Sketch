//const body = document.querySelector(body);

const container = document.createElement('div');
const bigContainer = document.querySelector('.bigContainer');
const sizeButton=document.querySelector('.sizeButton');
const rnbwButton = document.querySelector('.rnbwButton');
const clear = document.querySelector('.clear');
const lineBtn = document.querySelector('.lineBtn');
const eraser = document.querySelector('.Eraser');
const shading = document.querySelector('.shading');
//bigContainer.classList.add('bigContainer');
//document.body.appendChild(bigContainer);
sizeButton.addEventListener('click', ()=>{
    promptSize();
});

rnbwButton.addEventListener('click', () => {
    if(rnbwButton.textContent === 'Rainbow Mode : On'){
        rnbwButton.textContent='Rainbow Mode : Off';
        container.classList.remove('rnbw');
    }

    else if(rnbwButton.textContent === 'Rainbow Mode : Off'){
        rnbwButton.textContent='Rainbow Mode : On';
        container.classList.add('rnbw');
        if(container.classList.contains('shade'))
        {
            container.classList.remove('shade');
            shading.textContent='Shading : Off';
        }
    }
});

lineBtn.addEventListener('click', () => {
    if(lineBtn.textContent === 'Grid Lines : On'){
        lineBtn.textContent='Grid Lines : Off';
        toggleGridLinesOff();
    }

    else if(lineBtn.textContent === 'Grid Lines : Off'){
        lineBtn.textContent='Grid Lines : On';
        toggleGridLinesOn();
    }
});

eraser.addEventListener('click', () => {
    if(eraser.textContent === 'Eraser : On'){
        eraser.textContent='Eraser : Off';
        container.classList.remove('erase');
    }

    else if(eraser.textContent === 'Eraser : Off'){
        eraser.textContent='Eraser : On';
        container.classList.add('erase');
    }
});

shading.addEventListener('click', () => {
    if(shading.textContent === 'Shading : On'){
        shading.textContent='Shading : Off';
        container.classList.remove('shade');
    }

    else if(shading.textContent === 'Shading : Off'){
        shading.textContent='Shading : On';
        container.classList.add('shade');
        if(container.classList.contains('rnbw'))
        {
            container.classList.remove('rnbw');
            rnbwButton.textContent='Rainbow Mode : Off';
        }
    }
});

clear.addEventListener('click', ()=>{
    cleanGrid();
} );


let sqPerSide=16;



function promptSize(){
    sqPerSide = prompt("Enter the number of squares per side (Maximum limit is 100)", "16");
    if(sqPerSide>100){
        sqPerSide=100;
    }
    clearGrid();
    createGrid();
}

container.setAttribute('style', 'padding:0; max-width:640px; max-height:640px; border: 20px solid rgba(60, 60, 60, 1); width:fit-content; height:fit-content; display:flex; flex-wrap:wrap; background:hsl(0, 0%, 0%); border-radius:5px;')
bigContainer.appendChild(container);
container.classList.add('container');

function changeColor(sqId){
    
    if(container.classList.contains('rnbw')){
        let anotherSq=document.getElementById(`${sqId}`);
        anotherSq.style.backgroundColor= randomColor();
    }
    else if(container.classList.contains('erase')){
        let anotherSq=document.getElementById(`${sqId}`);
        anotherSq.style.backgroundColor= 'hsl(0, 0%, 100%)';
    }
    else if(container.classList.contains('shade')){
        let anotherSq=document.getElementById(`${sqId}`);
        let currentColor =rgbToHsl(anotherSq.style.backgroundColor);
        anotherSq.style.backgroundColor= decrementLightness(currentColor);
    }
    else{
        let anotherSq=document.getElementById(`${sqId}`);
        anotherSq.style.backgroundColor= 'hsl(0, 0%, 0%)';
    }
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
        square.setAttribute('style', `width:${parameters}px; height:${parameters}px; background:hsl(0, 0%,100%); box-sizing:border-box; padding:0; margin:0;`);
        container.appendChild(square);
        square.classList.add('sqClass');
        square.classList.add('borderClass')
        square.setAttribute('id', `${i}`);
        
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

function randomColor() {
    // return "#" + Math.floor(Math.random()*16777215).toString(16);
    // this returns fewer colors but they are all nice and bright
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

function cleanGrid(){
    
    const cleanSqs=document.querySelectorAll('.sqClass');
    cleanSqs.forEach((cleanSq => {
        cleanSq.style.backgroundColor='hsl(0, 0%, 100%)';
    }))
    
}

function toggleGridLinesOff(){
    let parameters = 640/sqPerSide;
    const cleanSqs=document.querySelectorAll('.sqClass');
    cleanSqs.forEach((cleanSq => {
        //cleanSq.setAttribute('style', `width:${parameters}px; height:${parameters}px; background:white; border:none; box-sizing:border-box; padding:0; margin:0;`);
        cleanSq.classList.remove('borderClass');
    }));
    
}

function toggleGridLinesOn(){
    let parameters = 640/sqPerSide;
    const cleanSqs=document.querySelectorAll('.sqClass');
    cleanSqs.forEach((cleanSq => {
        //cleanSq.setAttribute('style', `width:${parameters}px; height:${parameters}px; background:white; border:1px solid rgba(0,0,0,0.1); box-sizing:border-box; padding:0; margin:0;`);
        cleanSq.classList.add('borderClass');
    }));
    
}

function rgbToHsl(rgb){
    let sep = rgb.indexOf(',') > -1 ? ',' : ' ';
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(')')[0].split(sep);
    let r=rgb[0];
    let g=rgb[1];
    let b=rgb[2];

    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
        : 0;
    return `(
    ${60 * h < 0 ? 60 * h + 360 : 60 * h},
    ${100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)},
    ${(100 * (2 * l - s)) / 2}
    )`;
}

function decrementLightness(hsl){
    let sep = hsl.indexOf(',') > -1 ? ',' : ' ';
    // Turn "rgb(r,g,b)" into [r,g,b]
    hsl = hsl.substr(4).split(')')[0].split(sep);
    let h=hsl[0];
    let s=hsl[1];
    let l=hsl[2];

    l=parseInt(l);
    s=parseInt(s);
    h=parseInt(h);

    
    if(l===0){
        l=0;
    }
    else{
        l-=10;
    }

    

    return `hsl(${h}, ${s}%, ${l}%)`
}





createGrid();


