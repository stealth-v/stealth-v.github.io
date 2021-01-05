t("post",function(m,app){
	var i=0;
	m.reload=function(){
		m.css=app.css("post",load);
		m.lang=app.cssl("post",load);
	};
	function load(){
		if(i++>0)m.show();
	}
});