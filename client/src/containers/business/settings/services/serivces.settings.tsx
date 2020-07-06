import React, { useState, useEffect, useCallback } from 'react';
import { connect } from "react-redux";
import SerivcesSettingsStyle from './services.module.scss';
import SettingsHeader from '../../../shared/header/container-header.shared';
import { Service } from '../../../../models/system/service';
import Button from '../../../../models/ui/button/button';
import Breadcrumbs from '../../../../models/ui/breadcrumbs/breadcrumbs';
import AddService from './components/add-service/add-service.services';
import * as language from '../../../../assets/language/language'
import { postService, deleteService, updateService } from "../../../../store/business/data/action/admin/admin.index.actions"
import { getServices } from "../../../../store/business/data/data.selectors";
import { getError, getLoading } from "../../../../store/business/general/general.selectors";
import SerivceComp from './components/serivces.settings';

interface StateProps {
    services: any
    loading: boolean;
    error: string;
}

interface DispatchProps {
    postService: typeof postService;
    deleteService: typeof deleteService;
    updateService: typeof updateService;

}
type Props = DispatchProps & StateProps;


const SerivceSettings: React.FC<Props> = (props) => {

    const [ServiceToUpdate, setServiceToUpdate] = useState<Service | null>(null)
    const [Modal, setModal] = useState<boolean>(false);


    const settingHeader = useCallback(() => (
        <SettingsHeader title={language.settingTitleHeader[1]} subTitle={language.settingSubTitleHeader[1]} />
    ), []);
    const [header] = useState<JSX.Element>(settingHeader());


    if (!Modal && ServiceToUpdate) setServiceToUpdate(null);

    useEffect(() => {
        props.error === "" && !props.loading && setModal(false)
    }, [props.error, props.loading]);
    return (
        <React.Fragment>
            {Modal && <AddService close={() => setModal(false)} fetchService={ServiceToUpdate ? props.updateService : props.postService} updateService={ServiceToUpdate} error={props.error} />}
            {header}
            <div className={SerivcesSettingsStyle.SerivcesSettings}>
                <Breadcrumbs title={language.settingTitleHeader[1]} />
                <Button onClick={() => setModal(true)} color="purple" disabled={true}>{language.addNewService[1]}</Button>

                <SerivceComp setModal={setModal}
                    setServiceToUpdate={setServiceToUpdate} />
            </div>
        </React.Fragment>
    )
}
const mapStateToProps = (state: any) => ({
    services: getServices(state),
    loading: getLoading(state),
    error: getError(state),

});
const mapDispatchToProps = (dispatch: any) => ({

    deleteService: (service: Service) => dispatch(deleteService(service)),
    updateService: (service: Service) => dispatch(updateService(service)),
    postService: (form: Service) => dispatch(postService(form)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(SerivceSettings);
