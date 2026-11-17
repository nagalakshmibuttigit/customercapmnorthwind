sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"customerapp/test/integration/pages/CustomersList.gen",
	"customerapp/test/integration/pages/CustomersObjectPage.gen",
	"customerapp/test/integration/pages/OrdersObjectPage.gen"
], function (JourneyRunner, CustomersListGenerated, CustomersObjectPageGenerated, OrdersObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('customerapp') + '/test/flp.html#app-preview',
        pages: {
			onTheCustomersListGenerated: CustomersListGenerated,
			onTheCustomersObjectPageGenerated: CustomersObjectPageGenerated,
			onTheOrdersObjectPageGenerated: OrdersObjectPageGenerated
        },
        async: true
    });

    return runner;
});

