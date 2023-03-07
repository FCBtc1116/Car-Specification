import { ChangeEvent, memo } from "react";

const CehckBoxForm = (props: {
  name: number;
  label: string;
  onHandleChange: (e: ChangeEvent<any>) => void;
}) => {
  return (
    <label className="mr-[10px]">
      <input
        name={"checkbox_" + props.name}
        type="checkbox"
        className="mr-[10px] mt-[25px]"
        onChange={props.onHandleChange}
      />
      {props.label}
    </label>
  );
};

export default memo(CehckBoxForm);
