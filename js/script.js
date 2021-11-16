/** Add new pokemon repository here */

let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    /**New function */

    function getAll() {
        return pokemonList;
    }

    /**New function which populates pokemon with correct keys then adds it to the linl */

    function add(pokemon) {
        if ((typeof pokemon === 'object') && 'name' in pokemon && 'detailsUrl' in pokemon) {
            pokemonList.push(pokemon);
        }
        else {
            console.error('Pokemon does nnot have required values');
        }
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
            showModal(pokemon);
        });
    }
/**function addEvent */

    function addEventListener(button, pokemon) {
        button.addEventListener('click', function (event){
            showDetails(pokemon);
        })
    }

/**function showMessage */
    
    function showLoadingMessage() {
        let loadingDiv = document.querySelector('.loading-message');
        let loadingText = document.createElement('h1');
        loadingText.classList.add('loading-text');
        loadingText.innerText = 'Loading...';
    }

/**function hideMessage */
 
    function hideLoadingMessage() {
        let loadingDiv = document.querySelector('.loading-message');
        let loadingText = document.querySelector('.loading-text');
        //**set time out can be changed/
        setTimeout(() => loadingDiv.removeChild(loadingText), 350);
    }

    /**Pokemon list is fetched from the link */

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then((response) => { return response.json() })
        .then((json) => {
            json.results.forEach((item) => {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
            hideLoadingMessage();
        })
        .catch((e) => {
            console.error(e);
            hideLoadingMessage();
        });
    }

    /**Link is called to get the spriteUrl. Then a list item containing a button which displays pokemon info */

    function addListItem(pokemon) {
        loadSprite(pokemon).then(() => {
            const { name, spriteUrl } = pokemon;


        let list = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        let pokemonButton = document.createElement('button');
        pokemonButton.classList.add('pokemon-button');
        pokemonButton.setAttribute('data-toggle', 'modal');
        pokemonButton.setAttribute('data-target', '#poke-modal');
        pokemonButton.innerHtml = `<img src="${spriteUrl}" alt="${name}"/>
        <p>${name}</p>`;

        listItem.appendChild(pokemonButton);
        list.appendChild(listItem);
        addEventListener(pokemonButton, pokemon);
    });
}

/**Function below serves to show details of pokemons which are retrieved from the spriteURl and they are displayed on the main list */

   async function loadSprite(pokemon) {
       let res = await fetch(pokemon.detailsUrl);
       let resData = await res.json();

       pokemon.spriteUrl = resData.sprites.front_default;
       return resData;
   }

   /**More details about pokemon are fetched here */

    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then((response) => { return response.json() })
        .then((details) => {
            pokemon.artUrl = details.sprites.other['official-artwork'].front_default;
            pokemon.id = details.id;
            pokemon.height = details.height;
            pokemon.weight = details.weight;
            pokemon.types = details.types;
        })
        .catch((e) => {
            console.error(e);
        });
    }

    /**Modal popup is created when pokemon is clicked */
      
     function showModal(pokemon) {
         let { name, artUrl, id, height, weight, types } = pokemon;

         id = String(id).padStart(3, '0');
         //convert values to feet and pounds
         height = convertHeight(height);
         weight = convertWeight(weight);

         let typeNames = getTypesNames(types);

         let modalTitle = document.querySelector(.'modal-title');
         let modalBody = document.querySelector('.modal-body');
         //clear modal
         modalBody.innerHTML = '';
         modalTitle.innerHTML = '';
         modalTitle.innerText = name + `#${id}`;

         let contentEl = document.createElement('div');
         contentEl.classList.add('pokemong-contect');
         contentEl.innerHTML = `<img src="${artUrl}" alt="${name}"/>`;

         let pokeInfoDiv = document.createElement('div');
         pokeInfoDiv.classList.add('pokemon-info');
         pokeInfoDiv.innerHTML = `
             <span class="height">Height: ${height}</span>
             <span class="weight">Weight: ${weight}</span>
         `;
     }

     /**creates individual spans for the types and adds the type name as a class to be targeted in the CSS */

        let typeSpanEl1 = document.createElement(`span`);
        let typeSpanEl2 = document.createElement(`span`);
        if (typeNames.includes(',')) {
            let typeArr = typeNames.split(',');
            typeSpanEl1.classList.add(typeArr[0]);
            typeSpanEl2.classList.add(typeArr[1].trim());
            typeSpanEl1.innerText = typeArr[0];
            typeSpanEl2.innerText = typeArr[1].trim();
            pokeInfoDiv.appendChild(typeSpanEl1);
            pokeInfoDiv.appendChild(typeSpanEl2);
        }
        else {
            typeSpanEl1.classList.add(typeNames);
            typeSpanEl1.innerText = typeNames;
            pokeInfoDiv.appencChid(typeSpanEl1);
        }

        contentEl.appendChild(pokeInfoDiv);
        modalBody.appendChild(contentEl);

    }

    //Modal formatiing

    function getTypeNames(tyoes) {
        if (types.length >1) {
            return `${types[0].type.name}`;
        }
        return `${types[0].type.name}`;
    } 
    
    function convertHeight(height) {
        // convert height to feet w/ decimal
        height = ((height / 10) * 3.28).toFixed(2);
        // separate out the decimal and convert to inches
        let whole = Math.floor(height);
        let dec = Math.round((height - whole) * 12);

        dec = String(dec).padStart(2, '0');
        let returnString = ``;
        // round up inches to the next foot
        returnString = dec === '12' ? `${whole + 1}' 00"` : `${whole}' ${dec}"`;

        return returnString;
    }

    function convertWeight(weight) {
        weight = ((weight / 10) * 2.2).toFixed(1);
        return weight % 1 === 0 ? Math.floor(weight) : weight;
    }

    // Diplays pokemon based on the search bar input
    let pokeSearchBar = document.querySelector('#filter');
    pokeSearchBar.addEventListener('input', () => {
        let pokeListItem = document.querySelectorAll('li');
        let filter = pokeSearchBar.value.toUpperCase();

        pokeListItem.forEach((listItem) => {
            if (listItem.innerText.toUpperCase().indexOf(filter) > -1) {
                listItem.style.display = '';
            } else {
                listItem.style.display = 'none';
            }
        });
    });

    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        addListItem: addListItem,
    };
});

