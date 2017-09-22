const Command = require('../../structures/Command');

module.exports = class CoolnessCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'coolness',
			group: 'random',
			memberName: 'coolness',
			description: 'Determines your coolness.',
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to determine the coolness of?',
					type: 'user',
					default: ''
				}
			]
		});
	}

	run(msg, { user }) {
		if (!user) user = msg.author;
		const coolness = msg.author.id / this.client.user.id;
		const prefix = user.id === msg.author.id ? 'You\'re' : 'They\'re';
		if (coolness < 0.3) return msg.reply(`${prefix} the coolest being to walk this Earth.`);
		if (coolness < 0.5) return msg.reply(`${prefix} an extremely cool dude.`);
		if (coolness < 0.8) return msg.reply(`${prefix} pretty sweet, not gonna lie.`);
		if (coolness < 1) return msg.reply(`${prefix} okay, nothing special.`);
		if (coolness < 1.3) return msg.say(`${prefix} just not all that neat.`);
		return msg.say(`${prefix} awful, honestly.`);
	}
};