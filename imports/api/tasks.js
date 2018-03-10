import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('tasks', function tasksPublication() {
        return Tasks.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId },
            ],
        });
    });
}



Meteor.methods({
    'tasks.insert'(text) {


        console.log(text);

        // return;
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }



        // Takes 2 arguments (document (text,createdAt,owner,username in collection and a callback which is optional.)
        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });


    },
    'tasks.remove'(taskId) {


        console.log(taskId);

        // console.log(taskId._str);
        //
        // return;

        // check(taskId, String);



        if (typeof taskId === 'string') {
            // this is a string

            check(taskId,String);
        }
        else {
            check(taskId._str, String);
        }




        // const modified_task =taskId._str;



        // return ;


        const task = Tasks.findOne(taskId);

        // const task = Tasks.findOne(modified_task);


        console.log(task);

        // return;

        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }


        // Tasks is mongodb collection


        // Tasks.remove(taskId);

        Tasks.remove(task);

        console.log('After Tasks.remove');
    },
    'tasks.setChecked'(taskId, setChecked) {


      // return;


        if (typeof taskId === 'string') {
            // this is a string

            check(taskId,String);
        }
        else {
            // check(taskId._str, String);
            check(taskId._str, String);
        }



        check(setChecked, Boolean);

        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }

        // return;

        // checked is happened here ( strike out)
        Tasks.update(taskId, { $set: { checked: setChecked } });
    },
    'tasks.setPrivate'(taskId, setToPrivate) {
        check(taskId, String);
        check(setToPrivate, Boolean);

        const task = Tasks.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, { $set: { private: setToPrivate } });
    },
});
