import {JetView, plugins} from "webix-jet";
import session from "../../models/session";

export default class TabTopView extends JetView{
	
	config(){
		const header = {
			type:"header", css:"custom_dark", height:58, width:200,
			template:"<b onclick='document.location=\"#!/main.dash/dash\"'>PROPEL</b>"
		};

		const sidebar = {
			localId:"menu",
			view:"sidebar", css:"webix_dark", width:200, display:"none",
			data:[
				{ id:"dash", value:"Dashboard", icon:"mdi mdi-view-dashboard" },
				{ id:"charts", value:"Charts", icon:"mdi mdi-chart-areaspline" },
				{ id:"tables", value:"Tables", icon:"mdi mdi-table" },
				{ id:"forms", value:"Forms", icon:"mdi mdi-format-line-style"  },
				{ id:"sheet", value:"Spreadsheet", icon:"mdi mdi-table-large"  },
				{ id:"kanban", value:"Kanban", icon:"mdi mdi-view-column"  },
				{ id:"pivot", value:"Pivot", icon:"mdi mdi-layers"  },
				{ id:"files", value:"File Manager", icon:"mdi mdi-folder-star"  }
			]
		};

		const toolbar = {
			view:"toolbar",
			padding:9, height:58,
			cols:[
				{
					view:"richselect",
					id:"listCustomers",
					yCount:"3", 
					 css:"webix_primary",
					options:[],
					width:300
				},
				{ css:"" },
				{ view:"icon", icon:"mdi mdi-bell", badge:"5" },
				{ view:"icon", icon:"mdi mdi-settings" },
				{ view:"button", type:"htmlbutton", image:"data/images/morgan_yu.jpg", label: "", css:"mainphoto", 
				label:`<image class="mainphoto" src="data/images/morgan_yu.jpg">
					<span class="webix_icon mdi mdi-circle status green"></span>`,
					width:60, css:"avatar",	borderless:true, click: () => this.show("/logout") }
			]
		};
		console.log(this.getParam("account", true));
		const tabs = {
			view: "tabbar", 
			id: "tabbar", 
			value: "portfolio", 
			click: function(id){
				},
			multiview: true, options: [
				{ value: `<span class="mdi dashboard"></span> Dashboard`, id: "dashboard"},
				{ value: `<span class="mdi portfolio"></span> Portfolio Management`, id: "portfolio"},
				{ value: `<span class="mdi resourcemanagement"></span> Resource Management`, id: "resource"},
				{ value: `<span class="mdi analytics"></span> Analytics`, id: "analytics"},
				{ value: `<span class="mdi engagement"></span> Engagement`, id: "engagement"},
				{ value: `<span class="mdi foundation"></span> Foundation`, id: "foundation"},
				{ value: `<span class="mdi search"></span>`, id: "search"},
			]
		};
		//and then multiview goes
		//{cells:[$subview:true,$subview:true,$subview:true]}

		return {
					rows:[
						{ type:"clean", cols:[
							{rows:[header]},
								{rows:[toolbar]}
						]},
						tabs,
						{
							$subview:true
						}]};
	}

	init(view, url){
		console.log(url);
		this.acct = url[url.length - 1].params.account;
		console.log(this.acct);
		this.use(plugins.Menu, "tabbar");
	}
	
	urlChange(view){
		console.log(this.acct);
		session.authajax().get(session.SERVER + "/api/customers").then(a => 
		{
			var list = $$("listCustomers").getPopup().getList();
			list.clearAll();
			var customers = a.json()["_embedded"]["customers"];
			for(var i = 0; i < customers.length; i++)
			{
				list.parse({id:customers[i].name,value:customers[i].name});
			}
			$$("listCustomers").setValue(session.common.account);
		});
        //this.setParam("account", this.acct);
		
    }
}