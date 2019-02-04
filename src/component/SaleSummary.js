import React from "react";

export default function SaleSummary({ data }) {
  let total = 0;
  let totalAfterPromo = 0;
  let totalSave = 0;
  for (let key in data) {
    total = total + data[key].price * data[key].quantity;
    totalAfterPromo = totalAfterPromo + data[key].totalAfterPromo;
  }
  totalSave = total - totalAfterPromo;
  return (
    <>
      <div>
        Total <span>{`${Math.round(total)}$`}</span>
      </div>
      <div>
        You Save <span>{`${Math.round(totalSave)}$`}</span>
      </div>
      <div>
        You pay <span>{`${Math.round(totalAfterPromo)}$`}</span>
      </div>
    </>
  );
}
