var model = undefined;
const classifierElement = document.getElementById('classifier');
const loaderElement = document.getElementById('loader');

async function initialize() {

    model = await tf.loadLayersModel('trained-model/model.json');
    classifierElement.style.display = 'block';
    loaderElement.style.display = 'none';

    document.getElementById('predict').addEventListener('click', () => predict());

}

async function predict () {

    const imageElement = document.getElementById('img');
    imageElement.width = 150;
    imageElement.height = 150;
    let tensorImg = tf.browser.fromPixels(imageElement).reshape([1, 150, 150, 3]);
    prediction = await model.predict(tensorImg).data();

    if (prediction[0] == 0) {

        alert("You uploaded a cat!");

    } else if (prediction[0] == 1) {

        alert("You uploaded a dog!");

    } else {
        alert("Hummm... a weird error occurred.");
    }

    imageElement.width = 375;
    imageElement.height = 375;

}

function changeImage() {
    var imageDisplay = document.getElementById('img');
    var uploadedImage = document.getElementById('my-file-selector').files[0];
    imageDisplay.src = URL.createObjectURL(uploadedImage);
}

initialize();