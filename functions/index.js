const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebaseConfig = require("./config/firebase");
admin.initializeApp(firebaseConfig);
const settings = { /* your settings... */ timestampsInSnapshots: true };
// firestore.settings(settings);
admin.firestore().settings(settings);
exports.upadateCart = functions.firestore
  .document("Carts/CartDetailFromClient")
  .onUpdate((change, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = change.after.data();

    //   // ...or the previous value before this update
    //   const previousValue = change.before.data();
    const db = admin.firestore();
    const refCart = db.collection("Carts");
    let cartItemDetail = {};
    for (let key in newValue) {
      //Get Product Data From Database
      let productData = {};
      db.collection("Products")
        .doc(key)
        .get()
        .then(res =>
          res.exists
            ? (productData = res.data())
            : console.log("No product data")
        )
        .catch(err => console.log(err));

      //Check Promotion Status Of Product and Check Which Promotion Scheme Will Apply
      const {
        event,
        image,
        price,
        description,
        promoStatus,
        promoType
      } = productData;
      const quantity = newValue[key].quantity;
      let quantityGetDiscount, percentGetDiscount, totalAfterPromo;
      const total = quantity * price;

      if (promoStatus) {
        console.log(promoType.match(/.+_/g), "match switch case");

        switch (promoType.match(/.+_/g)) {
          case "groupBuy_offPrice_":
            quantityGetDiscount = parseInt(promoStatus.match(/\d+/g)[0]);
            percentGetDiscount = parseInt(promoStatus.match(/\d+/g)[1]);
            if (quantity < quantityGetDiscount) {
              totalAfterPromo = total;
            } else {
              let numberOfProductDiscount = Math.floor(
                quantity / quantityGetDiscount
              );
              totalAfterPromo =
                total - numberOfProductDiscount * percentGetDiscount;
            }
            break;
          case "groupBuy_getFree_":
            quantityGetDiscount = parseInt(promoStatus.match(/\d+/g)[0]);
            percentGetDiscount = 100;
            if (quantity < quantityGetDiscount) {
              totalAfterPromo = total;
            } else {
              let numberOfProductDiscount = Math.floor(
                quantity / quantityGetDiscount
              );
              totalAfterPromo =
                total - numberOfProductDiscount * percentGetDiscount;
            }
            break;
          case "directDiscount_":
            percentGetDiscount = parseInt(promoStatus.match(/\d+/g)[0]);
            totalAfterPromo = (total * (100 - percentGetDiscount)) / 100;
            break;
          default:
            totalAfterPromo = total;
            break;
        }
      }
      cartItemDetail[key] = {
        quantity,
        total,
        totalAfterPromo
      };
    }
    refCart
      .doc("AfterApplyPro")
      .set(cartItemDetail)
      .catch(err => console.log(err));
    console.log(cartItemDetail);
  });
