import React from 'react';
import './MenuFilters.css';

class MenuFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: this.props.filter
        }
        this.changeFilterToAll = this.changeFilterToAll.bind(this);
        this.changeFilterToActive = this.changeFilterToActive.bind(this);
        this.changeFilterToCompleted = this.changeFilterToCompleted.bind(this);
    }

    changeFilterToAll() {
        this.setState({
            filter: "ALL"
        });
        this.props.changeFilter("ALL");
    }

    changeFilterToActive() {
        this.setState({
            filter: "ACTIVE"
        });
        this.props.changeFilter("ACTIVE");
    }

    changeFilterToCompleted() {
        this.setState({
            filter: "COMPLETED"
        });
        this.props.changeFilter("COMPLETED");
    }


    render() {
        var btnClassAll = "btn";
        var btnClassActive = "btn";
        var btnClassCompleted = "btn";
        // using classnames from npm
        if (this.state.filter === "ALL") {
            btnClassAll += " active"
        } else if (this.state.filter === "ACTIVE") {
            btnClassActive += " active"
        } else if (this.state.filter === "COMPLETED") {
            btnClassCompleted += " active"
        }
        return (
            <div className="MenuFilters">
                <p className="items-left">{this.props.totalNotes}{this.props.totalNotes > 1 ? " tasks left":" task left"}</p>
                <div className="filter">
                    <button className={btnClassAll} onClick={this.changeFilterToAll}>All</button>
                    <button className={btnClassActive} onClick={this.changeFilterToActive}>Doing</button>
                    <button className={btnClassCompleted} onClick={this.changeFilterToCompleted}>Done</button>
                    <button onClick={this.props.clearCompleted} className="clear">Clear Completed</button>
                </div>
                
            </div>
        );
    }
}

export default MenuFilters;