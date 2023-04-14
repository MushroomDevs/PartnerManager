const { Client, Intents, MessageEmbed, WebhookClient } = require('discord.js-selfbot-v13');
const fs = require('fs');

const client = new Client();
const channels = ['946242935324823553', '755523801931841700', '1020787601906610234', '1068844787660242974', '1083259210961268806', '991272988467011695', '976442714512052234', '951784748483772426', '908104160908550164', '1069999627069304963', '1068801298671079527', '1063765732707549234', '1071780449015304202', '1054234395059437598', '1075811582489149582', '1088556163156688966', '1006953952279007403', '1023245554303651961', '1081598390946779186', '1051438820169613383', '1091238190863613962', '1011307902985830530'];
const messageFiles = ['./ayuji.txt', './mizushi.txt', './nightroom.txt', './asuu.txt', './miruki.txt', './kyushu.txt', './akina.txt', './mdgs.txt', './lesrenards.txt', './ayume.txt', './komi.txt', './sakana.txt', './nymphea.txt', './teyvat.txt', './romance.txt', './yumii.txt', './fuyu.txt', './mayko.txt', './yukiria.txt', './animefrance.txt', './kaori.txt'];
const sentMessages = {};
const webhookClient = new WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);

async function sendMessage(channel, message) {
    try {
        await channel.send(message);
    } catch (error) {
        const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Erreur lors de l\'envoi du message')
            .setDescription(`Salon : ${channel.name}\nID du salon : ${channel.id}\nServeur : ${channel.guild.name}\nErreur : ${error}`);
        webhookClient.send({ embeds: [embed] });
    }
}

function sendMessageFromFile(channel, messageFile) {
    fs.readFile(messageFile, 'utf8', (err, data) => {
        if (err) {
            const embed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Erreur lors de la lecture du fichier')
                .setDescription(`Salon : ${channel.name}\nID du salon : ${channel.id}\nServeur : ${channel.guild.name}\nErreur : ${err}`);
            webhookClient.send({ embeds: [embed] });
            return;
        }
        if (!sentMessages[channel.id] || !sentMessages[channel.id].includes(data)) {
            sendMessage(channel, data);
            if (!sentMessages[channel.id]) {
                sentMessages[channel.id] = [];
            }
            sentMessages[channel.id].push(data);
        }
    });
}

client.login(process.env.TOKEN);

client.once('ready', () => {
    console.log('Ready!');
    setInterval(() => {
        channels.forEach(channelId => {
            const channel = client.channels.cache.get(channelId);
            if (!channel) {
                const embed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Salon non trouvé')
                    .setDescription(`ID du salon : ${channelId}`);
                    webhookClient.send({ embeds: [embed] });
                return;
                }
            const randomIndex = Math.floor(Math.random() * messageFiles.length);
            const messageFile = messageFiles[randomIndex];
            sendMessageFromFile(channel, messageFile);
            });
        }, 1800000);
    });

client.on('error', error => {
    console.error('The websocket connection encountered an error:', error);
    });

client.on('warn', warning => {
    console.warn('Warning:', warning);
    });

client.on('disconnect', event => {
    console.log(`Disconnected (${event.code})`);
    });

client.on('reconnecting', () => {
    console.log('Reconnecting...');
    });

client.on('resume', replayed => {
    console.log(`Resumed (${replayed} events replayed)`);
    });

client.on('message', message => {
    if (message.content === 'grjjnj') {
        message.channel.send('Pong!');
        }
    });
