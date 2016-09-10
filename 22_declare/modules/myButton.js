define([
    "dojo/_base/declare",
    "dijit/form/Button"
], function(declare, Button){
    return declare("myButton", Button, {
        label: "My Button",
        onClick: function(evt){
            console.log("I was clicked!");
            this.inherited(arguments);
        }
    });
});