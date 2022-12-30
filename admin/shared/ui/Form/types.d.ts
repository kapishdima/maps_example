import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

export type OnSubmitFunction = (values) => void;
export type ChildrenFunction = (
    control: Control<FieldValues, object>
) => JSX.Element;

export type FormProps = {
    onSubmit: OnSubmitFunction;
    validationSchema?: any;
};

export type FormContextType = {
    control: Control<FieldValues, object>;
    state: FormState<any>;
    setValue: UseFormSetValue;
    getValues: UseFormGetValues;
};
