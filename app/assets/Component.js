sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel",
  "sap/ui/pt/hana/controller/HelloDialog"
], function (UIComponent, JSONModel, HelloDialog) {
  "use strict";
  return UIComponent.extend("sap.ui.pt.hana.Component", {
    metadata: {
      manifest: "json"
    },
    init: function () {
      // call the standard init function of the parent
      UIComponent.prototype.init.apply(this, arguments);
      // set data model
      var oData = {
        recipient : {
          name: "World"
        }
      };
      var oModel = new JSONModel(oData);
      this.setModel(oModel);
      // set invoice model - local
      var oConfig = this.getMetadata().getConfig();
      var sNamespace = this.getMetadata().getManifestEntry("sap.app").id;
      var oInvoiceModel = new JSONModel(jQuery.sap.getModulePath(sNamespace, oConfig.invoiceLocal));
      this.setModel(oInvoiceModel, "invoice");
      // set dialog
      this.helloDialog = new HelloDialog();
      // create the views based on the url/hash
      this.getRouter().initialize();
    }
  });
});