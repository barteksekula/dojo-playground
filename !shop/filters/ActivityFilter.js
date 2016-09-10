define([
    "dojo/_base/declare",
    "dojo/on",
    "dojo/topic",
    "dojo/_base/lang",
    "dijit/registry",
    "dijit/form/CheckBox",
    "dojo/parser",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin", //TODO is it needed??  https://dojotoolkit.org/reference-guide/1.10/dijit/_WidgetsInTemplateMixin.html#dijit-widgetsintemplatemixin
    "dojo/text!./templates/activityFilter.html"
], function (declare, on, topic, lang, registry, CheckBox, parser, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template) {

    var ActivityFilter = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        name: "No Name",
        templateString: template,
        baseClass: "activityFilterWidget",

        filterValue: {
            active: true,
            inactive: false
        },

        constructor: function() {

        },

        postCreate: function () {
            debugger;
             // parser.parse();

            this.inherited(arguments);

            registry.byId("activityFilterActive").on("change", lang.hitch(this, function(isChecked){
                this.filterValue.active = isChecked;
                topic.publish("activity-changed", this.filterValue);
            }), true);

            registry.byId("activityFilterInactive").on("change", lang.hitch(this, function(isChecked){
                this.filterValue.inactive = isChecked;
                topic.publish("activity-changed", this.filterValue);
            }), true);
        }
    });

    // parser.parse();

    return ActivityFilter;
});