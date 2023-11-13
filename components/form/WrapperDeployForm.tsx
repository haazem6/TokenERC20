import { useEffect, useState } from "react";
import { Formik, Form, Field, useFormikContext } from 'formik';
import * as Yup from 'yup';
import Input from "./Input";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useToken, useAccount } from 'wagmi';
import { AddressZero } from "@ethersproject/constants";
import { toast } from 'react-toastify';
import Spinner from "react-bootstrap/Spinner";
import ConnectWallet from "../ConnectWallet";
import { WrapperDeployParams, AccountResult } from "../../types";
import { BigNumber } from "ethers";
import BigDecimalInput from "./BigDecimalInput";
import { parseUnits } from "@ethersproject/units";
import { TbArrowsMoveHorizontal } from 'react-icons/tb';

interface Props {
  onSubmit: (data: WrapperDeployParams) => Promise<void>;
}


function InnerForm() {
  const accountResult: AccountResult = useAccount();

  const { values, setFieldValue, isValid, isSubmitting } = useFormikContext<WrapperDeployParams>();

  // Hook for fetching ERC-20 token information.
  const tokenResult = useToken({
    address: values.tokenAddress as `0x${string}`,
    onError(error: any) {
      toast.error("Error fetching token information");
    },
    enabled: Boolean(values.tokenAddress?.length === 42 && values.tokenAddress.slice(0, 2) === "0x")
  });
  const token = tokenResult?.data;

  useEffect(() => {
    if (token) {
      // Update form values with fetched token information.
      setFieldValue("symbol", "w" + token?.symbol);
      setFieldValue("name", "Wrapped " + token?.name);
      setFieldValue("decimals", token?.decimals);

      setFieldValue("tokenAmount", parseUnits("1", token?.decimals));
    }
  }, [token]);

  return (
    <Form>
      {/* Token Address Input */}
      <div className="form-group pb-2 row">
        <div className="col-12">
          <Field
            type="text"
            name="tokenAddress"
            component={Input}
            label="Token ERC-20 address"
            placeholder={AddressZero}
          />
        </div>
      </div>

      {/* Token Details Inputs */}
      <div className="form-group py-2 row">
        <div className="col-12 col-md-12 col-lg-6">
          <Field
            type="text"
            name="name"
            component={Input}
            label="Name"
            placeholder="name"
          />
        </div>
        <div className="col-6 col-md-8 col-lg-4">
          <Field
            type="text"
            name="symbol"
            component={Input}
            label="Symbol"
            placeholder="Symbol"
          />
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <Field
            type="number"
            name="decimals"
            component={Input}
            label="Decimals"
            placeholder={"18"}
          />
        </div>
      </div>

      {/* Ratio Input */}
      <div className="form-group py-4">
        <label>Quantity</label>
        <div className="d-flex justify-content-between text-center">
          <div>
            <BigDecimalInput
              name="tokenAmount"
              decimals={token?.decimals || 0}
              onChange={(v: BigNumber) => setFieldValue("tokenAmount", v)}
              defaultValue={"1"}
            />
            <br/>
            <span className="font-weight-bold">{token?.symbol || "TOKEN"}</span>
          </div>

    

        </div>
      </div>

      {/* Connect Wallet Button / Deploy Button */}
      <div className="mt-4">
        {accountResult?.isConnected ? (
          <Button 
            variant="primary"
            type="submit"
            className="w-100 py-3 text-uppercase font-weight-bold"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting && (
              <>
                <Spinner animation="border" size="sm" />
                {"  "}
              </>
            )}
            {"🚀  "}
            Send
          </Button>
        ) : (
          <div className="d-flex">
            <ConnectWallet 
              variant="primary"
              className="w-100 py-3 font-weight-bold" 
            />  
          </div>
        )}
      </div>
    </Form>
  );
}

// WrapperDeployForm Component
export default function WrapperDeployForm({
  onSubmit
}: Props) {
  // Initial values and validation schema
  const initialValues: WrapperDeployParams = {
    tokenAddress: "",
    name: "",
    symbol: "",
    decimals: 18,

    tokenAmount: BigNumber.from(0),
    wrapperAmount: parseUnits("1", 18),
  };

  const validation = Yup.object().shape({
    tokenAddress: Yup.string().required("Token address is required")
      .test('len', 'Must be exactly 42 characters', (val: string) => val.length === 42)
      .test('starting 0x', 'Must be 0x prefixed', (val: string) => val.slice(0, 2) === "0x"),
    name: Yup.string().required("Name is required"),
    symbol: Yup.string().required("Symbol is required"),
    decimals: Yup.number().integer()
      .required("Decimals are required")
      .min(0, "Lower value allowed is 0")
      .max(18, "Greatest value allowed is 18"),
    tokenAmount: Yup.number()
      .required("Token amount is required")
      .test('positive', 'Must be a positive number', (val: number) => val > 0),
    wrapperAmount: Yup.number()
      .required("Wrapper amount is required")
      .test('positive', 'Must be a positive number', (val: number) => val > 0),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        enableReinitialize
        validateOnMount
        validateOnBlur
        validateOnChange
        onSubmit={ async (values, { setSubmitting }) => {
          await onSubmit(values);
          setSubmitting(false);
        }}
      >
        <InnerForm/>
      </Formik>
    </div>
  );
}
