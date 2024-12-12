const InputError = require('../exceptions/InputError');
const tf = require('@tensorflow/tfjs-node');

async function predictClassification(model, image) {
    try {
        // Preprocess the input image
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeBilinear([256, 256]) // Use a valid resizing method
            .expandDims()
            .toFloat();

        // Predict using the model
        const prediction = model.predict(tensor);
        const probabilities = await prediction.data(); // Get probabilities or raw output
        console.log('Raw Prediction:', probabilities);

        // Map probabilities to labels (update this mapping based on your model)
        const labels = ['Acne', 'Bags', 'Bopeng', 'Bruntusan', 'Milia', 'Redness'];
        const maxIndex = probabilities.indexOf(Math.max(...probabilities));
        const label = labels[maxIndex];
        console.log('Predicted Label:', label);

        // Determine ingredients based on label
        let ingredients = '';
        switch (label) {
            case 'Acne':
                ingredients = "Azelaic Acid, Glycolic Acid, Retinol, Salicylic Acid, Zinc PCA";
                break;
            case 'Bags':
                ingredients = "Niacinamide, Caffeine";
                break;
            case 'Bopeng':
                ingredients = "Ceramides, Retinol, Squalane";
                break;
            case 'Bruntusan':
                ingredients = "Zinc PCA, Tea Tree Oil, Azelaic Acid, Glycolic Acid, Salicylic Acid";
                break;
            case 'Milia':
                ingredients = "Vitamin C, Alpha Arbutin, AHA BHA, Niacinamide, Retinol";
                break;
            case 'Redness':
                ingredients = "Chamomile Extract, Centella Asiatica, Bisabolol, Avene Thermal Water";
                break;
            default:
                throw new InputError(Label + "is not recognized");
        }

        return { label, ingredients };
    } catch (error) {
        console.error('Error during prediction:', error.message);
        throw new InputError('An error occurred during prediction');
    }
}

module.exports = predictClassification;