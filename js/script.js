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

