/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	sap.ui.require([
		"demo/ui5/ui5/test/integration/PhoneJourneys"
	], function() {
		QUnit.start();
	});
});