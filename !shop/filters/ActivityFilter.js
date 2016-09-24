define([
    "dojo/_base/declare",
    "dojo/topic",
    "dojo/_base/lang",
    "dijit/registry",
    "dijit/form/CheckBox",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/activityFilter.html"
], function (declare, topic, lang, registry, CheckBox, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template) {

    var ActivityFilter = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        name: "No Name",
        templateString: template,
        baseClass: "activityFilterWidget",

        _filterValue: {
            active: true,
            inactive: false
        },

        constructor: function (fieldName) {
            this.fieldName = fieldName;
        },

        getFilterValue: function () {
            if ((this._filterValue.active && this._filterValue.inactive)
                || (!this._filterValue.active && !this._filterValue.inactive)) {
                return undefined;
            }

            return lang.hitch(this, function (item) {
                return item[this.fieldName] === this._filterValue.active;
            });
        },

        postCreate: function () {
            this.inherited(arguments);

            registry.byId("activityFilterActive").on("change", lang.hitch(this, function (isChecked) {
                this._filterValue.active = isChecked;
                topic.publish("activity-changed", this.getFilterValue());
            }), true);

            registry.byId("activityFilterInactive").on("change", lang.hitch(this, function (isChecked) {
                this._filterValue.inactive = isChecked;
                topic.publish("activity-changed", this.getFilterValue());
            }), true);
        }
    });

    return ActivityFilter;
});