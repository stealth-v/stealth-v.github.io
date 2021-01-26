t("postview",function(m,app){
	var content=this;
	
	m.onreload=function(){
		m.css=app.css("postview",function(){
			m.show();
		});
	};
	return self;
})