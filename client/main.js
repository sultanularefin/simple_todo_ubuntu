import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';

import App from '../imports/ui/App.js';

// import XQ from '../imports/ui/App.js';

import Oldapp from '../imports/ui/oldApp.js';


// Oldapp react component must start with uppercase


// console.log(oldApp);


// return;


// XQ App these are react elementss.


// console.log(¨ddd¨);
// console.log(ttt);

// console.log(¨hello¨);

// hello world
Meteor.startup(() => {
  // render(<App />, document.getElementById('render-target'));


    // render(element,container,callback);

    // render(<XQ />, document.getElementById('render-target'),f1());





    render(<App />, document.getElementById('render-target'));


    render(<Oldapp />, document.getElementById('old-render-target'));

    // press Ctrl + B  to navigate to Oldapp.js

});


// function f1(){
//
//
//   // console.log(we are at f1);
// }
