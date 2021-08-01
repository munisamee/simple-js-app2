let pokemonList = [{name: "bulbasaur", height: "7", type: ["grass", "poison"],
name: "pidgey", height: "3", type: ["flying", "normal"],
name: "pikachu", height: "4", type: "electric"}]


for (let i=0; i < pokemonList.length; i++){
    if (pokemonList[i].height < 10 && pokemonList[i].height > 4) {
        document.write(pokemonList[i].name + "Bulbasaur (height: 7)");
        console.log(pokemonList[i].name + " Wow that's big")
    }else if (pokemonList[i].height < 6) {
        document.write(pokemonList[i].name + "Pidgey (height: 3)");
    }else {
        document.write(pokemonList[i].name + "Pikachu (height: 4)");
    }
}