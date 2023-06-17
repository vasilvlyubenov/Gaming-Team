const Game = require('../models/Game');

exports.create = (gameData) => Game.create(gameData); 

exports.getAll = async (search, searchPlatrorm) => {
    let result = await Game.find().lean();

    if (search) {
        result = result.filter(x => x.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    }

    if (searchPlatrorm) {
        result = result.filter(x => x.platform.toLocaleLowerCase() === searchPlatrorm.toLocaleLowerCase());
    }
    
    return result;
};

exports.findbyId = (gameId) => Game.findById(gameId);

exports.delete = (gameId) => Game.findByIdAndDelete(gameId);

exports.update= (gameId, data) => Game.findByIdAndUpdate(gameId, data);