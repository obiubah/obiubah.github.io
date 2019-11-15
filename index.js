function callAPI() {
    const model = document.getElementById('model').value;
    const text = document.getElementById('textArea').value;
    const request = {
        model: model,
        text: text,
    };

    console.log(request);
    fetchResults(request)
}

async function fetchResults(opts) {
    response = fetch('https://flask-sentiment-analysis-app.herokuapp.com/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(opts)
    });

     responseBody = await response;
     jsonBody = await responseBody.json()
     console.log (jsonBody);

     const model = document.getElementById('genuine');
     model.innerHTML = jsonBody.genuine

     const accuracy = document.getElementById('accuracy');
     accuracy.innerHTML = jsonBody.accuracy.toFixed(2);

     document.getElementById("modalLauncher").click();
}