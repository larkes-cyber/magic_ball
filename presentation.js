
import { Controller } from './controller.js';
import { UiAction } from './models/UiAction.js';
import { UiEvent } from './models/UiEvent.js';
import { UiState } from './models/UiState.js';

const controller = new Controller();

const ball = document.getElementById('magic_ball');
const triangle = document.getElementById('triangle');
const prediction = document.getElementById('prediction');
const textField = document.getElementById("text_field");
const triangleWidth = 30
const triangleHeight = 24


function expandTriangle(status, sizeValue, callback){
    function handleTransitionEnd() {
        callback();
        triangle.removeEventListener("transitionend", handleTransitionEnd);
    }
    if(status){
        triangle.style.marginTop = "40%";
        triangle.style.borderLeft = `${(triangleWidth/2) * sizeValue}vw solid transparent`;
        triangle.style.borderRight = `${(triangleWidth/2) * sizeValue}vw solid transparent`;
        triangle.style.borderTop = `${triangleHeight * sizeValue}vw solid rgba(5, 17, 242, 0.6)`;
        triangle.addEventListener('transitionend', handleTransitionEnd);
    }else{
        triangle.style.marginTop = "0%";
        triangle.style.borderLeft = `${(triangleWidth/2)}vw solid transparent`;
        triangle.style.borderRight = `${(triangleWidth/2)}vw solid transparent`;
        triangle.style.borderTop = `${triangleHeight}vw solid rgba(5, 17, 242, 0.6)`;
        triangle.addEventListener('transitionend', handleTransitionEnd);
    }
}

function showPrediction(status, widthValue){
    if(status){
        prediction.style.width = `${(triangleWidth*widthValue) - 60}vw`;
        prediction.style.display = "block";
    }else{
        prediction.style.display = "none";
    }
}

function startShaking(item, callback) {    
    
    const action = () => {
        item.style.animation = null
        callback();
        item.removeEventListener("animationend", action);
    }
    
    item.style.animation = "shake 0.4s ease-in-out infinite"
    // Убираем класс после завершения анимации (через 1 секунду)
    item.addEventListener('animationend', action);
}

function endShaking(item) {   
    item.style.animation = "shake 0.4s ease-in-out 2"
}

function setCloseListener(callback){
    const action = () => {
        callback();
        document.removeEventListener("click", action);
    }
    document.addEventListener('click', action);
}

function setShowListener(callback){
    const action = () => {
        callback();
        ball.removeEventListener("click", action);
        triangle.removeEventListener("click", action);

    }
    ball.addEventListener('click', action);
    triangle.addEventListener('click', action);
}

controller.onStateChange((state) => {
    prediction.textContent = state.prediction;
})

controller.onActionChange((action) => {
    switch (action) {
        case UiAction.StartShaking:
            console.log("start shaking")
            startShaking(ball,() => {
                expandTriangle(true, 3.2, () => {
                    showPrediction(true, 3.2);
                    setCloseListener(() => {
                        controller.onEvent(UiEvent.AllClicked);
                    });
                });
            });
            startShaking(triangle,() => {});
            break;
        case UiAction.EndShaking:
            console.log("end shaking")
            endShaking(ball);
            endShaking(triangle);
            break;
        case UiAction.HidePrediction:
            console.log("hide prediction")
            showPrediction(false, 0);
            expandTriangle(false, 0, () => {
                setShowListener(() => {
                    controller.onEvent(UiEvent.BallClicked, textField.value);
                    textField.value = "";
                });
            });
            break;
        default:
            console.log('Неизвестный статус');
    }
})

setShowListener((() => {
    controller.onEvent(UiEvent.BallClicked, textField.value);
    textField.value = "";
}));

