(window.webpackJsonpcreative=window.webpackJsonpcreative||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),s=n(2),c=n.n(s),o=(n(14),n(6)),l=n(3),r=n(4),m=n(7),d=n(5),h=n(8),u=(n(15),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={nominees:[],winner:""},n}return Object(h.a)(t,e),Object(r.a)(t,[{key:"handleAdd",value:function(){var e=document.getElementById("add"),t=(document.getElementById("plus"),e.value);""!==t.trim()&&(this.state.nominees.push(t),this.setState({nominees:this.state.nominees}))}},{key:"handleOnKeyPress",value:function(e){"13"===e.charCode&&this.handleAdd()}},{key:"handleWinner",value:function(){var e=this;document.getElementById("add").value="";for(var t=this.state.nominees.length,n=1;t>1;)setTimeout(function(){e.removeNom(Math.floor(Math.random()*e.state.nominees.length))},500*n),n++,1===--t&&setTimeout(function(){var t=e.state.nominees[0];e.setState({winner:t}),e.setState({nominees:[]})},500*n)}},{key:"startAgain",value:function(){this.setState({winner:""}),this.setState({nominees:[]})}},{key:"removeNom",value:function(e){var t=Object(o.a)(this.state.nominees);-1!==e&&(t.splice(e,1),this.setState({nominees:t}))}},{key:"render",value:function(){var e=this,t=""===this.state.winner?"hide":"show winner-container",n=""===this.state.nominees?"hide":"show",a=""===this.state.winner?"show":"hide",s=""===this.state.winner?"hide":"show",c=this.state.nominees.map(function(t,n){return i.a.createElement("li",{key:n,className:"animated fadeInUp",onClick:function(){return e.removeNom(n)}}," ",i.a.createElement("span",null,"\u2022")," ",t)});return i.a.createElement("div",{className:"container"},i.a.createElement("div",{className:"forms"},i.a.createElement("h1",null,"PNI Creative ",i.a.createElement("br",null)," Crushing it! Award"),i.a.createElement("div",null,i.a.createElement("input",{id:"add",className:a,placeholder:"Nominee",onKeyPress:this.handleOnKeyPress.bind(this),autocomplete:"off"}),i.a.createElement("input",{id:"plus",className:a,placeholder:"+",autocomplete:"off"}),i.a.createElement("button",{className:n,onClick:this.handleWinner.bind(this)},"CRUSHING IT!!"),i.a.createElement("button",{className:s,onClick:this.startAgain.bind(this)},"Start Again"))),i.a.createElement("div",{className:"content"},i.a.createElement("ul",null,c),i.a.createElement("div",{className:t},i.a.createElement("div",{className:"confetti"}),i.a.createElement("div",{className:"confetti"}),i.a.createElement("div",{className:"confetti"}),i.a.createElement("div",{className:"confetti"}),i.a.createElement("div",{className:"confetti"}),i.a.createElement("div",{className:"confetti"}),i.a.createElement("div",{className:"confetti"}),i.a.createElement("div",{className:"confetti"}),i.a.createElement("div",{className:"confetti"}),i.a.createElement("div",{className:"confetti"}),i.a.createElement("p",null,"This week's winner is:"),i.a.createElement("p",{className:"animated fadeInUp winner"},this.state.winner,"!"))))}}]),t}(i.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(u,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,n){e.exports=n(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.304c638f.chunk.js.map