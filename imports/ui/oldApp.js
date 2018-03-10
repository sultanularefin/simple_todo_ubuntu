import React, { Component } from 'react';

import Task from './Task.js';

// App component - represents the whole app
export default class App extends Component {
    // getTasks() {
    //     return [
    //         { _id: 1, text: 'This is task 1' },
    //         { _id: 2, text2: 'This is task 2' },
    //         { _id: 3, text: 'This is task 3' },
    //     ];
    // }

    getTasks() {
        return [
            { _id: 1, text: 'This is task 1' },
            { _id: 2, text: 'This is task 2' },
            { _id: 3, text: 'This is task 3' },
        ];
    }

    // renderTasks() {
    //     return this.getTasks().map((task) => (
    //         <Task  key={task._id} task={task} />
    //     ));
    // }


    renderTasks() {
        return this.getTasks().map((taskddd) => (
            <Task  key={taskddd._id} task={taskddd} />
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List (NOT IMPLEMENTED/ necessary)</h1>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}