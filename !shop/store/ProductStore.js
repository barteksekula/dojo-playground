define([
    "dojo/_base/declare",
    "dojo/store/Memory",
    'dojo/json',
    'dojo/text!./products.json'
], function (declare, Memory, JSON, data) {

    var ProductStore = declare(null, {
        constructor: function () {
            var products = JSON.parse(data);
            this._memory = new Memory({data: products, idProperty: "_id"});
        },

        getAll: function () {
            return this._memory.data;
        },

        query: function(filter) {
            return this._memory.query(filter);
        }
    });

    return ProductStore;
});