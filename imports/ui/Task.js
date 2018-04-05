import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// import FaBeer from 'react-icons/fa/beer';
// import FaIconPack from 'react-icons/lib/fa';


import { Tasks } from '../api/tasks.js';

var message1 = "hello world"


let message='hello there';

//
// out(message1);
// out(message);


// Task component - represents a single todo item
export default class Task extends Component {


    // out(Task);


    // return;





    toggleChecked() {
        // CHECKED MEANS A TASK IS COMPLETED ONLY A OWNER CAN CHECK A TASK.

        // Set the checked property to the opposite of its current value

        console.log('at toggle checked');

        // Meteor.call('method name', this.props.task._id, opposite of what is now);
        Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
    }

    deleteThisTask() {

        console.log('at delete this task');

        // console.log(this.props.task._id);

        // console.log(this.props.task.text);

        // console.log(this.props.task.task); wrong

        // console.log(this.props.task);

        // console.log(this.props.showPrivateButton); // undefined ; false




        // return;



        // calls api tasks

        Meteor.call('tasks.remove', this.props.task._id);
    }

    togglePrivate() {

        console.log('at toggle private');
        Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private);
    }

    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS
        const taskClassName = classnames({
            checked: this.props.task.checked,
            private: this.props.task.private,
        });

        return (






            <li className={taskClassName}>

                <button className="delete" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button>

                <input
                    type="checkbox"
                    readOnly
                    checked={!!this.props.task.checked}
                    onClick={this.toggleChecked.bind(this)}
                    // onClick={this.toggleChecked.bind(this,)}
                />

                { this.props.showPrivateButton ? (
                    <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
                        { this.props.task.private ? 'Private' : 'Public' }
                    </button>
                ) : ''}

                {/*{ this.props.key ? (<button className="toggle-private">{ this.props.key?this.props.key:''}*/}
                {/*</button>):''}*/}


                {/*text of task*/}
                <span className="text">
                    <strong>{this.props.task.username}</strong>: {this.props.task.text}
                </span>


                {/*<button className="delete" onClick={this.deleteThisTask.bind(this)}>*/}
                    {/*&times;*/}
                {/*</button>*/}


                {/*<button className="delete" onClick={this.deleteThisTask.bind(this)}>*/}
                    {/*<i className="fa fa-home"></i> Home*/}
                {/*</button>*/}

                <button className="delete" onClick={this.deleteThisTask.bind(this)}>
                    <i className="fa fa-user-times"></i>
                </button>


            </li>
        );
    }
}



function out(message){
    //takes a sting.
    console.log(message);


}
