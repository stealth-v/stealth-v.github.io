xu.t("post",function(m,app){
	m.exports=function(){
		var content=this,
		on={},
		self={on:on,freg:null
		};
		return self;
	};

	var css;
	m.task=function(fin){
		css=app.css("post",fin);
	};
	m.unload=function(){
		xu.stylesheet.delete(css);
	};
})