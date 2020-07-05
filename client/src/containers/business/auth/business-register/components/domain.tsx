import React, { useState, useEffect } from 'react';
import classes from "./employee-registration.module.scss";
import * as language from '../../../../../assets/language/language'
import Button from '../../../../../models/ui/button/button';
import { connect } from 'react-redux';
import { getLoading, getError, } from '../../../../../store/business/general/general.selectors';
import { getAllDomains } from '../../../../../store/business/auth/action/employee.auth.actions';
import { getDomains } from '../../../../../store/business/auth/auth.selectors';
import AuthenticationHeadrer from '../../../../shared/header/form-header';
import Inputs from '../../../../../models/ui/input/inputs';
import { domain } from '../../../../../models/ui/input/utility/input-types.input';
import { incrementent } from '../../../../../store/business/general/action/index.actions';




interface StateProps {
    loading: boolean;
    error: string;
    domains: []
}

interface DispatchProps {
    getAllDomains: typeof getAllDomains;
    incrementent: typeof incrementent

}



type Props = DispatchProps & StateProps;
const Domain: React.FC<Props> = (props) => {
    const [Form, setForm] = useState<any>({
        domain: {
            ...domain,
            validation: {
                required: true,
                minLen: 2,
                isEnglish: true
            }
        }
    });
    const [error, setError] = useState<string>();

    useEffect(() => {
        props.getAllDomains()
    }, []);

    useEffect(() => {
        if (error === "" && !props.domains.every((d) => d !== Form.domain.value))
            setError(language.domainError[1])
    }, [Form]);


    const onClickNext = () => {
        if (error !== '') return;
        let ansForm = Object.assign(
            {},
            ...Object.keys(Form).map((k) => ({ [k]: Form[k].value }))
        );

        localStorage.setItem("domain", ansForm.domain)

        props.incrementent();



    };


    return (
        <React.Fragment>
            <AuthenticationHeadrer title={language.addServiceHeaderTitle[1]} subTitle={language.domainHeaderSubTitle[1]}
                error={error ? error : props.error} />

            <div className={classes.BodyDomain}>
                <Inputs
                    Form={Form} setForm={setForm} error={error} setError={setError}
                />
            </div>

            {
                !props.loading ?
                    <div className={classes.ButtonDomain} onClick={onClickNext}>
                        <Button color="purple-register" disabled={error === ''}>{language.next[1]}</Button>
                    </div>
                    :
                    <div style={{ textAlign: 'center' }}>Loading...</div>
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state),
    domains: getDomains(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    getAllDomains: () => dispatch(getAllDomains()),
    incrementent: () => dispatch(incrementent())
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Domain);
