jQuery.sap.declare("customer.app.variant.f1512.Component");

// use the load function for getting the optimized preload file if present
sap.ui.component.load({
	name: "retail.store.countstocks1",
	// Use the below URL to run the extended application when SAP-delivered application is deployed on SAPUI5 ABAP Repository
	url: "/sap/bc/ui5_ui5/sap/RT_COUNT_STKS1"

	// we use a URL relative to our own component
	// extension application is deployed with customer namespace
});

retail.store.countstocks1.Component.extend("customer.app.variant.f1512.Component", {
	metadata: {
		manifest: "json"
	}	
});
