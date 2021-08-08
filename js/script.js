let pokemonList = [
{
    name: "bulbasaur", 
    height: "0.7", 
    type: ["grass", "poison"],
},

{
    name: "pidgey", 
    height: "1.7", 
    type: ["flying", "normal"],
},

{
    name: "pikachu", 
    height: "44", 
    type: "electric",
}
]

/** Here add for loop for all pokemons! */

pokemonList.forEach(function(pokemon) {
    console.log(pokemonList[i].name + ' is' + pokemonList[i].height + ' cm' + pokemonList[i].type + ' ');
});


function pokemonList() {
    let pokemonList = {};
}
console.log(pokemonList);

let pokemonRepository = (function () {
    let pokemonList = [];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
})();


