import * as React from "react";
import { withFormik, FormikErrors, FormikProps, Field } from "formik";
import schoolSchema from "../../schema/school";
import { View, Button, Text } from "native-base";
import { InputField } from "../shared/Input";

interface FormValues {
    name: string;
}

interface Props {
    submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
    render() {
        const { handleSubmit } = this.props;
        return (
            <View>
                <Field name="name" placeholder="School Name" component={InputField} />

                <Button block onPress={handleSubmit as any}>
                    <Text>Next</Text>
                </Button>
            </View>
        );
    }
}

export default withFormik<Props, FormValues>({
    validationSchema: schoolSchema,
    mapPropsToValues: () => ({ name: '' }),
    handleSubmit: async (values, { props, setErrors }) => {
        const errors = await props.submit(values);
        if (errors) {
            setErrors(errors);
        }
    }
})(C);