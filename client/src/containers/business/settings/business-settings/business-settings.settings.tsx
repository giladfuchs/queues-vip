import React, { useState, useEffect, useCallback } from 'react';
import { connect } from "react-redux";
import BusinessSettingsStyle from './business-settings.module.scss';
import SettingsHeader from '../../../shared/header/container-header.shared';
import Breadcrumbs from '../../../../models/ui/breadcrumbs/breadcrumbs';
import Inputs from '../../../../models/ui/input/inputs';
import SocialMediaLinks from './social-media-links/social-media-links';
import { postingImg } from '../../../../assets/images/export-images'
import Button from '../../../../models/ui/button/button';
import { ArrowNext } from '../../../../assets'
import { plainText, phone, email, domain } from '../../../../models/ui/input/utility/input-types.input';
import * as language from '../../../../assets/language/language';


import { postBusinessDetails } from "../../../../store/business/data/action/admin/admin.index.actions"
import { getError, getLoading } from "../../../../store/business/general/general.selectors";
import { BusinessDetails } from '../../../../models/system/business-details';
import { getBusiness } from '../../../../store/business/data/data.selectors';

interface StateProps {
    business: any
    error: string

}

interface DispatchProps {
    postDetails: typeof postBusinessDetails;
}
type Props = DispatchProps & StateProps;

const BusinessSettings: React.FC<Props> = (props) => {

    useEffect(() => {
        if (props.business) {
            setForm(Object.assign({}, ...Object.keys(Form).map((k) => {
                return ({ [k]: { ...Form[k], value: props.business.details[k] || props.business.otherData[k] } })
            })))
            // setLinks(props.business.otherData.links)
        }
    }, []);
    const [Links, setLinks] = useState<any>({
        "facebook": "",
        "instagram": ""
    })
    const [Edit, setEdit] = useState<boolean>(false)

    const [Form, setForm] = useState<any>({
        name: {
            ...plainText, elementConfig: {
                type: "text",
                placeholder: language.businessName[1],
            },
            editable: false,
            label: language.businessName[1],
        },
        address: {
            ...plainText, elementConfig: {
                type: "text",
                placeholder: language.address[1],
            }, label: language.address[1],
            validation: {
                required: true,
                minLen: 4,
            },
            editable: false,
        },
        phone: {
            ...phone,
            editable: false,
        }
        , email: {
            ...email
            , editable: false,
        },

        logo: {
            ...plainText, label: "לוגו"
        },
        about: {
            ...plainText, label: "אודות", elementType: 'textArea',
            validation: {
                required: true,
                minLen: 4,
            },
            editable: false,
        },
    });
    const [error, setError] = useState<string>("");

    const [header, setHeader] = useState<any>(null);
    useEffect(() => {
        setHeader(settingHeader())
    }, []);
    const settingHeader = useCallback(() => (<div>
        <SettingsHeader title={language.businessSettingHeaderTitle[1]} subTitle={language.businessSettingHeaderSubTitle[1]} />
        <Breadcrumbs title={language.businessSettingHeaderTitle[1]} />
    </div>
    ), []);

    const updateDetails = () => {
        const ansForm = Object.assign(
            { Links },
            ...Object.keys(Form).map((k) => {
                return ({ [k]: Form[k].value })
            }))
        const businessDetails: BusinessDetails = {
            details: {
                name: ansForm.name,
                address: ansForm.address,
                phone: ansForm.phone,
                email: ansForm.email,
            },
            otherData: {
                logo: ansForm.logo,
                about: ansForm.about,
                guestPermission: true,

            }

        }
        props.postDetails(businessDetails)
    }
    const edit = () => {
        setEdit(true)
        setForm(Object.assign({}, ...Object.keys(Form).map((k) => {
            return ({ [k]: { ...Form[k], editable: true } })
        })))
    }
    const cancel = () => {
        setEdit(false)
        console.log(Form, props.business);

        setForm(Object.assign({}, ...Object.keys(Form).map((k) => {
            return ({ [k]: { ...Form[k], value: props.business.details[k] || props.business.otherData[k], editable: false } })
        })))
        // setLinks(props.details.links)

    }
    const showError = error !== "" && error !== null ? error : props.error !== "" && props.error !== null ? props.error : null;

    return (
        <React.Fragment>

            <div className={BusinessSettingsStyle.BusinessSettings}>
                {header}
                {showError && <p className={BusinessSettingsStyle.Error}>{showError}</p>}


                <div className={BusinessSettingsStyle.Body}>
                    <div className={BusinessSettingsStyle.Details}>
                        <Inputs
                            Form={Form} setForm={setForm} error={error} setError={setError}
                        />
                        <SocialMediaLinks onChange={() => { }} Links={Links} iconColor="#7467ef" style={{ width: '300px' }} />
                    </div>

                    <div className={BusinessSettingsStyle.Photo}>
                        <img src={postingImg} alt="" />
                    </div>
                </div>
                <div className={BusinessSettingsStyle.Button}>{

                    Edit ? <div>     <Button onClick={() => cancel()} color="purple" disabled={true}>ביטול <ArrowNext /></Button>
                        <Button onClick={() => updateDetails()} color="purple" disabled={true}>שמירה שינויים <ArrowNext /></Button>
                    </div> : <Button onClick={() => edit()} color="purple" disabled={true}>עריכה <ArrowNext /></Button>
                }  </div>

            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (state: any) => ({
    business: getBusiness(state),
    error: getError(state),

});


const mapDispatchToProps = (dispatch: any) => ({
    postDetails: (form: BusinessDetails) => dispatch(postBusinessDetails(form)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(BusinessSettings);
