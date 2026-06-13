sap.ui.define([
	"retail/store/countstocks1/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Sorter",
	"sap/m/Button",
	"sap/m/MessageBox",
	"retail/store/countstocks1/utils/NavigationHandler",
	"retail/store/countstocks1/utils/Utilities",
	"retail/store/countstocks1/utils/Constants",
	"retail/store/countstocks1/model/Formatter",
	"retail/store/countstocks1/model/Context",
	"sap/base/Log",
	"sap/retail/store/lib/reuses1/customControls/AssignStoreMessageDialog"
], function (B, J, S, a, M, N, U, C, F, b, L, A) {
	"use strict";
	return sap.ui.controller("customer.app.variant.f1512.controller.CountingActivitiesCustom", {
		//    _jSONModel: J,
		//    _sorter: S,
		//    _button: a,
		//    _messageBox: M,
		//    _navigationHandler: N,
		//    _utilities: U,
		//    _constants: C,
		//    _formatter: F,
		//    _context: b,
		//    _log: L,
		//    onInit: function () {
		//        this._fnProcessAfterListUpdate = null;
		//        this.setupListBinding();
		//        this.getRouter().getRoute("master").attachPatternMatched(this._onMasterMatched, this);
		//        this.setupController();
		//        var l = this.getList();
		//        this._emptyList = new sap.m.List();
		//        this.getView().getContent()[0].addContent(this._emptyList);
		//        this._showMasterList();
		//        this._navigationHandler.showBusyDialog();
		//        this._context.resetCurrentSite();
		//        this.oAssignStoreDialog = new A();
		//        this._context.getCurrentSite(function () {
		//            this._navigationHandler.hideBusyDialog();
		//            this.loadMasterListData(true);
		//        }.bind(this), function () {
		//            this._navigationHandler.hideBusyDialog();
		//            this.oAssignStoreDialog.open();
		//        }.bind(this));
		//        this._utilities.getEventBus().subscribe("retail.store.countstocks1.ContextUpdates", "CountingActivityHeaderDataHasChanged", this.onCountingActivityHeaderDataChange, this);
		//        this._utilities.getEventBus().subscribe("retail.store.countstocks1.ReloadMasterList", "CountingActivityHeaderReloadMasterList", this.reloadMasterList, this);
		//    },
		//    onExit: function () {
		//        this._utilities.getEventBus().unsubscribe("retail.store.countstocks1.ContextUpdates", "CountingActivityHeaderDataHasChanged", this.onCountingActivityHeaderDataChange, this);
		//        this._utilities.getEventBus().unsubscribe("retail.store.countstocks1.ReloadMasterList", "CountingActivityHeaderReloadMasterList", this.reloadMasterList, this);
		//    },
		//    setupController: function () {
		//        var v = new this._jSONModel({
		//            title: this.getResourceBundle().getText("MASTER_TITLE"),
		//            noDataText: this.getResourceBundle().getText("NODATA_MASTERLIST")
		//        });
		//        v.setDefaultBindingMode("OneWay");
		//        this.setModel(v, "masterView");
		//        this.getList().attachSelectionChange(function (e) {
		//            if (sap.ui.Device.system.phone) {
		//                this.getList().removeSelections(true);
		//            }
		//        }.bind(this));
		//        this.getList().getModel().setSizeLimit(this.extHookGetCountingActivityListSizeLimit ? this.extHookGetCountingActivityListSizeLimit() : this._constants.MASTER_LIST_SIZE_LIMIT);
		//        if (sap.ui.Device.system.phone) {
		//            this.getList().removeSelections(true);
		//        }
		//    },
		//    setupListBinding: function () {
		//        var l = this.getList();
		//        l.unbindAggregation("items");
		//        var c = new sap.ui.xmlfragment("retail.store.countstocks1.view.fragments.CountingActivitiesListItem", this);
		//        var m = new this._jSONModel();
		//        l.setModel(m);
		//        m.setData({ CountingActivities: null });
		//        var d = new this._sorter("InStoreStatus", false, function (E) {
		//            return this.getStatusGroup(E);
		//        }.bind(this));
		//        var p = new this._sorter("CAPlannedCountDate", true);
		//        var s = new this._sorter("StorageLocationID", true);
		//        var o = new this._sorter("CANum", true);
		//        var e = new this._sorter("CAType", true);
		//        var r = new this._sorter("ReferencedPIDocs", true);
		//        var i = new this._sorter("InStoreRecountKey", true);
		//        l.bindItems("/CountingActivities", c, [
		//            d,
		//            p,
		//            s,
		//            o,
		//            e,
		//            r,
		//            i
		//        ], null);
		//    },
		//    onListUpdateFinished: function () {
		//        if (this._fnProcessAfterListUpdate) {
		//            this._fnProcessAfterListUpdate();
		//        }
		//    },
		//    processAfterListUpdate: function (c) {
		//        this._fnProcessAfterListUpdate = function () {
		//            this._fnProcessAfterListUpdate = null;
		//            c();
		//        }.bind(this);
		//    },
		//    loadMasterListData: function (f, s) {
		//        var c = function (d) {
		//            this._navigationHandler.hideBusyDialog();
		//            this.byId("pullToRefresh").hide();
		//            this._setDataToMasterList(d);
		//            var o = this.getList().getSelectedItem();
		//            if (o) {
		//                var g = o.getBindingContext().getObject();
		//            }
		//            this._utilities.getEventBus().publish("retail.store.countstocks1.CountingActivitiesListUpdated", "CountingActivitiesListHasUpdated", g);
		//            this._isRefreshing = false;
		//            if (!sap.ui.Device.system.phone) {
		//                if (o) {
		//                    this.processAfterListUpdate(function () {
		//                        var h = o.getBindingContext();
		//                        this.runLiveSearch(s);
		//                        this._navigationHandler.gotoDetailsPage(h.getProperty("CANum"), h.getProperty("CAType"), h.getProperty("InStoreRecountKey"), h.getProperty("StorageLocationID"));
		//                    }.bind(this));
		//                } else {
		//                    this.processAfterListUpdate(function () {
		//                        this.runLiveSearch(s);
		//                        this.selectFirstItem();
		//                    }.bind(this));
		//                }
		//            } else {
		//                this.processAfterListUpdate(function () {
		//                    this.runLiveSearch(s);
		//                }.bind(this));
		//            }
		//        }.bind(this);
		//        var e = function (i, E) {
		//            this._navigationHandler.hideBusyDialog();
		//            this.byId("pullToRefresh").hide();
		//            if (E.length > 0) {
		//                var d = E[0]._sErrorMessage;
		//                this._messageBox.error(d);
		//            } else if (!i) {
		//                this.oAssignStoreDialog.open();
		//            }
		//            this._isRefreshing = false;
		//            this.getModel("masterView").setProperty("/title", this.getResourceBundle().getText("MASTER_TITLE"));
		//        }.bind(this);
		//        f = f !== undefined ? f : false;
		//        this.getModel("masterView").setProperty("/noDataText", this.getResourceBundle().getText("NODATA_MASTERLIST"));
		//        this._context.getCountingActivityHeaders(f, c, e);
		//    },
		//    reloadMasterList: function () {
		//        var t = this;
		//        var s = function (d) {
		//            t._setDataToMasterList(d);
		//            t._scrollToSelectedItem();
		//        };
		//        var e = function () {
		//        };
		//        this._context.getCountingActivityHeaders(true, s, e);
		//    },
		// onSelectionChange: function (e) {
		// var s = e.getParameter("listItem") || e.getSource();
		// var c = s.getBindingContext();
		// this._navigationHandler.gotoDetailsPage(c.getProperty("CANum"), c.getProperty("CAType"), c.getProperty("InStoreRecountKey"), c.getProperty("StorageLocationID"));
		// },
		//    onCountingActivityHeaderDataChange: function () {
		//        this.loadMasterListData(false);
		//    },
		//    selectFirstItem: function () {
		//        var i = this.getList().getItems();
		//        if (i.length > 1) {
		//            var s = i[1];
		//            s.setSelected(true);
		//            var c = s.getBindingContext();
		//            this._navigationHandler.gotoDetailsPage(c.getProperty("CANum"), c.getProperty("CAType"), c.getProperty("InStoreRecountKey"), c.getProperty("StorageLocationID"));
		//        }
		//    },
		//    navigateEmptyDetail: function () {
		//        if (!sap.ui.Device.system.phone) {
		//            this._navigationHandler.showEmptyDetailPage();
		//        }
		//    },
		//    _setDataToMasterList: function (c) {
		//        this.getList().getModel().setData({ CountingActivities: c });
		//        this.getList().getModel().refresh(true);
		//        this.getModel("masterView").setProperty("/title", this.getResourceBundle().getText("MASTER_TITLE_NUMBER", [c.length]));
		//    },
		//    _scrollToSelectedItem: function () {
		//        var s = null;
		//        var o = this.getList().getSelectedItem();
		//        if (o) {
		//            s = o.getDomRef();
		//            if (s) {
		//                var c = s.getBoundingClientRect();
		//                var p = c.top;
		//                this.byId("page").scrollTo(p, 0);
		//            }
		//        }
		//    },
		//    getStatusGroup: function (c) {
		//        var s = {
		//            1: {
		//                order: 1,
		//                text: this._utilities.getText("COUNTING_ACTIVITIES_STATUS_OPEN")
		//            },
		//            2: {
		//                order: 2,
		//                text: this._utilities.getText("COUNTING_ACTIVITIES_STATUS_PENDING")
		//            },
		//            3: {
		//                order: 3,
		//                text: this._utilities.getText("COUNTING_ACTIVITIES_STATUS_COMPLETED")
		//            },
		//            4: {
		//                order: 4,
		//                text: this._utilities.getText("COUNTING_ACTIVITIES_STATUS_REJECTED")
		//            }
		//        };
		//        var i = c.getProperty("InStoreStatus");
		//        return {
		//            key: i,
		//            text: s[i].text
		//        };
		//    },
		//    onUpdateFinished: function (e) {
		//        this._updateListItemCount(e.getParameter("total"));
		//        this.byId("pullToRefresh").hide();
		//    },
		//    onSearch: function (e) {
		//        if (e.getParameters().refreshButtonPressed) {
		//            this.loadMasterListData(true, e.getParameters().query);
		//            return;
		//        }
		//    },
		//    onRefresh: function (e) {
		//        this.loadMasterListData(true, this.byId("searchField").getValue());
		//    },
		//    onBypassed: function () {
		//        this.getList().removeSelections(true);
		//    },
		//    onLiveChange: function (e) {
		//        var f = e.getParameters().newValue;
		//        this.runLiveSearch(f);
		//    },
		//    runLiveSearch: function (t) {
		//        t = t ? t : "";
		//        this.getList().setShowNoData(true);
		//        var f = t.toLowerCase();
		//        var l = this.getList().getItems();
		//        var v;
		//        var c = 0;
		//        var g = null;
		//        var d = 0;
		//        if (t.length === 0) {
		//            this.getModel("masterView").setProperty("/noDataText", this.getResourceBundle().getText("NODATA_MASTERLIST"));
		//        } else {
		//            this.getModel("masterView").setProperty("/noDataText", this.getResourceBundle().getText("NODATA_SEARCH"));
		//        }
		//        for (var i = 0; i < l.length; i++) {
		//            if (l[i] instanceof sap.m.GroupHeaderListItem) {
		//                g = l[i];
		//                g.setVisible(false);
		//                d = 0;
		//            } else {
		//                v = this._applySearchPatternToListItem(l[i], f);
		//                l[i].setVisible(v);
		//                if (v) {
		//                    c++;
		//                    d++;
		//                    if (g) {
		//                        g.setVisible(true);
		//                        g.setCount(d);
		//                    }
		//                }
		//            }
		//        }
		//        this._updateListItemCount(c);
		//    },
		//    _applySearchPatternToListItem: function (i, f) {
		//        if (f === "") {
		//            return true;
		//        }
		//        f = f.toLowerCase();
		//        var I = i.getBindingContext(this.sModelName).getProperty();
		//        for (var k in I) {
		//            var v = I[k];
		//            if (v instanceof Date) {
		//                v = v.getDate() + "." + v.getMonth() + "." + v.getFullYear();
		//            }
		//            if (typeof v === "string") {
		//                if (v.toLowerCase().indexOf(f) !== -1) {
		//                    return true;
		//                }
		//            }
		//        }
		//        if (i.getIntro() && i.getIntro().toLowerCase().indexOf(f) !== -1 || i.getTitle() && i.getTitle().toLowerCase().indexOf(f) !== -1 || i.getNumber() && i.getNumber().toLowerCase().indexOf(f) !== -1 || i.getNumberUnit() && i.getNumberUnit().toLowerCase().indexOf(f) !== -1 || i.getFirstStatus() && i.getFirstStatus().getText().toLowerCase().indexOf(f) !== -1 || i.getSecondStatus() && i.getSecondStatus().getText().toLowerCase().indexOf(f) !== -1) {
		//            return true;
		//        }
		//        var c = i.getAttributes();
		//        for (var j = 0; j < c.length; j++) {
		//            if (c[j].getText().toLowerCase().indexOf(f) !== -1) {
		//                return true;
		//            }
		//        }
		//        return false;
		//    },
		//    getList: function () {
		//        return this.getView().byId("list");
		//    },
		//    _getItemsCount: function (l) {
		//        var c = 0;
		//        for (var i = 0; i < l.length; i++) {
		//            if (!(l[i] instanceof sap.m.GroupHeaderListItem)) {
		//                c++;
		//            }
		//        }
		//        return c;
		//    },
		//    _updateListItemCount: function (t) {
		//        var T;
		//        if (t === 0) {
		//            this._showEmptyNoDataList();
		//        } else {
		//            this._showMasterList();
		//        }
		//        if (this.getList().getBinding("items").isLengthFinal()) {
		//            T = this.getResourceBundle().getText("MASTER_TITLE_NUMBER", [t]);
		//            this.getModel("masterView").setProperty("/title", T);
		//        }
		//    },
		_onMasterMatched: function (e) {			
			// if (!this.getOwnerComponent().getModel("sharedModel")) {
			// 	var oSharedData = {
			// 		globalDocument: {
			// 			CANum: "",
			// 		}
			// 	};
			// 	var oSharedModel = new sap.ui.model.json.JSONModel(oSharedData);
			// 	this.getOwnerComponent().setModel(oSharedModel, "sharedModel");
			// }

			// if (this.byId("list").getItems().length > 1) {
			// 	debugger;
			// 	var ldocument = this.getOwnerComponent().getModel("sharedModel").oData.globalDocument.CANum;
			// 	var oIndexItem = this.byId("list").getItems().findIndex(row => row.mProperties.title === ldocument);
			// 	this.byId("list").setSelectedItem(this.byId("list").getItems()[oIndexItem], true, true)
			// };
		},
		//    _showEmptyNoDataList: function () {
		//        var n = this.getList().getNoDataText();
		//        this._emptyList.setNoDataText(n);
		//        this._emptyList.setVisible(true);
		//        this.getList().setVisible(false);
		//    },
		//    _showMasterList: function () {
		//        this._emptyList.setVisible(false);
		//        this.getList().setVisible(true);
		//    }
	});
});