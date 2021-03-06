import {JetView} from "webix-jet";
import session from "../../models/session";

function showIcon(obj, common, row){
	const sign = row ? "plus" : "minus";
	
	return `<span class="fa fa-pencil">#link#<span class="fa fa-trash" onclick="$$('leadtable').$scope.deleteRow();">`;
}
import ContactFormView from "../forms/contact";
import TabTopView from "../main/tab";

const PAGE = "Contacts";
const SINGLE_OBJECT = "Contact";
const OBJECT = "contacts";
const OBJECT_OBJ = ContactFormView;

export default class ContactView extends JetView {
	deleteRow(pLink)
	{
		console.log(pLink);
		var ajax = session.authajax().del(pLink).then(a =>
								{
									refreshData();
								});
	}
	config(){
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
	    this.mb.show();

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
				select:true, css:"webix_header_border",fillspace:true,
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
					{ id:"firstname", fillspace:1, map:"#firstName#", header:[{ text:"First Name"}] },
					{ id:"lastname", css:"column_center", fillspace:1,  map:"#lastName#", header:[{ text:"LastName", css:"header_center"}]},
					{ id:"email", css:"column_center", fillspace:1,  map:"#email#", header:[{ text:"Email", css:"header_center"}]},
					{ id:"role", css:"column_center", fillspace:1,  map:"#roleType#", header:[{ text:"Role", css:"header_center"}]},
					{ id:"icon", css:"column_center", fillspace:1, header:[{ text:"", css:"header_center", width:50}], template:`<span class="fa fa-pencil">`}// <span class="fa fa-trash" onclick="$$('leadtable').$scope.deleteRow('#link#');">
					//{ id:"link", css:"column_center", fillspace:1, header:[{ text:"", css:"header_center", width:50}], map:"#link#" }
				]
			}]
		};
		return mainView; 
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
