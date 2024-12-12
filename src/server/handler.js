const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');

const postPredictHandler = async (request, h) => {
  try {
    const { image } = request.payload; // Mengambil file gambar dari payload
    const { model } = request.server.app; // Model TensorFlow dari server app

    if (!image) {
      return h.response({
        status: 'fail',
        message: 'Gambar tidak ditemukan dalam payload.',
      }).code(400);
    }

    // Melakukan prediksi
    const { label, ingredients } = await predictClassification(model, image);

    // Membuat data hasil prediksi
    const id = crypto.randomUUID();
    const date = new Date();
    const tanggal = date.toISOString().split('T')[0]; // Format tanggal
    const jam = date.toTimeString().split(' ')[0]; // Format waktu

    const data = {
      id,
      result: label,
      ingredient: ingredients,
      tanggal,
      jam,
    };

    // Menyimpan data hasil prediksi
    await storeData(id, data);

    // Mengembalikan response berhasil
    return h.response({
      status: 'success',
      message: 'Prediksi berhasil dilakukan.',
      data,
    }).code(201);
  } catch (error) {
    console.error('Error in postPredictHandler:', error);

    // Mengembalikan response gagal dengan pesan error
    return h.response({
      status: 'fail',
      message: 'Terjadi kesalahan dalam melakukan prediksi. Silakan coba lagi.',
    }).code(500);
  }
};

module.exports = { postPredictHandler };
