import {JetView, plugins} from "webix-jet";
import session from "../../models/session";

export default class PortfolioView extends JetView{
	config(){
		const header = {
			type:"header", css:"custom_dark", height:58,
			template:"PROPEL"
		};

		const sidebar = {
			localId:"menu",
			view:"sidebar", css:"webix_dark", width:250,
			data:[
				{ id:"dash", value:"Portfolio Mngmt Dashboard", icon:"mdi portfolio-dashboard" },
				{ id:"charts", value:"Account Details", icon:"mdi portfolio-account" },
				{ id:"portfolio.contacts", value:"Contacts", icon:"mdi portfolio-contacts" },
				{ id:"portfolio.opportunities", value:"Opportunities", icon:"mdi portfolio-opportunities"  },
				{ id:"portfolio.leads", value:"Leads", icon:"mdi portfolio-leads"  },
				{ id:"segmented", value:"Segmented Audience", icon:"mdi portfolio-segaudience"  },
				{ id:"scorecard", value:"Score Card", icon:"mdi portfolio-scorecard"  }
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