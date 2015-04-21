/* *********
 *    author:Jason He
 *    version:1.0.0
 *    Date:2014-12-25
 *    file:offline.js
 ********* */

if (!window.navigator.onLine) {
	var offline = document.createElement("div");
	var offlinetext1 = document.createTextNode("无法访问，您可能没有连接互联网");
	var offlinetext2 = document.createTextNode("请检查网络设置");
	var offlinebr = document.createElement("br");
	offline.appendChild(offlinetext1);
	offline.appendChild(offlinebr);
	offline.appendChild(offlinetext2);
	offline.style.minWidth = "320px";
	offline.style.maxWidth = "640px";
	offline.style.margin = "300px auto 0 auto";
	offline.style.font = '22px/40px "Microsoft YaHei"';
	offline.style.color = "#595959";
	document.body.style.textAlign = "center";
	document.body.appendChild(offline);
	window.stop();
}