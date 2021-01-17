sap.ui.define(["sap/m/Text","demo/ui5/ui5/model/formatter"],function(t,n){"use strict";QUnit.module("formatter - Currency value");function u(t,u,i){var e=n.currencyValue(u);t.strictEqual(e,i,"The rounding was correct")}QUnit.test("Should round down a 3 digit number",function(t){u.call(this,t,"3.123","3.12")});QUnit.test("Should round up a 3 digit number",function(t){u.call(this,t,"3.128","3.13")});QUnit.test("Should round a negative number",function(t){u.call(this,t,"-3","-3.00")});QUnit.test("Should round an empty string",function(t){u.call(this,t,"","")});QUnit.test("Should round a zero",function(t){u.call(this,t,"0","0.00")})});