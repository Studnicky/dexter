const Discord = require('discord.js');
const config = require('../../../../config');
const utils = require('../utils');
function getNextChain(currentLink, currentChain) {
	const currentName = currentLink['species']['name'];

	const newChain = [...currentChain, currentName];
	const hasNextLink = currentLink.hasOwnProperty('evolves_to') && currentLink['evolves_to'].length;

	const newChainBranches = hasNextLink
		? currentLink['evolves_to'].map((nextLink) => {
				//  Clone new array at current chain link
				const nextChain = getNextChain(nextLink, newChain);
				return nextChain;
		  }).flat()
		: [newChain];

	return [...newChainBranches];
}

function parseEvolutionsChain(name, evolutions) {
	const evolutionChains = getNextChain(evolutions.chain, []);
	const sortedChains = sortEvolutionChains(name, evolutionChains);

	return sortedChains;
}

function sortEvolutionChains(name, evolutionChains) {
	return evolutionChains.reduce(
		(sorted, chain) => {
			const sortLabel = chain.includes(name) ? 'direct' : 'related';
			sorted[sortLabel].push(chain);
			return sorted;
		},
		{
			direct: [],
			related: []
		}
	);
}

function discord(pokemonSpecies, pokemonStats, evolutions) {
	const { name } = pokemonSpecies;
	const { types, sprites } = pokemonStats;

	const primaryType = types.find((type) => {
		return type.slot === 1;
	})['type']['name'];

	const { direct, related } = parseEvolutionsChain(name, evolutions);
	const hasDirect = direct.length;
	const hasRelated = related.length;
	const hasEvolutions = hasDirect || hasRelated;

	const embed = new Discord.MessageEmbed()
		.setTitle(`Evolutions info for: ${utils.toCap(name)}`)
		.setThumbnail(sprites.front_default)
		.setColor(config.theme.typeToColor[primaryType]['color'])
		.setFooter('Provided by PokéAPI' /*, optional icon */)
		.setTimestamp();

	if (hasEvolutions === false) {
		embed.addField(`No Evolution Families`, `${utils.toCap(name)} does not evolve.`);
	}
	if (hasDirect) {
		const title = 'Direct Evolution Families:';
		const body = direct
			.map((family) => {
				return family
					.map((name) => {
						return utils.toCap(name);
					})
					.join(' ⮕ ');
			})
			.join('\n');
		embed.addField(title, body, false);
	}
	if (hasRelated) {
		const title = 'Related Evolution Families:';
		const body = related
			.map((family) => {
				return family
					.map((name) => {
						return utils.toCap(name);
					})
					.join(' ⮕ ');
			})
			.join('\n');
		embed.addField(title, body, false);
	}

	return { embed };
}

module.exports = {
	discord
};
