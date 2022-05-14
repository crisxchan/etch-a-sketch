const DEFAULT_SIZE = 16;

const container = document.querySelector('#container');
const size = document.querySelector('#size');
const base = document.querySelector('#base');

let isInkNormal = true;
let inkColor = base.value;
let r = 255;
let g = 0;
let b = 0;

const normal = () => isInkNormal = true;
const rainbow = () => isInkNormal = false;

let mouseDown = false
document.body.onmousedown = () => {
    mouseDown = true;
    clearSelection();
};
document.body.onmouseup = () => mouseDown = false;

function clearColor(){
    const boxes = document.querySelectorAll('.box'); 
    boxes.forEach(box => box.style.backgroundColor = 'white');
}

function resetGrid(){
    container.innerHTML = '';
    container.style.gridTemplateColumns = '';
    container.style.gridTemplateRows = '';
}

function updateSize(){
    const sizeValue = document.querySelector('#sizeValue');
    sizeValue.innerHTML = `${this.value} x ${this.value}`;
    createDivs(this.value);
}

function changeInk(){
    inkColor = this.value;
}

function clearSelection() {
    if (window.getSelection) {window.getSelection().removeAllRanges();}
    else if (document.selection) {document.selection.empty();}
}

function rgbToHex(r, g, b){
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function getRainbowRgb(){
    if(r==255 && g==0 && b!=255){
        b+=5;
    }
    if(r!=0 && g==0 && b==255){
        r-=5;
    }
    if(r==0 && g!=255 && b==255){
        g+=5
    }
    if(r==0 && g==255 && b!=0){
        b-=5;
    }
    if(r!=255 && g==255 && b==0){
        r+=5;
    }
    if(r==255 && g!=0 && b==0){
        g-=5;
    }

    let rgb = `rgb(${r}, ${g}, ${b})`;
    
    inkColor = rgbToHex(r, g, b);
    base.value = rgbToHex(r, g, b);

    return rgb;
}

function changeColor(e){
    if(e.type === 'mouseover' && !mouseDown) return;

    e.target.style.backgroundColor = isInkNormal ? inkColor : getRainbowRgb();
}

function createDivs(colRow){
    resetGrid();
    let size = 100/colRow;
    
    for(let i=0; i<colRow; i++){
        container.style.gridTemplateColumns += `${size}% `
        container.style.gridTemplateRows += `${size}% `
        for(let j=0; j<colRow; j++){
            const div = document.createElement('div');
            div.classList.add('box');

            container.appendChild(div);
        }
    }   
    setupHover();
}

function setupHover(){
    const boxes = document.querySelectorAll('.box'); 
    boxes.forEach(box => box.addEventListener('mouseover', changeColor));
    boxes.forEach(box => box.addEventListener('mousedown', changeColor));
}


size.addEventListener('change', updateSize);
base.addEventListener('change', changeInk);

createDivs(DEFAULT_SIZE);
