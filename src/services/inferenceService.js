const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
    try {
        // Proses untuk memproses input gambar menjadi tensor
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([256, 256])
            .expandDims()
            .toFloat();
  
        // Memprediksi output model
        const prediction = model.predict(tensor);
        const predictedLabel = await prediction.data();  // Model output berupa label
        let label = predictedLabel;  // Label yang didapat dari model
        let ingredients = '';

        // Tentukan ingredients berdasarkan label yang diprediksi
        if (label === 'Acne') {
            ingredients = "Azelaic Acid, Glycolic Acid, Retinol, Salicylic Acid, Zinc PCA";
        } else if (label === 'Bags') {
            ingredients = "Niacinamide, Caffeine";
        } else if (label === 'Bopeng') {
            ingredients = "Ceramides, Retinol, Squalane";
        } else if (label === 'Bruntusan') {
            ingredients = "Zinc PCA, Tea Tree Oil, Azelaic Acid, Glycolic Acid, Salicylic Acid";
        } else if (label === 'Milia') {
            ingredients = "Vitamin C, Alpha Arbutin, AHA BHA, Niacinamide, Retinol";
        } else if (label === 'Redness') {
            ingredients = "Chamomile Extract, Centella Asiatica, Bisabolol, Avene Thermal Water";
        } else {
            throw new InputError('Label tidak dikenali');
        }

        // Mengembalikan label dan ingredients
        return { label, ingredients };
    } catch (error) {
        // Menangani error jika terjadi kesalahan dalam proses prediksi
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
    }
}

module.exports = predictClassification;