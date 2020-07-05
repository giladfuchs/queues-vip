import React, { useState, useEffect, useCallback } from 'react';
import { connect } from "react-redux";
import HoursStyle from './opening-hours.module.scss';
import * as days from '../../../../assets';
import * as hours from '../../../../assets';
import SettingsHeader from '../../../shared/header/container-header.shared';
import Breadcrumbs from '../../../../models/ui/breadcrumbs/breadcrumbs';
import SwitchButton from '../../../../models/ui/switch-button/switch-button';
import Options from '../../../../models/ui/options/options';
import { Day } from '../../../../models/system/day';
import { ArrowNext } from '../../../../assets';
import Button from '../../../../models/ui/button/button';
import { postEmployeeSchedule } from "../../../../store/business/data/action/admin/admin.index.actions"
import { getError } from "../../../..//store/business/general/general.selectors";
import { getSchedule } from "../../../..//store/business/data/data.selectors";
import * as language from '../../../../assets/language/language';

interface StateProps {
    error: string
    schedule: any
}

interface DispatchProps {
    postEmployeeHours: typeof postEmployeeSchedule;
}
type Props = DispatchProps & StateProps;



const OpeningHours: React.FC<Props> = (props) => {
    const [Flag, setFlag] = useState<boolean>(false);
    const [Hours, setHours] = useState<any>({
        "0": [],
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": []
    })
    const [header, setHeader] = useState<any>(null);
    const [anotherHeader, setanotherHeader] = useState<any>(null);

    useEffect(() => {

        props.schedule && setHours({ ...Hours, ...props.schedule })
        setFlag(true)
        settingHeader()
    }, []);
    const settingHeader = useCallback(() => {
        setHeader(<div>
            <SettingsHeader title={language.hoursHeaderTitle[1]} subTitle={language.hoursHeaderSubTitle[1]} />
            <Breadcrumbs title={language.hoursHeaderTitle[1]} />

        </div>
        );
        setanotherHeader(<div className={HoursStyle.Days}>
            {days.FullHebDays.map((d: string, i: number) =>
                <p key={Math.random()} className={HoursStyle.Day} >{d}</p>
            )}
        </div>

        )
        return
    }, []);

    const onChangeHour = (e: any, arg: string) => {

        const a = arg.split(',');
        const hour = e.target.value;

        const time = a[1] == "end" ? 'end' : 'start';
        const day = +a[0];

        const curHours: { start: string, end: string }[] = Hours[day];
        curHours[0][time] = hour;

        setHours({
            ...Hours, [day]: curHours
        });
    }

    const onClickAvailable = (value: boolean, id: number) => {
        setHours(value ? {
            ...Hours, [id]: [{ start: "08:00", end: "20:00" }]
        } : {
                ...Hours, [id]: []
            });
    }
    const saveChange = () => {
        props.postEmployeeHours(Hours)
    }


    const showError = props.error !== "" && props.error !== null ? props.error : null;
    const [render, setRender] = useState<JSX.Element>(<p>loading...</p>)
    useEffect(() => {

        setRender(Flag ? <React.Fragment>

            {days.FullHebDays.map((d: string, i: number) => {

                const isAvailable = Hours[i].length > 0;


                return (
                    <div key={Math.random()} className={HoursStyle.DayContent}>
                        <p className={HoursStyle.Day} >{d}</p>

                        <SwitchButton key={Math.random()} state={isAvailable} onChange={onClickAvailable} id={i} />

                        <Options key={i} disabled={!isAvailable} title={language.open[1]}
                            defaultValue={'08:00'} onChange={onChangeHour} id={i + ",start"} value={isAvailable ? Hours[i][0].start : ""}
                        />
                        <Options key={Math.random()} disabled={!isAvailable} title={language.close[1]}
                            defaultValue={'24:00'} onChange={onChangeHour} id={i + ",end"} value={isAvailable ? Hours[i][0].end : ""}
                        />
                    </div>
                )
            })}
        </React.Fragment> : <p>loading...</p>)

    }, [Hours]);

    return (
        <div className={HoursStyle.OpeningHours}>
            {header}
            {showError && <p className={HoursStyle.Error}>{showError}</p>}
            <div className={HoursStyle.Body}>
                {anotherHeader}
                <hr />
                <div className={HoursStyle.DaysContent}>
                    {render}
                </div>
            </div>

            <div className={HoursStyle.Button}>
                <Button color="purple" disabled={true} onClick={saveChange}>{language.saveChange[1]}<ArrowNext /></Button>
                {/* <Button color="orange" disabled={true} onClick={() => setHours({ ...Hours, ...props.details.schedule })}>{".cancel[1]"}<ArrowNext /></Button> */}
            </div>
        </div>
    )
}


const mapStateToProps = (state: any) => ({
    schedule: getSchedule(state),
    error: getError(state),

});


const mapDispatchToProps = (dispatch: any) => ({
    // getDetails: () => dispatch(getDetails()),
    postEmployeeHours: (form: Day) => dispatch(postEmployeeSchedule(form)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(OpeningHours);
