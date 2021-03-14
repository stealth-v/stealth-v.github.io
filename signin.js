xu.t("signin",function(m,app){
	m.exports=function(){
		var content=this,
		on={
			
		};
		return self;
	};

	var css;
	m.task=function(fin){
		css=app.css("signin",fin);
	};
	m.unload=function(){
		xu.stylesheet.delete(css);
	};
})