(window.webpackJsonpcreative=window.webpackJsonpcreative||[]).push([[0],{30:function(e,t){},35:function(e,t,n){var a=n(70);a.config.update({accessKeyId:"AKIASTVPISGV5DOV477Q",secretAccessKey:"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",region:"us-west-2",endpoint:"https://dynamodb.us-west-2.amazonaws.com"});var i=new a.DynamoDB.DocumentClient;e.exports={add:function(e,t){var n={TableName:"Crushin",Item:{date:(new Date).toString(),winner:t,names:e}};console.log("Adding a new item..."),i.put(n,function(e,t){e?console.error("Unable to add item. Error JSON:",JSON.stringify(e,null,2)):console.log("Added item:",JSON.stringify(t,null,2))})},read:function(e){var t={TableName:"Crushin"};console.log("Scanning Crushin table."),i.scan(t,function n(a,s){a?console.error("Unable to scan the table. Error JSON:",JSON.stringify(a,null,2)):(console.log("Scan succeeded."),s.Items.forEach(function(t){var n=document.getElementById(e);n.innerHTML+=JSON.stringify(t,null,2)+"\n"}),"undefined"!=typeof s.LastEvaluatedKey&&(console.log("Scanning for more..."),t.ExclusiveStartKey=s.LastEvaluatedKey,i.scan(t,n)))})}}},448:function(e,t,n){"use strict";n.r(t);var a=n(2),i=n.n(a),s=n(58),o=n.n(s),r=n(60),c=n(13),l=(n(68),n(23)),m=n(59),u=n(33),h=n(8),f=n(9),d=n(11),p=n(10),v=n(12),O=function(e){function t(){return Object(h.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:this.props.hide},Object(l.a)(Array(10)).map(function(e){return i.a.createElement("div",{key:e,className:"confetti"})}),i.a.createElement("p",null,"This week's winner is:"),i.a.createElement("p",{className:"animated fadeInUp winner"},this.props.winner,"!"))}}]),t}(i.a.Component),y=function(e){function t(){return Object(h.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("input",{id:"add",className:this.props.hideInput,placeholder:"Nominee",onKeyPress:this.props.onKeyPress,autoComplete:"off"}),i.a.createElement("input",{id:"plus",className:this.props.hideInput,placeholder:"1",onKeyPress:this.props.onKeyPress,autoComplete:"off",type:"number"}))}}]),t}(i.a.Component),b=function(e){function t(){return Object(h.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("button",{className:this.props.hideButton,onClick:this.props.handleWinner},"CRUSHING IT!!"),i.a.createElement("button",{className:this.props.hideStartButton,onClick:this.props.startAgain},"Start Again"))}}]),t}(i.a.Component);n(69);function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(n,!0).forEach(function(t){Object(m.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var j=n(35),g=function(e){function t(e){var n;return Object(h.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={nominees:[],winner:"",timesOfNomination:[]},n}return Object(v.a)(t,e),Object(f.a)(t,[{key:"handleAdd",value:function(){var e=document.getElementById("add"),t=document.getElementById("plus"),n=e.value,a=t.value;if("test"===n)for(var i=[{name:"amir",votes:4},{name:"david",votes:2},{name:"gabe",votes:2},{name:"mayna",votes:2},{name:"vince",votes:2},{name:"carlos",votes:1},{name:"francesca",votes:2},{name:"jinn",votes:1},{name:"kevin",votes:1},{name:"connie",votes:1},{name:"will",votes:2}],s=0;s<i.length;s++){for(var o=0;o<i[s].votes;o++)this.state.nominees.push(i[s].name),this.setState({nominees:this.state.nominees});this.handleNominees(i[s].name,i[s].votes)}else if(""!==a.trim()&&""!==n.trim()){for(s=0;s<a;s++)this.state.nominees.push(n),this.setState({nominees:this.state.nominees});this.handleNominees(n,a)}else""!==n.trim()&&(this.state.nominees.push(n),this.setState({nominees:this.state.nominees}),this.handleNominees(n,a));e.value="",t.value=""}},{key:"handleNominees",value:function(e,t){var n=this,a=e,i="";if(i=""!==t?parseInt(t):1,0!==this.state.timesOfNomination.length){var s=!0,o=!1,r=void 0;try{for(var c,l=function(){var e=c.value,t=(h=Object(u.a)(e,2))[0],s=h[1];if(s.name===a)return{v:n.setState(function(e){N({},e.timesOfNomination)[t].times=s.times+i})}},m=this.state.timesOfNomination.entries()[Symbol.iterator]();!(s=(c=m.next()).done);s=!0){var h,f=l();if("object"===typeof f)return f.v}}catch(d){o=!0,r=d}finally{try{s||null==m.return||m.return()}finally{if(o)throw r}}return this.state.timesOfNomination.push({name:a,times:i}),this.setState({timesOfNomination:this.state.timesOfNomination})}this.state.timesOfNomination.push({name:a,times:i}),this.setState({timesOfNomination:this.state.timesOfNomination})}},{key:"handleOnKeyPress",value:function(e){"13"==e.charCode&&this.handleAdd()}},{key:"handleWinner",value:function(){var e=this;document.getElementById("add").value="";for(var t=this.state.nominees,n=t.length,a=1;n>1;)setTimeout(function(){e.removeNom(Math.floor(Math.random()*e.state.nominees.length))},500*a),a++,1===--n&&setTimeout(function(){var n=e.state.nominees[0];e.setState({winner:n}),e.setState({nominees:[]}),e.setState({timesOfNomination:[]}),j.add(t,n)},500*a)}},{key:"startAgain",value:function(){this.setState({winner:""}),this.setState({nominees:[]}),this.setState({timesOfNomination:[]})}},{key:"removeNom",value:function(e){var t=this,n=Object(l.a)(this.state.nominees),a=n[e];-1!==e&&(n.splice(e,1),this.setState({nominees:n}));var i=!0,s=!1,o=void 0;try{for(var r,c=function(){var e=r.value,n=(h=Object(u.a)(e,2))[0],i=h[1];if(i.name===a)return 1===i.times?{v:t.setState({timesOfNomination:t.state.timesOfNomination.filter(function(e){return e.name!==a})})}:{v:t.setState(function(e){N({},e.timesOfNomination)[n].times=i.times-1})}},m=this.state.timesOfNomination.entries()[Symbol.iterator]();!(i=(r=m.next()).done);i=!0){var h,f=c();if("object"===typeof f)return f.v}}catch(d){s=!0,o=d}finally{try{i||null==m.return||m.return()}finally{if(s)throw o}}}},{key:"render",value:function(){var e=this,t=""===this.state.winner?"hide":"show winner-container",n=""===this.state.winner?"show":"hide",a=""===this.state.winner?"show":"hide",s=""===this.state.winner?"hide":"show",o=this.state.timesOfNomination.map(function(t,n){var a,s=t.name,o="";return o=(a=t.times)>1?{fontSize:25+3*a+"px"}:{fontSize:"25px"},i.a.createElement("li",{key:n,style:o,className:"animated fadeInUp",onClick:function(){return e.removeNom(n)}}," ",s," ",i.a.createElement("span",null,a))});return i.a.createElement("div",{className:"container"},i.a.createElement("div",{className:"forms"},i.a.createElement("h1",null,"PNI Creative ",i.a.createElement("br",null)," Crushing it! Award"),i.a.createElement("div",null,i.a.createElement(y,{hideInput:a,onKeyPress:this.handleOnKeyPress.bind(this)}),i.a.createElement(b,{hideButton:n,hideStartButton:s,handleWinner:this.handleWinner.bind(this),startAgain:this.startAgain.bind(this)}))),i.a.createElement("div",{className:"content"},i.a.createElement("ul",null,o),i.a.createElement(O,{winner:this.state.winner,hide:t})))}}]),t}(i.a.Component),E=n(35),S=function(e){function t(){return Object(h.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){return i.a.createElement("pre",{id:"data"},E.read("data"))}}]),t}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var k=i.a.createElement(r.a,null,i.a.createElement("div",null,i.a.createElement(c.a,{exact:!0,path:"/",component:g}),i.a.createElement(c.a,{path:"/json",component:S})));o.a.render(k,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},63:function(e,t,n){e.exports=n(448)},68:function(e,t,n){},69:function(e,t,n){}},[[63,1,2]]]);
//# sourceMappingURL=main.4ae67bf4.chunk.js.map