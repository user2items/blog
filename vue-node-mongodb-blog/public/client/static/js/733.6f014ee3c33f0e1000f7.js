(self.webpackChunkwall_blog=self.webpackChunkwall_blog||[]).push([[733],{33630:(t,n,e)=>{"use strict";Object.defineProperty(n,"X",{value:!0});var a,o=e(52945),r=(a=o)&&a.__esModule?a:{default:a};n.Z={name:"input-box",props:{},data:function(){return{}},computed:{listeners:function(){return(0,r.default)({},this.$listeners,{input:function(t){var n=t.target.innerHTML;this.$emit("input",n)}.bind(this)})}},mounted:function(){},methods:{focus:function(){this.$refs.richText.focus()},reset:function(){this.$refs.richText.innerHTML=""}}}},51771:(t,n,e)=>{(t.exports=e(9252)(!1)).push([t.id,"/**\n * 变量样式\n */\n.input-box-wrapper[data-v-092631a5] {\n  position: relative;\n}\n.content[data-v-092631a5] {\n  max-height: 200px;\n  overflow: auto;\n  border: 1px solid gainsboro;\n  box-shadow: 4px 3px 3px gainsboro;\n  border-radius: 12px;\n  padding: 7px 10px;\n  padding-right: 30px;\n  position: relative;\n}\n.content[data-v-092631a5]::-webkit-scrollbar {\n  width: 0;\n}\n.content.textarea[data-v-092631a5] {\n  min-height: 100px;\n}\n.content.text[data-v-092631a5] {\n  min-height: 80px;\n}\n.content[data-v-092631a5]:empty:before {\n  content: attr(placeholder);\n  color: #ccc;\n  position: absolute;\n  left: 12px;\n  top: 8px;\n}\n.content.focused[data-v-092631a5] {\n  border: #66b1ff 1px solid;\n  cursor: text;\n}\n.content[data-v-092631a5]:focus {\n  outline: none;\n}\n.append-wrapper[data-v-092631a5] {\n  position: absolute;\n  right: 1px;\n  top: 1px;\n  bottom: 1px;\n  display: flex;\n  cursor: pointer;\n  align-items: center;\n}\n",""])},72733:(t,n,e)=>{"use strict";e.r(n),e.d(n,{__esModule:()=>a.X,default:()=>r});var a=e(33630);const o=a.Z;e(8287);const r=(0,e(51900).Z)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"input-box-wrapper",attrs:{type:"text"}},[e("div",t._g(t._b({ref:"richText",staticClass:"content textarea",attrs:{contenteditable:!0}},"div",t.$attrs,!1),t.listeners)),t._v(" "),e("div",{staticClass:"append-wrapper"},[t._t("append")],2)])}),[],!1,null,"092631a5",null).exports},8287:(t,n,e)=>{var a=e(51771);a.__esModule&&(a=a.default),"string"==typeof a&&(a=[[t.id,a,""]]),a.locals&&(t.exports=a.locals);(0,e(45346).Z)("041ce388",a,!0,{})}}]);