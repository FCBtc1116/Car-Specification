import { memo, useState, useCallback } from "react";
import { Formik, FormikProps, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import SelectForm from "../SelectForm";
import CheckBoxForm from "../CheckBoxForm";
import Modal from "../Modal";
import {
  Colors,
  Engines,
  Materials,
  WheelInchies,
  WheelTypes,
} from "../../Models/Data";

const SpecificationFormSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  signature: Yup.string().required("Required"),
});

const SpecificationForm = (props: {
  specificationData: Array<object>;
  savedCheckboxList: Array<string>;
  setSavedCheckboxList: (item: Array<string>) => void;
  addSecificationData: (item: object) => void;
}) => {
  const [checkboxList, setCheckboxList] = useState(props.savedCheckboxList);

  const addCheckboxList = useCallback(
    (itemName: string) => {
      setCheckboxList((t) => [...t, itemName]);
    },
    [checkboxList]
  );

  return (
    <div className="w-100 border-2 border-gray flex-1">
      <div className="container mx-auto text-left">
        <Formik
          initialValues={{
            name: "",
            material: Materials[0],
            color: Colors[0],
            engine: Engines[0],
            wheel_inchi: WheelInchies[0],
            wheel_type: WheelTypes[0],
            checkbox_0: false,
            signature: "",
          }}
          validationSchema={SpecificationFormSchema}
          onSubmit={(values, actions) => {
            props.setSavedCheckboxList(checkboxList);
            props.addSecificationData(JSON.parse(JSON.stringify(values)));
            actions.resetForm();
            // resetForm();
            actions.setSubmitting(false);
          }}
        >
          {(props: FormikProps<any>) => (
            <Form>
              <p className="mt-[25px]">Name of specification</p>
              <Field
                type="text"
                name="name"
                className="w-full border-2 rounded-sm mt-[2px]"
              />
              <ErrorMessage name="name" />
              <SelectForm name="engine" data={Engines} />
              <SelectForm name="material" data={Materials} />
              <SelectForm name="color" data={Colors} />
              <SelectForm name="wheel_inchi" data={WheelInchies} />
              <SelectForm name="wheel_type" data={WheelTypes} />
              <div className="grid grid-cols-3">
                {checkboxList.map((list: string, _index: number) => {
                  return (
                    <CheckBoxForm label={list} name={_index} key={_index} />
                  );
                })}
              </div>
              <p className="mt-[25px]">Signaure on hood</p>
              <Field
                type="text"
                name="signature"
                className="w-full border-2 rounded-sm mt-[2px]"
              />
              <ErrorMessage name="signature" />
              <div className="flex justify-between mt-[25px] mb-[25px]">
                <button
                  className="border-2 block"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  + new configuration option
                </button>
                <button type="submit" className="border-2 block">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <Modal addCheckboxList={addCheckboxList} />
      </div>
    </div>
  );
};

export default memo(SpecificationForm);
