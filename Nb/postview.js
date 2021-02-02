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
			load_code1:function(){
				var idx=0;
				xu.script.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/mode/clike/clike.min.js",l,"clike");
				xu.script.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/mode/xml/xml.min.js",l,"xml");
				xu.script.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/mode/javascript/javascript.min.js",l,"javascript");
				xu.script.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/mode/css/css.min.js",function(a,e){
					if(!e)xu.script.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/mode/htmlmixed/htmlmixed.min.js",l,"htmlmixed");
				},"css");

				function l(){
					if(++idx>3){
						for(var editor,i=code.length-1;i>=0;i--){
							editor=CodeMirror.fromTextArea(code[i],{
								lineNumbers:true,
								tabSize:2,
								readOnly:true,
								mode:"text/x-c++src"
							});
						}
					}
				}
			}
		};

		if(code.length){
			if(app.viewport){

			}
			if(sourcecode)self.load_code1();
			else sourcecode=xu.script.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/codemirror.min.js",self.load_code1,"sourcecode");
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