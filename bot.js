const tmi = require('tmi.js');
const client = new tmi.Client({
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: 'korreeanbot',
		password: 'oauth:43mfcjt10vpsb15vproh1juqibzvki'
	},
	channels: [ 'youngkorreean' ]
});

Schandeinterval = null;
Instainterval = null;
BotOnline = null;
let deathCount = 0;

client.connect();

client.on('connected', (channel) => {
    //client.say(channel, `KorreeanBot eingereist!`);
    console.log(`BOT Joined!`);
});

client.on('error', err => {
    console.log(err);
});

client.on('subscription', (channel, username) => {
    if(BotOnline === true) {
        subscription(channel, username);
    }
});

client.on('resub', (channel, username, streakMonths) => {
    if(BotOnline ===  true) {
        resub(channel, username, streakMonths);
    }
});

client.on('cheer', (channel, userstate, username) => {
    if(BotOnline ===  true) {
        cheer(channel, userstate, username);
    }
});

client.on('hosted', (channel, username, viewers) => {
    if(BotOnline === true) {
        hosted(channel, username, viewers);
    }
});

client.on('raided', (channel, username, viewers) => {
    if(BotOnline === true)  {
        raided(channel, username, viewers);
    }
});

client.on('message', (channel, tags, message, self, streakMonths, userstate, username, viewers) => {
    if(self) {
        return;
    }
    if(message === '!start') {
        client.say(channel, '/me korreeanBot initiated! youngk20SCHANDE');
        if(Instainterval === null) {
            StartInstainterval(channel);
        }
        if(Schandeinterval === null) {
            StartSchandeinterval(channel);
        }
        BotOnline = true;
    }
});

client.on('message', (channel, tags, message, self, streakMonths, userstate, username, viewers) => {
    if(self) {
        return;
    }
    if(BotOnline === true) {
        if(message === '!sub') {
            client.say(channel, `/me @${tags.username}, du kannst mich unter https://www.twitch.tv/products/youngkorreean abonnieren um mich zu unterstützen!`);
        }
        else if(message === '!prime') {
            client.say(channel, `/me @${tags.username}, sehr gerne darfst du auch deinen Twitch Prime Sub bei mir lassen!`);
        }
        else if(message === '!donate') {
            client.say(channel, `/me @${tags.username}, Du kannst youngkorreean über den folgenden Link tippen: https://StreamElements.com/youngkorreean/tip`); 
        }
        else if(message === '!insta') {
            client.say(channel, `/me Follow my insta 📷 www.instagram.com/maxim_jun 📷`);
        }
        else if(message === '!elektriker') {
            client.say(channel, '/me Sascha?');
        }
        else if(message === '!zusteller') {
            client.say(channel, '/me Luan?');
        }
        else if(message === '!testsub') {
            subscription(channel, tags.username);
        }
        else if(message === '!testresub') {
            resub(channel, tags.username, streakMonths);
        }
        else if(message === '!testcheer') {
            cheer(channel, userstate, tags.username);
        }
        else if(message === '!testhost') {
            hosted(channel, tags.username, viewers);
        }
        else if(message === '!testraid') {
            raided(channel, tags.username, viewers);
        }
        else if(message === '!stop') {
            client.say(channel, '/me korreeanBot stopped! youngk20SCHANDE');
            if(Schandeinterval != null)  {
                StopSchandeinterval();
            }
            if(Instainterval != null) {
                StopInstainterval();
            }
            BotOnline = false;
            deathCount = 0;
        }
        // else if(message === '!commands') {
        //     client.say(channel, `/me @${tags.username}, eine Liste aller Befehle findest du hier: https://lucakohls.de/korreanBot`);
        // }
        else if(message === '!res') {
            client.say(channel, `/me @${tags.username}, youngkorreean spielt fast jedes Spiel in 1920x1080 mit 144hz`);
        }
        else if(message === '!cam') {
            client.say(channel, `/me @${tags.username}, youngkorreean nutzt die Sony Alpha 5100`);
        }
        else if(message === '!mic') {
            client.say(channel, `/me @${tags.username}, youngkorrean nutzt das Blue Yeti`);
        }
        else if(message === '!schande') {
            client.say(channel, `youngk20SCHANDE`);
        }
        else if(message === '!tod') {
            if(userstate.mod) {
                deathCount++;
                console.log("Jemand ist gestorben, nun sind es " + deathCount + " Tode! Vollidioten");
            }
        }
        else if(message === '!death') {
            client.say(channel, "/me In der Heist sind wir heute schon " + deathCount + " Mal gestorben!");
        }
        else if(message === '!reset') {
            if(userstate.mod) {
                deathCount = 0;
                console.log(`Death Counter zurückgesetzt!`);
            }
        }
        else if(message === '!dev') {
            client.say(channel, "/me Der Bot wird mit der freundlichen Unterstützung von onemanpublisher (https://www.onemanpublisher.com) erstellt und gehostet!");
        }
    } else {
        return;
    }
});


