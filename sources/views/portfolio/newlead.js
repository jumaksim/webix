import {JetView} from "webix-jet";
import session from "../../models/session";

function showIcon(obj, common, row){
	const sign = row ? "plus" : "minus";
	return `<span class="feature webix_icon wxi-${sign}-circle">`;
}

export default class NewLeadView extends JetView {
	config(){
		const mainView = {
			id:"leadRows",
			fillspace:true,
			rows:[
			{
				cols:[
					{
						view:"template",
						template:"<div style='line-height:50px;'>Leads</div>",
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
								{id:1, value:"One"}, // the initially selected item
								{id:2, value:"Two"}, 
								{id:3, value:"Three"}
							],
							width:300
						},
						{ view:"button", label:"New Lead", css:"webix_primary", width:100, click:function(){
							this.show("/forms.lead");}}
					  ]
				
			},
			/*{
				view:"datatable", id:"leadtable", localId:"grid",
				select:true, css:"webix_header_border",
				url:{
							$proxy:true,
							load: function(view,params){
								//move to session and change session
								return session.authajax().get(session.SERVER + "/api/leads").then(a => a.json()["_embedded"]["leads"]);
							}
						},
				datatype:"json",
				columns:[
					{ id:"feature", fillspace:1, header:[{ text:"Name"}] },
					{ id:"advanced", css:"column_center", fillspace:1, header:[{ text:"Email", css:"header_center"}], template:showIcon },
					{ id:"pro", css:"column_center", fillspace:1, header:[{ text:"", css:"header_center", width:50}], template:showIcon }
				]
			}*/
			{
				fillspace:true,
				$subview:"forms.lead"
			}]
		};
		return mainView; 
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
