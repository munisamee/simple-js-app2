/** Add new pokemon repository here */

let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon
        ) {
            pokemonList.push(pokemon);
        }else {
            console.log('pokemon is not correct');
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonUList = document.querySelector('.list-group');
        let pokemonListItem = document.createElement('li');
        pokemonListItem.classList.add('group-list-item');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-block');

        button.setAttribute('data-target', '#pokemonModal');
        button.setAttribute('data-toggle', 'modal');

        pokemonListItem.appendChild(button);
        pokemonUList.appendChild(pokemonListItem);
        button.addEventListener('click', function () 
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
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    /** Here add loadDetails function */
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.id = details.id;
            item.imageUrl = details.sprites.other.dream_world.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
            item.abilities = details.abilities;
        }).catch(function (e) {
            console.error(e);
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


    let modalContainer = document.querySelector('#modal-container');
    function showModal(name, height) {
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innetText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = name;

        let contentElement = document.createElement('p');
        contentElement.innerText = 'Pokemon height:' +height;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);


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

            let confirmButton = document.createElement('button');
            confirmButton.classList.add('modal-confirm');
            confirmButton.innerText = 'Confirm';

            let cancelButton = document.createElement('button');
            cancelButton.classList.add('modal-cancel');
            cancelButton.innerText = 'Cancel';

            modal.appendChild(confirmButton);
            modal.appendChild(cancelButton);

            confirmButton.focus();
            return new Promise((resolve, reject) => {
                cancelButton.addEventListener('click, hideModal');
                confirmButton.addEventListener('click', () => {
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














