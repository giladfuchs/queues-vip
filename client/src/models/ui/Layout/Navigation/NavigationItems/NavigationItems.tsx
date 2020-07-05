import React from 'react';

import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';
import * as language from '../../../../../assets/language/language'
interface Props {
    isLogin: boolean;
    isValidDomain: boolean;
    isAdmin: boolean;
}

const navigationItems: React.FC<Props> = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>{language.home[1]}</NavigationItem>

        {(props.isLogin && props.isAdmin) ?
            <React.Fragment>
                <NavigationItem link="/business/services">{language.services[1]}</NavigationItem>
                <NavigationItem link="/business/hours">{language.hours[1]}</NavigationItem>
                <NavigationItem link="/business/businesssettings">{language.businessSettingNav[1]}</NavigationItem>
                <NavigationItem link="/business/calander">{language.calendar[1]}</NavigationItem>
                <NavigationItem link="/logout">{language.logout[1]}</NavigationItem>

            </React.Fragment>
            : (props.isLogin) ?
                <React.Fragment>
                    <NavigationItem link={'/' + localStorage.getItem('domain')} exact={true}>{language.services[1]}</NavigationItem>
                    <NavigationItem link="/logout">{language.logout[1]}</NavigationItem>


                </React.Fragment>
                :
                props.isValidDomain ?
                    <React.Fragment>
                        <NavigationItem link={'/' + localStorage.getItem('url')} exact={true}>{language.login[1]}</NavigationItem>
                        <NavigationItem link={'/' + localStorage.getItem('url') + '/register'}>{language.register[1]}</NavigationItem>
                    </React.Fragment>
                    :

                    <React.Fragment>
                        <NavigationItem link="/business/login">{language.login[1]}</NavigationItem>
                        <NavigationItem link="/business/register">{language.register[1]}</NavigationItem>
                    </React.Fragment>
        }
    </ul>
);

export default navigationItems;

