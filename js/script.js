/** Add new pokemon repository here */

let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon
        ) {
            pokemonList.push(pokemon);
        }else {
            console.log("pokemon is not correct");
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector 
        (".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener("click", function (event) 
         {
             showDetails(pokemon);
        });
    }
   /**Function LoadList here */

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    /** Here add loadDetails function */
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then
        (function () {
            console.log(item);
        });
    }

    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function 
    (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
});


    let modalContainer = document.querySelector
    ('#modal-container');
    function showModal(title, text) {
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.classList.add('modal-close');
        closeButtonElement.innetText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentELement);
        modalContainer/appendChild(modal);


        modalContainer.classList.add('is-visible');
        }

        let dialogPromiseReject;

        /**Function Hide Here */

        function hideModal() {
            let modalContainer = document.querySelector('#modal-container');
            modalContainer.classList.remove('is-visible');

            if (dialogPromiseReject) {
                dialogPromiseReject();
                dialogPromiseReject = null;
            }
        }

        function showDialog(name, height) {
            showModal(name, height);

            let modal = modalContainer.querySelector('.modal');

            let confirmButton = document.createElement
            ('button');
            confirmButton.classList.add('modal-confirm');
            confirmButton.innerText = 'Confirm';

            let concelButton = document.createElement
            ('button');
            cancelButton.classList.add('modal-cancel');
            cancelButton.innerText = 'Cancel';

            modal.appendChild(confirmButton);
            modal.appendChild(cancelButton);

            confirmButton.focus();
            return new Promise((resolve, reject) => {
                cancelButton.addEventListener('click, hideModal');
                confirmButtton.addEventListener('click', () => {
                    dialogPromiseReject = null;
                    hideModal();
                    resolve();
                });
                dialogPromiseReject = reject;
            })
        }

        document.querySelector('#show-dialog')
        .addEventListener('click', () => {
            showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
                alert('confirm!');
            },() => {
                alert('not confirmed');
            });
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' &&
            modalContainer.classList.contains('is-visible')) 
            {
                hideModal();
            }
        });
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });

        document.querySelector('#show-modal')
        .addEventListener('click', () => {
            showModal('Pokemon name', 'Pokemon height');
        });

    













