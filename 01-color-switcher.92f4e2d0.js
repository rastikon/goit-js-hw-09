!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=null;t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,n=setInterval((function(){document.body.style.background="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),e.disabled=!0,e.addEventListener("click",(function(){t.disabled=!1,e.disabled=!0,clearInterval(n),console.log("Interval with id ".concat(n," has stopped!"))}))}();
//# sourceMappingURL=01-color-switcher.92f4e2d0.js.map