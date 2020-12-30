var loc=location,doc=document,html=doc.documentElement,head,title,body;
function EndDOM(a){
	doc.addEventListener("DOMContentLoaded",function(){
		head=doc.head;
		title=head.querySelector("title");
		body=doc.body;
		a();
	})
}
function got(cb){
	var x=new XMLHttpRequest();
	x.onreadystatechange=function(){if(this.readyState==4)fin()};
	x.ontimeout=x.onerror=err;
	return x;
	function fin(){if(cb)switch(x.status/100|0){
		case 1:case 3:break;
		case 2:cb.call(x);break;
		default:cb.call(x,x.status)
	}}
	function err(e){cb.call(x,e)}
}
function get(a,b,c){
	var x=got(a);
	x.open("GET",b,true);
	if(c)return x;
	else x.send();
}
function post(a,b,c){
	var x=got(a);
	x.open("POST",b,true);
	if(c!==null)x.setRequestHeader("Content-Type",c||"application/x-www-form-urlencoded");
	return x;
}
function rpc(a,b,c){
	return post(function(e){
		for(var i=0,j,k,c=a.length,m,n,p,q=this.response,r=/[^\u0001]*\u0001/g,s;i<c;i++){
			m=r.exec(q)||["\1"];
			j=0;k=a[i].constructor==Array;s=/([^\u0002]*)[\u0001\u0002]/g;
			while(n=s.exec(m[0])){
				if((k?a[i][j]:a[i]).apply(this,n[1].split("\3"))){
					j++;
				}
			}
			if(k&&(k=a[i][++j]))k();
		}
	},b,c);
}
function src(a,b){
	var i=document.createElement("script");
	i.src=a;
	if(b)i.onerror=b;
	head.insertBefore(i,title);
	return i;
}
function css(a,b){
	var i=document.createElement("link");
	i.rel="stylesheet";
	i.href=a;
	if(b)i.onerror=b;
	head.insertBefore(i,title);
	return i;
}
function cssi(a){

}
function cssd(a){

}
function cookie(key,val,path,expire){
	switch(val){
	case 0:
		doc.cookie=key+"=; path="+path+"; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0";
		break;
	case undefined:
		var m=new RegExp(key+"=([^ ;]+)").exec(s.cookie);
		if(m)return decodeURIComponent(m[1]);
		break;
	default:
		doc.cookie=key+"="+encodeURIComponent(val)+"; path="+path+(expire?"; expire="+new Date(expire*1000)+"; max-age="+expire:"; expires=Fri, 31 Dec 9999 23:59:59 GMT; max-age=31536000");
	}
}
function clkevt(p,n){
	for(var a=p.name.split(";"),b,i=0,c=a.length;i<c;i++){
		b=a[i].split("\\t");
		if(b[0] in n)n[b[0]].apply(p,b.slice(1));
	}
}
function i0(x){return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",")}
function i1(x){return +x.replace(/,/g,"")}
function i36(x){return (+x.toString().replace(/[^\d\.]/g,"")).toString(36)}
function num_save(i){var a;return i?(a=i.replace(/^0+/,""),(+a).toString(36)+(i.length-a.length).toString(36)):""}
function num_load(i){return "0".repeat(parseInt(i.substr(-1),36))+parseInt(i.substr(0,i.length-1),36)}