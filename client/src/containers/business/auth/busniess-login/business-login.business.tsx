import React, { useState, useEffect } from "react";
import classes from './business-login.module.scss'
import { connect } from "react-redux";
import { getLoading, getError, getisLogin } from "../../../../store/business/general/general.selectors";
import Button from "../../../../models/ui/button/button";
import { loginEmployee } from "../../../../store/business/auth/action/employee.auth.actions";
import { Link, Redirect } from "react-router-dom";
import AuthenticationHeadrer from "../../../shared/header/form-header";
import * as language from "../../../../assets/language/language";
import Inputs from "../../../../models/ui/input/inputs";

import { password, phone } from "../../../../models/ui/input/utility/input-types.input";
import { Form } from "../../../../models/system/input.field";


interface FormState {
    phone: string;
    password: string;
}

interface StateProps {
    loading: boolean;
    error: string;
    isLogin: boolean;
}

interface DispatchProps {
    loginEmployee: typeof loginEmployee;
}

type Props = DispatchProps & StateProps;
const BusinessLogin: React.FC<Props> = (props) => {
    const [form, setForm] = useState<Form>({
        phone,
        password
    });

    const [error, setError] = useState<string>("");

    const onClickNext = () => {
        let ansForm = Object.assign(
            {},
            ...Object.keys(form).map((k) => ({ [k]: form[k].value }))
        );
        props.loginEmployee(ansForm);
    };
    const [redirect, setRedirect] = useState<any>(null);
    useEffect(() => {
        if (props.isLogin) {
            setRedirect(
                <Redirect to="" />)
        }
    }, [props.isLogin]);


    return (
        <div className={classes.Register}>
            {redirect}
            <div
                className={[classes.Form2, classes.Form].join(" ")}
            >
                <AuthenticationHeadrer
                    title={language.loginEmployeeTitle[1]}
                    subTitle={language.loginSubTitle[1]}
                    error={error ? error : props.error}
                />
                <React.Fragment>
                    <div className={classes.Body}>
                        <Inputs
                            form={form} setForm={setForm} error={error} setError={setError}
                        />
                    </div>
                    {!props.loading ? (
                        <React.Fragment>
                            <div className={classes.Button}>
                                <Button color="purple-register" onClick={() => onClickNext()} disabled={error === ""}>התחבר</Button>
                                <Link to="/business/resetpassword">{language.restPasswordTitle[1]}</Link>
                            </div>
                        </React.Fragment>
                    ) : (
                            <div>Loading...</div>
                        )}
                </React.Fragment>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state),
    isLogin: getisLogin(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    loginEmployee: (form: FormState) => dispatch(loginEmployee(form)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(BusinessLogin);
