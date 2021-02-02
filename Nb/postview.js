(function(){
	var sourcecode=[0,0,0];
	xu.t("postview",function(m,app){
		var content=this;
		
		m.reload=function(){
			m.css=app.css("postview",function(){
				m.show();
			});
		};
		return self;
	})
})()