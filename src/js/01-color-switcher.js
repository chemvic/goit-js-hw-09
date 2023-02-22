const buttonStartEl=document.querySelector("button[data-start]");
const buttonStopEl=document.querySelector("button[data-stop]");
let intervalId = null;

buttonStartEl.addEventListener('click', onChangeColor);

function onChangeColor(event) {
    buttonStartEl.setAttribute("disabled", true);  
  

    intervalId = setInterval(() => {
         document.body.style.backgroundColor = getRandomHexColor();
    }, 1000); 
}

buttonStopEl.addEventListener('click', onStop);
function onStop (event){
    clearInterval(intervalId);
    buttonStartEl.removeAttribute("disabled");
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}