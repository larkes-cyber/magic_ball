class HttpService{

    url = "http://0.0.0.0:8000"

    async sendPrompt(question) {
        try {
          const response = await fetch(`${this.url}/get_prediction`, {
            method: 'POST', // Метод запроса
            headers: {
              'Content-Type': 'application/json' // Указываем тип данных
            },
            body: JSON.stringify({
                question:question
            })
          });
          
          if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
          }
          
          return await response.json();
          console.log('Данные получены:', data);
        } catch (error) {
          console.error('Ошибка при запросе:', error);
        }
      } 

}


export {HttpService}