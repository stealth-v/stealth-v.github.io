xu.t("postview",function(m,app){
	m.exports=function(){
		var content=this,
		self={};

		return self;
	};

	var css,sourcecode=[0,0,0];
	m.task=function(fin){
		css=app.css("postview",fin);
	};
})