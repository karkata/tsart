!function(){"use strict";class t{constructor(t,i){this.index=t,this.name=i.name,this.value=i.value,this.group=i.group||"",this.nameVisible=!1!==i.nameVisible}}class i{constructor(t,i){this.name=t,this.color=i||"#0040ff",this.items=[]}get size(){return this.items.length}addItem(i){if(!(i instanceof t))throw Error("The item must be a instance of ItemElement");this.items.push(i)}}class e{constructor(t,i,e){this.ct=t.ct,this.doc=t.doc,this.cv=t.cv,this.options=i,this.data=e||[],this.groups=new Map,this.minv=Number.MAX_VALUE,this.maxv=Number.MIN_VALUE,this.maxt=0,this.maxn="",this.maxg="",this.xclass=[],this.xclassVisible=[],this.calculateAll()}clear(){this.data=[],this.groups=new Map,this.minv=Number.MAX_VALUE,this.maxv=Number.MIN_VALUE,this.maxt=0,this.maxn="",this.maxg="",this.xclass=[]}calculateAll(){for(let t=0;t<this.data.length;t++)this.addItem(this.data[t])}calculateOne(t){this.minv>t.value&&(this.minv=t.value),this.maxv<t.value&&(this.maxv=t.value),this.maxn.length<t.name.length&&(this.maxn=t.name),this.maxg.length<t.group.length&&(this.maxg=t.group),this.maxt=Math.min(Tsart.Util.getMaxAxisValue(this.maxv),this.options.axis.y.maxValue);let i=this.xclass.indexOf(t.name);i<0?(this.xclass.push(t.name),this.xclassVisible[i]=!1!==t.nameVisible&&this.xclassVisible[i]):this.xclassVisible.push(t.nameVisible)}addGroup(t){let e=null;void 0===t.name&&(t.name=""),this.groups.has(t.name)?e=this.groups.get(t.name):(e=new i(t.name,t.color),this.groups.set(t.name,e)),t.list||(t.list=[]);for(let i=0;i<t.list.length;i++)this.addItem(e,t.list[i])}getGroup(t){let e=null;return void 0===t&&(t=""),this.groups.has(t)?e=this.groups.get(t):(e=new i(t),this.groups.set(t,e)),e}addItem(i){let e=this.getGroup(i.group);0==e.size&&(e.color=i.color);let s=new t(e.size,i);e.addItem(s),this.calculateOne(s)}update(){this.updateHeader(),this.updateLeft(),this.updateRight(),this.updateFooter(),this.updateClient()}updateHeader(){const t=this.options,i=this.cv.getContext("2d"),e=Tsart.Util.toPixel(t.regions.header.h,this.cv.height),s=Tsart.Util.toPixel("50%",this.cv.width),l=Tsart.Util.toPixel("50%",e);i.clearRect(0,0,this.cv.width,e),t.title.content&&(i.fillStyle=t.title.fontColor,i.font=t.title.font,i.textAlign="center",i.textBaseline="middle",i.fillText(t.title.content,s,l))}updateLeft(){const t=this.options,i=this.cv.getContext("2d"),e=Tsart.Util.toPixel(t.regions.header.h,this.cv.height),s=Tsart.Util.toPixel(t.regions.left.w,this.cv.width),l=this.cv.height-e-Tsart.Util.toPixel(t.regions.footer.h,this.cv.height);i.clearRect(0,e,s,l),t.category.visible&&"left"===t.category.position&&this.updateCategory(i,Tsart.Util.toDim(0,e,s,l),t,this.groups)}updateRight(){const t=this.options,i=this.cv.getContext("2d"),e=Tsart.Util.toPixel(t.regions.right.w,this.cv.width),s=this.cv.width-e,l=Tsart.Util.toPixel(t.regions.header.h,this.cv.height),o=this.cv.height-l-Tsart.Util.toPixel(t.regions.footer.h,this.cv.height);i.clearRect(s,l,e,o),t.category.visible&&"right"===t.category.position&&this.updateCategory(i,Tsart.Util.toDim(s,l,e,o),t,this.groups)}updateCategory(t,i,e,s){let l=Math.min(i.h/s.size,20),o=parseInt(i.h/2-s.size*l/2,10);t.font=e.category.font,t.textAlign="start",t.textBaseline="middle";let a=0;for(let[n,h]of s)t.fillStyle=h.color,t.fillRect(i.x+10,i.y+o+l*a,20,.8*l),t.fillStyle=e.category.fontColor,t.fillText(n,i.x+34,i.y+o+l*a+.4*l),a++}updateFooter(){const t=this.options,i=this.cv.getContext("2d"),e=Tsart.Util.toPixel(t.regions.footer.h,this.cv.height);i.clearRect(0,this.cv.height-e,this.cv.width,e)}updateClient(){const t=this.options,i=this.cv.getContext("2d"),e=Tsart.Util.toPixel(t.regions.left.w,this.cv.width),s=Tsart.Util.toPixel(t.regions.header.h,this.cv.height),l=this.cv.width-e-Tsart.Util.toPixel(t.regions.right.w,this.cv.width),o=this.cv.height-s-Tsart.Util.toPixel(t.regions.footer.h,this.cv.height);i.clearRect(e,s,l,o);const a=Tsart.Util.toDim(e+t.axis.x.marginLeft,s+t.axis.y.marginTop,l-t.axis.x.marginLeft-t.axis.x.marginRight,o-t.axis.y.marginTop-t.axis.y.marginBottom);this.updateGrid(i,a,t);for(let e of this.groups.values())this.updateLine(i,a,e,t)}updateGrid(t,i,e){const s={x:0,y:0},l=Tsart.Util.toSegment(i.l,i.b,i.r,i.b),o=Tsart.Util.toSegment("left"===e.axis.y.position?i.l:i.r,i.t,"left"===e.axis.y.position?i.l:i.r,i.b);t.lineWidth=1,t.strokeStyle=e.axis.x.lineColor,t.beginPath(),t.moveTo(l.x1,l.y1),t.lineTo(l.x2,l.y2),t.stroke(),e.axis.x.name&&(s.x="left"===e.axis.y.position?l.x2+10:l.x1-10,s.y=l.y2,t.font=e.axis.x.font,t.fillStyle=e.axis.x.fontColor,t.textAlign="left"===e.axis.y.position?"left":"right",t.textBaseline="top",t.fillText(e.axis.x.name,s.x,s.y));const a=i.w/this.xclass.length;t.font=e.axis.x.font,t.fillStyle=e.axis.x.fontColor,t.textAlign="center",t.textBaseline="top";for(let l=0;l<this.xclass.length;l++)this.xclassVisible[l]&&(s.x=i.x+l*a+a/2,s.y=i.b+10,t.fillText(this.xclass[l],s.x,s.y),e.axis.grid.xVisible&&(t.strokeStyle=e.axis.grid.xLineColor,t.beginPath(),t.moveTo(s.x+.5,i.t+.5),t.lineTo(s.x+.5,i.b+.5),t.stroke()));t.strokeStyle=e.axis.y.lineColor,t.beginPath(),t.moveTo(o.x1,o.y1),t.lineTo(o.x2,o.y2),t.stroke(),e.axis.y.name&&(s.x=o.x1,s.y=o.y1-10,t.font=e.axis.y.font,t.fillStyle=e.axis.y.fontColor,t.textAlign="center",t.textBaseline="bottom",t.fillText(e.axis.y.name,s.x,s.y));let n=e.axis.y.step,h="";for(let l=0;l<n;l++)s.x=o.x1,s.y=o.y2-o.h/n*(l+1),t.strokeStyle=e.axis.color,t.beginPath(),t.moveTo(s.x+.5,s.y+.5),t.lineTo(o.x1+("left"===e.axis.y.position?-5:5)+.5,s.y+.5),t.stroke(),h=""+this.maxt/n*(l+1),s.x="left"===e.axis.y.position?s.x-10:s.x+10,t.font=e.axis.y.font,t.fillStyle=e.axis.y.fontColor,t.textAlign="left"===e.axis.y.position?"right":"left",t.textBaseline="middle",t.fillText(h,s.x,s.y),e.axis.grid.yVisible&&(t.strokeStyle=e.axis.grid.yLineColor,t.beginPath(),t.moveTo(i.l+.5,s.y+.5),t.lineTo(i.r+.5,s.y+.5),t.stroke())}updateLine(t,i,e,s){const l={x:0,y:0};let o=0,a=0;const n=i.w/e.items.length,h=[];for(let s=0,l=null;s<e.items.length;s++)l=e.items[s],o=i.x+s*n+n/2,a=parseInt(i.b-l.value*i.h/this.maxt,10),h.push({x:o,y:a}),0===s?(t.strokeStyle=e.color,t.beginPath(),t.moveTo(o,a)):s<e.items.length&&t.lineTo(o,a),s+1===e.items.length&&t.stroke();for(let i=0,o=null;i<h.length;i++)o=e.items[i],s.item.spotVisible&&(t.beginPath(),t.arc(h[i].x,h[i].y,3,0,2*Math.PI,!1),t.fillStyle="#fff",t.fill(),t.beginPath(),t.arc(h[i].x,h[i].y,3,0,2*Math.PI,!1),t.strokeStyle=e.color,t.strokeWidth=3,t.stroke()),i+1===h.length&&s.item.labelVisible&&o.nameVisible&&(l.x=h[i].x+10,l.y=h[i].y,t.textAlign="start",t.textBaseline="middle",t.fillStyle=e.color,t.fillText(e.name,l.x,l.y)),s.item.valueVisible&&(l.x=h[i].x,l.y=h[i].y-10,t.textAlign="center",t.textBaseline="bottom",t.fillStyle=e.color,t.fillText(o.value,l.x,l.y))}}Tsart.charts.set("line-standard",(function(t,i,s){i=Tsart.Util.extend({title:{content:"",font:"bold 32px 'Arial'",fontColor:"#999999"},regions:{header:{h:"0",bkcolor:"#fff"},left:{w:"0",bkcolor:"#fff"},right:{w:"0",bkcolor:"#fff"},footer:{h:"0",bkcolor:"#fff"},client:{bkcolor:"#fff"}},category:{visible:!1,position:"left",font:"normal 11px 'Arial'",fontColor:"#000"},axis:{x:{name:"",font:"normal 11px 'Arial'",fontColor:"#000",marginLeft:50,marginRight:50,lineColor:"#aaa"},y:{name:"",font:"normal 11px 'Arial'",fontColor:"#000",marginTop:50,marginBottom:50,lineColor:"#aaa",step:10,maxValue:Number.MAX_VALUE,position:"left"},grid:{xLineColor:"#ddd",xVisible:!0,yLineColor:"#ddd",yVisible:!0}},item:{spotVisible:!0,labelVisible:!0,valueVisible:!0}},i);const l=new e(t,i,s);return l.update(),l}))}();