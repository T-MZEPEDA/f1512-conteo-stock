sap.ui.define([
	"retail/store/countstocks1/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/m/BusyDialog",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ndc/BarcodeScannerButton",
	"sap/retail/store/lib/reuses1/util/BarcodeScanHandler",
	"retail/store/countstocks1/controller/customControls/ProductSelectDialog",
	"retail/store/countstocks1/utils/ZoneDialogHandler",
	"retail/store/countstocks1/model/Formatter",
	"retail/store/countstocks1/utils/Utilities",
	"retail/store/countstocks1/utils/NavigationHandler",
	"retail/store/countstocks1/utils/Constants",
	"retail/store/countstocks1/model/Context",
	"sap/ui/core/routing/History",
	"sap/base/util/deepEqual",
	"sap/base/Log"
], function (B, J, D, c, M, d, e, f, P, Z, F, U, N, C, g, H, h, L) {
	"use strict";
	var setNewCount = {
		GTIN: "",
		CountQty: 0
	};
	var scanGTIN = "";
	var oldValue = 0;
	var initialLoad = false;
	var zeroLoad = false;
	var gFilter = [];
	var superIndex = 0;
	return sap.ui.controller("customer.app.variant.f1512.controller.ActivityDetailsCustom", {
		//    _jSONModel: J,
		//    _device: D,
		//    _busyDialog: c,
		//    _messageBox: M,
		//    _messageBoxToast: d,
		//    _barcodeScannerButton: e,
		//    _barcodeScanHandler: f,
		//    _productSelectDialog: P,
		//    _deepEqual: h,
		//    _log: L,
		//    _zoneDialogHandler: null,
		//    _formatter: F,
		//    _utilities: U,
		//    _navigationHandler: null,
		//    _constants: C,
		//    _context: null,
		//    _history: H,
		//    _oSubmitConfirmationDialog: null,
		//    _oActionSheet: null,
		// onInit: function () {
		// 	this.resetCAHeaderModel();
		// 	this.resetCADetailsModel();
		// 	this.resetCADLineItems();
		// 	this._context = g;
		// 	this.resetCacheCADetail();
		// 	this._navigationHandler = N;
		// 	this._zoneDialogHandler = Z;
		// 	this._oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
		// 	this.getRouter().getRoute("activityDetailsView").attachPatternMatched(this.routeToDetailCallBackFunction, this);
		// 	this._isInputFocusInterrupt = false;
		// 	this._createActionSheet();
		// 	this._productSearchSelectDialog = null;
		// 	this._oBusyIndicator = new this._busyDialog();
		// 	this.CALineItemsListAttachDelete();
		// 	this.attachQtyInputFieldEvent();
		// 	this._utilities.getEventBus().subscribe("retail.store.countstocks1.CountingActivitiesListUpdated", "CountingActivitiesListHasUpdated", this._onCountingActivitiesListUpdated, this);		
		// },
		// _onCountingActivitiesListUpdated: function (s, E, o) {
		// 	if (o && !jQuery.isEmptyObject(o)) {
		// 		this.loadCAHeader(o.CANum, o.CAType, o.InStoreRecountKey, o.StorageLocationID);
		// 	}
		// },
		//    onExit: function () {
		//        this._utilities.getEventBus().unsubscribe("retail.store.countstocks1.CountingActivitiesListUpdated", "CountingActivitiesListHasUpdated", this._onCountingActivitiesListUpdated, this);
		//        if (this._productSearchSelectDialog !== null) {
		//            this._productSearchSelectDialog.destroy();
		//        }
		//        if (this._oSubmitConfirmationDialog !== null) {
		//            this._oSubmitConfirmationDialog.destroy();
		//        }
		//        if (this._zoneDialogHandler.getZoneDialog() !== null) {
		//            this._zoneDialogHandler.getZoneDialog().close();
		//            this._zoneDialogHandler.destroyZoneDialog();
		//        }
		//    },
		//    checkRequestFailedBecauseOffline: function (E) {
		//        var o = true;
		//        if (E && E.response && E.response.statusCode > 0 || E && E.statusCode > 0 || E && E[0]._sErrorCode !== "" || E === undefined) {
		//            o = false;
		//        }
		//        return o;
		//    },
		//    attachQtyInputFieldEvent: function () {
		//        var t = this;
		//        var i = this.getView().byId("QTY_INPUT");
		//        var a = function () {
		//            var I = this.getParent().getParent();
		//            var l;
		//            if (I) {
		//                l = t.byId("CA_LINE_ITEMS_TABLE");
		//                l.setSelectedItem(I);
		//                t._isInputFocusInterrupt = true;
		//            }
		//        };
		//        i.addEventDelegate({ onfocusin: a }, i);
		//    },
		//    onCameraBarcodeScan: function (E) {
		//        var t = E.getParameter("text");
		//        var b = E.getParameter("cancelled");
		//        if (t && !b) {
		//            this.getOwnerComponent().getComponentData().oMainController.oBarcodeScanHandler.handleBarcodeScan(t);
		//        }
		//    },
		//    onScan: function (G) {
		//        if (G && this.getView().getModel("CADetails") && !jQuery.isEmptyObject(this.getView().getModel("CADetails").getData())) {
		//            this._addProductToCountingActivityDetail(G);
		//        }
		//    },
		//    onScanButtonPressed: function () {
		//        var t = this;
		//        sap.ndc.BarcodeScanner.scan(jQuery.proxy(function (r) {
		//            if (r.text && !r.cancelled) {
		//                t.onScan(r.text);
		//            }
		//        }, this), null, null);
		//    },
		updateLineItemInCALineItemsModel: function (o) {
			var a = function () {
				var b = this.getView().getModel("CALineItems").getData();
				var E = null;
				var i = null;
				var j = b.some(function (s, m) {
					i = m;
					E = s;
					return s.CALineNum === o.CALineNum;
				});
				for (var k in o) {
					if (o.hasOwnProperty(k)) {
						E[k] = o[k];
					}
				}
				this.getView().getModel("CALineItems").updateBindings();
				this._setTotalItemsCountedForCountingActivityDetail();
				if (j) {
					if (!this._isInputFocusInterrupt) {
						var l = this.byId("CA_LINE_ITEMS_TABLE");
						if (l.getItems().length === 0) {
							this.byId("ComboFilter").revertSelection();
							l.getBinding("items").filter(null);
							this.byId("InventoryDetailsPage").scrollTo(0, 0);
							this.setCounters_v2(this);
						} else {
							var p = l.getItems()[i].sId;
							l.setSelectedItemById(p, true);
							this._scrollToSelectedItem();
						};
					} else {
						this._isInputFocusInterrupt = false;
					}
				}
			};
			this.formatPrecisionForCADLineItem(o, jQuery.proxy(a, this));
			// --------------------- VMTC: Ajuste para conteos al ingresar datos en el Input de Piezas / Cajas ----------------
			setNewCount = {
				GTIN: o.GTIN,
				CountQty: Number(o.CountQty)
			};
			// this.setCounters(); // --> VMTC: Se agrega para agregar el valor a los indicadores de conteo
			// ----------------------------------------------------------------
		},
		_openProductSearchSelectDialog: function () {
			var t = this;
			if (this._productSearchSelectDialog === null) {
				var p = {
					"title": t._utilities.getText("ADD_PRODUCT_TITLE"),
					"multiSelect": false,
					"contentWidth": "32%",
					"confirm": function (E) {
						t._onProductSelection(E);
					}
				};
				this._productSearchSelectDialog = new this._productSelectDialog(p);
				this._productSearchSelectDialog.setModel(this.getOwnerComponent().getModel("i18n"), "i18n");
			}
			var o = this.getView().getModel("CAHeader").getData();
			this._productSearchSelectDialog.setCountingActivityHeader(o);
			this._productSearchSelectDialog.open();
		},
		// _onProductSelection: function (E) {
		// 	initialLoad = true;
		// 	var s = E.getParameter("selectedItems");
		// 	if (s.length > 0) {
		// 		var a = s[0].getBindingContext();
		// 		var m = s[0].getModel();
		// 		var b = m.getProperty("", a, false);
		// 		var i = this._context.getMainGTINForProduct(b);
		// 	}
		// 	this._addProductToCountingActivityDetail(i);
		// },
		//    routeToDetailCallBackFunction: function (E) {
		//        var s = E.getParameter("arguments").CANum;
		//        var a = E.getParameter("arguments").CAType;
		//        var i = E.getParameter("arguments").InStoreRecountKey;
		//        var S = E.getParameter("arguments").StorageLocationID;
		//        this.resetCAHeaderModel();
		//        this.resetCADetailsModel();
		//        this.resetCADLineItems();
		//        this.hideAllButtons();
		//        this.getOwnerComponent().getComponentData().oMainController.oBarcodeScanHandler.registerScanHandling(jQuery.proxy(this.onScan, this));
		//        this.loadCAHeader(s, a, i, S);
		//    },
		// CALineItemsListAttachDelete: function () {
		// 	var t = this;
		// 	var v = this.getView();
		// 	var o = this.byId("CA_LINE_ITEMS_TABLE");
		// 	o.attachDelete(function (E) {
		// 		var a = E.getParameters().listItem.getBindingContext("CALineItems").getObject();
		// 		var s = t._utilities.getText("DELETE_ITEM_CONFIRM_QUESTION_PART1") + " " + a.ProductNumber + " - " + a.CountQty + " " + a.CountUoM + " " + t._utilities.getText("DELETE_ITEM_CONFIRM_QUESTION_PART2");
		// 		var S = function (i) {
		// 			t._messageBoxToast.show(t._utilities.getText("ITEM_DELETE_SUCCESS_MESSAGE"));
		// 			t.setCADLineItems(i);
		// 		};
		// 		var b = function () {
		// 			t._messageBoxToast.show(t._utilities.getText("ITEM_DELETE_FAILURE_MESSAGE"));
		// 			t._log.error(t._utilities.getText("ITEM_DELETE_FAILURE_MESSAGE"));
		// 		};
		// 		t._messageBox.show(s, t._messageBox.Icon.QUESTION, t._utilities.getText("DELETE_ITEM_CONFIRMATION_MESSAGEBOX_TITLE"), [
		// 			t._messageBox.Action.OK,
		// 			t._messageBox.Action.CANCEL
		// 		], jQuery.proxy(function (A) {
		// 			if (A) {
		// 				sap.ui.getCore().getEventBus().publish("nav", "back");
		// 			}
		// 			if (t._messageBox.Action.OK === A) {
		// 				var i = v.getModel("CADetails").oData;
		// 				t._context.deleteLineItemForCountingActivityDetail(a, i, S, b);
		// 			}
		// 		}, this));
		// 	});
		// },
		//    onProductTitlePress: function (E) {
		//        var s = E.getSource();
		//        var o = s.getParent().getParent();
		//        var a = this.getView().getModel("CALineItems");
		//        var O = o.getBindingContext("CALineItems").getPath();
		//        var b = a.getObject(O);
		//        var p = b.ProductNumber;
		//        this._navigationHandler.gotoProductDetailsPage(p);
		//    },
		_addProductToCountingActivityDetail: function (G) {
			var t = this;
			t._oBusyIndicator.open();
			var o = this.getView().getModel("CAHeader").getData();
			var a = this.getView().getModel("CADetails").getData();
			var b = this.getView().getModel("CALineItems").getData();
			var i = this.byId("CA_LINE_ITEMS_TABLE").getItems();
			var p;
			var l = function (k) {
				// VMTC: Código Custom -  Inicio  ------------------------------				
				if (initialLoad === true || zeroLoad === true) {
					k[0].CountQty = "0";
				};
				if (Number(oldValue) > 0) {
					k[0].CountQty = oldValue.toString();
				}
				// Fin ---------------------------------------------------------
				t._oBusyIndicator.close();
				t.setCADLineItems(k);
				if (t._isInputFieldExistInLineItem(i[0])) {
					var m = t._getCALineItemInputBox(i[0]);
					if (m.getValueState() === "Error") {
						m.setValueState("None");
						m.setShowValueStateMessage(false);
						m.setValueStateText("");
					}
				}
			};
			var j = function (k) {
				t._oBusyIndicator.close();
				// VMTC: Código Custom Inicio - Inicio
				if (initialLoad === true || zeroLoad === true) {
					k.CountQty = "0";
				};
				if (Number(oldValue) > 0) {
					k.CountQty = oldValue.toString();
				}
				t.updateLineItemInCALineItemsModel(k);
				if (Number(oldValue) > 1) {
					t.byId("CA_LINE_ITEMS_TABLE").getItems()[0].getCells()[1].getItems()[0].fireChange({ value: oldValue })
				} else {
					if (initialLoad === true) {
						t.byId("CA_LINE_ITEMS_TABLE").getItems().forEach(item => {
							item.getCells()[1].getItems()[0].fireChange({ value: "0" });
						})
						initialLoad = false;
					};
					if (zeroLoad === true) {
						zeroLoad = false;
						t.byId("CA_LINE_ITEMS_TABLE").getItems()[0].getCells()[1].getItems()[0].fireChange({ value: "0" });
					};
				};
				t.setCounters_v2(t);
				// Código Custom - Fin
			};
			var E = function (k) {
				if (t.checkRequestFailedBecauseOffline(k)) {
					t._utilities.showErrorMessageBox(t._utilities.getText("INFO_MSG_NO_CONNECTION"));
					t._oBusyIndicator.close();
					t._oCrossAppNavigator.toExternal({ target: { shellHash: "#" } });
				} else {
					var m = k && k.length > 0 ? k[0] : null;
					var s = m ? m.getMessage() : t._utilities.getText("SCANNED_PRODUCT_REJECTED");
					t._utilities.showErrorMessageBox(s);
					t._oBusyIndicator.close();
				}
			};
			if (G === "") {
				E();
			} else {
				if (i.length > 0) {
					if (o.CountByZone === "X") {
						if (t._isInputFieldExistInLineItem(i[0])) {
							if (b[0].GTIN.replace(/^0+/, "") === G.replace(/^0+/, "") && t._getCALineItemInputBox(i[0]).getValueState() === "Error") {
								t._oBusyIndicator.close();
								return;
							}
						}
					} else {
						var I = b.some(function (k, m) {
							p = m;
							return k.GTIN.replace(/^0+/, "") === G.replace(/^0+/, "");
						});
						if (t._isInputFieldExistInLineItem(i[p])) {
							if (I && t._getCALineItemInputBox(i[p]).getValueState() === "Error") {
								t._oBusyIndicator.close();
								return;
							}
						}
					}
				}
				this._context.addProductToCountingActivityDetail(G, a, l, j, E);
			}
		},
		//    loadCAHeader: function (s, a, i, S) {
		//        var t = this;
		//        this._oBusyIndicator.open();
		//        var b = function (o) {
		//            t._oBusyIndicator.close();
		//            t.setCAHeader(o);
		//            t.loadCADetails(o);
		//        };
		//        var E = function () {
		//            t._oBusyIndicator.close();
		//        };
		//        this._context.getCountingActivityHeader(s, a, i, S, false, jQuery.proxy(b, this), jQuery.proxy(E, this));
		//    },
		//    setCAHeader: function (o) {
		//        var v = this.getView();
		//        var a = v.getModel("CAHeader");
		//        a.setData(o);
		//    },
		//    resetCAHeaderModel: function () {
		//        var v = this.getView();
		//        v.setModel(new this._jSONModel(), "CAHeader");
		//    },
		//    _onZoneScan: function (z) {
		//        var o = this.getView().getModel("CAHeader").getData();
		//        this.createNewCADetailsForHeaderWithZoneNumber(o, z);
		//        this._zoneDialogHandler.getZoneDialog().close();
		//        this.showStartButton(false);
		//        this.setTableNoDataText(o.CountByZone, true);
		//    },
		openZoneDialog: function () {
			var t = this;
			// ------------------- VMTC: Código custom ---------------------------  Inicio
			var sServiceUrl = "/sap/opu/odata/sap/ZAPI_ZONAS_F1512";
			var oData = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, false);
			oData.read("/Zonas",
				{
					success: function (oSuccess) {
						t._zoneDialogHandler.ZONE_DIALOG_FRAGMENT_MODULE_NAME = "customer.app.variant.f1512.view.fragments.ZoneInputDialogCustom"; // VMTC: Código Custom -> para hacer que el Dialog ejecute el fragment Custom									
						var o = t.getView().getModel("CAHeader").getData();
						var a = function (p) {
							t.getOwnerComponent().getComponentData().oMainController.oBarcodeScanHandler.registerScanHandling(jQuery.proxy(t.onScan, t));
							t.createNewCADetailsForHeaderWithZoneNumber(o, p);
						};
						var z = t._zoneDialogHandler.getZoneDialog();
						if (!z) {
							var b = function () {
								t.getOwnerComponent().getComponentData().oMainController.oBarcodeScanHandler.registerScanHandling(jQuery.proxy(t.onScan, t));
								t.showStartButton(o.InStoreStatus !== "3" && o.InStoreStatus !== "2");
								t.setTableNoDataText(o.CountByZone, false, o.InStoreStatus === "3" || o.InStoreStatus === "2");
							};
							var i = function (I) {
								return I.trim().length <= 0 || I.trim().length > 40 || /[^\w\d\s-]/.test(I);
							};
							var _ = t._utilities.getText("ZONE_DIALOG_TITLE");
							var j = t._utilities.getText("DIALOG_OK_BUTTON");
							var k = t._utilities.getText("DIALOG_Cancel_BUTTON");
							var l = t._utilities.getText("SCAN_BUTTON_TOOLTIP");
							var m = t._utilities.getText("ZONE_DIALOG_INPUT_LABEL");
							t._zoneDialogHandler.setZoneDialog({
								Title: _,
								OKButtonName: j,
								CancelButtonName: k,
								ScanButtonName: l,
								InputLabel: m
							}, a, b, i, jQuery.proxy(t._onZoneScan, t));
							z = t._zoneDialogHandler.getZoneDialog();
							t.getView().addDependent(z);
						} else {
							t._zoneDialogHandler.clearZoneNumber();
							t._zoneDialogHandler.setSuccessCallback(a);
						}
						var n = z.getButtons();
						var s = t._device.system.phone === true || t._device.system.tablet === true;
						n.some(function (p) {
							if (p.sId === "SCAN_BUTTON") {
								p.setVisible(s);
							}
						});
						var O = function (p) {
							a(p);
							z.close();
						};
						t.getOwnerComponent().getComponentData().oMainController.oBarcodeScanHandler.registerScanHandling(O);
						// ------------------- VMTC: Código custom ---------------------------  Inicio
						t._zoneDialogHandler._oZoneDialog.getContent()[2].removeAllItems();
						t._zoneDialogHandler._oZoneDialog.getContent()[2].setValue("");
						oSuccess.results.forEach(zona => {
							t._zoneDialogHandler._oZoneDialog.getContent()[2].addItem(new
								sap.ui.core.Item({
									key: zona.consecutivo,
									text: zona.zona
								}));
						});
						t._zoneDialogHandler._oZoneDialog.getContent()[2].attachSelectionChange(function (oEvent) {
							t._zoneDialogHandler._oZoneDialog.getContent()[1].setValue(oEvent.getSource().getValue());
						}, t)
						// -------------------------------------------------------------------- Fin
						z.open();
					}
				});
		},
		//    loadCADetails: function (o) {
		//        var t = this;
		//        this._oBusyIndicator.open();
		//        var E = function (a) {
		//            if (t._deepEqual(t.getView().getModel("CAHeader").getData(), o)) {
		//                if (a && a.length > 0 && o.InStoreStatus !== "3" && o.InStoreStatus !== "2") {						
		//                    var b = a[0];
		//                    var s = b ? b.getMessage() : t._utilities.getText("CA_NOT_AVAILABLE");
		//                    t._utilities.showErrorMessageBox(s);
		//                    var i = t.byId("CA_LINE_ITEMS_TABLE");
		//                    i.setNoDataText(s);
		//                    t._log.error(s);
		//                } else {
		//                    t._updateButtons();
		//                }
		//            }
		//            t._oBusyIndicator.close();
		//        };
		//        var n = function () {
		//            if (t._deepEqual(t.getView().getModel("CAHeader").getData(), o)) {
		//                t.showStartButton(o.InStoreStatus !== "3" && o.InStoreStatus !== "2");
		//                t.setTableNoDataText(o.CountByZone, false, o.InStoreStatus === "3" || o.InStoreStatus === "2");
		//            }
		//            t._oBusyIndicator.close();
		//        };
		//        this._context.getCountingActivityDetailsForHeader(o, this.getSuccessCallbackForGettingCADetails(o), n, E);
		//    },
		//    getSuccessCallbackForGettingCADetails: function (o) {
		//        var t = this;
		//        return function (a) {
		//            if (t._deepEqual(t.getView().getModel("CAHeader").getData(), o)) {
		//                t.setCADetails(a);
		//                t.showStartButton(false);
		//                t.setTableNoDataText(o.CountByZone, true);
		//                t.loadCADLineItems(a);
		//                t._utilities.resetAllQtyInputFieldsStatus(t);
		//            }
		//            t._oBusyIndicator.close();
		//        };
		//    },
		// setCADetails: function (o) {
		// 	var v = this.getView();
		// 	var a = v.getModel("CADetails");
		// 	a.setData(o);
		// },
		resetCADetailsModel: function () {
			var v = this.getView();
			v.setModel(new this._jSONModel(), "CADetails");
			this.setCounters(); // --> VMTC: Se agrega para colocar el valor a los indicadores de conteo
		},
		createNewCADetailsForHeaderWithZoneNumber: function (o, z) {
			var t = this;
			var E = function (b) {
				t._updateButtons();
				if (t.checkRequestFailedBecauseOffline(b)) {
					t._uilities.showErrorMessageBox(t._utilities.getText("INFO_MSG_NO_CONNECTION"));
					t._oCrossAppNavigator.toExternal({ target: { shellHash: "#" } });
				}
				if (b && b.length > 0) {
					var i = b[0];
					var j = function () {
						if (i.getCode() === t._constants.ZONE_IN_USE_ERROR_CODE) {
							t._zoneDialogHandler.getZoneDialog().open();
						} else {
							t.showStartButton();
						}
					};
					t._utilities.showErrorMessageBox(i.getMessage(), j);
				} else {
					t._utilities.showErrorMessageBox(t._utilities.getText("ERROR_MESSAGE_SAME_ZONE_ON_CADETAILS"), j);
					t.showStartButton();
					t.setTableNoDataText(o.CountByZone, false);
				}
			};
			var a = function (b) {
				t.setCADetails(b);
				t.loadCADLineItems(b);
				t.addInitialData_V2();
			};
			this._context.createCountingActivityDetailForZone(o, z, a, E);
			// this.addInitialData(); // 13.05.2026 - Se comenta para ver lo del bug // --> VMTC: Se agrega para cargar datos iniciales a partir del OData CAProducts
		},
		//    createNewCADetailsByProductForHeader: function (o) {
		//        var t = this;
		//        var E = function (a) {
		//            if (t.checkRequestFailedBecauseOffline(a)) {
		//                t._utilities.showErrorMessageBox(t._utilities.getText("INFO_MSG_NO_CONNECTION"));
		//                t._oCrossAppNavigator.toExternal({ target: { shellHash: "#" } });
		//            }
		//            if (a && a.length > 0) {
		//                var b = a[0];
		//                t._utilities.showErrorMessageBox(b.getMessage());
		//            } else {
		//                t._utilities.showErrorMessageBox(t._utilities.getText("ERROR_MESSAGE_CA_STARTED"));
		//            }
		//            t.showStartButton();
		//        };
		//        var s = function (a) {
		//            t.setCADetails(a);				   
		//            t.loadCADLineItems(a);
		//        };
		//        this._context.createCountingActivityDetailAndLineItems(o, s, E);
		//    },
		// loadCADLineItems: function (o) {
		// 	var t = this;
		// 	this._oBusyIndicator.open();
		// 	var E = function () {
		// 		t._updateButtons();
		// 		t._oBusyIndicator.close();
		// 	};
		// 	var s = function (a) {
		// 		t._oBusyIndicator.close();
		// 		t.setCADLineItems(a);
		// 	};
		// 	this._context.getLineItemsForCountingActivityDetail(o, s, E);
		// },
		//    formatPrecisionForCADLineItem: function (o, a) {
		//        if (!o) {
		//            a();
		//        }
		//        var G = function (p) {
		//            if (o.CountQty !== "") {
		//                var j = parseFloat(o.CountQty);
		//                o.CountQty = j.toFixed(p);
		//            }
		//            a();
		//        };
		//        var b = function () {
		//            a();
		//        };
		//        var i = o.CountUoM;
		//        this._context.getPrecisionForUoM(i, G, b);
		//    },
		//    formatPrecisionForCADLineItems: function (a, b) {
		//        if (!a || a.length === 0) {
		//            b();
		//        }
		//        var i = 0;
		//        var j = function () {
		//            i++;
		//            if (i >= a.length) {
		//                b();
		//            }
		//        };
		//        var t = this;
		//        a.forEach(function (o, k) {
		//            t.formatPrecisionForCADLineItem(o, j);
		//            a[k] = o;
		//        });
		//    },
		//    setCADLineItems: function (a) {
		//        this._oBusyIndicator.open();
		//        var b = function () {
		//            var v = this.getView();
		//            var i = v.getModel("CALineItems");
		//            i.setData(a);
		//            this._setTotalItemsCountedForCountingActivityDetail();
		//            this._updateButtons();
		//            this._oBusyIndicator.close();
		//        };
		//        this.formatPrecisionForCADLineItems(a, jQuery.proxy(b, this));
		//    },
		//    resetCADLineItems: function () {
		//        var v = this.getView();
		//        v.setModel(new this._jSONModel(), "CALineItems");
		//    },
		//    resetCacheCADetail: function () {
		//        var a = this._context.getModel().getData().CountingActivities;
		//        for (var p in a) {
		//            delete a[p].CountingActivityDetails;
		//        }
		//    },
		_onQuantityChange: function (E) {
			var t = this;
			var o = E.getSource();
			var a = this.getView().getModel("CALineItems");
			var l = E.getSource().getParent().getParent();
			var s = l.getBindingContext("CALineItems").getPath();
			var b = a.getObject(s);
			//----------- Suma Custom ------------			
			if (E.getParameter("value") !== E.getSource()._lastValue) {
				var v_Aux = Number(E.getParameter("value"));
			} else {
				v_Aux = b.CountQty
			};
			if (E.getParameter("value") === "INI" || E.getParameter("value") === "0") {
				v_Aux = 0;
			};
			if (Number(oldValue) > 1) {
				v_Aux = oldValue;
				oldValue = 0;
			};
			// ----------------------------------- 
			//    var v = b.CountQty; //  --> Original			   
			var v = v_Aux.toString();
			var p = b.CountPrecision;
			b.bUpdateSuccess = false;
			b.bValidateSuccess = false;
			var u = function (k) {
				b.bUpdateSuccess = true;
				jQuery.proxy(t.updateLineItemInCALineItemsModel(k), t);
			};
			var i = function () {
				var k = t._utilities.getText("UPDATE_ERROR_MESSAGE_LOGGING") + ": " + b.GTIN;
				t._log.error(k);
			};
			var V = function (k) {
				o.setValueState("None");
				o.setShowValueStateMessage(false);
				o.setValueStateText("");
				b.bValidateSuccess = true;
				var q = parseFloat(k);
				t._context.updateCountQuantityForCountingActivityDetailLineItem(q, b, u, i);
			};
			var j = function () {
				o.setValueState("Error");
				o.setShowValueStateMessage(true);
				o.setValueStateText(t._utilities.getText("QTY_ERROR_MESSAGE"));
			};
			this._utilities.validateQuantityFieldValue(v, p, V, j);
		},
		//    onAddProductButtonPress: function () {
		//        this._openProductSearchSelectDialog();
		//    },
		//    _onActionSheetButtonPress: function (E) {
		//        this._oActionSheet.openBy(E.getSource());
		//    },
		//    _onPlusButtonPress: function () {
		//        var t = this;
		//        var o = this.byId("CA_LINE_ITEMS_TABLE");
		//        var a = o.getItems();
		//        var b = this.getView().getModel("CAHeader");
		//        var i = this.getView().getModel("CALineItems");
		//        var p;
		//        if (b && i && a && a.length > 0) {
		//            if (b.getData().CountByZone === "X") {
		//                p = a[0];
		//            } else {
		//                p = o.getSelectedItem();
		//                if (!p) {
		//                    this._messageBoxToast.show(this._utilities.getText("INFO_MSG_ITEM_SELECT"));
		//                    return;
		//                }
		//            }
		//            var s = p.getBindingContext("CALineItems").getPath();
		//            var j = s.split("/")[1];
		//            var k = i.getObject(s);
		//            var q = k.CountQty;
		//            var Q = k.CountPrecision;
		//            var u = function (m) {
		//                var n = i.getData();
		//                n[j] = m;
		//                i.updateBindings();
		//                t._setTotalItemsCountedForCountingActivityDetail();
		//            };
		//            var l = function (m) {
		//                if (t.checkRequestFailedBecauseOffline(m)) {
		//                    t._utilities.showErrorMessageBox(t._utilities.getText("INFO_MSG_NO_CONNECTION"));
		//                    t._oCrossAppNavigator.toExternal({ target: { shellHash: "#" } });
		//                }
		//            };
		//            var v = function (m) {
		//                var n = parseFloat(m);
		//                n++;
		//                var r = n.toFixed(Q);
		//                t._context.updateCountQuantityForCountingActivityDetailLineItem(r, k, u, l);
		//            };
		//            var V = function () {
		//            };
		//            if (q === "") {
		//                q = "0";
		//            }
		//            this._utilities.validateQuantityFieldValue(q, Q, v, V);
		//        }
		//    },
		//    _onMinusButtonPress: function () {
		//        var t = this;
		//        var o = this.byId("CA_LINE_ITEMS_TABLE");
		//        var a = o.getItems();
		//        var b = this.getView().getModel("CAHeader");
		//        var i = this.getView().getModel("CALineItems");
		//        var p;
		//        if (b && i && a && a.length > 0) {
		//            if (b.getData().CountByZone === "X") {
		//                p = a[0];
		//            } else {
		//                p = o.getSelectedItem();
		//                if (!p) {
		//                    this._messageBoxToast.show(this._utilities.getText("INFO_MSG_ITEM_SELECT"));
		//                    return;
		//                }
		//            }
		//            var s = p.getBindingContext("CALineItems").getPath();
		//            var j = s.split("/")[1];
		//            var k = i.getObject(s);
		//            var q = k.CountQty;
		//            var Q = k.CountPrecision;
		//            var u = function (m) {
		//                var n = i.getData();
		//                n[j] = m;
		//                i.updateBindings();
		//                t._setTotalItemsCountedForCountingActivityDetail();
		//            };
		//            var l = function (m) {
		//                if (t.checkRequestFailedBecauseOffline(m)) {
		//                    t._utilities.showErrorMessageBox(t._utilities.getText("INFO_MSG_NO_CONNECTION"));
		//                    t._oCrossAppNavigator.toExternal({ target: { shellHash: "#" } });
		//                }
		//            };
		//            var v = function (m) {
		//                var n = parseFloat(m);
		//                if (n >= 1) {
		//                    n--;
		//                    var r = n.toFixed(Q);
		//                    t._context.updateCountQuantityForCountingActivityDetailLineItem(r, k, u, l);
		//                }
		//            };
		//            var V = function () {
		//            };
		//            this._utilities.validateQuantityFieldValue(q, Q, v, V);
		//        }
		//    },
		//    _startCount: function () {
		//        var o = this.getView().getModel("CAHeader").getData();
		//        if (o.CountByZone === "X") {
		//            this.openZoneDialog();
		//        } else {
		//            this.createNewCADetailsByProductForHeader(o);
		//        }
		//        this.showStartButton(false);
		//        this.setTableNoDataText(o.CountByZone, true);
		//    },
		showStartButton: function (s) {
			if (s === undefined) {
				s = true;
			}
			var S = this.byId(sap.ui.core.Fragment.createId("ACTIVITY_DETAILS_FOOTER", "countStockButtonStartCount"));
			var p = this.byId(sap.ui.core.Fragment.createId("ACTIVITY_DETAILS_FOOTER", "countStockButtonPlus"));
			var m = this.byId(sap.ui.core.Fragment.createId("ACTIVITY_DETAILS_FOOTER", "countStockButtonMinus"));
			var a = this.byId(sap.ui.core.Fragment.createId("ACTIVITY_DETAILS_FOOTER", "countStockButtonAction"));
			var o = this.byId(sap.ui.core.Fragment.createId("ACTIVITY_DETAILS_FOOTER", "countStockButtonScan"));
			S.setVisible(s);
			p.setVisible(!s);
			m.setVisible(!s);
			a.setVisible(!s);
			var b = (this._device.system.phone === true || this._device.system.tablet === true) && !s;
			b = this.extHookShowScanButton ? this.extHookShowScanButton() && b : b;
			// o.setVisible(b); // VMTC: SE deshabilita el botón de escaneo estándar
			o.setVisible(false); // VMTC: Se agrega para esconder el botón de escaneo estándar
			this._updateButtons();
			// --------------------- Código Custom - VMTC: Se agrega para esconder botones antes del inicio del conteo - Inicio ------
			this.disableCustomObjects(this, s);
			// ----------------------------------- Fin
		},
		// hideAllButtons: function () {
		// 	var s = this.byId(sap.ui.core.Fragment.createId("ACTIVITY_DETAILS_FOOTER", "countStockButtonStartCount"));
		// 	var p = this.byId(sap.ui.core.Fragment.createId("ACTIVITY_DETAILS_FOOTER", "countStockButtonPlus"));
		// 	var m = this.byId(sap.ui.core.Fragment.createId("ACTIVITY_DETAILS_FOOTER", "countStockButtonMinus"));
		// 	var a = this.byId(sap.ui.core.Fragment.createId("ACTIVITY_DETAILS_FOOTER", "countStockButtonAction"));
		// 	var S = this.byId(sap.ui.core.Fragment.createId("ACTIVITY_DETAILS_FOOTER", "countStockButtonScan"));
		// 	s.setVisible(false);
		// 	p.setVisible(false);
		// 	m.setVisible(false);
		// 	a.setVisible(false);
		// 	S.setVisible(false);			
		// },
		//    _deleteCADetail: function () {
		//        this._oBusyIndicator.open();
		//        var t = this;
		//        var v = this.getView();
		//        var o = this.getView().getModel("CAHeader").getData();
		//        var s = this._utilities.getText("CANCEL_COUNT_CONFIRM_QUESTION_PART1");
		//        if (o.CountByZone === "X") {
		//            s = s + "\n\n" + this._utilities.getText("CANCEL_COUNT_CONFIRM_QUESTION_PART2");
		//        }
		//        var S = function () {
		//            t._messageBoxToast.show(t._utilities.getText("CANCEL_COUNT_SUCCESS_MESSAGE"));
		//            t.resetCADetailsModel();
		//            t.resetCADLineItems();
		//            t.showStartButton(o.InStoreStatus !== "3" && o.InStoreStatus !== "2");
		//            t.setTableNoDataText(o.CountByZone, false, o.InStoreStatus === "3" || o.InStoreStatus === "2");
		//            t._oBusyIndicator.close();
		//        };
		//        var E = function () {
		//            var a = t._utilities.getText("CANCEL_COUNT_FAILURE_MESSAGE");
		//            t._messageBoxToast.show(a);
		//            t._log.error(a);
		//            t._oBusyIndicator.close();
		//        };
		//        this._messageBox.show(s, t._messageBox.Icon.QUESTION, t._utilities.getText("CANCEL_COUNT_CONFIRMATION_MESSAGEBOX_TITLE"), [
		//            t._messageBox.Action.OK,
		//            t._messageBox.Action.CANCEL
		//        ], jQuery.proxy(function (a) {
		//            if (a) {
		//                sap.ui.getCore().getEventBus().publish("nav", "back");
		//            }
		//            if (t._messageBox.Action.CANCEL === a) {
		//                t._oBusyIndicator.close();
		//            }
		//            if (t._messageBox.Action.OK === a) {
		//                var b = v.getModel("CADetails").oData;
		//                t._context.deleteCountingActivityDetail(b, S, E);
		//            }
		//        }, this));
		//    },
		_submitCADetail: function () {
			// --------------------- Código Custom - VMTC: Validación de artículos no contados - Inicio ------
			var t = this;
			var lvNotCounted = Number(t.getView().byId("ITEMS_NOT_COUNTED_LB").getText().replace(/\D/g, ''));
			if (lvNotCounted > 0) {
				this._messageBox.warning(`¿Seguro que desea envíar éste recuento? \n\n No se puede modificar el recuento después de ser confirmado`, {
					title: "Existen posiciones sin contar",
					actions: [t._messageBox.Action.OK, t._messageBox.Action.CANCEL],
					onClose: function (sAction) {
						if (sAction === "OK") {
							t._submitCADetailCustom();
						}
					},
					dependentOn: null
				});
			} else {
				t._submitCADetailCustom();
			};
			// ----------------------------------- Fin
		},
		_setTotalItemsCountedForCountingActivityDetail: function () {
			var v = this.getView();
			var o = v.getModel("CADetails");
			var a = o.oData;
			var b = function (t) {
				a.TotalCountedItems = t;
				o.updateBindings();
			};
			this._context.getTotalItemsCountedForCountingActivityDetail(a, b);
			this.setCounters_v2(this); // --> VMTC: Se agrega para colocar el valor a los indicadores de conteo
		},
		//    _createActionSheet: function () {
		//        this._oActionSheet = new sap.m.ActionSheet("ASSOCIATE_VIEW_AS", { placement: "Top" });
		//        var a = new sap.m.Button("ADD_PRODUCT_BUTTON", {
		//            text: this._utilities.getText("ADD_PRODUCT_BUTTON"),
		//            press: jQuery.proxy(this.onAddProductButtonPress, this)
		//        });
		//        this._oActionSheet.addButton(a);
		//        var s = new sap.m.Button("SUBMIT_COUNT_BUTTON", {
		//            text: this._utilities.getText("SUBMIT_COUNT_BUTTON"),
		//            press: jQuery.proxy(this._submitCADetail, this)
		//        });
		//        this._oActionSheet.addButton(s);
		//        var o = new sap.m.Button("CANCEL_COUNT_BUTTON", {
		//            text: this._utilities.getText("CANCEL_COUNT_BUTTON"),
		//            press: jQuery.proxy(this._deleteCADetail, this)
		//        });
		//        this._oActionSheet.addButton(o);
		//        this.getView().addDependent(this._oActionSheet);
		//    },
		_updateButtons: function () {
			var v = this.getView();
			var o = v.getModel("CAHeader");
			var a = v.getModel("CADetails");
			var b = v.getModel("CALineItems");
			var i = this._oActionSheet.getAggregation("buttons");
			var s = null;
			var A = null;
			var p = this.byId(sap.ui.core.Fragment.createId("ACTIVITY_DETAILS_FOOTER", "countStockButtonPlus"));
			var m = this.byId(sap.ui.core.Fragment.createId("ACTIVITY_DETAILS_FOOTER", "countStockButtonMinus"));
			var j = this.byId(sap.ui.core.Fragment.createId("ACTIVITY_DETAILS_FOOTER", "countStockButtonAction"));
			var S = this.byId(sap.ui.core.Fragment.createId("ACTIVITY_DETAILS_FOOTER", "countStockButtonScan"));
			var k = o.getData().CANum !== undefined && a.getData().CANum !== undefined && b.getData().length !== undefined && !(o.getData().InStoreStatus === "3");
			if (S) {
				var l = (this._device.system.phone === true || this._device.system.tablet === true) && o.getData().InStoreStatus === this._constants.COUNTING_ACTIVITY_IN_STORE_STATUS_OPEN && a.getData().CANum !== undefined;
				//    S.setVisible(l); // VMTC: Se deshabilita el botón de escaneo estándar
				S.setVisible(false); // VMTC: Se agrega para esconder el botón de escaneo estándar
			}
			if (m) {
				m.setEnabled(k && b.getData().length !== 0);
			}
			if (p) {
				p.setEnabled(k && b.getData().length !== 0);
			}
			if (j) {
				j.setEnabled(k);
			}
			if (i) {
				var n = i.some(function (r) {
					s = r;
					return r.sId === "SUBMIT_COUNT_BUTTON";
				});
				if (n) {
					s.setEnabled(k && b.getData().length !== 0);
				}
				var q = i.some(function (r) {
					A = r;
					return r.sId === "ADD_PRODUCT_BUTTON";
				});
				if (q) {
					A.setEnabled(k && o.getData().CountByZone === "X");
				}
			}
			this.setTableNoDataText(o.getData().CountByZone, a.getData().CANum !== undefined, o.getData().InStoreStatus === "3" || o.getData().InStoreStatus === "2");
		},
		//    _scrollToSelectedItem: function () {
		//        var s = null;
		//        var S = this.byId("CA_LINE_ITEMS_TABLE").getSelectedItem();
		//        if (S) {
		//            s = S.getDomRef();
		//            if (s) {
		//                var o = s.getBoundingClientRect();
		//                var p = o.top;
		//                this.byId("InventoryDetailsPage").scrollTo(p, 0);
		//            }
		//        }
		//    },
		//    _isValidQuantities: function () {
		//        var o = this.byId("CA_LINE_ITEMS_TABLE");
		//        var a = o.getItems();
		//        var q = true;
		//        if (a.length > 0) {
		//            if (this.getView().getModel("CAHeader").getData().CountByZone === "X") {
		//                var b = this._getCALineItemInputBox(a[0]);
		//                q = b.getValueState() !== "Error" && b.getValue() !== "";
		//            } else {
		//                q = !a.some(function (i) {
		//                    var Q = this._getCALineItemInputBox(i);
		//                    return Q.getValueState() === "Error" || Q.getValue() === "";
		//                }.bind(this));
		//            }
		//        } else {
		//            return false;
		//        }
		//        if (!q) {
		//            jQuery.each(a, function (i, j) {
		//                var Q = this._getCALineItemInputBox(j);
		//                if (Q.getValue() === "") {
		//                    Q.setValueState("Error");
		//                    Q.setShowValueStateMessage(true);
		//                    Q.setValueStateText(U.getText("QTY_ERROR_MESSAGE"));
		//                }
		//            }.bind(this));
		//        }
		//        return q;
		//    },
		// _getCALineItemInputBox: function (o) {
		// 	   return o.getCells()[1].getItems()[0]; // --> Original
		// },
		//    _isInputFieldExistInLineItem: function (o) {
		//        if (o === undefined) {
		//            return false;
		//        } else {
		//            if (o.getCells().length > 1) {
		//                if (o.getCells()[1].getItems().length > 0) {
		//                    return true;
		//                }
		//            }
		//        }
		//        return false;
		//    },
		//    setTableNoDataText: function (s, b, a) {
		//        var o = this.byId("CA_LINE_ITEMS_TABLE");
		//        if (a) {
		//            o.setNoDataText(this._utilities.getText("CA_NOT_AVAILABLE"));
		//            return;
		//        }
		//        if (b) {
		//            if (s === "X") {
		//                o.setNoDataText(this._utilities.getText("ADD_PRODUCT_MESSAGE"));
		//            } else {
		//                o.setNoDataText(this._utilities.getText("NO_PRODUCT_TO_COUNT_MESSAGE"));
		//            }
		//        } else {
		//            if (s === "X") {
		//                o.setNoDataText(this._utilities.getText("START_COUNT_MESSAGE"));
		//            } else {
		//                o.setNoDataText(this._utilities.getText("START_COUNT_MESSAGE"));
		//            }
		//        }
		//    }
		// -------------------------------- Inicio de funciones Custom ---------------------------------
		addInitialData: function (iSkip, iTop) {
			//    ------------- VMTC -> Código Custom--------------------------
			var oDataProducts = this.oDataObject();
			var skipAccum = iSkip;
			var o = this.getView().getModel("CAHeader").getData();
			var oThis = this;
			debugger;
			oDataProducts.read("/CAProducts",
				{
					urlParameters: {
						"$select": "CANum,CAType,InStoreRecountKey,StorageLocationID,ProductNumber,ReferencedPIDocs,ProductNumber,ProductDesc,ConversionRules,BusinessStatus,SubmitStatus,DummyProductIncl,ZoneNumber,UserID,ThumbnailURL",
						"$orderby": "ProductNumber asc",
						"$skip": iSkip,
						"$top": iTop
					},
					filters: this.getFiltersCAProducts(o),
					success: function (oSuccess) {
						debugger;
						var itemsArray = [];
						var resultsLength = oSuccess.results.length;
						oSuccess.results.forEach((producto, index) => {
							var caDetails = oThis.getView().getModel("CADetails").oData;
							if (Object.keys(caDetails).length > 0) {
								var i = oThis._context.getMainGTINForProduct(producto)
								initialLoad = true;
								oThis._addProductToCountingActivityDetail(i); // ----> VMTC: Añadir para agregar los productos desde el inicio
								if (oThis.getView().getModel("CALineItems").oData.length < index + 1) {
									{
										itemsArray = oThis.getView().getModel("CALineItems").oData;
										itemsArray.push({
											Action: "C",
											CALineNum: index + 1,
											CANum: caDetails.CANum,
											CAType: "3",
											CountPrecision: 0,
											CountQty: "0",
											CountUoM: "PZA",
											CreationDatetime: caDetails.CreationDatetime,
											Dirty: "",
											GTIN: i,
											InStoreRecountKey: caDetails.InStoreRecountKey,
											NotCounted: "",
											ProductDesc: producto.ProductDesc,
											ProductNumber: producto.ProductNumber,
											SendingStatus: "Pending",
											StorageLocationID: caDetails.StorageLocationID,
											ZoneNumber: caDetails.ZoneNumber
										});
									};
								};
								if (index === resultsLength - 1 && itemsArray.length > 0 && resultsLength > 0) {
									oThis.getView().getModel("CALineItems").setData(itemsArray);
									itemsArray = [];
								}
							}
							if (resultsLength > 0) {
								itemsArray = [];
								// skipAccum = skipAccum + iTop;
								// oThis.addInitialData(skipAccum, iTop);
							}
						});
					},
					error: function (oError) {
						debugger;
					}
				}

			);
			// ----------------------------------------------------------------
		},
		// ---------------------------- TEST de paginación ----------------------------
		addInitialData_V2: function () {
			var oThis = this;
			var sServiceUrl = "/sap/opu/odata/sap/ZGW_F1512_EXTENDED_SRV";
			var oDataObject = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, false);
			var mParameters = {
				groupId: "paginationGroup",
				success: function (oSuccess) {
					debugger;
					var v = oThis.getView();
					oSuccess.to_Items.results.forEach(function (item) {
						item.__metadata.id = item.__metadata.id.replace("/ZGW_F1512_EXTENDED_SRV/DetItemsSet", "/RETAILSTORE_COUNT_STOCK_SRV/CADetailLineItems");
						item.__metadata.type = "RETAILSTORE_COUNT_STOCK_SRV.CADetail";
						item.__metadata.uri = item.__metadata.uri.replace("/ZGW_F1512_EXTENDED_SRV/DetItemsSet", "/RETAILSTORE_COUNT_STOCK_SRV/CADetailLineItems");
					});
					v.getModel("CADetails").oData.CADetailLineItems.results = oSuccess.to_Items.results;
					var nModel = v.getModel("CADetails").oData;
					var sKey = oThis._context._getCountingActivityHeaderKey(nModel);
					var objCountingActivities = oThis._context.getModel().oData.CountingActivities[sKey];
					objCountingActivities.CountingActivityDetails.CADetailLineItems.results = oSuccess.to_Items.results;
					oThis.setCADetails(nModel);
					oThis.loadCADLineItems(nModel);
					oThis._oBusyIndicator.close();

				},
				error: function (oError) {
					debugger;
					oThis._oBusyIndicator.close();
				}
			};
			var caDetails = this.getView().getModel("CADetails").oData;
			var initialDataModel = {
				"dummy": "X",
				"to_Items": [{
					"CANum": caDetails.CANum,
					"CAType": caDetails.CAType,
					"InStoreRecountKey": caDetails.InStoreRecountKey,
					"StorageLocationID": caDetails.StorageLocationID,
					"ZoneNumber": caDetails.ZoneNumber,
					"CALineNum": caDetails.CALineNum,
					"SiteID": caDetails.SiteID,
					"CreateDateTime": caDetails.CreationDatetime,
					"ProductDesc": caDetails.ReferencedPIDocs,
				}]
			}
			oDataObject.create("/InitialDataSet", initialDataModel, mParameters);

			oDataObject.submitChanges({
				groupId: "paginationGroup",
				success: function (oData) {
					var o = oThis.byId("CA_LINE_ITEMS_TABLE");
					o.setNoDataText("Agregando productos, por favor espere...");
					oThis._oBusyIndicator.open();
				},
				error: function (oError) {
					debugger;
				}
			});
		},
		// ----------------------------------------------------------------------------
		setCounters_v2: function (t) {
			var data = t.getView().getModel("CALineItems").oData;
			var lvContados = 0;
			var lvNoContados = 0;
			if (Object.keys(data).length > 0) {
				if (data.length > 0) {
					data.forEach(item => {
						if (Number(item.CountQty) > 0) {
							lvContados++;
						} else {
							lvNoContados++;
						}
					});
				}
			}
			this.getView().byId("ITEMS_COUNTED_GENERAL").setText(`Contados (${lvContados})`);
			this.getView().byId("ITEMS_NOT_COUNTED_LB").setText(`No contados (${lvNoContados})`);
		},
		setCounters: function () {
			var o = this.getView().getModel("CADetails");
			var data = o.oData;
			var lvContados = 0;
			var lvNoContados = 0;
			if (Object.keys(data).length > 0) {
				if (data.CADetailLineItems.results.length > 0) {
					data.CADetailLineItems.results.forEach(item => {
						if (Number(item.CountQty) > 0 || (item.GTIN === setNewCount.GTIN && setNewCount.CountQty > 0)) {
							lvContados++;
						} else {
							lvNoContados++;
						}
					});
				}
			}
			this.getView().byId("ITEMS_COUNTED_GENERAL").setText(`Contados (${lvContados})`);
			this.getView().byId("ITEMS_NOT_COUNTED_LB").setText(`No contados (${lvNoContados})`);
		},
		oDataObject: function () {
			var sServiceUrl = "/sap/opu/odata/sap/RETAILSTORE_COUNT_STOCK_SRV";
			return new sap.ui.model.odata.v2.ODataModel(sServiceUrl, false);
		},
		getFiltersCAProducts: function (data) {
			var filters = ["CANum", "CAType", "StorageLocationID", "ReferencedPIDocs"];
			var oFilters = [];
			filters.forEach(param => {
				var value = data[param];
				if (param === "ReferencedPIDocs") {
					value = this.getView().getModel("CAHeader").getData().ReferencedPIDocs;
				}
				oFilters.push(new sap.ui.model.Filter(
					param,
					sap.ui.model.FilterOperator.EQ,
					value
				))
			});
			return oFilters;
		},
		getConversionCajas: function (E, data, valPza, qtyCaja, objQTY) {
			var oData = this.oDataObject();
			var oThis = this;
			oData.read("/CAProducts",
				{
					async: false,
					urlParameters: {
						"$select": "ProductNumber,ConversionRules"
					},
					filters: this.getFiltersCAProducts(data),
					success: function (oSuccess) {
						oSuccess.results.forEach((producto) => {
							if (data.ProductNumber === producto.ProductNumber) {
								var valCaja = 0;
								producto.ConversionRules.split("|").forEach((rule => {
									if (rule.includes("CV") || rule.includes("CJ")) {
										valCaja = rule.split("-")[1];
									}
								}))
								valCaja = Number(qtyCaja) * Number(valCaja);
								var SumaTotal = Number(data.CountQty) + Number(valCaja) + Number(valPza);
								objQTY.fireChange({ value: `${SumaTotal}` });
							}
						})
						E.getSource().setValue("");
					},
					error: function (oError) {
						reject(oError);
					}
				});
		},
		getConversionEANCajas: function (t, GTIN, rowValue, aData) {
			var data = t.getView().getModel("CAHeader").getData();
			var oData = t.oDataObject();
			oData.read("/CAProducts",
				{
					async: false,
					urlParameters: {
						"$select": "ProductNumber,ConversionRules"
					},
					filters: this.getFiltersCAProducts(data),
					success: function (oSuccess) {
						var existsGTIN = false;
						oSuccess.results.forEach((producto) => {
							var valGTIN = "";
							var addItem = false;
							producto.ConversionRules.split("|").forEach((rule => {
								if (rule.includes("PZA")) {
									valGTIN = rule.split("-")[0];
								};
								if (rule.split("-")[0] === GTIN) {
									addItem = true;
									existsGTIN = true;
								}
							}));
							if (addItem === true) {
								addItem = false;
								if (!rowValue) {
									existsGTIN = true;
									rowValue = aData.find(row => row.ProductNumber === producto.ProductNumber);
									t.addExistsProduct(t, rowValue, valGTIN);
								} else {
									existsGTIN = true;
									t._addProductToCountingActivityDetail(valGTIN);
								}
							}
						}
						);
						if (existsGTIN === false && GTIN) {
							t._addProductToCountingActivityDetail(GTIN);
						}
					},

					error: function (oError) {
						reject(oError);
					}
				});
		},
		_onQuantityChangeCajas: function (E, value) {
			var t = this;
			//    var o = E.getSource(); --> Original, se sustituye con la línea de abajo
			var o = this.getView().byId("QTY_INPUT");
			var a = this.getView().getModel("CALineItems");
			var l = E.getSource().getParent().getParent();
			var s = l.getBindingContext("CALineItems").getPath();
			var b = a.getObject(s);
			//----------- Suma Custom ------------
			var v_Aux = value;
			// ----------------------------------- 
			//    var v = b.CountQty; --> Original
			var v = v_Aux.toString();
			var p = b.CountPrecision;
			b.bUpdateSuccess = false;
			b.bValidateSuccess = false;
			var u = function (k) {
				b.bUpdateSuccess = true;
				jQuery.proxy(t.updateLineItemInCALineItemsModel(k), t);
			};
			var i = function () {
				var k = t._utilities.getText("UPDATE_ERROR_MESSAGE_LOGGING") + ": " + b.GTIN;
				t._log.error(k);
			};
			var V = function (k) {
				o.setValueState("None");
				o.setShowValueStateMessage(false);
				o.setValueStateText("");
				b.bValidateSuccess = true;
				var q = parseFloat(k);
				t._context.updateCountQuantityForCountingActivityDetailLineItem(q, b, u, i);
			};
			var j = function () {
				o.setValueState("Error");
				o.setShowValueStateMessage(true);
				o.setValueStateText(t._utilities.getText("QTY_ERROR_MESSAGE"));
			};
			this._utilities.validateQuantityFieldValue(v, p, V, j);
			// this.setCounters(); // --> VMTC: Se agrega para agregar el valor a los indicadores de conteo
		},
		_onComboBoxChange: function (oEvent) {
			var sQuery = this.byId("CA_LINE_ITEMS_TABLE");
		},
		_onComboBoxSelectionChange: function (oEvent) {
			var oFilter = [];
			var oTable = this.byId("CA_LINE_ITEMS_TABLE");
			switch (oEvent.getSource().getSelectedKey()) {
				case '1': // Todos los registros
					oFilter = null;
					break;
				case '2': // Contados
					oFilter.push(new sap.ui.model.Filter("CountQty", sap.ui.model.FilterOperator.GT, 0));
					break;
				case '3': // No contados
					oFilter.push(new sap.ui.model.Filter("CountQty", sap.ui.model.FilterOperator.EQ, 0));
					break;
				default:
					break;
			}
			oTable.getBinding("items").filter(oFilter);
		},
		onScanSuccess: function (oEvent) {
			debugger;
			oldValue = 0;
			scanGTIN = oEvent.getParameter("text");
			if (scanGTIN) {
				var oTable = this.getView().byId("CA_LINE_ITEMS_TABLE");
				var aData = oTable.getBinding("items").oList;
				var rowValue = aData.find(row => row.GTIN === scanGTIN)
				if (aData.findIndex(row => row.GTIN === scanGTIN) > 0) {
					this.addExistsProduct(this, rowValue, scanGTIN);
				} else {
					// En caso de que no exista el EAN en la lista de productos se valida que no sea un EAN 
					// de Caja. Si es diferente de caja se hace una conversión de EAN de caja a EAN de Pieza
					zeroLoad = true;
					this.getConversionEANCajas(this, scanGTIN, rowValue, aData);
				}
				this.byId("InventoryDetailsPage").scrollTo(0, 0);
			}
		},
		onScanError: function (oEvent) {
			// debugger;
		},
		addExistsProduct: function (t, rowValue, scanGTIN) {
			t._addProductToCountingActivityDetail(scanGTIN);
			oldValue = rowValue.CountQty;
			if (Number(oldValue) > 0) {
				zeroLoad = false;
			} else {
				zeroLoad = true;
			}
			t.deleteLineItemForCountingActivityDetailCustom(t, rowValue);
		},
		deleteLineItemForCountingActivityDetailCustom: function (t, a) {

			var S = function (i) {
				t.setCADLineItems(i);
			};
			var b = function () {
				t._log.error(t._utilities.getText("ITEM_DELETE_FAILURE_MESSAGE"));
			};

			var i = t.getView().getModel("CADetails").oData;
			t._context.deleteLineItemForCountingActivityDetail(a, i, S, b);
		},
		disableCustomObjects: function (t, s) {
			var f = false;
			var o = t.getView().getModel("CAHeader").getData();
			var sB = t.byId("sampleBarcodeScannerButton");
			var cF = t.byId("ComboFilter");
			var cI = t.byId("ITEMS_COUNTED_GENERAL");
			var nCI = t.byId("ITEMS_NOT_COUNTED_LB");
			var iB = t.byId("inputBoxes");
			if (o.CAType === "1" || o.CACountStatus === "X") {
				sB.setVisible(f);
				cF.setVisible(f);
				cI.setVisible(f);
				nCI.setVisible(f);
				iB.setVisible(f);
			} else {
				sB.setVisible(!s);
				cF.setVisible(!s);
				cI.setVisible(!s);
				nCI.setVisible(!s);
				iB.setVisible(!s);
			}
			t.byId("ComboFilter").setValue("");
			// this.byId("ComboFilter").revertSelection();
		},
		_submitCADetailCustom: function () {
			// -------------------------------------------------------------
			// Este es el bloque de código original, se movío a ésta función para agregar la validación de artículos no contados
			// Éste bloque de código estaba en la función _submitCADetail
			var i = this._isValidQuantities();
			if (!i) {
				var m = U.getText("VALIDATION_ERROR_MESSAGE");
				sap.m.MessageBox.error(m);
			} else {
				var t = this;
				var v = this.getView();
				var s = this._utilities.getText("SUBMIT_COUNT_CONFIRM_QUESTION_PART1") + "\n\n" + this._utilities.getText("SUBMIT_COUNT_CONFIRM_QUESTION_PART2");
				var S = function () {
					t._oBusyIndicator.close();
					t._messageBoxToast.show(t._utilities.getText("SUBMIT_COUNT_SUCCESS_MESSAGE"));
					var o = t.getView().getModel("CAHeader").getData();
					t.resetCADetailsModel();
					t.resetCADLineItems();
					t.loadCAHeader(o.CANum, o.CAType, o.InStoreRecountKey, o.StorageLocationID);
					var a = o.CountByZone;
					if (a !== "X") {
						// if (this._device.system.phone) { // Original --> Se comenta para habilitra navegación a la página de resumen en dispositivos móviles en Hand Held
						if (this._device.system.phone || t._device.system.tablet === true) {
							t._navigationHandler.gotoMasterPage();
						}
					}
					t._utilities.getEventBus().publish("retail.store.countstocks1.ReloadMasterList", "CountingActivityHeaderReloadMasterList");
				};
				var E = function (a) {
					var o = a && a.length > 0 ? a[0] : null;
					var b = t._utilities.getText("SUBMIT_COUNT_FAILURE_MESSAGE");
					var T = o ? o.getMessage() : b;
					t._log.error(T);
					t._oBusyIndicator.close();
					t._utilities.showErrorMessageBox(b);
				};
				this._messageBox.show(s, this._messageBox.Icon.QUESTION, this._utilities.getText("SUBMIT_COUNT_CONFIRMATION_MESSAGEBOX_TITLE"), [
					this._messageBox.Action.OK,
					this._messageBox.Action.CANCEL
				], jQuery.proxy(function (A) {
					if (A) {
						sap.ui.getCore().getEventBus().publish("nav", "back");
					}
					if (t._messageBox.Action.OK === A) {
						var o = v.getModel("CADetails").oData;
						var O = function (j, k) {
							var l = [];
							var u = j.filter(function (a) {
								var b = l.indexOf(a.ProductNumber) === -1;
								if (b) {
									l.push(a.ProductNumber);
								}
								return b;
							});
							u.sort(function (a, b) {
								if (a.ProductNumber < b.ProductNumber) {
									return -1;
								}
								if (a.ProductNumber > b.ProductNumber) {
									return 1;
								}
								return 0;
							});
							if (!t._oSubmitConfirmationDialog) {
								t._oSubmitConfirmationDialog = sap.ui.xmlfragment("ProductSubmitConfirmationDialog", "retail.store.countstocks1.view.fragments.ProductSubmitConfirmationDialog", t);
								t.getView().addDependent(t._oSubmitConfirmationDialog);
								t._oSubmitConfirmationDialog.addButton(new sap.m.Button({
									text: "{i18n>CA_LINE_ITEM_ERROR_CONFIRM_SUBMIT}",
									press: function () {
										k();
										t._oSubmitConfirmationDialog.close();
									}.bind(this)
								}));
								t._oSubmitConfirmationDialog.addButton(new sap.m.Button({
									text: "{i18n>DIALOG_Cancel_BUTTON}",
									press: function () {
										t._oBusyIndicator.close();
										t._oSubmitConfirmationDialog.close();
									}.bind(this)
								}));
								t._oSubmitConfirmationDialog.setModel(t.getOwnerComponent().getModel("i18n"), "i18n");
								t._oSubmitConfirmationDialog.setModel(new J());
							}
							t._oSubmitConfirmationDialog.getModel().setData(u);
							t._oSubmitConfirmationDialog.open();
						};
						t._oBusyIndicator.open();
						t._context.submitCountingActivityDetail(o, S, E, O);
					}
				}, this));
			}
			// -------------------------------------------------------------
		},
		_onQuantitySubmit: function (E) {
			// Se agrega este bloque de código para la funcionalidad de agregar Piezas y cajas al mismo tiempo
			var a = this.getView().getModel("CALineItems");
			var l = E.getSource().getParent().getParent();
			var s = l.getBindingContext("CALineItems").getPath();
			var data = a.getObject(s);

			let lvPza = "";
			let lvCaja = "";
			let lvActual = "";
			let objPza = E.getSource().getParent().getParent().getItems()[0].getItems()[0];
			let objCaja = E.getSource().getParent().getParent().getItems()[1].getItems()[0];
			let objQTY = E.getSource().getParent().getParent().getParent().getItems()[0];
			if (E.getSource().sId.includes("PZA_INPUT")) {
				lvPza = E.getSource()._lastValue;
				lvCaja = objCaja.getValue();
			}
			if (E.getSource().sId.includes("CAJA_INPUT")) {
				lvPza = objPza.getValue();
				lvCaja = E.getSource()._lastValue;
			}
			objCaja.setValue("");
			objPza.setValue("");
			lvActual = Number(data.CountQty);

			if (lvCaja === "") {
				var SumaTotal = Number(lvPza) + Number(lvActual);
				objQTY.fireChange({ value: `${SumaTotal}` });
			} else {
				this.getConversionCajas(E, data, lvPza, lvCaja, objQTY);
			}
			this.getView().byId("sampleBarcodeScannerButton")._onBtnPressed();
		},
		// ---------------------------------------------------------------------------------------------
	});
});
