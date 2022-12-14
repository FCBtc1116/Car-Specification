import { ChangeEvent, memo } from "react";

const SelectForm = (props: {
  name: string;
  data: string[];
  values: object;
  onHandleChange: (e: ChangeEvent<any>) => void;
  onHandleBlur: (e: ChangeEvent<any>) => void;
}) => {
  return (
    <select
      name={props.name}
      value={JSON.parse(JSON.stringify(props.values))[props.name]}
      onChange={props.onHandleChange}
      onBlur={props.onHandleBlur}
      className="block w-full mt-[25px] border-2 rounded-sm"
    >
      {props.data.map((item: string, _index: number) => {
        return (
          <option value={item} key={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
};

export default memo(SelectForm);
