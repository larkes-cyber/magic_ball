import { HttpService } from './http_service.js';
import { UiAction } from './models/UiAction.js';
import { UiEvent } from './models/UiEvent.js';
import { UiState } from './models/UiState.js';


class Controller{

    httpService = new HttpService();
    state = new UiState();
    action = UiAction.None;
    

    onEvent(event, params = null){
        switch (event) {
            case UiEvent.BallClicked:

                const localCases = ['Yes', 'No', 'Maybe', 'Ask later...', 'Never', 'Absolutely']

                this.performAction(UiAction.StartShaking);
                this.httpService.sendPrompt(params.length == 0 ? null : params).then((result) => {
                    console.log("here is isisisisi")
                    this.performAction(UiAction.EndShaking);
                    this.performStateChange(new UiState(result));
                  }).catch((error) => {
                    this.performAction(UiAction.EndShaking);
                    this.performStateChange(new UiState(localCases[Math.floor(Math.random() * localCases.length)]));
                  });

                break;
            case UiEvent.AllClicked:
                console.log('Hode');
                this.performAction(UiAction.HidePrediction)
                console.log('Статус: В процессе');
                break;
            default:
                console.log('Неизвестный статус');
        }
    }

    onStateChange(callback){
      this._onStateChange = callback; 
    }

    onActionChange(callback){
        this._onActionChange = callback; 
    }

    performStateChange(state){
        this.state = state;
        this._onStateChange(state);
    }

    performAction(action){
        this.action = action
        this._onActionChange(action)
    }
}

export { Controller };