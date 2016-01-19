sap.ui.jsview("views.customerMultiGraph", {
          /** Specifies the Controller belonging to this View.
          * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
          * @memberOf views.customerMultiGraph
          */
          getControllerName : function() {
                    return null;
          },
          /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
          * Since the Controller is given to this method, its event handlers can be attached right away.
          * @memberOf views.customerMultiGraph
          */
          createContent : function(oController) {
              var oModel = new sap.ui.model.json.JSONModel();
              oModel.loadData("services/salesOrderService.xsjs");

         // A Dataset defines how the model data is mapped to the chart
              var oDataset = new sap.viz.ui5.data.FlattenedDataset({
                  // a Bar Chart requires exactly one dimension (x-axis)
                  dimensions : [ {
                      axis : 1, // must be one for the x-axis, 2 for y-axis
                      name : 'Customer',
                      value : "{customerid}"
                  } ],
                  // it can show multiple measures, each results in a new set of bars in a new color
                  measures : [
                  // measure 1
                  {
                      name : 'NetSales', // 'name' is used as label in the Legend
                      value : '{netsales}' // 'value' defines the binding for the displayed value
                  } ],
                  // 'data' is used to bind the whole data collection that is to be displayed in the chart
                  data : {
                      path : "/"
                  }
              });

              // create a VizContainer
              var oVizContainer = new sap.viz.ui5.VizContainer({
                  'uiConfig' : {
                      'layout' : 'vertical',
                      'enableMorphing' : true
                  },
                  'width': '100%',
                  'height': '100%'
              });

              // attach the model to the chart and display it
              oVizContainer.setVizData(oDataset)
              oVizContainer.setModel(oModel);

              // set feeds
              var aobjCustomer = new sap.viz.ui5.controls.common.feeds.AnalysisObject({
             uid : "customer_id",
                  name : "Customer",
                  type : "Dimension"
              });
              var aobjNetSales = new sap.viz.ui5.controls.common.feeds.AnalysisObject({
             uid : "netsales_id",
                  name : "NetSales",
                  type : "Measure"
              });
              var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
           uid : "primaryValues",
                  type : "Measure",
                  values : [ aobjNetSales ]
              });
              var feedAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
             uid : "axisLabels",
                  type : "Dimension",
                  values : [ aobjCustomer ]
              });

              oVizContainer.addFeed(feedPrimaryValues);
              oVizContainer.addFeed(feedAxisLabels);

              // attach event listener for feedschange
              oVizContainer.attachEvent('feedsChanged', function(e) {
                  // You could add your own logic to handle feedsChanged to set new dataset to vizContainer.
                  // Reset current data for demo purpose.
                  oVizContainer.setVizData(new sap.viz.ui5.data.FlattenedDataset({
                      dimensions : [ {
                          axis : 1,
                          name : 'Customer',
                          value : "{customerid}"
                      } ], measures : [ {
                          name : 'NetSales',
                          value : '{netsales}'
                      } ], data : {
                          path : "/"
                      }
                  }));
                  oVizContainer.setModel(oModel);
              });

              return oVizContainer;
}
});