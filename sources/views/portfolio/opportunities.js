import {JetView} from "webix-jet";
import session from "../../models/session";

function showIcon(obj, common, row){
	const sign = row ? "plus" : "minus";
	
	return `<span class="fa fa-pencil">#link#<span class="fa fa-trash" onclick="$$('leadtable').$scope.deleteRow();">`;
}
import OpportunityFormView from "../forms/opportunity";
import TabTopView from "../main/tab";

const PAGE = "Opportunities";
const SINGLE_OBJECT = "Opportunity";
const OBJECT = "opportunities";
const OBJECT_OBJ = OpportunityFormView;

export default class OpportunitiesView extends JetView {
	config(){
		
		var bodyData = OBJECT_OBJ.getConfig(this);
		console.log(bodyData);
		var windowConfig = {
			view:"window",
			position:"center",
			head:"New " + SINGLE_OBJECT,
			close:true,
			modal:true,
			resize:true,
			move:true,
			body:bodyData,
		};
		this.mb = webix.ui(windowConfig);
		
		const mainView = {
			id:"leadRows",
			fillspace:true,
			rows:[
			{
				cols:[
					{
						view:"template",
						template:"<div style='line-height:50px;'>" + PAGE + "</div>",
						height:50,
					},
						{
							view:"richselect",
							id:"list2", 
							label:"SORT BY |", 
							value:1, 
							yCount:"3", 
							 css:"webix_primary",
							options:[ 
								{id:1, value:"Name"}, // the initially selected item
								{id:2, value:"Email"}
							],
							width:300
						},
						{ view:"button", label:"New " + SINGLE_OBJECT, css:"webix_primary", width:150, click:function(){
							
							
		
	    $$(OBJECT + "table").$scope.mb.show();

							//webix.modalbox({text:"<div id='new_dialog' style='width:370px; height:300px'></div>", buttons:["Yes","No","Maybe"]});
							/*webix.ui({
							  container:"new_dialog",
							  buttons:["Yes","No","Maybe"],
							  view:"datatable", autoConfig:true, data:grid_data 
							});*/
							//document.location = "#!/main.tab/portfolio/forms.lead";
							}
						}
					  ]
				
			},
			{
				view:"datatable", id:OBJECT + "table", localId:"grid",
				select:"row", css:"webix_header_border",fillspace:true,
				url:{
							$proxy:true,
							load: function(view,params){
								//move to session and change session
								return session.authajax().get(session.SERVER + "/api/" + OBJECT).then(a =>
								{
									var arr = a.json()["_embedded"][OBJECT];
									for(var x = 0; x < arr.length; x++)
									{
										arr[x]["link"] = arr[x]["_links"]["self"]["href"];
									}
									console.log(arr);
									return arr;
								});
							}
						},
				datatype:"json",
				columns:[
					{ id:"description", fillspace:1, map:"#description#", header:[{ text:"Description"}] },
					{ id:"amount", css:"column_center", fillspace:1,  map:"#amount#", header:[{ text:"Amount", css:"header_center"}]},
					{ id:"won", css:"column_center", fillspace:1,  map:"#won#", header:[{ text:"Won", css:"header_center"}]},
					{ id:"icon", css:"column_center", fillspace:1, header:[{ text:"", css:"header_center", width:50}], template:`<span class="fa fa-pencil" onclick="$$('` + OBJECT + `table').$scope.editRow('#link#');">`}// <span class="fa fa-trash" onclick="$$('leadtable').$scope.deleteRow('#link#');">
					//{ id:"link", css:"column_center", fillspace:1, header:[{ text:"", css:"header_center", width:50}], map:"#link#" }
				]
			}]
		};
		return mainView; 
	}
	deleteRow(pLink)
	{
		console.log(pLink);
		var ajax = session.authajax().del(pLink).then(a =>
								{
									refreshData();
								});
	}
	editRow(pLink)
	{
		console.log(pLink);
		this.$scope.mb.head = "Edit " + SINGLE_OBJECT;
		this.$scope.mb = webix.ui(windowConfig);
		this.$scope.mb.bind($$(OBJECT + "table"),function(slave, master){
			console.log("slave: " + slave);
			console.log("master: " + master);
    if (!master) 
		return false;
    return master.id == slave.movie;
  });
		console.log($$(OBJECT + "table").getSelectedId());
		$$(OBJECT + "table").select($$(OBJECT + "table").getSelectedId());
	    this.mb.show();
	}
	refreshData(){
		$$(OBJECT + "table").clearAll();
		$$(OBJECT + "table").load(function(view,params){
								//move to session and change session
								return session.authajax().get(session.SERVER + "/api/" + OBJECT).then(a =>
								{
									var arr = a.json()["_embedded"][OBJECT];
									for(var x = 0; x < arr.length; x++)
									{
										arr[x]["link"] = arr[x]["_links"]["self"]["href"];
									}
									return arr;
								});
							});
	}
	init(grid){
		/*grid.parse([
			{ feature:"Unlimited lists", start:1, advanced:1, pro:1 },
			{ feature:"Separate outlines", start:1, advanced:1, pro:1 },
			{ feature:"Tag", start:1, advanced:1, pro:1 },
			{ feature:"Markdown", start:1, advanced:0, pro:1 },
			{ feature:"Note", start:1, advanced:1, pro:1 },
			{ feature:"Color label", start:1, advanced:0, pro:0 },
			{ feature:"Numbered list", start:1, advanced:1, pro:0 },
			{ feature:"Heading", start:1, advanced:1, pro:0 },
			{ feature:"Creation date", start:1, advanced:0, pro:0 },
			{ feature:"Last edited time", start:1, advanced:1, pro:1 },
			{ feature:"File upload", start:1, advanced:1, pro:1 },
			{ feature:"Project management", start:1, advanced:0, pro:0 },
			{ feature:"Solutions database", start:1, advanced:1, pro:0 },
			{ feature:"Webinars", start:1, advanced:0, pro:0 },
			{ feature:"Training groups", start:1, advanced:0, pro:0 },
			{ feature:"Complex widgets", start:1, advanced:0, pro:0 },
			{ feature:"Typography", start:1, advanced:0, pro:0 }
		]);*/
	}
}
