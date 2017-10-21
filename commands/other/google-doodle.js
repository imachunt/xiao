const { Command } = require('discord.js-commando');
const snekfetch = require('snekfetch');

module.exports = class GoogleDoodleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'google-doodle',
			group: 'other',
			memberName: 'google-doodle',
			description: 'Responds with a Google doodle, either the latest or a random one from a specific month/year.',
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'month',
					prompt: 'What month would you like to get doodles for?',
					type: 'integer',
					default: 'latest',
					validate: month => {
						if (month < 13 && month > 0) return true;
						return 'Invalid month, please enter a number from 1-12.';
					}
				},
				{
					key: 'year',
					prompt: 'What year would you like to get doodles for?',
					type: 'integer',
					default: ''
				}
			]
		});
	}

	async run(msg, { month, year }) {
		const latest = month === 'latest';
		if (latest) month = new Date().getMonth() + 1;
		if (!year) year = new Date().getFullYear();
		try {
			const { body } = await snekfetch.get(`https://www.google.com/doodles/json/${year}/${month}`);
			if (!body.length) return msg.say('Could not find any results.');
			const data = body[latest ? 0 : Math.floor(Math.random() * body.length)];
			return msg.say(data.share_text, { files: [`https:${data.url}`] });
		} catch (err) {
			return msg.say(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};