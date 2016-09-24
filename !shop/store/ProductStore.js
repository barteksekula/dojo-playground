define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/store/Memory",
    'dojo/json',
    'dojo/text!./products.json'
], function (declare, lang, Memory, JSON, data) {

    var ProductStore = declare(null, {
        constructor: function () {
            var products = JSON.parse(data);
            this._memory = new Memory({data: products, idProperty: "_id"});
        },

        getAll: function () {
            return this._memory.data;
        },

        query: function(filter) {
            if(lang.isArray(filter)) {
                var result = this._memory.data;
                filter.forEach(lang.hitch(this, function(f) {
                    var query = lang.isFunction(f) ? f : function() { return f; };
                    result = result.filter(query);
                }));
                return result;
            } else {
                return this._memory.query(filter);
            }
        }
    });

    return ProductStore;
});