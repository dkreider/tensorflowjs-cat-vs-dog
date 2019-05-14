var model = undefined;

async function initialize() {

    console.log('Loading pre-trained model...');
    model = await tf.loadLayersModel('trained-model/model.json');
    console.log('Model successfully loaded...')

    document.getElementById('predict').addEventListener('click', () => predict());

}

async function predict () {

    const imageElement = document.getElementById('img');
    let tensorImg = tf.browser.fromPixels(imageElement).reshape([1, 150, 150, 3]);
    prediction = await model.predict(tensorImg).data();

    if (prediction[0] == 0) {

        alert("You uploaded a cat!");

    } else if (prediction[0] == 1) {

        alert("You uploaded a dog!");

    } else {
        alert("Hummm... a weird error occurred.");
    }


}

function changeImage() {
    var imageDisplay = document.getElementById('img');
    var uploadedImage = document.getElementById('my-file-selector').files[0];
    imageDisplay.src = URL.createObjectURL(uploadedImage);
}

initialize();