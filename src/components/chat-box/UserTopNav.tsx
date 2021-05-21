import React from 'react';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

import './UserTopNav.scss';

export default class UserTopNav extends React.Component {
    render() {
        return (
            <div
                id="user-topnav"
            >
                <i className="fa fa-address-book"></i>
            </div>
        );
    }
}