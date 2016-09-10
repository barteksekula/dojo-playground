define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/product.html"
], function (declare, _WidgetBase, _TemplatedMixin, template) {

    return declare([_WidgetBase, _TemplatedMixin], {
        name: "No Name",

        image: require.toUrl("./product/images/product.png"),
        description: "",

        templateString: template,

        baseClass: "productWidget",

        postCreate: function () {
            this.inherited(arguments);
        },

        _setNameAttr: function (name) {

        },

        _setImageAttr: function (imagePath) {
            if (imagePath != "") {
                this._set("image", imagePath);

                this.imageNode.src = imagePath;
            }
        }
    });
});