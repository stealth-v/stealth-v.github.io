var loc=location,doc=document,html=doc.documentElement,head,title,body;
function EndDOM(a){
	doc.addEventListener("DOMContentLoaded",function(){
		head=doc.head;
		title=head.querySelector("title");
		body=doc.body;
		a();
	})
}
function got(a){
	var x=new XMLHttpRequest();
	if(a){
		x.onreadystatechange=function(){a.call(x,x.status/100|2)};
		x.ontimeout=x.onerror=function(e){a.call(x,0,e)};
	}
	return x;
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
	hhv(i,b);
	i.src=a;
	head.insertBefore(i,title);
	return i;
}
function css(a,b){
	var i=document.createElement("link");
	hhv(i,b);
	i.rel="stylesheet";
	i.href=a;
	head.insertBefore(i,title);
	return i;
}
function hhv(a,b){
	if(b){
		a.onload=b;
		a.onerror=function(e){
			b(a,e);
		};
	}
}
function ncall(a,p,e){
	var g=/[^;]+/g,m,r,p;
	while(m=g.exec(p.name)){
		m=m[0].split(" ");
		if(p=a[m.shift()]){
			m.push(e);
			switch(r=p.apply(p,m)){
			case "end":return;
			}
		}
	}
	return r;
}
function clk(a,b,c){
	a.onchange=a.onclick=function(e){
		for(var p=e.target,i=16;p&&i>=0;p=p.parentNode,i--)
		switch(p.constructor){
		case HTMLButtonElement:
		case HTMLInputElement:
		case HTMLSelectElement:
			return ncall(b,p,e);
		}
	};
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