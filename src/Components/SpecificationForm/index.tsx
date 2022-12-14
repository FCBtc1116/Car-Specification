import { memo, useState, useCallback, useEffect } from "react";
import { useFormik } from "formik";
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

const SpecificationForm = (props: {
  specificationData: object[];
  savedCheckboxList: string[];
  isNewSpecification: boolean;
  onSetSavedCheckboxList: (item: string[]) => void;
  onAddSecificationData: (item: object) => void;
  onNewSpecification: (newSpec: boolean) => void;
}) => {
  const [checkboxList, setCheckboxList] = useState(props.savedCheckboxList);

  const formik = useFormik({
    initialValues: {
      name: "",
      material: Materials[0],
      color: Colors[0],
      engine: Engines[0],
      wheel_inchi: WheelInchies[0],
      wheel_type: WheelTypes[0],
      checkbox_0: false,
      signature: "",
    },
    onSubmit: (values) => {
      props.onSetSavedCheckboxList(checkboxList);
      props.onAddSecificationData(JSON.parse(JSON.stringify(values)));
      formik.resetForm();
      // resetForm();
      formik.setSubmitting(false);
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Required"),
      signature: Yup.string().required("Required"),
    }),
  });

  const addCheckboxList = useCallback(
    (itemName: string) => {
      setCheckboxList((t) => [...t, itemName]);
    },
    [checkboxList]
  );

  useEffect(() => {
    if (props.isNewSpecification) {
      props.onNewSpecification(false);
      formik.resetForm();
      setCheckboxList(props.savedCheckboxList);
    }
  }, [props.isNewSpecification]);

  return (
    <div className="w-100 border-2 border-gray flex-1">
      <div className="container mx-auto text-left">
        <form onSubmit={formik.handleSubmit}>
          <p className="mt-[25px]">Name of specification</p>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-full border-2 rounded-sm mt-[2px]"
          />
          {formik.errors.name && formik.touched.name && (
            <div className="input-feedback">{formik.errors.name}</div>
          )}
          <SelectForm
            name="engine"
            data={Engines}
            values={formik.values}
            onHandleChange={formik.handleChange}
            onHandleBlur={formik.handleBlur}
          />
          <SelectForm
            name="material"
            data={Materials}
            values={formik.values}
            onHandleChange={formik.handleChange}
            onHandleBlur={formik.handleBlur}
          />
          <SelectForm
            name="color"
            data={Colors}
            values={formik.values}
            onHandleChange={formik.handleChange}
            onHandleBlur={formik.handleBlur}
          />
          <SelectForm
            name="wheel_inchi"
            data={WheelInchies}
            values={formik.values}
            onHandleChange={formik.handleChange}
            onHandleBlur={formik.handleBlur}
          />
          <SelectForm
            name="wheel_type"
            data={WheelTypes}
            values={formik.values}
            onHandleChange={formik.handleChange}
            onHandleBlur={formik.handleBlur}
          />
          <div className="grid grid-cols-3">
            {checkboxList.map((list: string, _index: number) => {
              return (
                <CheckBoxForm
                  label={list}
                  name={_index}
                  onHandleChange={formik.handleChange}
                  key={list}
                />
              );
            })}
          </div>
          <p className="mt-[25px]">Signaure on hood</p>
          <input
            id="signature"
            name="signature"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.signature}
            className="w-full border-2 rounded-sm mt-[2px]"
          />
          {formik.errors.signature && formik.touched.signature && (
            <div className="input-feedback">{formik.errors.signature}</div>
          )}
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
        </form>
        <Modal onAddCheckboxList={addCheckboxList} />
      </div>
    </div>
  );
};

export default memo(SpecificationForm);
