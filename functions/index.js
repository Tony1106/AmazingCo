const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebaseConfig = require("./config/firebase");
admin.initializeApp(firebaseConfig);
const settings = { /* your settings... */ timestampsInSnapshots: true };
// firestore.settings(settings);
admin.firestore().settings(settings);

exports.getDiscountPrice = functions.https.onCall((data, context) => {
  const cart = data;
  for (let key in cart) {
    const { quantity, promoStatus, promoType, price } = cart[key];
    let quantityGetDiscount, percentGetDiscount, totalAfterPromo;
    const total = quantity * price;
    //Check Promotion Status Of Product and Check Which Promotion Scheme Will Apply
    if (promoStatus) {
      if (/groupBuy_offPrice/.test(promoType)) {
        quantityGetDiscount = Number(promoType.match(/\d+/g)[0]);
        percentGetDiscount = Number(promoType.match(/\d+/g)[1]);
        if (quantity < quantityGetDiscount) {
          totalAfterPromo = total;
        } else {
          let numOfProductDiscount = Math.floor(
            quantity / (quantityGetDiscount + 1)
          );
          totalAfterPromo =
            total - (numOfProductDiscount * percentGetDiscount * price) / 100;
        }
      } else if (/groupBuy_setPrice/.test(promoType)) {
        let numPromoApply = Number(promoType.match(/\d+/g)[0]);
        let totalApply = Number(promoType.match(/\d+/g)[1]);

        if (numPromoApply > quantity) {
          totalAfterPromo = total;
        } else {
          let numOfProductDiscount = Math.floor(quantity / numPromoApply);
          totalAfterPromo =
            (quantity - numPromoApply * numOfProductDiscount) * price +
            totalApply * numOfProductDiscount;
        }
      } else if (/groupBuy_getFree/.test(promoType)) {
        quantityGetDiscount = Number(promoType.match(/\d+/g)[0]);
        percentGetDiscount = 100;
        if (quantity < quantityGetDiscount) {
          totalAfterPromo = total;
        } else {
          let numOfProductDiscount = Math.floor(quantity / quantityGetDiscount);
          totalAfterPromo = total - numOfProductDiscount * price;
        }
      } else if (/directDiscount/.test(promoType)) {
        percentGetDiscount = Number(promoType.match(/\d+/g));
        totalAfterPromo = (total * (100 - percentGetDiscount)) / 100;
      }
    } else {
      totalAfterPromo = total;
    }
    cart[key].totalAfterPromo = totalAfterPromo;
  }
  return {
    cart
  };
});
