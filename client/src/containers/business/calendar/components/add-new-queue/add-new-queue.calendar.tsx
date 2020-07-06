import React, { useState } from 'react';
import moment from 'moment';
import NewQueueStyle from './add-new-queue.module.scss';
import { Modal, Button, Inputs } from '../../../../../models/ui';
import { plainText } from '../../../../../models/ui/input/utility/input-types.input';

interface OwnProps {
    close: () => void;
    addNewEvent: () => void;
    date: { date: string, hour: string },
    duration: number,
    price: number,
}

const NewQueue: React.FC<OwnProps> = (props) => {
    const [Form, setForm] = useState<any>({
        day: { ...plainText, value: moment(props.date.date, "yyyy/MM/DD").format("DD/MM/yyyy"), editable: false, label: "תאריך" },
        start: {
            ...plainText, value: props.date.hour, editable: false, label: "שעת התחלה"
        },
        end: {
            ...plainText, value: moment(props.date.hour, "HH:mm").add(props.duration, 'm').format("HH:mm"), editable: false, label: "שעת סיום"
        },
        price: {
            ...plainText, value: props.price, editable: false, label: "מחיר"
        },
    });
    const [error, setError] = useState<string>("");




    const updateDetails = () => {
        props.addNewEvent();
        props.close();
    }



    const footer = (
        <div style={{ display: 'flex' }}>
            <Button color="purple" disabled={true} onClick={() => updateDetails()}>שמור</Button>
            <Button color="purple" disabled={true} onClick={() => props.close()}>בטל</Button>
        </div>

    )
    return (
        <div className={NewQueueStyle.NewQueue}>
            <Modal title="קביעת תור" close={props.close} footer={footer} >

                <Inputs
                    form={Form} setForm={setForm} error={error} setError={setError}
                />
            </Modal>
        </div>
    )
}


export default NewQueue;