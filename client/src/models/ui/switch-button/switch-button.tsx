import React, { useState } from 'react';
import SwitchButtonStyle from './switch-button.module.scss';

interface OwnProps {
    state: boolean,
    onChange: (value: any, id: number) => void,
    id: number,
}

const SwitchButton: React.FC<OwnProps> = (props) => {
    const [state, setState] = useState<boolean>(props.state)

    const Switch = () => {

        props.onChange(!state, props.id)

        setState(state => !state);

    }

    return (
        <label className={SwitchButtonStyle.Switch}>
            <input type="checkbox" onClick={() => props.onChange(!props.state, props.id)} defaultChecked={props.state} />
            <span className={SwitchButtonStyle.Slider}></span>
        </label>
    )
}


export default SwitchButton;