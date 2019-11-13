function callAPI() {
    const model = document.getElementById('model').value;
    const text = document.getElementById('textArea').value;
    const request ={
        model: model,
        text: text,
    };

    console.log(request);

    document.getElementById("modalLauncher").click();
}

