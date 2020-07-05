import React, { useState, useMemo } from 'react';

import Input from './input';

import { checkValidity } from "./utility/validator.input";
import { updateObject } from '../../../assets/utility/utility';

const Inputs: React.FC<any> = (props: any) => {

    const [timeOut, setTimeOut] = useState<any>(null);


    const inputChanged = (form: any, e: any, inputIdentifier: any) => {
        if (!form[inputIdentifier].editable) return false;
        const updatedFormElement = updateObject(form[inputIdentifier], {
            value: e.target.value,
            error: checkValidity(e.target.value, form[inputIdentifier].validation),
            touched: true,
        });
        const updatedForm = updateObject(form, {
            [inputIdentifier]: updatedFormElement,
        });

        // true - valid , false - not valid
        const formIsValid = Object.keys(updatedForm).every(
            (e) => {
                if (updatedForm[e].error.length > 0) return false;
                return true;
            }
        );


        return { updatedForm, formIsValid };
    };




    const inputChangedHandler = (e: any, inputIdentifier: any) => {
        const ans = inputChanged(props.Form, e, inputIdentifier);
        if (!ans) return;

        props.setForm(ans.updatedForm);
        props.setError("")


        if (timeOut) clearTimeout(timeOut);
        setTimeOut(setTimeout(() => {
            if (!ans.formIsValid) {
                const index = Object.keys(ans.updatedForm).filter(it => !ans.updatedForm[it].valid && ans.updatedForm[it].touched).pop();
                !index ? props.setError("") : props.setError(ans.updatedForm[index].error)
            }
        }, 700))
    }
    const formElementsArrayfunc = () => Object.keys(props.Form).map((key) => {
        return {
            _id: key,
            config: props.Form[key],
        };
    }).map((formElement: any) => (
        <Input
            key={formElement._id}
            label={formElement.config.label}
            style={formElement.config.style}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(e) => inputChangedHandler(e, formElement._id)}
            class={formElement.config.class}

        />
    ));

    const [formElementsArray, setformElementsArray] = useState<any>(formElementsArrayfunc());
    useMemo(() => {
        setformElementsArray(formElementsArrayfunc())
    }, [props.Form,]);

    return (
        <div>

            {formElementsArray}

        </div>
    );
};

export default Inputs;
