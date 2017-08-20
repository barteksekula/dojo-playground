define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/dom",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dojo/dnd/Source",
    "dijit/_TemplatedMixin",
    "filters/ActivityFilter",
    "dojo/text!./templates/cart.html"
], function (declare, domConstruct, dom, lang, _WidgetBase, Source, _TemplatedMixin, ActivityFilter, template) {

    function targetItemCreator (item) {
        var li = domConstruct.create("li", { id: item.id });
        var div = domConstruct.create("div", {
            class: "target-item",
            innerHTML: item.name + " - " + item.price
        }, li);

        return { node:li, data: item };
    }

    return declare([_WidgetBase, _TemplatedMixin], {
        name: "No Name",
        templateString: template,
        baseClass: "cartWidget",

        constructor: function() {

        },

        postCreate: function () {
            this.inherited(arguments);
            new Source(this.cartNode, { accept: ["product"], creator: targetItemCreator});
        }
    });
});