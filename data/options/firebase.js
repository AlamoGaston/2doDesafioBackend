const admin = require("firebase-admin");
const serviceAccount = require("./keyFirebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.info("FIREBASE CONNECTED");

const FieldValue = admin.firestore.FieldValue;

const db = admin.firestore();
const queryCarts = db.collection("carts");
const queryProducts = db.collection("products");

module.exports = {
  queryCarts,
  queryProducts,
  FieldValue,
};
