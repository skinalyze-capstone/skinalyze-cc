const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { label, ingredients } = await predictClassification(model, image);
  const id = crypto.randomUUID();
//   const createdAt = new Date().toISOString();
  const date = new Date();
  const tanggal = date.toISOString().split('T')[0]; // Extract only date part
  const Jam = date.toTimeString().split(' ')[0]; // Extract time part

  const data = {
    "id": id,
    "result": label,
    "ingredient": ingredients,
    "tanggal": tanggal,
    "Jam": Jam
  }

  await storeData(id, data);

  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data
  })
  response.code(201);
  return response;
}

module.exports = { postPredictHandler };