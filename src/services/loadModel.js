const tf = require('@tensorflow/tfjs-node');
 
async function loadModel() {
    const modelPath = 'https://storage.googleapis.com/modelmlgeming/model-in-prod/model.json'; // Ganti dengan URL model Anda

    try {
        const model = await tf.loadLayersModel(modelPath);
        console.log('Model berhasil dimuat');
        return model;
    } catch (error) {
        console.error('Gagal memuat model:', error);
    }
}
module.exports = loadModel;