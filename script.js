const colorpicker=document.getElementById('colorPicker');
const canvascolor=document.getElementById('canvasColor');
const canvas=document.getElementById('myCanvas');
const clearbtn=document.getElementById('clearButton');
const savebtn=document.getElementById('saveButton');
const fontsize=document.getElementById('fontSize');
const retrieveButton=document.getElementById('retrieveButton')

const ctx = canvas.getContext('2d');
   console.log(ctx)                                
                                  

colorpicker.addEventListener('change',(event)=>{
    ctx.strokeStyle=event.target.value;
    ctx.fillStyle=event.target.value;

    // console.log();
});
canvas.addEventListener('mousedown',(event)=>{
    isDrawing=true;
    lastX=event.offsetX;
    lastY=event.offsetY;
});
canvas.addEventListener('mousemove',(event)=>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        lastX = event.offsetX;
        lastY = event.offsetY;

    }
})

canvas.addEventListener('mouseup',()=>{
    isDrawing=false;
})

canvascolor.addEventListener('change',(e)=>{
    ctx.fillStyle=e.target.value
    ctx.fillRect(0,0,600,300)
})

fontsize.addEventListener('change',(e)=>{
    ctx.lineWidth=e.target.value
})

clearbtn.addEventListener('click',()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
})

savebtn.addEventListener('click',()=>{
    localStorage.setItem('canvasContents',canvas.toDataURL());

    let link=document.createElement('a');
    
    link.download='my-canvas.png';
    link.href=canvas.toDataURL()
    link.click();
})

retrieveButton.addEventListener('click',()=>{
    let savedCanvas=localStorage.getItem('canvasContents')
//    console.log(localStorage.getItem('canvasContents'))
    if(savedCanvas){
        let img=new Image()
        img.src=savedCanvas;
        ctx.drawImage(img,0,0);

    }
})