let pokemonRepository=function(){let e=[],t="https://pokeapi.co/api/v2/pokemon/?limit=150";function n(t){"object"==typeof t&&"name"in t?e.push(t):console.log("pokemon is not correct")}function o(e){i(e).then(function(){showModal(e)})}function i(e){let t=e.detailsUrl;return fetch(t).then(function(e){return e.json()}).then(function(t){e.id=t.id,e.imageUrl=t.sprites.other.dream_world.front_default,e.height=t.height,e.weight=t.weight,e.types=t.types,e.abilities=t.abilities}).catch(function(e){console.error(e)})}return{add:n,getAll:function(){return e},addListItem:function(e){let t=document.querySelector(".list-group");document.createElement("li"),pokemonListItem.classList.add("group-list-item");let n=document.createElement("button");n.innerText=e.name,n.classList.add("btn","btn-primary","btn-lg","btn-block"),n.setAttribute("data-target","#pokemonModal"),n.setAttribute("data-toggle","modal"),pokemonListItem.appendChild(n),t.appendChild(pokemonListItem),n.addEventListener("click",function(){o(e)})},loadList:function(){return fetch(t).then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){n({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:i,showDetails:o}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});let dialogPromiseReject,modalContainer=document.querySelector("#modal-container");function showModal(e,t){modalContainer.innerHTML="";let n=document.createElement("div");n.classList.add("modal");let o=document.createElement("button");o.classList.classList.add("modal-close"),o.innetText="Close",o.addEventListener("click",hideModal);let i=document.createElement("h1");i.innerText=title,document.createElement("p").innerText=text,n.appendChild(o),n.appendChild(i),n.appendChild(contentELement),appendChild(n),modalContainer.classList.add("is-visible")}function hideModal(){document.querySelector("#modal-container").classList.remove("is-visible"),dialogPromiseReject&&(dialogPromiseReject(),dialogPromiseReject=null)}function showDialog(e,t){showModal(e,t);let n=modalContainer.querySelector(".modal"),o=document.createElement("button");o.classList.add("modal-confirm"),o.innerText="Confirm";document.createElement("button");return cancelButton.classList.add("modal-cancel"),cancelButton.innerText="Cancel",n.appendChild(o),n.appendChild(cancelButton),o.focus(),new Promise((e,t)=>{cancelButton.addEventListener("click, hideModal"),confirmButtton.addEventListener("click",()=>{dialogPromiseReject=null,hideModal(),e()}),dialogPromiseReject=t})}document.querySelector("#show-dialog").addEventListener("click",()=>{showDialog("Confirm action","Are you sure you want to do this?").then(function(){alert("confirm!")},()=>{alert("not confirmed")})}),window.addEventListener("keydown",e=>{"Escape"===e.key&&modalContainer.classList.contains("is-visible")&&hideModal()}),modalContainer.addEventListener("click",e=>{e.target===modalContainer&&hideModal()}),document.querySelector("#show-modal").addEventListener("click",()=>{showModal("Pokemon name","Pokemon height")});