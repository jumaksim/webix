import {JetView, plugins} from "webix-jet";
import session from "../../models/session";

export default class PortfolioView extends JetView{
	config(){
		const header = {
			type:"header", css:"custom_dark", height:58,
			template:"ADMIN APP"
		};

		const sidebar = {
			localId:"menu",
			view:"sidebar", css:"webix_dark", width:250,
			data:[
				{ id:"dash", value:"Portfolio Mngmt Dashboard", icon:"mdi mdi-view-dashboard" },
				{ id:"charts", value:"Account", icon:"mdi mdi-chart-areaspline" },
				{ id:"tables", value:"Tables", icon:"mdi mdi-table" },
				{ id:"forms", value:"Opportunity", icon:"mdi mdi-format-line-style"  },
				{ id:"sheet", value:"Contact", icon:"mdi mdi-table-large"  },
				{ id:"kanban", value:"Leads", icon:"mdi mdi-view-column"  }
			]
		};

		const toolbar = {
			view:"toolbar",
			padding:9, height:58,
			cols:[
				{ css:"logo" },
				{ view:"icon", icon:"mdi mdi-bell", badge:"5" },
				{ view:"icon", icon:"mdi mdi-settings" },
				{ view:"button", type:"htmlbutton", image:"data/images/morgan_yu.jpg", label: "", css:"mainphoto", 
				label:`<image class="mainphoto" src="data/images/morgan_yu.jpg">
					<span class="webix_icon mdi mdi-circle status green"></span>`,
					width:60, css:"avatar",	borderless:true, click: () => this.show("/logout") }
			]
		};

		return {
			type:"clean", cols:[
				{ rows:[ sidebar ]},
				{ rows:[ { $subview:true } ]}
			]
		};
	}

	init(view, url){
		session.common.init(url);
		this.use(plugins.Menu, "menu");
	}
	
	urlChange(view){
		console.log(session.common.account);
		session.common.urlChange(this);
    }
}