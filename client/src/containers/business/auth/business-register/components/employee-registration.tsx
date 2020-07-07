import React, { useState } from "react";
import { connect } from "react-redux";
import * as language from "../../../../../assets/language/language";
import ManagerRegistrationStyle from "./employee-registration.module.scss";
import { Button, AuthenticationHeadrer, Inputs, Loading } from "../../../../../models/ui";
import { registerFirstEmployee } from "../../../../../store/auth/action/employee.auth.actions";
import { getLoading, getError } from "../../../../../store/selectors";
import { plainText, phone, email, password } from "../../../../../models/ui/input/utility/input-types.input";
import { decrement, incrementent } from "../../../../../store/general/action/index.actions";
import { Form } from "../../../../../models/system/input.field";



interface StateProps {
    loading: boolean;
    error: string;
}

interface DispatchProps {
    decrement: typeof decrement;
    incrementent: typeof incrementent;

    registerFirstEmployee: typeof registerFirstEmployee;
}

type Props = DispatchProps & StateProps;

const ManagerRegistration: React.FC<Props> = (props) => {


    const [error, setError] = useState<string>();

    const [form, setForm] = useState<Form>({
        firstName: {
            ...plainText, elementConfig: {
                type: "text",
                placeholder: language.firstName[1],
            },
            value: "om",
            label: language.firstName[1],
        },
        lastName: {
            ...plainText, elementConfig: {
                type: "text",
                placeholder: language.lastName[1],
            },
            value: "aaa",

            label: language.lastName[1],
        },
        phone: {
            ...phone,
            value: "0544446655",

        }
        , email: {
            ...email
            ,
            value: "igilfu@gmail.com",

        },
        password: {
            ...password,
            // value: "asds@dd.com",

        },
        validPassword: {
            ...password, label: language.confirmPassword[1],
            value: "asds@dd.com",

        }
    });

    const onClickNext = () => {

        const ansForm = Object.assign({},
            ...Object.keys(form).map((k) => ({ [k]: form[k].value }))
        );
        props.registerFirstEmployee(ansForm);
    };


    return (
        <div className={ManagerRegistrationStyle.Manager}>
            <AuthenticationHeadrer
                title={language.managerRegister[1]}
                subTitle={language.managerHeaderSubTitle[1]}
                error={error ? error : props.error}
            />
            {

                <React.Fragment>
                    <div className={ManagerRegistrationStyle.Body}>

                        <Inputs
                            form={form} setForm={setForm} error={error} setError={setError}

                        />
                        {!props.loading ?
                            <div className={ManagerRegistrationStyle.Buttons2}>
                                <Button onClick={() => props.decrement()} color="orange" disabled={true}>
                                    {language.back[1]}
                                </Button>
                                <Button color="purple-register" disabled={error === ''} onClick={onClickNext}>
                                    {language.next[1]}
                                </Button>
                            </div>
                            :
                            <Loading />
                        }

                    </div>


                </React.Fragment>
            }
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    registerFirstEmployee: (form: any) => dispatch(registerFirstEmployee(form)),
    incrementent: () => dispatch(incrementent()),
    decrement: () => dispatch(decrement())

});



export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ManagerRegistration)