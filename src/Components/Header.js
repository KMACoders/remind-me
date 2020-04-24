import React from 'react';
import './Header.css'

class Header extends React.Component {
    render() {
        return (
            <div className="Header">
                <i className="fas fa-calendar-check"/>
                <h1 className="title">{this.props.title}</h1>
            </div>
        );
    }
}

export default Header;