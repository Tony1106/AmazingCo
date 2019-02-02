import React from "react";

export default function SaleSummary({ data }) {
  let total = 0;
  let totalAfterPromo = 0;
  let totalSave = 0;
  for (let key in data) {
    total = total + data[key].price * data[key].quantity;
    totalAfterPromo = totalAfterPromo + data[key].totalAfterPromo;
    console.log(total, data[key].price * data[key].quantity, "data");
  }
  totalSave = total - totalAfterPromo;
  return (
    <>
      <div>
        Total <span>{`${total}$`}</span>
      </div>
      <div>
        You Save <span>{`${totalSave}$`}</span>
      </div>
      <div>
        You pay <span>{`${totalAfterPromo}$`}</span>
      </div>
    </>
  );
}
