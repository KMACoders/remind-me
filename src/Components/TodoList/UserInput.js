import React from 'react';
import './UserInput.css'

class UserInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleForm = this.handleForm.bind(this);
    }

    handleChange(e) {
        this.setState({
            inputValue: e.target.value
        });
    }

    handleForm(e) {
        e.preventDefault();
        var check = false;
        var noteIndex;
        var isCompleted;
        var noteExist;

        // Checking note exist => Every note is different.
        this.props.data.forEach((item, index) => {
            if (item.contentNote === this.state.inputValue) {
                noteExist = item.contentNote;
                noteIndex = index;
                isCompleted = item.isCompleted ? "Done" : "Doing";
                check = true;
            }
        })

        // If note is note exist, push it to component TodoList
        if (check === true) {
            alert(`This task ( "${noteExist}" ) already existed before.\nPosition : ${noteIndex + 1}, status : ${isCompleted}. `);
            this.setState({
                inputValue: ""
            })
        } else {
            this.props.addItem(this.state.inputValue);
            this.setState({
                inputValue: ""
            })
        }
    }

    render() {
        return (
            <div className="UserInput">
                <form onSubmit={this.handleForm}>
                    <input
                        type="text"
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                        placeholder="Create a new task ?"
                        maxLength="36"
                    />
                </form>
            </div>
        );
    }
}

export default UserInput;