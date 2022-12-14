import { memo } from "react";
import { Field } from "formik";

const CehckBoxForm = (props: { name: number; label: string }) => {
  return (
    <label className="mr-[10px]">
      <Field
        type="checkbox"
        name={"checkbox_" + props.name}
        className="mr-[10px] mt-[25px]"
      />
      {props.label}
    </label>
  );
};

export default memo(CehckBoxForm);
