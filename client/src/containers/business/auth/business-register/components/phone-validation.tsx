import React, { useState } from 'react';
import { connect } from "react-redux";

import classes from './employee-registration.module.scss';
import Button from '../../../../../models/ui/button/button';
import * as language from '../../../../../assets/language/language';
import { plainText } from '../../../../../models/ui/input/utility/input-types.input';
import { aprroveRegisterFirstEmployee } from "../../../../../store/business/auth/action/employee.auth.actions";
import { getLoading, getError, } from "../../../../../store/business/general/general.selectors";
import { Employee, Person } from '../../../../../models/system/persones';
import Inputs from '../../../../../models/ui/input/inputs';
import { decrement, incrementent } from '../../../../../store/business/general/action/index.actions';


import { getPerson } from '../../../../../store/business/auth/auth.selectors'
import { Form } from '../../../../../models/system/input.field';

interface StateProps {
    loading: boolean;
    error: string;
    person: Person;
}

interface DispatchProps {
    decrement: typeof decrement;
    incrementent: typeof incrementent;
    aprroveRegisterFirstEmployee: typeof aprroveRegisterFirstEmployee;
}

type Props = DispatchProps & StateProps;
const PhoneValidation: React.FC<Props> = (props) => {

    const [error, setError] = useState<string>();

    const [form, setForm] = useState<Form>({
        authPass: {
            ...plainText, label: language.codeVerification[1], style: { width: '50%', margin: 'auto' }
            , value: props.person.details.firstName
        }
    })

    const onClickNext = () => {
        const ansForm = Object.assign({},
            ...Object.keys(form).map((k) => ({ [k]: form[k].value }))
        );
        const _id = props.person._id;
        props.aprroveRegisterFirstEmployee({ ...ansForm, _id })
    };

    return (
        <div className={classes.PhoneValidation}>
            <Inputs form={form} setForm={setForm} error={error} setError={setError}
            />

            <div className={classes.ButtonsPhoneValidation}>
                <React.Fragment>
                    <Button color="orange" onClick={() => props.decrement()} disabled={true}>{language.changeNumber[1]}</Button>
                    <Button color="purple-register" onClick={onClickNext} disabled={true} >{language.next[1]}</Button>
                </React.Fragment>

            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state),
    person: getPerson(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    decrement: () => dispatch(decrement()),
    incrementent: () => dispatch(incrementent()),
    aprroveRegisterFirstEmployee: (form: any) => dispatch(aprroveRegisterFirstEmployee(form)),
});


export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(PhoneValidation)