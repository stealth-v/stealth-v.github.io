xu.t("postview",function(m,app){
	m.exports=function(){
		var content=this,
		code=this.querySelectorAll(".sourcecode"),
		self={
			freg:null,
			unload:function(){
				if(code.length){
					xu.script.unload("sourcecode");
					xu.script.unload("clike");
					xu.script.unload("xml");
					xu.script.unload("javascript");
					xu.script.unload("htmlmixed");
					xu.script.unload("css");
					xu.stylesheet.unload("sourcecode");
				}
			},
			load_code:function(){
				for(var editor,i=code.length-1;i>=0;i--){
					editor=CodeMirror.fromTextArea(code[i],{
						lineNumbers:true,
						tabSize:2,
						readOnly:true,
						mode:"clike"
					});
				}
				xu.script.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/mode/clike/clike.min.js","clike");
					xu.script.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/mode/xml/xml.min.js","xml");
					xu.script.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/mode/javascript/javascript.min.js","javascript");
					xu.script.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/mode/css/css.min.js","css",function(a,e){
						if(!e)xu.script.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/mode/htmlmixed/htmlmixed.min.js","htmlmixed");
					});
			}
		};

		if(code.length){
			if(app.viewport){

			}
			if(sourcecode)self.load_code();
			else sourcecode=xu.script.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/codemirror.min.js",self.load_code,"sourcecode");
			xu.stylesheet.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/codemirror.min.css",0,"sourcecode");
		}

		return self;
	};

	var css,sourcecode;
	m.task=function(fin){
		css=app.css("postview",fin);
	};
	m.unload=function(){
		xu.stylesheet.delete(css);
	};
})