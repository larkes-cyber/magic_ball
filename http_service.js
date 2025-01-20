class HttpService{

    url = "https://txsndk-62-118-133-112.ru.tuna.am"

    async sendPrompt(question) {
        try {
          const response = await fetch(`${this.url}/get_prediction`, {
            method: 'POST', // Метод запроса
            headers: {"Accept": "application/json", "Content-type": "application/json"},
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