import React, { useState, useEffect } from "react";
import classes from './business-login.module.scss'
import { connect } from "react-redux";
import { getLoading, getError, getisLogin } from "../../../../store/business/general/index";
import Button from "../../../../models/ui/button/button";
import { loginDomainClient, checkDomainIsValid } from "../../../../store/business/auth/index";
import { Redirect, RouteComponentProps } from "react-router-dom";
import AuthenticationHeadrer from "../../../shared/header/form-header";
import * as language from "../../../../assets/index";
import Inputs from "../../../../models/ui/input/inputs";

import { phone } from "../../../../models/ui/input/utility/input-types.input";
import { getIsValidDomain } from "../../../../store/business/auth";


interface MatchParams {
    domain: string;

}
interface Params extends RouteComponentProps<MatchParams> { }


interface StateProps {
    loading: boolean;
    error: string;
    isLogin: boolean;
    isValidDomain: boolean
}

interface DispatchProps {
    checkDomainIsValid: typeof checkDomainIsValid;
    loginDomainClient: typeof loginDomainClient;
}
type Props = DispatchProps & StateProps & Params;

const DomainLogin: React.FC<Props> = (props) => {

    useEffect(() => {
        props.checkDomainIsValid(props.match.params.domain)
    }, []);
    const [Form, setForm] = useState<any>({
        phone,
    });

    const [error, setError] = useState<string>("");

    const onClickNext = () => {
        const domain = props.match.params.domain;
        props.loginDomainClient(domain, Form.phone.value);
    };
    const [redirect, setRedirect] = useState<any>(null);

    useEffect(() => {

        const url = props.match.params.domain;
        props.isLogin && setRedirect(
            <Redirect to={url} />)

    }, [props.isLogin]);




    return (
        <div className={classes.Register}>
            {redirect}
            <div
                className={classes.Form2 + " " + classes.Form}
            >
                <AuthenticationHeadrer
                    title={language.loginDomainTitle[1]}
                    subTitle={language.loginSubTitle[1]}
                    error={error ? error : props.error}
                />

                <React.Fragment>
                    <div className={classes.Body}>
                        <Inputs
                            form={Form} setForm={setForm} error={error} setError={setError}
                        />


                    </div>
                    {/* {render || <p>mistake</p>} */}
                    {props.isValidDomain && !props.loading ? <React.Fragment>
                        <div className={classes.Button}>
                            <Button color="purple-register" onClick={() => onClickNext()} disabled={error === ""}>התחבר</Button>
                        </div>
                    </React.Fragment> : props.isValidDomain && <div>Loading...</div>}
                </React.Fragment>
            </div> :

        </div>
    );
};

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state),
    isLogin: getisLogin(state),
    isValidDomain: getIsValidDomain(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    checkDomainIsValid: (domain: string) => dispatch(checkDomainIsValid(domain)),
    loginDomainClient: (domain: string, phone: string) => dispatch(loginDomainClient(domain, phone)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(DomainLogin);
