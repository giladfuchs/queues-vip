import React, { useState, useEffect } from "react";
import classes from './business-login.module.scss'
import { connect } from "react-redux";
import { getLoading, getError, getIsTokenSet, getisLogin, } from "../../../../store/business/general/index";
import Button from "../../../../models/ui/button/button";
import { registerDomainClient, checkDomainIsValid, getIsValidDomain } from "../../../../store/business/auth/index";
import { Redirect, RouteComponentProps } from "react-router-dom";
import AuthenticationHeadrer from "../../../shared/header/form-header";
import * as language from "../../../../assets/index";
import Inputs from "../../../../models/ui/input/inputs";

import { phone, plainText, Client } from "../../../../models/index";


interface MatchParams {
    domain: string;

}
interface Params extends RouteComponentProps<MatchParams> { }


interface StateProps {
    loading: boolean;
    error: string;
    isSetToken: boolean;
    isValidDomain: boolean
    isLogin: boolean
}

interface DispatchProps {
    checkDomainIsValid: typeof checkDomainIsValid;
    registerDomainClient: typeof registerDomainClient;
}
type Props = DispatchProps & StateProps & Params;

const DomainRegister: React.FC<Props> = (props) => {


    const [Form, setForm] = useState<any>({
        firstName: {
            ...plainText, elementConfig: {
                type: "text",
                placeholder: language.firstName[1],
            },
            label: language.firstName[1],
        },
        lastName: {
            ...plainText, elementConfig: {
                type: "text",
                placeholder: language.lastName[1],
            },
            label: language.lastName[1],
        },
        phone,
    });

    const [error, setError] = useState<string>("");

    const onClickNext = () => {
        const domain = props.match.params.domain;


        const client = Object.assign({},
            ...Object.keys(Form).map((k) => ({ [k]: Form[k].value }))
        );




        props.registerDomainClient(client, domain);
    };
    const [redirect, setRedirect] = useState<any>(null);
    useEffect(() => {
        // console.log( props.history.push());
        const url = props.match.params.domain;
        props.isLogin && setRedirect(
            <Redirect to={'/' + url} />)
    }, [props.isSetToken]);


    return (
        <div className={classes.Register}>
            {redirect}
            {props.isValidDomain ? <div
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
                            Form={Form} setForm={setForm} error={error} setError={setError}
                        />


                    </div>
                    {!props.loading ? (
                        <React.Fragment>
                            <div className={classes.Button}>
                                <Button color="purple-register" onClick={() => onClickNext()} disabled={error === ""}>התחבר</Button>
                            </div>
                        </React.Fragment>
                    ) : (
                            <div>Loading...</div>
                        )}
                </React.Fragment>
            </div> :
                <p>mistake</p>}
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state),
    isSetToken: getIsTokenSet(state),
    isValidDomain: getIsValidDomain(state),
    isLogin: getisLogin(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    checkDomainIsValid: (domain: string) => dispatch(checkDomainIsValid(domain)),
    registerDomainClient: (client: Client, domain: string) => dispatch(registerDomainClient(client, domain)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(DomainRegister);
