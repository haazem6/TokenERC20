
import { useEffect, useState } from "react";
import { Field } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import Button from "react-bootstrap/Button";
import { BigNumber } from "ethers";
import { parseUnits, formatUnits } from "@ethersproject/units";

// Props interface for the BigDecimalInput component
interface Props {
  name: string;
  defaultValue?: string;
  onChange: (v: BigNumber) => void;
  decimals: number;
  max?: BigNumber;
}

// BigDecimalInput component for handling big decimal inputs
export default function BigDecimalInput(props: Props) {
  // Destructuring props for easy use
  const {
    name,
    defaultValue = "0",
    decimals = 0,
    onChange,
    max,
    ...rest
  } = props;


  const [bgValue, setBgValue] = useState<BigNumber>(
    BigNumber.from(defaultValue).pow(decimals)
  );
  const [value, setValue] = useState<string>(defaultValue);

  // Effect to update the big number value when the string value changes
  useEffect(() => {
    try {
      const newBgValue: BigNumber = parseUnits(value, decimals);
      setBgValue(newBgValue);
    } catch (e: any) {
      setValue(defaultValue);
      setBgValue(parseUnits(defaultValue, decimals));
    }
  }, [value]);

  // Effect to trigger the onChange callback when the big number value changes
  useEffect(() => {
    onChange(bgValue);
  }, [bgValue]);


  return (
    <div>
      {/* Using Field from Formik to manage form state */}
      <Field
        type="string"
        variant="outlined"
        name={name}
        value={value}
        component={Input}
        onChange={(e) => {
          // Handling input value changes, replacing commas with dots
          setValue(e.target.value.replaceAll(",", "."));
        }}
        // Rendering a "Max" button if max prop is provided
        endAdornment={
          max ? (
            <>
              <Button
                variant="light"
                className="text-uppercase text-primary"
                onClick={() => {
                  // Setting the input value to the formatted max value
                  setValue(formatUnits(max, decimals));
                }}
              >
                Max
              </Button>
            </>
          ) : undefined
        }
        {...rest}
      />
    </div>
  );
}
