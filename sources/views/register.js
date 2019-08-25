import {JetView} from "webix-jet";
import session from "models/session";
export default class LoginView extends JetView{
    config(){
        const login_form = {
            view:"form", localId:"register:form",
            width:400, borderless:false, margin:10,
            rows:[
                { type:"header", template: "User Registration" },
                { view:"text", name:"name", label:"Name", labelPosition:"top" },
				{ view:"text", name:"email", label:"Email", labelPosition:"top" },
                { view:"text", type:"password", name:"pass", label:"Password", labelPosition:"top" },
				{ view:"text", type:"password", name:"pass2", label:"Confirm Password", labelPosition:"top" },
                { view:"button", value:"Register", click:() => this.do_register(), hotkey:"enter" }
            ],
            rules:{
				name:webix.rules.isNotEmpty,
                email:webix.rules.isNotEmpty,
                pass:webix.rules.isNotEmpty
            }
        };

        return {
            cols:[{}, { rows:[{}, login_form, {}]}, {}]
        };
    }

    init(view){
        view.$view.querySelector("input").focus();
    }

    do_register(){
        const user = this.app.getService("user");
        const form = this.$$("register:form");

        if (form.validate()){
            const data = form.getValues();
			if(data.pass != data.pass2)
			{
				// extended initialization
				webix.message({
					text:"Passwords don't match",
					type:"error", 
					expire: -1,
					id:"message1"
				});
				return;
			}
            session.register(data.name, data.email, data.pass).then(function(){
				console.log("in register then");
				try
				{
				webix.message({
					text:"Registration success",
					type:"success", 
					expire: 10000,
					id:"message1"
				});
				}catch(ex){}
                document.location = "#!/login";
            });
        }
    }
}