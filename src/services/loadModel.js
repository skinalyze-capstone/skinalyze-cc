const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
    const modelUrl ='https://storage.googleapis.com/bucket-model-ml-skinalyze/model-in-prod/model.json'

    try {
        const model = await tf.loadLayersModel(modelUrl);
        return model; // Mengembalikan model setelah berhasil dimuat
    } catch (error) {
        console.error('Error loading model:', error); // Menangani kesalahan
    }
}

module.exports = loadModel;