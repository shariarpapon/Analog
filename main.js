require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const commandPrefix = '--';
const seperator = ' ';
const token = process.env.DISCORD_TOKEN;
const xen = require("analog-modules/xEncryptor");

client.login(token);
client.on('ready', ()=>{ console.log('Analog is now online!'); })
client.on('messageCreate', async (msg) => { if (msg.content.startsWith(commandPrefix)) await onCommand(msg); })

async function onCommand(msg) {

    let args = await parseArguments(msg.content);
    let cmd = args[0];
    let tempArgs = args.filter(function (item) { return item !== cmd });
    args = tempArgs.join().split(seperator);

    var response;

    switch (cmd) {
        case "encrypt": case "en": case "e": 
            response = await xen.encrypt(args.join()); //encrypt data
            break;
        case "decrypt": case "de": case "d":
            response = (await xen.decrypt(args.join())).replace(/,/g, ' '); //decrypt data
            break;

        case "log":
            response = "Logging " + msg.author.username + "'s data"
            break;
            
        default:
            response = "Invalid command with arguments : " + args.join();
            break;
    }

    let res_embed = new Discord.MessageEmbed().setTitle("").setColor('#aedc7d').setDescription(response);
    response = { embeds: [res_embed] };
    await msg.channel.send(response);
}

async function parseArguments(msgContent)
{
    args = msgContent.replace('--', '');
    args = args.split(/\s+/).join(' ');
    var argArray = args.split(' ');
    return argArray;
}