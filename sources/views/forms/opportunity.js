import {JetView} from "webix-jet";
import {getCities} from "models/cities";
import {getTags} from "models/tags";
import {getPositions} from "models/positions";
import "webix/photo";
import session from "../../models/session";

const OBJECT = "opportunities";

export default class OpportunityFormView extends JetView {
	static getConfig(pView)
	{
		const dateFormat = webix.Date.dateToStr("%d %M %Y");

		const main_info = {
			margin:10,
			rows:[
				{
					view:"text", name:"description",
					label:"Description", labelPosition:"top",
					placeholder:"Description",
					invalidMessage:"A description is required",
					tooltip:obj => {
						return obj.value ? "Opportunity description is #value#" : "<span class='notselected'>"+"Not specified"+"</span>";
					}
				},
				{
					view:"text", name:"amount", attributes:{ type:"number" },
					label:"Amount", labelPosition:"top",
					placeholder:"Amount",
					invalidMessage:"An amount is required",
					tooltip:obj => {
						return obj.value ? "The amount of this opportunity is #value#" : "<span class='notselected'>"+"Not specified"+"</span>";
					}
				},
				{
					view:"checkbox", name:"won",
					label:"Won", labelPosition:"top",
					placeholder:"Won"
				}
			]
		};

		const more_info = {
			margin:10,
			rows:[
				{
					view:"text", name:"address", label:"Address",
					labelPosition:"top", placeholder:"Address",
					tooltip:obj => {
						return obj.value ? "The address of the client's office" : "<span class='notselected'>"+"Not specified"+"</span>";
					}
				},
				{
					view:"datepicker", name:"birthday",
					label:"Birthday", labelPosition:"top",
					placeholder:"Click to select",
					format:dateFormat,
					tooltip:obj => {
						let result = "Client is ";
						if (obj.value){
							result += Math.floor((new Date() - obj.value) / (1000 * 60 * 60 * 24 * 365)) + " years old";
							let nearestBDay = new Date();
							nearestBDay.setMonth(obj.value.getMonth());
							nearestBDay.setDate(obj.value.getDate());
							if (nearestBDay < new Date()){
								webix.Date.add(nearestBDay, 1, "year");
							}
							result += "<br>" + "Next birthday is on " + dateFormat(nearestBDay);
						}
						return result;
					}
				},
				{
					view:"datepicker", name:"request",
					label:"First request", labelPosition:"top",
					placeholder:"Click to select",
					format:dateFormat
				},
				{
					view:"text", name:"phone", label:"Phone", labelPosition:"top", placeholder:"Phone"
				},
				{
					view:"radio", name:"notifications",
					label:"Notifications", labelPosition:"top",
					value:1,
					tooltip:obj => {
						return obj.id%2 ? "You will receive email notifications about actions performed by this client." : "You will receive no email notifications.";
					},
					options:[
						{ id:1, value:"Agree" },
						{ id:2, value:"Disagree" }
					]
				}
			]
		};

		const right_photo = {
			margin:10,
			rows:[
				{
					view:"photo", localId:"photo",
					name:"photo",
					css:"form_photo",
					width:260,
					height:260,
					borderless:true
				},
				{
					view:"multicombo", name:"tags",
					localId:"tags:combo",
					placeholder:"Click to add tags",
					options:getTags(),
					tooltip:obj => {
						return obj.value ? "The badges unlocked by the client" : "<span class='notselected'>"+"No badges"+"</span>";
					}
				}
			]
		};

		const upper_section = {
			margin:48, cols:[
				main_info,
				//more_info,
				//right_photo
			]
		};

		const buttons = {
			margin:10,
			cols:[
				{},
				{
					view:"button", value:"Cancel", autowidth:true,
					click:() => {
						console.log(pView);
						pView.mb.close();
					},
					tooltip:"Close the form"
				},
				{
					view:"button", value:"Reset", autowidth:true,
					click:() => {
						this.$$("form").clear();
					},
					tooltip:"Click to clean the form"
				},
				{
					view:"button", value:"Save", type:"form", autowidth:true,
					tooltip:"Save changes",
					click:() => {
						console.log(pView);
						var form = pView.mb.getChildViews()[1].getChildViews()[0];
						console.log(form);
						if (form.validate()){
							session.authajax().post(session.SERVER + "/api/" + OBJECT, {description:form.getValues().description, amount:form.getValues().amount, won:form.getValues().won}).then(a => { webix.message("Saved!", "success");pView.mb.close();pView.$scope.refreshData();});
						}
					}
				}
			]
		};

		return {
			id:"leadform",
			rows:[
				//{ template:"<a href='#!/main.tab/portfolio/portfolio.leads'>Back</a>", type:"header" },
				//{ template:"New Lead", type:"header" },
				{
					view:"form", localId:"form", padding:24,
					rows:[
						upper_section,
						buttons
					],
					rules:{
						"description":webix.rules.isNotEmpty,
						"amount":webix.rules.isNotEmpty
					}
				}
			]
		};
	}
	config(){
		return getConfig();
	}
	init(){
		/*this.$$("form").setValues({
			fname:"Morgan", lname:"Yu",
			birthday:"2005-05-05", photo:"morgan_yu",
			notifications:1, request:"2017-01-13",
			tags:"6,3,5"
		});*/
	}
}
