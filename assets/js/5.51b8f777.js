(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{319:function(t,s,e){"use strict";e.r(s);var n=e(1),r=Object(n.a)({},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"content"},[e("p",[t._v("最近在做微信小程序开发，由于微信公众平台的强制性要求，服务器域名必须是https开头的，所以配置了一下，做个记录备忘。")]),t._v(" "),e("p",[t._v('首先打开终端，cd 到保存证书的文件夹，输入命令 openssl req -new -newkey rsa:2048 -sha256 -nodes -out yourname.csr -keyout yourname.key -subj "/C=CN/ST=Beijing/L=Beijing/O=zyf Inc./OU=Web Security/CN=*.iloverun.top" 引号内为自己的域名信息')]),t._v(" "),t._m(0),t._v(" "),e("p",[t._v("执行命令成功后会在文件夹内生成两个文件.csr和.key。")]),t._v(" "),e("p",[t._v(".csr用于向证书颁发机构申请.crt文件。")]),t._v(" "),e("p",[t._v("SSL证书有好多种，对于个人开发者来说当然使用免费的证书最划算。颁发免费SSL证书的机构有好多，例如百度云，阿里云等提供云服务的机构。但是云服务提供的免费证书不支持下载，自动部署也有很多限制，所以我选择了国外的免费证书申请网站，亲测没有被墙。"),e("a",{attrs:{href:"https://www.startcomca.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.startcomca.com/"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("网站以邮箱验证码的方式注册，申请免费证书需要两步操作。")]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),e("p",[t._v("把.csr .crt .key放倒nginx配置的路径下，执行nginx -s reload重新加载配置文件。")]),t._v(" "),e("p",[t._v("到这里SSL配置完成，打开浏览器输入你的https网址，可以看到打开成功，大功告成！！！")])])},[function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("img",{attrs:{src:"https://ooo.0o0.ooo/2017/06/12/593e439be750f.png",alt:""}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("1.验证域名主机"),s("br"),this._v("\n2.上传csr"),s("br"),this._v(" "),s("img",{attrs:{src:"https://ooo.0o0.ooo/2017/06/12/593e495a9a854.png",alt:""}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("网站提示粘贴csr，把我们的csr拖动到浏览器内用浏览器打开，可以看到csr内容，拷贝粘贴至文本框内，点击submit按照提示下载crt压缩包。\n解压后找到nginx目录下的文件，就是我们需要的。"),s("br"),this._v(" "),s("img",{attrs:{src:"https://ooo.0o0.ooo/2017/06/12/593e4b397c8fc.png",alt:""}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("配置nginx.conf，证书路径为绝对路径")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("server {  \n    listen 80;#也可以不监听80端口 看需要\n    listen 443 ssl;\n    server_name www.iloverun.top;\n    ssl on;\n    ssl_certificate /etc/ssl/private/loverun_loc.crt;\n    ssl_certificate_key /etc/ssl/private/loverun_loc.key;\n}\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br"),e("span",{staticClass:"line-number"},[t._v("8")]),e("br")])])}],!1,null,null,null);s.default=r.exports}}]);