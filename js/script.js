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

for (let i = 0; i < pokemonList.length; i++){
    console.log("pokemonList", pokemonList[i].name);

    if (pokemonList[i].height > 10) {
        document.write(
            pokemonList[i].name + "Bulbasaur (height: 7) Wow that's big", 
            "<br"
            );
    }else if (pokemonList[i].height < 6) {
        document.write(pokemonList[i].name + "Pidgey (height: 3)", "<br>");
    }else {
        document.write(pokemonList[i].name + "Pikachu (height: 4)", "<br>");
    }
}