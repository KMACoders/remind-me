import React from 'react';
import UserInput from './UserInput';
import EachNote from './EachNote';
import MenuFilter from './MenuFilters';
import './TodoList.css';

class Todolist extends React.Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem("localStorageData") == null) {
            this.state = {
                data: [],
                filter: 'ALL', // ACTIVE, COMPLETED
                totalNotes: 0
            }
        } else {
            this.state = {
                data: JSON.parse(localStorage.getItem("localStorageData")),
                filter: 'ALL',
                totalNotes: JSON.parse(localStorage.getItem("localStorageData")).length // // ACTIVE, COMPLETED
            }
        }

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.checkCompleted = this.checkCompleted.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.findIndexInArray = this.findIndexInArray.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
    }

    // Custom function : get index of element ( value of key in object) in array (this.state.data)
    findIndexInArray(element, array) {
        var indexOfElement;
        array.forEach((item, index) => {
            if (item.contentNote === element)
                indexOfElement = index;
        })

        return indexOfElement
    }

    changeFilter(filter) {
        this.setState({
            filter: filter
        });
    }

    checkCompleted(index, newValue) {
        var newArr = this.state.data;
        newArr[index].isCompleted = newValue;
        this.setState({
            data: newArr
        });
    }

    clearCompleted() {
        var newArr = this.state.data.filter(item => {
            return item.isCompleted === false
        });
        this.setState({
            data: newArr,
            totalNotes: newArr.length
        })
    }

    removeItem(index) {
        var newArr = this.state.data;
        newArr.splice(index, 1);
        this.setState(prevState => ({
            data: newArr,
            totalNotes: prevState.totalNotes - 1
        }));
    }

    addItem(val) {
        var newArr = this.state.data;
        newArr.push({
            contentNote: val,
            isCompleted: false
        });
        this.setState(prevState => ({
            data: newArr,
            totalNotes: prevState.totalNotes + 1
        }));
    }

    // setState() is asynchronous. React will call componentDidUpdate after each render()
    componentDidUpdate() {
        localStorage.setItem("localStorageData", JSON.stringify(this.state.data));
    }

    render() {
        var that = this;
        var listNote;
        var noTask;
        // render EachNote follow by filter
        if (this.state.filter === "ALL") {
            noTask = <p className="empty"><i className="far fa-sticky-note"></i>No task</p>;
            listNote = this.state.data
                .map(function (item, index) {
                    return (
                        <EachNote
                            key={index}
                            index={index}
                            content={item.contentNote}
                            removeItem={that.removeItem}
                            checkCompleted={that.checkCompleted}
                            isChecked={item.isCompleted}
                        />
                    );
                })
        } else if (this.state.filter === "ACTIVE") {
            noTask = <p className="empty"><i className="far fa-sticky-note"></i>No "doing" task</p>;
            listNote = this.state.data
                .filter(function (item) {
                    return item.isCompleted === false
                })
                .map(function (item, index) {
                    // After using filter method, index of original array(that.state.data) will change.
                    // newIndex will get original index of item in original array
                    var newIndex = that.findIndexInArray(item.contentNote, that.state.data);
                    return (
                        <EachNote
                            key={index}
                            // Lam sao cho Index nay la index cua mang ban dau 
                            // chu khong phai la mang sau khi filter
                            index={newIndex}
                            content={item.contentNote}
                            removeItem={that.removeItem}
                            checkCompleted={that.checkCompleted}
                            isChecked={item.isCompleted}
                        />
                    );
                })
        } else if (this.state.filter === "COMPLETED") {
            noTask = <p className="empty"><i className="far fa-sticky-note"></i>No "done" task</p>;
            listNote = this.state.data
                .filter(function (item) {
                    return item.isCompleted === true
                })
                .map(function (item, index) {
                    var newIndex = that.findIndexInArray(item.contentNote, that.state.data);
                    return (
                        <EachNote
                            key={index}
                            index={newIndex}
                            content={item.contentNote}
                            removeItem={that.removeItem}
                            checkCompleted={that.checkCompleted}
                            isChecked={item.isCompleted}
                        />
                    );
                })
        }
        return (
            <div className="TodoList">
                <UserInput
                    addItem={this.addItem}
                    createNote={this.createNote}
                    data={this.state.data}
                />
                {listNote.length === 0 ? noTask : listNote}
                <MenuFilter
                    filter={this.state.filter}
                    changeFilter={this.changeFilter}
                    totalNotes={this.state.totalNotes}
                    clearCompleted={this.clearCompleted}
                />
            </div>
        );
    }
}

export default Todolist;