let scrollButton = document.getElementById('btn-to-top');
scrollButton.addEventListener('click', toTop);
function toTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

pokemonRepository.loadList()
    .then(() => {
        pokemonRepository.getAll().forEach((pokemon) => pokemonRepository.addListItem(pokemon));
    })
    .catch((e) => console.error(`e`));
    
//     let pokemonUList = document.querySelector('.list-group');
//         let pokemonListItem = document.createElement('li');
//         pokemonListItem.classList.add('group-list-item');
//         let button = document.createElement('button');
//         button.innerText = pokemon.name;
//         button.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-block');

//         button.setAttribute('data-target', '#pokemonModal');
//         button.setAttribute('data-toggle', 'modal');

//         pokemonListItem.appendChild(button);
//         pokemonUList.appendChild(pokemonListItem);
//         button.addEventListener('click', function () 
//          {
//              showDetails(pokemon);
//         });
//     }
//    /**Function LoadList here */

//     function loadList() {
//         return fetch(apiUrl).then(function (response) {
//             return response.json();
//         }).then(function (json) {
//             json.results.forEach(function (item) {
//                 let pokemon = {
//                     name: item.name,
//                     detailsUrl: item.url
//                 };
//                 add(pokemon);
//             });
//         }).catch(function (e) {
//             console.error(e);
//         })
//     }



//     /** Here add loadDetails function */
//     function loadDetails(item) {
//         let url = item.detailsUrl;
//         return fetch(url).then(function (response) {
//             return response.json();
//         }).then(function (details) {
//             item.id = details.id;
//             item.imageUrl = details.sprites.other.dream_world.front_default;
//             item.height = details.height;
//             item.weight = details.weight;
//             item.types = details.types;
//             item.abilities = details.abilities;
//         }).catch(function (e) {
//             console.error(e);
//         });
//     }
    
//     return {
//         add: add,
//         getAll: getAll,
//         addListItem: addListItem,
//         loadList: loadList,
//         loadDetails: loadDetails,
//         showDetails: showDetails
//     };
// })();

// pokemonRepository.loadList().then(function() {
// pokemonRepository.getAll().forEach(function 
//     (pokemon) {
//     pokemonRepository.addListItem(pokemon);
// });
// });


//     let modalContainer = document.querySelector('#modal-container');
//     function showModal(name, height) {
//         modalContainer.innerHTML = '';
//         let modal = document.createElement('div');
//         modal.classList.add('modal');

//         let closeButtonElement = document.createElement('button');
//         closeButtonElement.classList.add('modal-close');
//         closeButtonElement.innetText = 'Close';
//         closeButtonElement.addEventListener('click', hideModal);

//         let titleElement = document.createElement('h1');
//         titleElement.innerText = name;

//         let contentElement = document.createElement('p');
//         contentElement.innerText = 'Pokemon height:' +height;

//         modal.appendChild(closeButtonElement);
//         modal.appendChild(titleElement);
//         modal.appendChild(contentElement);
//         modalContainer.appendChild(modal);


//         modalContainer.classList.add('is-visible');
//         }

//         let dialogPromiseReject;

//         /**Function Hide Here */

//         function hideModal() {
//             let modalContainer = document.querySelector('#modal-container');
//             modalContainer.classList.remove('is-visible');

//             if (dialogPromiseReject) {
//                 dialogPromiseReject();
//                 dialogPromiseReject = null;
//             }
//         }

//         function showDialog(name, height) {
//             showModal(name, height);

//             let modal = modalContainer.querySelector('.modal');

//             let confirmButton = document.createElement('button');
//             confirmButton.classList.add('modal-confirm');
//             confirmButton.innerText = 'Confirm';

//             let cancelButton = document.createElement('button');
//             cancelButton.classList.add('modal-cancel');
//             cancelButton.innerText = 'Cancel';

//             modal.appendChild(confirmButton);
//             modal.appendChild(cancelButton);

//             confirmButton.focus();
//             return new Promise((resolve, reject) => {
//                 cancelButton.addEventListener('click, hideModal');
//                 confirmButton.addEventListener('click', () => {
//                     dialogPromiseReject = null;
//                     hideModal();
//                     resolve();
//                 });
//                 dialogPromiseReject = reject;
//             })
//         }

//         // document.querySelector('#show-dialog')
//         // .addEventListener('click', () => {
//         //     showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
//         //         alert('confirm!');
//         //     },() => {
//         //         alert('not confirmed');
//         //     });
//         // });

//         window.addEventListener('keydown', (e) => {
//             if (e.key === 'Escape' &&
//             modalContainer.classList.contains('is-visible')) 
//             {
//                 hideModal();
//             }
//         });
//         modalContainer.addEventListener('click', (e) => {
//             let target = e.target;
//             if (target === modalContainer) {
//                 hideModal();
//             }
//         });

//         document.querySelector('#show-modal')
//         .addEventListener('click', () => {
//             showModal('Pokemon name', 'Pokemon height');
//         });














