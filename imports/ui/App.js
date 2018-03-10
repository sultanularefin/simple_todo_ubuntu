import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);

        console.log(props);


        this.state = {
            hideCompleted: false,
        };
    }

    handleSubmit(event) {

        // console.log(event);
        // prints event details




        event.preventDefault();




        // The Event interface's preventDefault() ' +
        // 'method tells the user agent that if the event does not' +
        // ' get explicitly handled, its default action should not be taken as it normally would be.


        // return;

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();




        Meteor.call('tasks.insert', text);

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }



    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    renderTasks() {
        let filteredTasks = this.props.tasks;


        // console.log(filteredTasks);

        // return;

        // print()

        // console.log(this.state);

        // return;


        // Executes only when 'hide completed tasks ' is checked

        if (this.state.hideCompleted) {

            console.log("At hide completed");

            filteredTasks = filteredTasks.filter(task => !task.checked);
        }



        // console.log("Not At hide completed");



        // return;


        // var a=this.props.currentUser;

        // console.log(this.props.currentUser);


        // var final= json.parse(a);

        // console.log(final);
        // return;
        // console.log(this.props.currentUser.username);
        // console.log(this.props.currentUser._id);


        // map ==>Calls a defined callback function on each element of an array,
        //     and returns an array that contains the results.

        return filteredTasks.map((task) => {


            // const currentUserId = this.props.currentUser;
            // const test =this.props.currentUser._id;

            const currentUserId = this.props.currentUser && this.props.currentUser._id;




            // console.log(currentUserId);

            // if (task.owner === currentUserId) then only assignment
            const showPrivateButton = task.owner === currentUserId;



            // console.log(showPrivateButton);

            // console.log(test);

            // return;


            // console.log(task);

            // here Task is the Task component Task component - represents a single todo item
            return (
                <Task
                    key={task._id}
                    task={task}
                    showPrivateButton={showPrivateButton}
                />
            );
        });
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List ({this.props.incompleteCount})</h1>

                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readOnly
                            checked={this.state.hideCompleted}
                            onClick={this.toggleHideCompleted.bind(this)}
                        />
                        Hide Completed Tasks
                    </label>

                    <AccountsUIWrapper />

                    { this.props.currentUser ?
                        <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                            <input
                                type="text"
                                ref="textInput"
                                placeholder="Type to add new tasks"
                            />
                        </form> : ''
                    }
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

export default withTracker(() => {



    var result= Meteor.subscribe('tasks');

    // console.log("result: ");
    // console.log(result);

    // Find the documents in a collection that match the selector.
    //     Returns the number of documents that match a query.


    var ourTask= Tasks.find({},{sort:{createdAt:-1}}).fetch();
    var ourIncompleteCount= Tasks.find({ checked: { $ne: true } }).count();

    // checked not equal to true i.e. checked is false; checked means complete.

    var ourCurrentUser= Meteor.user();



    // console.log("ourTask: ");
    //
    // console.log(ourTask);

    console.log("ourIncompleteCount: ");

    console.log(ourIncompleteCount);
    //
    // console.log("ourCurrentUser: ");
    // console.log(ourCurrentUser);








    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
})(App);
