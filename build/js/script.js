document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelector(".js-first-type"),t=document.querySelector(".js-second-type"),n=document.querySelector(".contant__table"),a=document.querySelector(".view__row"),o=document.querySelector(".content__wrap-preview"),c=[...a.children],i=[...n.children],r=localStorage.getItem("prev")||1,s=localStorage.getItem("next")||-1,d=localStorage.getItem("key")||"id",l=localStorage.getItem("secondSort")||"up",v=localStorage.getItem("view")||"table",g=localStorage.getItem("class")||".content__wrap-preview",u=localStorage.getItem("language")||"en",m=document.getElementById(v),f=document.getElementById(d),_=document.getElementById(l),p=document.querySelector(g),S=document.getElementById(u),y=document.querySelector(".lang"),I=document.querySelectorAll(".js-lang"),b=(document.querySelectorAll(".favorite-icon"),[...o.children]);function w(){i.forEach(e=>e.remove()),b.forEach(e=>e.remove())}S.classList.add("active"),f.classList.add("active"),_.classList.add("active"),m.classList.add("active"),p.classList.add("d-none"),a.addEventListener("click",(function(e){e.preventDefault();let t=e.target.dataset.atr;if(c.forEach(e=>{e.classList.remove("active")}),e.target.classList.add("active"),"table"==t)return localStorage.setItem("view",t),localStorage.setItem("class",".content__wrap-preview"),n.classList.add("shadow"),n.classList.remove("d-none"),void o.classList.add("d-none");localStorage.setItem("view",t),localStorage.setItem("class",".contant__table"),o.classList.remove("d-none"),n.classList.remove("shadow"),n.classList.add("d-none")})),e.addEventListener("click",(function(t){w(),t.preventDefault();let n=[...e.children],a=t.target.dataset.atr;return n.forEach(e=>{e.classList.remove("active")}),t.target.classList.add("active"),localStorage.setItem("key",a),void window.location.reload()})),t.addEventListener("click",(function(e){w(),e.preventDefault();let n=[...t.children],a=e.target.dataset.atr;if(n.forEach(e=>{e.classList.remove("active")}),e.target.classList.add("active"),"up"===a)return localStorage.setItem("prev",1),localStorage.setItem("next",-1),localStorage.setItem("secondSort",a),void window.location.reload();localStorage.setItem("prev",-1),localStorage.setItem("next",1),localStorage.setItem("secondSort",a),window.location.reload()}));let E="Sort by",L="View",x="Name",h="Age",j="Ascending",A="Descending",T="Table",B="Previre",q="Сортировка",k="Вид",$="Имя",D="Возраст",M="По Возрастанию",H="По Убыванию",C="Таблица",N="Превью";function O(){document.getElementById("name").insertAdjacentText("afterbegin",$),document.getElementById("age").insertAdjacentText("afterbegin",D),document.getElementById("up").insertAdjacentText("afterbegin",M),document.getElementById("down").insertAdjacentText("afterbegin",H),document.getElementById("table").insertAdjacentText("afterbegin",C),document.getElementById("preview").insertAdjacentText("afterbegin",N),document.querySelector(".sort__title").insertAdjacentText("afterbegin",q),document.querySelector(".view__title").insertAdjacentText("afterbegin",k)}function J(){document.getElementById("name").insertAdjacentText("afterbegin",x),document.getElementById("age").insertAdjacentText("afterbegin",h),document.getElementById("up").insertAdjacentText("afterbegin",j),document.getElementById("down").insertAdjacentText("afterbegin",A),document.getElementById("table").insertAdjacentText("afterbegin",T),document.getElementById("preview").insertAdjacentText("afterbegin",B),document.querySelector(".sort__title").insertAdjacentText("afterbegin",E),document.querySelector(".view__title").insertAdjacentText("afterbegin",L)}function P(){I.forEach(e=>e.textContent="")}!function(){if("en"==u)return void J(P());O(P())}(),y.addEventListener("click",(function(e){if(P(),e.preventDefault(),[...y.children].forEach(e=>{e.classList.remove("active")}),e.target.classList.add("active"),"ru"==e.target.dataset.atr)return localStorage.setItem("language","ru"),void O();localStorage.setItem("language","en"),J()})),document.querySelector(".content").addEventListener("click",(function(e){console.log(this)})),function(e){let t=new XMLHttpRequest;t.open("get","js/data.json"),t.addEventListener("load",()=>{if(200!==t.status)return void console.log("Error",t.status);let n=JSON.parse(t.responseText);e(n)}),t.send()}((function(e){e.length&&function(e){"id"===d?e.sort(function(e){e.sort((e,t)=>e.id>t.id?r:s)}(e)):"name"===d?function(e){e.sort((e,t)=>e.name.en>t.name.en?r:s)}(e):function(e){e.sort((e,t)=>e.age>t.age?r:s)}(e);let t=e.reduce((e,t)=>e+function(e){return`\n        <div class="content__wrap-table">\n            <div class="content__image-table">\n                <svg class="icon">\n                    <use xlink:href="#${e.image}"></use>\n                </svg>\n            </div>\n            <div class="content__name-table">\n                ${e.name.en}\n            </div>\n            <div class="content__age-table">\n                ${e.age}\n            </div>\n            <div class="content__phone-table">\n                ${e.phone}\n            </div>\n            <div class="content__favorit-table">\n                <svg class="favorite-icon">\n                    <use xlink:href="#star-regular"></use>\n                </svg>\n            </div>\n        </div>\n        `}(t),"");n.insertAdjacentHTML("afterbegin",t);let a=e.reduce((e,t)=>e+function(e){return`\n            <div class="content__preview shadow">\n                <div class="content__box">\n                    <div class="row">\n                        <div class="content__image">\n                            <svg class="icon">\n                                <use xlink:href="#${e.image}"></use>\n                            </svg>\n                        </div>\n                        <div class="content__name">\n                        ${e.name.en}\n                        </div>\n                        <div class="content__favorit">\n                            <svg class="favorite-icon">\n                                <use xlink:href="#star-regular"></use>\n                            </svg>\n                        </div>\n                    </div>           \n                    <div class="content__preview-age">\n                    ${e.age}\n                        <span>лет</span>\n                    </div>\n                    <div class="content__preview-phone">\n                    ${e.phone}\n                    </div>\n                    <div class="content__preview-discription">\n                    ${e.phrase.en}\n                    </div>\n                </div> \n                \n               \x3c!-- <div class="video-box" v-if="'>\n                    <video controls="controls">\n                        <source src="img/${e.video}.mp4" type='video/mp4;'>\n                    </video>\n                </div> --\x3e\n               \n            </div>\n            `}(t),"");o.insertAdjacentHTML("afterbegin",a)}(e)}))});