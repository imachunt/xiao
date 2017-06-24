const Command = require('../../structures/Command');
const Canvas = require('canvas');
const snekfetch = require('snekfetch');
const { promisifyAll } = require('tsubaki');
const fs = promisifyAll(require('fs'));
const path = require('path');

module.exports = class DexterCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dexter',
            group: 'avatar-edit',
            memberName: 'dexter',
            description: 'Draws a user\'s avatar over Dexter from Pokémon\'s screen.',
            throttling: {
                usages: 1,
                duration: 30
            },
            clientPermissions: ['ATTACH_FILES'],
            args: [
                {
                    key: 'user',
                    prompt: 'Which user would you like to edit the avatar of?',
                    type: 'user',
                    default: ''
                }
            ]
        });
    }

    async run(msg, args) {
        const user = args.user || msg.author;
        const avatarURL = user.displayAvatarURL({
            format: 'png',
            size: 256
        });
        const Image = Canvas.Image;
        const canvas = new Canvas(744, 554);
        const ctx = canvas.getContext('2d');
        const base = new Image();
        const avatar = new Image();
        const generate = () => {
            ctx.drawImage(base, 0, 0);
            ctx.rotate(-11 * Math.PI / 180);
            ctx.drawImage(avatar, 234, 274, 225, 225);
            ctx.rotate(11 * Math.PI / 180);
        };
        base.src = await fs.readFileAsync(path.join(__dirname, '..', '..', 'assets', 'images', 'dexter.png'));
        const { body } = await snekfetch.get(avatarURL);
        avatar.src = body;
        generate();
        return msg.say({ files: [{ attachment: canvas.toBuffer(), name: 'dexter.png' }] });
    }
};