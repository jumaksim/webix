const SERVER = "http://dev.intg.io";//"http://mysql.bookstruck.in:8080";
const PROXY = "http://localhost:88/proxy.php";
function status(){
	console.log('in status > ' + SERVER);
	return webix.ajax().headers({"Content-Type":"application/json","Authorization":sessionStorage.auth}).get(SERVER + "/api/users").catch(ex => 
	{  	
		console.log(ex);
		return null;
	})
		.then(a => a.json());
	return new Promise(function(resolve, reject) {
		false ? resolve(JSON.stringify({user:'justin'})) : resolve(JSON.stringify(null));//confirm('status')
	});

	/*webix.ajax().post("server/login.php?status")
		.then(a => a.json());*/
}

function login(user, pass){
	console.log('in login');
	return webix.ajax().headers({"Content-Type":"application/json","Access-Control-Expose-Headers":"Authorization"}).post(SERVER + "/login", {email:user,password:pass}, {error:function(text, data, xhr)
	{
		console.log("error");
		return null;
	},success:function(text, data, xhr){
		data = data.json();
		//server needs to set this "Access-Control-Expose-Headers":"Authorization" or we need to host on same server???
		sessionStorage.auth = xhr.getResponseHeader("Authorization");
		return data;
	}}
	);
	return new Promise(function(resolve, reject) {
		console.log('returning user: ' + user + ', ' + pass);
		true ? resolve(JSON.stringify({user:'justin'})) : resolve(JSON.stringify(null));//confirm('login')
	});
}

function logout(){
	console.log('in logout');
	sessionStorage.auth = null;
	sessionStorage.removeItem("auth");
	return new Promise(function(resolve, reject) {
		false ? resolve(JSON.stringify({user:'justin'})) : resolve(JSON.stringify(null));//confirm('logout')
	});
}

function register(name, email, pass)
{
	console.log('in register > ' + SERVER);
	return webix.ajax().headers({"Content-Type":"application/json"}).post(SERVER + "/users/sign-up", {"name":name,"email":email,"password":pass}).catch(ex => 
	{
		console.log(ex);
		return null;
	})
		.then(a => a.json());
}

function authajax()
{
	return  webix.ajax().headers({"Content-Type":"application/json","Authorization":sessionStorage.auth});
}

class common
{
	static get account ()
	{
		return sessionStorage.account;
	}
	static set account (acct)
	{
		if(acct)
		{
			sessionStorage.account = acct;
		}
		else
		{
			sessionStorage.account = null;
			sessionStorage.removeItem("account");
		}
	}
	static init(url)
	{
		console.log(url);
		if(url[url.length - 1].params.account)
		{
			this.acct = url[url.length - 1].params.account;
			common.account = this.acct;
			console.log(common.account);
		}
	}
	static urlChange(view)
	{
		if(common.account)
		{
			view.setParam("account", common.account);
		}
	}
}

export default {
	status, login, logout, register, authajax, SERVER, common
}