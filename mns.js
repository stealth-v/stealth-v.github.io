xu.t("mns",function(m,app){
	m.exports=function(){
		var content=this,
		mne=xu.template(this.querySelector(".mne")),
		on={
		},
		self={on:on,freg:null,
		};
		return self;
	};

	var css1;
	m.task=function(fin){
		css1=app.cssl("mns",fin);
	};
	m.unload=function(){
		xu.stylesheet.delete(css1);
	};
})