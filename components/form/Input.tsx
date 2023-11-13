import { Input as MuiInput } from '@mui/material'
import { TextField } from '@mui/material'

type Field = {
  name: string
}

type FormikProps = {
  errors: any
  touched: any
}

interface Props {
  field: Field
  form: FormikProps
  label: string
  type: string
  placeholder: string | undefined
  startAdornment: React.ReactNode | undefined
  endAdornment: React.ReactNode | undefined
}

// Helper function to determine CSS classes based on Formik's touched and error states
const getFieldCSSClasses = (touched, error) => {
  const classes = ["form-control"];
  if (touched && error) {
    classes.push("is-invalid");
  }

  return classes.join(" ");
};


export default function Input(props: Props) {
  // Destructuring props to extract relevant information
  const {
    field, 
    form: { touched, errors }, 
    label,
    type,
    placeholder,
    startAdornment = undefined,
    endAdornment = undefined,
    ...rest  // Rest of the properties passed to MUI's Input component
  } = props

  return (
    <>
      {/* Render label if provided */}
      {label && (<label>{label}</label>)}

      {/* MUI Input component with additional styling based on Formik's touched and error states */}
      <MuiInput 
        placeholder={placeholder}
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        {...field}  // Pass the field properties to MUI's Input component
        {...rest}   // Pass the rest of the properties to MUI's Input component
      />

      {/* Render error message if the field is touched and there is an error */}
      {touched[field.name] && errors[field.name] && (
        <div className="invalid-feedback">{errors[field.name]}</div>
      )}
    </>
  );
}
