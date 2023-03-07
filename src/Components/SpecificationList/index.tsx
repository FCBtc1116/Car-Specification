import { memo, useState, Fragment } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
const SepcificationList = (props: {
  specificationData: object[];
  savedCheckboxList: string[];
  onNewSpecification: (newSpec: boolean) => void;
}) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="w-100 border-2 border-gray flex-1">
      <div className="container mx-auto">
        <Fragment>
          {props.specificationData.map((item, _index: number) => {
            return (
              <Accordion
                open={open === _index}
                key={JSON.parse(JSON.stringify(item)).name}
              >
                <AccordionHeader onClick={() => handleOpen(_index)}>
                  {JSON.parse(JSON.stringify(item)).name}
                </AccordionHeader>
                <AccordionBody>
                  Engine - {JSON.parse(JSON.stringify(item)).engine} <br />
                  Interior materials -{" "}
                  {JSON.parse(JSON.stringify(item)).material} <br />
                  Color - {JSON.parse(JSON.stringify(item)).color} <br />
                  Wheel Rims - {
                    JSON.parse(JSON.stringify(item)).wheel_inchi
                  }{" "}
                  <br />
                  Wheel Type - {
                    JSON.parse(JSON.stringify(item)).wheel_type
                  }{" "}
                  <br />
                  {props.savedCheckboxList.map((checkItem, _index) => {
                    return (
                      <label key={checkItem}>
                        {checkItem} -{" "}
                        {JSON.parse(JSON.stringify(item))[`checkbox_${_index}`]
                          ? JSON.parse(JSON.stringify(item))[
                              `checkbox_${_index}`
                            ]
                            ? "Yes"
                            : "No"
                          : "No"}
                        <br />
                      </label>
                    );
                  })}
                  Signature on hood -{" "}
                  {JSON.parse(JSON.stringify(item)).signature} <br />
                </AccordionBody>
              </Accordion>
            );
          })}
        </Fragment>
        <button
          className="border-2 mt-[20px] mb-[20px]"
          onClick={() => {
            props.onNewSpecification(true);
          }}
        >
          + Make new specification
        </button>
      </div>
    </div>
  );
};

export default memo(SepcificationList);
