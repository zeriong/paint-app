const saveBtn = document.getElementById('save');
const textInput = document.getElementById('text');
const fileInput = document.getElementById('file');
const modeBtn = document.getElementById('mode-btn');
const clearBtn = document.getElementById('clear-btn');
const eraserBtn = document.getElementById('eraser-btn');
const colorOptions = Array.from(document.getElementsByClassName('color-option'));
const color = document.getElementById('color');
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx =canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round"; //선을 둥글게
let isPainting = false;
let isFilling = false;

function onMove(e){
    if(isPainting){
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(e.offsetX,e.offsetY);
}
function startPainting(){
    isPainting = true;
}
function cancelPainting(){
    isPainting = false;
    ctx.beginPath();
}
function onLineWidthChange(e){
    ctx.lineWidth = e.target.value;
}
function onColorChange(e){
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
}
function onColorClick(e){
    const colorValue = e.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}
function onModeClick() {
    if (isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    }
    else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}
function onClearClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}
function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}
function onFileChange(e){
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = ()=> {
        ctx.drawImage(image,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        fileInput.value = null;
    }
}
function onDoubleClick(e){
    const text = textInput.value;
    if (text !== ""){
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "68px serif";
        ctx.fillText(text,e.offsetX, e.offsetY);
        ctx.restore();
    }
}
function onSaveClick(){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown" , startPainting);
canvas.addEventListener("mouseup" , cancelPainting);
canvas.addEventListener("mouseleave" , cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
clearBtn.addEventListener("click", onClearClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);

document.querySelector('.slide').addEventListener("click",()=>{
    document.body.classList.toggle("slide-off");
});