define([
    "dojo/_base/declare",
    "dojo/dnd/Moveable",
    "dojo/_base/lang",
    "dojo/on",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/product.html"
], function (declare, Moveable, lang, on, _WidgetBase, _TemplatedMixin, template) {
    return declare([_WidgetBase, _TemplatedMixin], {
        // Some default values for our product
        // These typically map to whatever you're passing to the constructor
        name: "No Name",
        // Using require.toUrl, we can get a path to our ProductWidget's space
        // and we want to have a default avatar, just in case
        image: require.toUrl("./product/images/product.png"),
        description: "",

        // Our template - important!
        templateString: template,

        baseClass: "product",

        postCreate: function () {
            debugger;
            var domNode = this.domNode;
            new Moveable(domNode);

            // Run any parent postCreate processes - can be done at any point
            this.inherited(arguments);
        },

        _setImageAttr: function (imagePath) {
            // We only want to set it if it's a non-empty string
            if (imagePath != "") {
                // Save it on our widget instance - note that
                // we're using _set, to support anyone using
                // our widget's Watch functionality, to watch values change
                this._set("image", imagePath);

                // Using our avatarNode attach point, set its src value
                this.imageNode.src = imagePath;
            }
        }
    });
});