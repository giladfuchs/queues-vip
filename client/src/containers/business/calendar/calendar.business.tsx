import React, { useState, useEffect, useCallback, useMemo } from 'react';
import CalendarStyle from './calendar.module.scss';
import moment from 'moment';
import * as helper from './components/helper';
import { Queue } from '../../../models/system/event';
import Button from '../../../models/ui/button/button';
import NewQueue from './components/add-new-queue/add-new-queue.calendar';
import { connect } from 'react-redux';
import { getDurationOfNewQueue, getPrice } from '../../../store/business/data/data.selectors';
import { Service } from '../../../models/system/service';
import { getServices, getMat, getDays, getStartMinTime, getTimeDistance } from '../../../store/business/data/data.selectors';

import { getPerson } from '../../../store/business/auth/auth.selectors';
import { Client } from '../../../models/system/persones';
import { updateScheduleWeek } from '../../../store/business/data/action/client/queue.data.actions';
import { getLoading } from '../../../store/business/general';



interface StateProps {
    services: Service[],
    person: Client,
    days: [],
    mat: boolean[][],
    startMinTime: number,
    loading: boolean,
    timeDistance: number,
    durationOfNewQueue: number,
    price: number,
}

interface DispatchProps {
    updateScheduleWeek: typeof updateScheduleWeek;
}

type Props = DispatchProps & StateProps;
const CalendarUser: React.FC<Props> = (props) => {
    const [headerDays, setHeaderDays] = useState<JSX.Element[]>();

    useEffect(() => {

        setHeaderDays(days())
        setAllDaysWeek(props.days)
    }, [props.mat])



    const [OpenModal, setOpenModal] = useState<boolean>(false)
    const [Time, setTime] = useState<{ date: string, hour: string }>({ date: "", hour: "" });







    const [allDaysWeek, setAllDaysWeek] = useState<string[]>(props.days)
    const [slots, setSlots] = useState<any>(null)

    // Hold the table
    useEffect(() => {

        let time: number = 0;
        setSlots(
            props.mat.map(element => {
                const hour = moment(props.startMinTime, "HH:mm").minutes(time).format("HH:mm");
                time += props.timeDistance;
                return element.every(e => !e) ? null :
                    (
                        <tr key={hour}>
                            <td className={CalendarStyle.Hours} style={{ cursor: 'initial' }}>{hour}</td>
                            {
                                element.map((day: boolean, index: number) => {
                                    if (!day) {
                                        return (
                                            <td key={hour + ',' + props.days[index]} className={CalendarStyle.Slot + " " + CalendarStyle.Event}
                                                style={{ cursor: "not-allowed" }}>
                                            </td>
                                        );
                                    }
                                    return (
                                        <td key={hour + ',' + props.days[index]} className={CalendarStyle.Slot} onClick={() => onSlotClick(hour, props.days[index])}></td>
                                    );
                                })
                            }
                        </tr>
                    );
            })
        )
    }, [props.mat, props.startMinTime]);

    ;

    const addNewEvent = () => {

        const event: Queue = {
            serviceId: props.services[0]._id || "",
            clientId: props.person._id || "",
            day: Time.date,
            hour: Time.hour,
            duration: props.durationOfNewQueue
        }
        props.updateScheduleWeek(event)
    }

    const onSlotClick = (hour: string, date: string) => {
        setOpenModal(true);
        setTime({ date, hour });
    }

    const week = props.days.map(d => moment(d).day())

    // Return days and dats(The first row of table)
    const curMonth = useCallback(() => (
        helper.monthNumberToHeb(moment(new Date()).month() + 1)
    ), []);
    const days = useCallback(() => (
        allDaysWeek.map((day: string, i: number) => {
            return (
                <th key={day}>
                    {helper.hebDays[week[i]]}
                    <br />
                    {moment(day.toString(), "yyyy/MM/DD").format('DD/MM')}
                </th>
            );
        })
    ), []);

    return props.loading ? <p>loading ....</p>
        : (
            <React.Fragment>
                {OpenModal && <NewQueue date={Time} close={() => setOpenModal(false)}
                    addNewEvent={addNewEvent} duration={props.durationOfNewQueue} price={props.price} />}
                <div className={CalendarStyle.Calendar}>
                    <div className={CalendarStyle.Header}>
                        {/* <Button color='orange' disabled={true} onClick={() => props.updateWeekNumber(props.weekNumber - 1)}>שבוע קודם</Button>
                    <Button color='purple' disabled={true} onClick={() => props.updateWeekNumber(parseInt(moment(new Date()).format('WW')))}>שבוע נוכחי</Button>
                    <Button color='orange' disabled={true} onClick={() => props.updateWeekNumber(props.weekNumber + 1)}>שבוע הבא</Button> */}

                    </div>
                    <div className={CalendarStyle.Content}>
                        <table >
                            <tbody>
                                <tr>
                                    <th className={CalendarStyle.TableHeader}>
                                        {curMonth()}
                                    </th>
                                    {headerDays}
                                </tr>
                                {slots}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
}

const mapStateToProps = (state: any) => ({
    services: getServices(state),
    person: getPerson(state),
    days: getDays(state),
    mat: getMat(state),

    startMinTime: getStartMinTime(state),
    loading: getLoading(state),
    timeDistance: getTimeDistance(state),
    durationOfNewQueue: getDurationOfNewQueue(state),
    price: getPrice(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    updateScheduleWeek: (queue: Queue) => dispatch(updateScheduleWeek(queue)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(CalendarUser);