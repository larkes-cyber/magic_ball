class HttpService{

    url = "https://hsfvypq379.loclx.io"

    async sendPrompt(question) {
      const controller = new AbortController();  // Создаем контроллер для отмены запроса
      const timeoutId = setTimeout(() => controller.abort(), 7000);
        try {
          console.log("request started")
          const response = await fetch(`${this.url}/get_prediction/?${question}`, {
            method: 'POST',
            headers: {"Accept": "application/json", "Content-type": "application/json"},
            body: JSON.stringify({
                question:question
            }),
            signal: controller.signal 
          });
          
          if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
          }
          
          return await response.json();
          console.log('Данные получены:', data);
        } catch (error) {
          console.log(error)
          throw error;
          console.error('Ошибка при запросе:', error);
        }
      } 

}


export {HttpService}