const { Firestore } = require('@google-cloud/firestore');
const path = require('path');

const pathKey = path.resolve('./coba-skinalyze-cbe9183d09fa.json')
     
async function storeData(id, data) {

  try {
    const db = new Firestore({
      projectId: 'coba-skinalyze',
      keyFilename: pathKey,
    });
 
    const predictCollection = db.collection('predictions');
    return predictCollection.doc(id).set(data);
  }catch(error) {
    console.error(error);
  }
}
 
module.exports = storeData;