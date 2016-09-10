require([
    "dojo/on",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dnd/Source",
    "dojo/topic",
    "dojo/_base/array",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "product/ProductWidget",
    "filters/FiltersWidget",
    "cart/CartWidget",
    "store/ProductStore",
    "dojo/domReady!"
], function (on, dom, domConstruct, Source, topic, arrayUtil, BorderContainer, ContentPane, ProductWidget, FiltersWidget, CartWidget, ProductStore) {
    var appLayout = new BorderContainer({
        design: "headline"
    }, "appLayout");

    var mainContent = new ContentPane({
        region: "center",
        id: "mainContent",
        tabPosition: "bottom",
        class: "centerPanel",
        content: "Main content"
    });

    appLayout.addChild(mainContent);

    appLayout.addChild(
        new ContentPane({
            region: "top",
            class: "edgePanel",
            content: "Dojo Shop"
        })
    );
    var leftContentPane = new ContentPane({
        region: "left",
        id: "leftCol", "class": "edgePanel",
        splitter: true
    });

    var rightContentPane = new ContentPane({
        region: "right",
        id: "rightCol", "class": "edgePanel",
        splitter: true
    });

    appLayout.addChild(
        leftContentPane
    );

    appLayout.addChild(
        rightContentPane
    );

    var cart = new CartWidget({
        id: "cart"
    });

    var filters = new FiltersWidget({
        id: "filtersWidget"
    });

    function bindProducts(products, parentDomNode) {
        arrayUtil.forEach(products, function(product){
            var productWidget = new ProductWidget(product);
            new Source(productWidget.domNode);
            productWidget.placeAt(parentDomNode);
        });
    }

    var productStore = new ProductStore();
    var container = dom.byId("container");
    topic.subscribe("filters-changed", function(filter) {
        var products = productStore.query(filter);
        domConstruct.empty(mainContent.domNode);
        bindProducts(products, mainContent);
    });

    bindProducts(productStore.getAll(), mainContent);

    leftContentPane.addChild(filters);
    rightContentPane.addChild(cart);
    appLayout.startup();
});