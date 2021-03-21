sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel ) {
		"use strict";

		return Controller.extend("estudovizframestackbarjs.controller.View", {
			onInit: function () {

			// não sei para que serve o codigo abaixo	
			SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function(elem) {
				return elem.getScreenCTM().inverse().multiply(this.getScreenCTM());
			};
			// nao sei para que serve o codigo acima

			var jsonData = new sap.ui.model.json.JSONModel("model/Data.json");
			var oVizFrame = this.getView().byId("idVizFrame");

			// Define propriedades do Gráfico
			oVizFrame.setVizProperties({
				plotArea: {
					colorPalette: d3.scale.category20().range(),
					dataLabel: {
						showTotal: true
					}
				},
				tooltip: {
					visible: true
				},
				title: {
					text: "Stacked Bar Chart"
				}
			});

			// Define dimensions e measures
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: "Year",
					value: "{Year}"
				}],

				measures: [{
					name: "SAP",
					value: "{SAP}"
				}, {
					name: "SAPUI5",
					value: "{SAPUI5}"
				}, {
					name: "ABAP",
					value: "{ABAP}"
				}, {
					name: "JAVA",
					value: "{JAVA}"
				}],

				data: {
					path: "/Reports"
				}
			});

			oVizFrame.setDataset(oDataset);
			oVizFrame.setModel(jsonData);

			// Define FeedItem
			var oFeedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "valueAxis",
					"type": "Measure",
					"values": ["SAP"]
				}),
				oFeedValueAxis1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "valueAxis",
					"type": "Measure",
					"values": ["SAPUI5"]
				}),
				oFeedValueAxis2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "valueAxis",
					"type": "Measure",
					"values": ["ABAP"]
				}),
				oFeedValueAxis3 = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "valueAxis",
					"type": "Measure",
					"values": ["JAVA"]
				}),
				oFeedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "categoryAxis",
					"type": "Dimension",
					"values": ["Year"]
				});

			oVizFrame.addFeed(oFeedValueAxis);
			oVizFrame.addFeed(oFeedValueAxis1);
			oVizFrame.addFeed(oFeedValueAxis2);
			oVizFrame.addFeed(oFeedValueAxis3);
			oVizFrame.addFeed(oFeedCategoryAxis);


			// >>>>> TABELA <<<<<
			// NÃO CONSEGUI CRIAR COLUNAS E LINHAS PELO CONTROLLER
			// https://blogs.sap.com/2020/04/20/dynamic-generation-of-table-in-sapui5/
                        // uma altenativa é manter as colunas fixas...e alterar somente as linhas..
                        // ai ficaria facil..seria somente fazer um array filtrado e apontar na tabela  

			var oTable = this.getView().byId("idMyTable");

			var i = 0;
			var s = 2;

			for (i = 0; i < s; i++) {
				var oColumn = new sap.m.Column("col" + i, {
					width: "1em",
					header: new sap.m.Label({
					text: 'Coluna'
					})
				});
			  oTable.addColumn(oColumn);
			}


			var oCell = [];
				for (i = 0; i < s; i++) {
								if (i === 0) {
								var cell1 = new sap.m.Text({
												text: "conteudo"
												});
								}
				oCell.push(cell1);
}

			var aColList = new sap.m.ColumnListItem("aColList", {
				cells: oCell
			});

			oTable.bindItems("jsonData>SAP", aColList);
			
		   }
		});
	});
