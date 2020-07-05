import React, { useEffect } from 'react';
import BusinessRegisterStyle from './business-register.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getLoading, getError, getStep } from '../../../../store/business/general/general.selectors';
import ManagerRegistration from './components/employee-registration';
import Timeline from './components/timeline/timeline';
import Domain from './components/domain';
import PhoneValidation from './components/phone-validation';


interface StateProps {
    loading: boolean;
    error: Error;
    step: number
}

interface DispatchProps {
}

type Props = DispatchProps & StateProps;

const BusinessRegister: React.FC<Props> = (props) => {



    useEffect(() => { }, [props.step]);
    return (
        <div className={BusinessRegisterStyle.Register}>
            <div className={BusinessRegisterStyle.Timeline}>
                <Timeline step={props.step} />
            </div>

            <div className={BusinessRegisterStyle.Form}>
                {props.step === 1 && <Domain />}

                {props.step === 2 && <ManagerRegistration />}

                {props.step === 3 && <PhoneValidation />}

                {props.step === 4 && <div>welcome</div>}


            </div>

        </div>
    )
}

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state),
    step: getStep(state)
});

const mapDispatchToProps = (dispatch: any) => ({

});

export default compose<any>(connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps))(BusinessRegister);
