import React from "react";
import { Checkbox } from "semantic-ui-react";
export default function CheckBox(props) {
  console.log(props);
  function handleChange(e, data) {
    if (data.checked) {
      props.addProductApplyPromo(data.value);
    } else {
      props.removeProductApplyPromo(data.value);
    }
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: "30% 40% 40%" }}>
      <Checkbox
        label={props.data.event}
        value={props.data.id}
        onChange={(e, data) => handleChange(e, data)}
      />
      <div>
        <p>
          PromoActive:{" "}
          {props.data.promoStatus ? (
            <span style={{ color: "green" }}>
              Yes (if choose will override the old promotion scheme)
            </span>
          ) : (
            <span style={{ color: "red" }}>No</span>
          )}
        </p>{" "}
      </div>
      <div>
        <p>
          CurrentPromoType: <span>{props.data.promoText}</span>
        </p>
      </div>
    </div>
  );
}
