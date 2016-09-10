define([
    "dojo/_base/declare",
    "dojo/topic",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "filters/ActivityFilter",
    "dojo/text!./templates/filters.html"
], function (declare, topic, lang, _WidgetBase, _TemplatedMixin, ActivityFilter, template) {

    return declare([_WidgetBase, _TemplatedMixin], {
        name: "No Name",
        templateString: template,
        baseClass: "filtersWidget",

        filter: {},

        constructor: function() {

        },

        postCreate: function () {
            this.inherited(arguments);
            new ActivityFilter({}, this.containerNode);
            topic.subscribe("activity-changed", lang.hitch(this, function(activity) {
                lang.mixin(this.filter, activity);
                this.publish();
            }));
        },

        publish: function() {
            debugger;
            topic.publish("filters-changed", this.filter);
        }
    });
});