import * as React from "react";
import { render } from "react-dom";
import Button from "./views/Hello";

render(<Button/>, window.document.getElementById("app"));

// if (navigator.serviceWorker) {
//   window.addEventListener("DOMContentLoaded",function() {
//     // 调用 serviceWorker.register 注册，参数 /sw.js 为脚本文件所在的 URL 路径
//     navigator.serviceWorker.register("sw.js");
//   });
// }
// if (module.hot) { module.hot.accept(); }