client.on('message', (channel, userstate, message, self, tags) => {
    // Don't need to check the client's sent  messages, avoiding a loop
    // A message without a starting "!" may not be worth parsing
    if (self || message[0] !== '!') {
        return;
    }
    if(BotOnline === true) {
        if(userstate.mod) {
            // Skip the "!" and split every word into an array
            let params = message.slice(1).split(' ');
            // The first parameter can be removed and lowercased for the command name
            let command = params.shift().toLowerCase();
            // Somehow determine which command function to use. For simplicity I'm using an if statement here, but there are better choices. Make sure to check permissions
            if(command === 'sub2') {
                // Contact database to check for params[0] (with necessary input sanitization, lowercased, !-removal, etc.) as a pre-existing command in this channel (room-id)
                // Add the new command, params.slice(1).join(' ') as the reply text, 'room-id' from the userstate as the channel ID, other metadata like the creator's ID from the userstate, minimum permission, timestamp, usage count, etc.)
                // client.say(channel, "@" + params.slice(2) + " test!")
                client.say(channel, "/me @" + message.slice(6) + " du kannst mich unter https://www.twitch.tv/products/youngkorreean abonnieren um mich zu unterstützen!")
            }
            // Add checks for other hard-coded commands
            else if(command === 'prime2') {
                client.say(channel, "/me @" + message.slice(8) + " sehr gerne darfst du auch deinen Twitch Prime Sub bei mir lassen!")
            }
            else if(command === 'donate2') {
                client.say(channel, "/me @" + message.slice(9) + " Du kannst youngkorreean über den folgenden Link tippen: https://StreamElements.com/youngkorreean/tip")
            }
        }
    } else  {
        return;
    }
});

function subscription(channel, username) {
    client.say(channel, `/me @${username} hat gerade Subscribed! Willkommen du Virgin!`);
}

function resub(channel, username, streakMonths) {
    client.say(channel, `/me @${username} hat gerade zum ${streakMonths} gesubbed!`);
}

function cheer(channel, userstate, username) {
    client.say(channel, `/me @${username} hat gerade ${userstate} gecheert!`);
}

function hosted(channel, username, viewers) {
    client.say(channel, `/me @${username} hostet nun mit ${viewers}!`);
}

function raided(channel, username, viewers) {
    client.say(channel, `/me @${username} raided nun mit ${viewers}! Danke dafür!`);
}

function StartSchandeinterval(channel) {
    Schandeinterval = setInterval(function(){ Schandepush(channel); }, 1200000);
}

function StopSchandeinterval() {
    clearInterval(Schandeinterval);
    Schandeinterval = null;
}

function StartInstainterval(channel) {
    Instainterval = setInterval(function(){ Instapush(channel); }, 600000);
}

function StopInstainterval() {
    clearInterval(Instainterval);
    Instainterval = null;
}

function Instapush(channel) {
    client.say(channel, `/me Follow my insta 📷 www.instagram.com/maxim_jun 📷`);
}

function Schandepush(channel) {
    client.say(channel, `/me youngk20SCHANDE youngk20SCHANDE youngk20SCHANDE youngk20SCHANDE youngk20SCHANDE`)
}
