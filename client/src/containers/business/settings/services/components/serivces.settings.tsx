import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { connect } from "react-redux";
import SerivcesSettingsStyle from '../services.module.scss';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { ArrowNext } from '../../../../../assets';
import * as language from '../../../../../assets/language/language'
import { deleteService } from "../../../../../store/business/data/action/admin/admin.index.actions"
import { getServices, } from "../../../../../store/business/data/data.selectors";
import { getIsAdmin, getError } from "../../../../../store/business/general/general.selectors";
import { Service } from '../../../../../models/system/service';
import Button from '../../../../../models/ui/button/button';

interface OwnProps {
    setModal: (flag: boolean) => void;
    setServiceToUpdate: (service: Service) => void
}

interface StateProps {
    services: any
    error: string,
    isAdmin: boolean
}

interface DispatchProps {

    deleteService: typeof deleteService;


}
type Props = DispatchProps & StateProps & OwnProps;

const SerivceComp: React.FC<Props> = (props) => {
    const { setModal, setServiceToUpdate } = props;
    const [Services, setServices] = useState<Service[]>();
    const [header, setHeader] = useState<JSX.Element>();
    useEffect(() => {
        setHeader(settingHeader())
    }, []);
    const settingHeader = useCallback(() => (
        <thead className={SerivcesSettingsStyle.TableHeader}>
            <tr>
                <th>{language.serviceName[1]}</th>
                <th>{language.price[1]}</th>
                <th>{language.duration[1]}</th>
                {props.isAdmin && <th>{language.available[1]}</th>}
                <th>{language.commands[1]}</th>
            </tr>
        </thead>
    ), []);


    useMemo(() => {

        setServices(
            props.services.map((s: Service) =>
                <tr key={s._id}>
                    <td>{s.title}</td>
                    <td>₪{s.price}</td>
                    <td>{s.duration}</td>
                    <td>
                        {s.available ?
                            <p className={SerivcesSettingsStyle.Available} style={{ background: '#7467ef' }}>{language.noActivate[1]}</p> :
                            <p className={SerivcesSettingsStyle.Available} style={{ color: 'rgba(52, 49, 76, 1)' }}>{language.activate[1]}</p>
                        }
                    </td>
                    <td>
                        <MdDelete onClick={() => props.deleteService(s)} color="#e62163" />

                        <MdModeEdit onClick={() => {
                            setServiceToUpdate(s);
                            setModal(true)
                        }} color="#7467ef" />

                    </td>
                </tr>
            )
        )
    }, [props.services]);

    return (
        <React.Fragment>


            <div className={SerivcesSettingsStyle.Services}>
                <table>
                    {header}
                    {props.error && <p className={SerivcesSettingsStyle.Error}>{props.error}</p>}
                    <tbody>
                        {Services}
                    </tbody>
                </table>
            </div>
            <div className={SerivcesSettingsStyle.Button}>
                <Button color="purple">{language.next[1]}<ArrowNext /></Button>
            </div>
        </React.Fragment>
    )
}
const mapStateToProps = (state: any) => ({
    services: getServices(state),
    error: getError(state),
    isAdmin: getIsAdmin(state)

});
const mapDispatchToProps = (dispatch: any) => ({
    deleteService: (service: Service) => dispatch(deleteService(service)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(SerivceComp);
