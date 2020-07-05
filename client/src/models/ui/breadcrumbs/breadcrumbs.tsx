import React from 'react';
import BreadcrumbsStyle from './breadcrumbs.module.scss';
import { MdHome } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface OwnProps {
    title: string
}

const Breadcrumbs: React.FC<OwnProps> = (props) => {
    return (
        <div className={BreadcrumbsStyle.Breadcrumbs}>
            <p className={BreadcrumbsStyle.Title}>{props.title}</p>
            <span>|</span>
            <Link to="buiness/home">
                <MdHome />
            </Link>
            <span>></span>
            <p className={BreadcrumbsStyle.HintTitle}>{props.title}</p>
        </div>
    )
}

export default Breadcrumbs;
