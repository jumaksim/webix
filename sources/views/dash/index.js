import {JetView} from "webix-jet";
import session from "../../models/session";

export default class TopView extends JetView{
	config(){
		return {rows:[
				{ 
					view:"dataview", template:"<div style='border: #EDEFF0 solid 1px;border-radius: 3px;height:130px;margin:10px;position:relative;'><img style='float:left;border-radius: 50%;width:80px;height:80px;padding:10px;' src=\"#logo#\" /><div style='padding-top:10px;padding-bottom:10px;'><div class='webix_strong'>#name#</div><div>#address#</div><div>Status: Active</div></div><div style='clear:both;width:250px;border-top: 1px solid #FAFAFA'></div><img style='position:absolute;right:10px;top:10px' src=\"data/images/percent.png\" /></div>",
					select:true,
					type:{width:400,height:155,css:"dashboardcompany"},
					url:{
						$proxy:true,
						load: function(view,params){
							//move to session and change session
							return session.authajax().get(session.SERVER + "/api/customers").then(a => a.json()["_embedded"]["customers"]);
						}
					},
					on: {
						onSelectChange:function () {
							session.common.account = this.getItem(this.getSelectedId(true).join()).name;
							console.log("/main.tab/portfolio?account=" + encodeURIComponent(session.common.account));
						  document.location = "#!/main.tab/portfolio?account=" + encodeURIComponent(session.common.account);
						}
					},
					datatype:"json",
					pager:"pagerA", //linking to a pager
				},
				{
					view:"pager", id:"pagerA",
					size:4,
					group:3
				}
			]
		};
	}
}