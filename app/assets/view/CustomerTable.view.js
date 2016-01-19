sap.ui.jsview("sap.ui.pt.hana.view.CustomerTable", {
  /** Specifies the Controller belonging to this View.
  * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
  * @memberOf views.customerTable
  */
  getControllerName : function() {
            return null;
  },
  /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
  * Since the Controller is given to this method, its event handlers can be attached right away.
  * @memberOf views.customerTable
  */
  createContent : function(oController) {
    // Retrieve Model Data
    var oModel = new sap.ui.model.json.JSONModel();
    oModel.loadData("services/salesOrderService.xsjs");

    var control, column;
    this.oSHTable = new sap.ui.table.Table("soTable1",{
      visibleRowCount: 10,
    });
    //Table Column Definitions
    control = new sap.ui.commons.TextView().bindProperty("text","customerid");
    column = new sap.ui.table.Column({
      label: new sap.ui.commons.Label({text: "CUSTOMERID"}),
      template: control,
      sortProperty: "CUSTOMERID",
      filterProperty: "customerid",
      filterOperator: sap.ui.model.FilterOperator.EQ,
      flexible: true
    });
    this.oSHTable.addColumn(column);

    control = new sap.ui.commons.TextView().bindProperty("text", "netsales");
    control.setTextAlign("End");
    column = new sap.ui.table.Column({
      label: new sap.ui.commons.Label({text: "NETSALES"}),
      template: control,
      sortProperty: "NETSALES",
      filterProperty: "NETSALES",
      hAlign: sap.ui.commons.layout.HAlign.End
    });
    this.oSHTable.addColumn(column);

    control = new sap.ui.commons.TextView().bindProperty("text","cost");
    oControl.setTextAlign("End");
    column = new sap.ui.table.Column({
      label: new sap.ui.commons.Label({text: "COST"}),
      template: control,
      sortProperty: "COST",
      filterProperty: "COST",
      hAlign: sap.ui.commons.layout.HAlign.End
    });
    this.oSHTable.addColumn(column);

   this.oSHTable.setModel(oModel);
   this.oSHTable.bindRows("/");
   this.oSHTable.setTitle("Top 10 Customer by Sales");

   return this.oSHTable;
}
});