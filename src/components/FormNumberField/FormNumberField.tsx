import { Field, FieldProps, getIn } from "formik";
import { NumberFieldProps } from "./NumberField";
import NumberField from "./NumberField";

type Props = Omit<NumberFieldProps, 'error' | 'onChange' | 'onBlur' | 'value' | 'component'> & {
    component?: React.ComponentType<NumberFieldProps>
}
const FormNumberField: React.FunctionComponent<Props> = (props) => {
    const { name, component: Component = NumberField, helperText, ...rest } = props;

    return (
        <Field
            name={name}
            render={({field, form: { touched, errors, setFieldValue }}: FieldProps) => {
                const fieldError = getIn(errors, name);
                const showError = getIn(touched, name) && !!fieldError;

                return (
                    <Component
                        error={showError}
                        helperText={showError ? fieldError : helperText}
                        onValueChange={(values: any) => setFieldValue(name, values.floatValue)}
                        {...field}
                        onChange={undefined}
                        {...rest}
                    />
                )
            }
        }/>
    );
}

export default FormNumberField;