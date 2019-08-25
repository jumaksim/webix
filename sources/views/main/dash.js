import {JetView, plugins} from "webix-jet";

export default class DashboardTopView extends JetView{
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
				{ css:"" },
				{ view:"icon", icon:"mdi mdi-bell", badge:"5" },
				{ view:"icon", icon:"mdi mdi-settings" },
				{ view:"button", type:"htmlbutton", image:"data/images/morgan_yu.jpg", label: "", css:"mainphoto", 
				label:`<image class="mainphoto" src="data/images/morgan_yu.jpg">
					<span class="webix_icon mdi mdi-circle status green"></span>`,
					width:60, css:"avatar",	borderless:true, click: () => this.show("/logout") }
			]
		};

		return {
					rows:[
						{ type:"clean", cols:[
							{rows:[header]},
								{rows:[toolbar]}
						]},
						{$subview:true}]};
	}

	init(){
		//this.use(plugins.Menu, "menu");
	}
}