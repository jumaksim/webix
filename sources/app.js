import "./styles/app.css";
import session from "models/session";
import {JetApp, EmptyRouter, HashRouter, plugins} from "webix-jet";

export default class InventoryApp extends JetApp {
	constructor(config){
		super(webix.extend({
			id 		: APPNAME,
			version : VERSION,
			router 	: HashRouter,
			debug 	: !PRODUCTION,
			start 	: "/main.dash/dash"
		}, config, true ));
		this.use(plugins.User, {
			model: session,
			public: path => path.indexOf("register") > -1
			//,
			//ping: 15000,
			//afterLogin: "/main/dash",
			//public: path => {
			//	console.log('path:' + path + ', ' + (path.indexOf("/login") > -1));
			//	return path.indexOf("/login") > -1;
			//}
		});
/*super(webix.extend({
				id:			APPNAME,
				version:	VERSION,
				router: 	HashRouter,
				start:		"/main/dash",
				debug:		!PRODUCTION
			}, config, true));	*/
		/* error tracking */
		this.attachEvent("app:error:resolve", function(name, error){
			window.console.error(error);
		});	
		
		/*this.attachEvent("app:guard", function(url, view, nav){
			console.log(arguments);
			if(url != "/login")
			{
				nav.redirect="/login";
			}
		});*/
	}
}

/*webix.ready(() =>
{ 
if (webix.env.touch)
				webix.ui.fullScreen();
			else if (webix.CustomScroll)
				webix.CustomScroll.init();
new InventoryApp().render()} );*/