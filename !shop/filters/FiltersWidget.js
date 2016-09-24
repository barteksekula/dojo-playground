define([
    "dojo/_base/declare",
    "dojo/_base/array",
    'dojox/lang/functional/object',
    "dojo/topic",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "filters/ActivityFilter",
    "filters/DateFilter",
    "dojo/text!./templates/filters.html"
], function (declare, array, o, topic, lang, _WidgetBase, _TemplatedMixin, ActivityFilter, DateFilter, template) {

    return declare([_WidgetBase, _TemplatedMixin], {
        name: "No Name",
        templateString: template,
        baseClass: "filtersWidget",

        filter: {},

        constructor: function() {

        },

        postCreate: function () {
            this.inherited(arguments);
            new ActivityFilter({fieldName: 'isActive'}, this.activityFilter);
            new DateFilter({fieldName: 'updated'}, this.dateFilter);

            topic.subscribe("activity-changed", lang.hitch(this, function(activity) {
                if(typeof activity === "undefined") {
                    delete this.filter.isActive;
                } else {
                    this.filter.isActive = activity;
                }
                this.publish();
            }));

            topic.subscribe("date-changed", lang.hitch(this, function(date) {
                if(typeof date === "undefined") {
                    delete this.filter.date;
                } else {
                    this.filter.date = date;
                }
                this.publish();
            }));
        },

        publish: function() {
            topic.publish("filters-changed", o.values(this.filter));
        }
    });
});