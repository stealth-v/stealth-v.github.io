xu.t("postview",function(m,app){
	m.exports=function(){
		var content=this,
		code=this.querySelectorAll(".sourcecode"),
		aside=this.parentNode.querySelector("aside"),
		on={
			cc:function(){
				xu.toggle(aside);
			},sc:function(){
				xu.toggle(sc);
				xu.focus(sc.querySelector("[type=search"));
			}
		},
		self={on:on,
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
				var i1=0,i2=0;
				xu.script.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/mode/clike/clike.min.js",l1,"clike");
				xu.script.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/mode/xml/xml.min.js",l2,"xml");
				xu.script.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/mode/javascript/javascript.min.js",l2,"javascript");
				xu.script.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/mode/css/css.min.js",l2,"css");

				function l1(a,e){
					if(!e&&++i1>1){
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
				function l2(a,e){
					if(!e&&++i2>2){
						xu.script.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.2/mode/htmlmixed/htmlmixed.min.js",l1,"htmlmixed");
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

		this.onclick=function(e){
			for(var a,b,c,p=e.target,i=16;p&&i>0;p=p.parentNode,i--){
				switch(p.tagName){
				case "A":
					if(p.parentNode.className=="video"){
						a=xu.doc.createElement("iframe");
						a.src=p.href;
						b=p.children[0];
						b.appendChild(a);
						a=p.parentNode;
						a.replaceChild(b,p);
						return false;
					}
					return;
				}
			}
		};

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