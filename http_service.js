class HttpService{

    url = "https://w1hcrkzfvc.loclx.io"

    async sendPrompt(question) {
        try {
          console.log("request started")
          const response = await fetch(`${this.url}/get_pediction`, {
            method: 'POST',
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