import React from 'react';
import './EachNote.css';

class EachNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: props.isChecked
        }
        this.getIndexToRemove = this.getIndexToRemove.bind(this);
        this.getIndexToCheckCompleted = this.getIndexToCheckCompleted.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isChecked: nextProps.isChecked })
    }

    getIndexToCheckCompleted() {
        this.setState(prevState => ({
            isChecked: !prevState.isChecked
        }))
        // setState() is async, so, this time state isChecked is not update. Use tip !this.state.isChecked =))
        this.props.checkCompleted(this.props.index, !this.state.isChecked);
    }

    getIndexToRemove() {
        var index = this.props.index;
        this.props.removeItem(index);
    }

    render() {
        // using classnames from npm
        var paragraphClass = "content";
        if (this.state.isChecked) {
            paragraphClass += " completed";
        }
        return (
            <div className="item">
                <input
                    type="checkbox"
                    onChange={this.getIndexToCheckCompleted}
                    checked={this.props.isChecked}
                    id={this.props.index}
                />
                <label
                    htmlFor={this.props.index}
                    className={paragraphClass}
                >{this.props.content}</label>
                {/* <p className={paragraphClass}>{this.props.content}</p> */}
                <i
                    className="fas fa-trash"
                    onClick={this.getIndexToRemove}>
                </i>
            </div>

        );
    }
}

export default EachNote;