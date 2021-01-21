t("postview",function(m,app){
	var content=this;
	
	m.reload=function(){
		m.css=app.css("postview",function(){
			m.show();
		});
	};
})