define([
    "dojo/_base/declare",
    "dojo/topic",
    "dojo/_base/lang",
    "dijit/registry",
    "dijit/form/DateTextBox",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/dateFilter.html"
], function (declare, topic, lang, registry, DateTextBox, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template) {

    var DateFilter = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        name: "No Name",
        templateString: template,
        baseClass: "dateFilterWidget",

        _filterValue: {
            from: null,
            to: null
        },

        constructor: function(fieldName) {
            this.fieldName = fieldName;
        },

        getFilterValue: function() {
            return lang.hitch(this, function(item) {
                if(this._filterValue.from && this._filterValue.to) {
                    return item[this.fieldName] > moment(this._filterValue.from).toISOString() && item[this.fieldName] < moment(this._filterValue.to).toISOString();
                }

                if(this._filterValue.from) {
                    return item[this.fieldName] > moment(this._filterValue.from).toISOString();
                }

                if(this._filterValue.to) {
                    return item[this.fieldName] < moment(this._filterValue.to).toISOString();
                }

                return true;
            });
        },

        postCreate: function () {
            this.inherited(arguments);

            registry.byId("fromDate").on("change", lang.hitch(this, function(fromDate){
                this._filterValue.from = fromDate;
                topic.publish("date-changed", this.getFilterValue());
            }), true);

            registry.byId("toDate").on("change", lang.hitch(this, function(toDate){
                this._filterValue.to = toDate;
                topic.publish("date-changed", this.getFilterValue());
            }), true);
        }
    });

    return DateFilter;
});