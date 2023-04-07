const { Client, Intents } = require('discord.js-selfbot-v13');
const fs = require('fs');

// Créer un client Discord avec les intents nécessaires
const client = new Client()

// Définir les identifiants des salons à envoyer les messages
const channels = ['946242935324823553', '755523801931841700', '1020787601906610234', '1068844787660242974', '1083259210961268806', '991272988467011695', '976442714512052234', '951784748483772426', '908104160908550164', '1069999627069304963', '1068801298671079527', '1063765732707549234', '1071780449015304202', '1054234395059437598', '1075811582489149582', '1088556163156688966', '1006953952279007403', '1023245554303651961', '1081598390946779186', '1051438820169613383', '1091238190863613962', '1011307902985830530']

// Liste des fichiers à envoyer dans chaque canal
const messageFiles = ['./ayuji.txt', './mizushi.txt', './nightroom.txt', './asuu.txt', './miruki.txt', './kyushu.txt', './akina.txt', './mdgs.txt', './lesrenards.txt', './ayume.txt', './komi.txt', './sakana.txt', './nymphea.txt', './teyvat.txt', './romance.txt', './yumii.txt', './fuyu.txt', './mayko.txt', './yukiria.txt', './animefrance.txt', './kaori.txt']

// Object contenant les messages déjà postés dans les canaux
const sentMessages = {}

// Fonction d'envoi de message
async function sendMessage(channel, message) {
    try {
        await channel.send(message)
    } catch (error) {
        console.log('Erreur lors de l\'envoi du message', error)
    }
}

// Fonction de récupération et d'envoi de message
function sendMessageFromFile(channel, messageFile) {
    fs.readFile(messageFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        // Vérifier si le contenu a déjà été envoyé dans ce canal
        if (!sentMessages[channel.id] || !sentMessages[channel.id].includes(data)) {
            sendMessage(channel, data);
            // Ajouter le contenu envoyé dans la liste des messages postés
            if (!sentMessages[channel.id]) {
                sentMessages[channel.id] = []
            }
            sentMessages[channel.id].push(data)
        }
    });
}

// Connectez-vous au client Discord en utilisant votre jeton bot
client.login(process.env.TOKEN)

client.once('ready', () => {
    console.log('Ready!')

    // Envoi des messages toutes les secondes
    setInterval(() => {
        channels.forEach(channelId => {
            const channel = client.channels.cache.get(channelId)
            if (!channel) {
                console.log('Salon non trouvé')
                return;
            }
            messageFiles.forEach(file => {
                sendMessageFromFile(channel, file)
            })
        })
    }, 1000)

    // Envoi des messages toutes les heures, suivi d'une pause de 24 heures
    setInterval(() => {
        channels.forEach(channelId => {
            const channel = client.channels.cache.get(channelId)
            if (!channel) {
                console.log('Salon non trouvé')
                return;
            }
            messageFiles.forEach(file => {
                sendMessageFromFile(channel, file)
            })
        })
    }, 3600000) // envoie toutes les heures (1000 millisecondes x 60 secondes x 60 minutes), suivi d'une pause de 24 heures 

})