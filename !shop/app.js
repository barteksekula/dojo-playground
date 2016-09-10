require([
    "dojo/on",
    "dojo/dom",
    "dijit/registry",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "product/ProductWidget",
    "filters/FiltersWidget",
    "store/ProductStore",
    "dojo/domReady!"
], function (on, dom, registry, BorderContainer, ContentPane, ProductWidget, FiltersWidget, ProductStore) {

    var x = new ProductStore();

    var items = x.getAll();
    debugger;

    // create the BorderContainer and attach it to our appLayout div
    var appLayout = new BorderContainer({
        design: "headline"
    }, "appLayout");

    // create the TabContainer
    var contentTabs = new ContentPane({
        region: "center",
        id: "contentTabs",
        tabPosition: "bottom",
        class: "centerPanel",
        content: "Main content"
    });

    appLayout.addChild(contentTabs);

    // create and add the BorderContainer edge regions
    appLayout.addChild(
        new ContentPane({
            region: "top",
            class: "edgePanel",
            content: "Dojo Shop"
        })
    );
    var contentPane = new ContentPane({
        region: "left",
        id: "leftCol", "class": "edgePanel",
        splitter: true
    });

    appLayout.addChild(
        contentPane
    );

    var filters = new FiltersWidget({
        id: "filtersWidget",
        region: "center"
    });
    contentPane.addChild(filters);

    // start up and do layout
    appLayout.startup();
});