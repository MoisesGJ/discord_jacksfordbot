const disc = require('discord.js');
const config = require("../config.json");
const Canvas = require('canvas');
const { registerFont } = require('canvas');
const fs = require('fs')
const fetch = require("node-fetch");

const cl = new disc.Client();

const TOKEN = config.token;
const PREFIX = config.prefix;


const disbut = require('discord-buttons');
disbut(cl); 


function Presencia() {
    cl.user.setPresence({
        status: "online",
        activity: {
           //name: "twitch.tv/JacKsFord01 || Usa &help",
           name: "twitch.tv/JacKsFord01",
           type: "WATCHING"
        }
     });
}

cl.on("ready", () => {
    console.log("\n|||||||CONECTADO|||||||\n");

    Presencia();
});

const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');

	let fontSize = 70;

	do {
        registerFont('comicsans.ttf', { family: 'Comic Sans' })
		context.font = `${fontSize -= 10}px "Comic Sans"`;
	} while (context.measureText(text).width > canvas.width - 300);

	return context.font;
};



cl.on('guildMemberAdd', async member => {

    const channel = member.guild.channels.cache.find(ch => ch.id === '816089545686253600');
	if (!channel) return;


    const canvas = Canvas.createCanvas(700, 250);
	const context = canvas.getContext('2d');

    const background = await Canvas.loadImage('./src/rec/imgs/wallpaperazul.jpg');
	
	context.drawImage(background, 0, 0, canvas.width, canvas.height);
	

    context.strokeStyle = '#74037b';
	context.strokeRect(0, 0, canvas.width, canvas.height);

    registerFont('comicsans.ttf', { family: 'Comic Sans' })

	context.font = '22px "Comic Sans"';
	context.fillStyle = '#ffffff';
	context.fillText('¬°BIENVENIDO A JACKSITOS :D,', canvas.width / 2.5, canvas.height / 3.5);

	context.font = applyText(canvas, `${member.displayName}!`);
	context.fillStyle = '#ffffff';
	context.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	context.beginPath();
	context.arc(125, 125, 100, 0, Math.PI * 2, true);
	context.closePath();
	context.clip();


    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	context.drawImage(avatar, 25, 25, 200, 200);
    const attachment = new disc.MessageAttachment(canvas.toBuffer(), 'bienvenida.png');


	const embedDatos = new disc.MessageEmbed() 
            .setTitle("Bienvenida ūüĖĖ")            
            .setColor('#6ABE45')
            .setDescription('Pssssst, pssssst... '+ `${member}`+', ¬°me alegra verte aqu√≠!\nTe ofrezco una grandiosa bienvenida a ¬ęJacKsitos :D¬Ľ.\n\nDeseo de todo coraz√≥n que disfrutes tu estancia, que te la pasas de lo mejor (y que no obtengas un game over :space_invader:)')
            .attachFiles(attachment)
            .setImage('attachment://bienvenida.png')
    
    channel.send(embedDatos);

    const perso = cl.channels.cache.get('820166316166086696')
    const reg = cl.channels.cache.get('816093109666185216')

    const embedDM = new disc.MessageEmbed() 
            .setTitle("No le digas a nadie, pero...")            
            .setColor('#6ABE45')                
            .setDescription('Puedes visitar los canales de '+`${perso}`+' y '+`${reg}`+', esto para mejorar tu experiencia en el servidor y con la comunidad en general. Agradecemos tu estancia y esperamos que la pases muy bien en JacKsitos :D')
            .addField("‚Äé      ‚ÄŹ‚ÄŹ‚Äé", "‚ÄéAtentamente: ***Administraci√≥n***")
    
    member.send(embedDM);
 });

 cl.on('guildMemberRemove', async member => {
    const embedDatos = new disc.MessageEmbed() 
            .setTitle("Adi√≥s...")            
            .setFooter("Te quiere la comunidad de JacKsitos :D", "https://i.ibb.co/qg1RsWY/cverde.png")
            .setColor('#6ABE45')
            .setDescription('Es una l√°stima que partas, recuerda que a pesar de todo... siempre tendr√°s una comunidad para ti.')
            
        member.send({ embed: embedDatos });

    const channel = member.guild.channels.cache.find(ch => ch.id === '852650863662989333');
	if (!channel) return;

    const canvas = Canvas.createCanvas(475, 475);
	const context = canvas.getContext('2d');

    const background = await Canvas.loadImage('./src/rec/imgs/wallpaperdp.jpg');
	
	context.drawImage(background, 0, 0, canvas.width, canvas.height);
	

    if (member.user.avatar == null) {        
        avatar = await Canvas.loadImage('./src/rec/imgs/avatar.png'); 
        x = 200;
        y = 420;
    }
    else {
        avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));  
        x = (canvas.width / 2 - avatar.width / 2) + 40;
        y = 410; 
    }
    

	context.drawImage(avatar, x, y, 50, 50);


    const attachment = new disc.MessageAttachment(canvas.toBuffer(), 'despedida.png');

	
    channel.send('', attachment);
});
  


cl.comand = new disc.Collection();
cl.uso = new disc.Collection();
let archv = fs.readdirSync('src/coms/').filter((f) => f.endsWith('.js'));


for (var archi of archv) {
    let comm = require('./coms/'+archi);
    cl.comand.set(comm.nombre, comm);
    console.log(archi + " => TRUE");
}


cl.on("message", async message => {
    
    if (message.author.bot && (message.content === '```Comando creado.```' || message.content === '```Ingresa un n√ļmero entre 2 y 99.```'
        || message.content === '```Mensajes eliminados.```')) {
        message.delete({ timeout: 5000 })
            .then(msg => console.log(`Mensaje eliminado de ${msg.author.username}`))
            .catch(console.error);
    }
    else if (message.author.bot) return;

    let args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    let cmd = cl.comand.get(command) || cl.comand.find((c) => c.alias.includes(command));
    
    if (cmd) {
        cmd.run(cl, message, args);
    }
    
    console.log(message.author.username + ' dijo: ' + message.content);
    
    if (message.content.toLowerCase()  === 'hola') {
        message.react('ūüĎč');       
    }


    if (message.content.toLowerCase() === "&ytb") {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!message.member.voice.channel) return message.channel.send("Para utilizar este comando √ļnete a un canal de voz.");

        if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send("‚ĚĆ | I need `CREATE_INSTANT_INVITE` permission");
            fetch(`https://discord.com/api/v8/channels/${message.member.voice.channelID}/invites`, {
                method: "POST",
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: "755600276941176913", // youtube together
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    "Authorization": `Bot ${TOKEN}`,
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(invite => {
                    if (invite.error || !invite.code) return message.channel.send("‚ĚĆ No se pudo obtener una invitaci√≥n a la sala.");
                    
                    const embed = new disc.MessageEmbed()
                        .setDescription(`Inicia youtube en ${message.channel.name} [con este link](https://discord.gg/${invite.code})`); 
                        //.addField("‚Äé      ‚ÄŹ‚ÄŹ‚Äé", `Inicia youtube en ${message.channel.name} [aqu√≠](https://discord.gg/${invite.code})`);
                        message.channel.send(embed);
                })
                .catch(e => {
                    message.channel.send("‚ĚĆ No pudimos iniciar la sala, contacta a uno de los administradores.");
                    console.log(e);
                })
    }




    //console.log(message)
    if (message.content.toLowerCase() === '&addsistickets&') {
        //disbut
        let btn = new disbut.MessageButton()
            .setLabel('ūüď© Contactar')
            .setStyle('red')
            .setID('ticket');


            const embed = new disc.MessageEmbed() 
            .setTitle("¬ŅNecesitas ayuda?")
            .setColor('#6ABE45')
            .setDescription('Si necesitas contactarte con el equipo de **JacKsitos :D** porque te sientes hostigado o molestado por alguien que no est√° cumpliendo las normas del servidor o si simplemente quieres hablar de forma directa con el staff:\n**Presiona el bot√≥n de abajo para que un moderador pueda atenderte.**\n\n_Cualquier creaci√≥n que consideremos innecesaria al generar un tique de ayuda ser√° motivo de sanci√≥n._')
            .setTimestamp()
            .setFooter("A√Īadido por J3ffry", message.author.displayAvatarURL())   

        message.channel.send({ embed: embed, component: btn })
    }

/*
    if (message.content.toLowerCase().startsWith(PREFIX + 'embedpruebadecatalogo')) {
        const embedDatos = new disc.MessageEmbed() 
            .setTitle(":exclamation: Danos una sugerencia :exclamation:")
            .setColor('#6ABE45')
            .setDescription("Ay√ļdanos a ser un mejor servidor.\nMenciona en este canal alguna idea o sugerencia sobre c√≥mo podemos mejorar el contenido que manejamos o las acciones que toman los moderadores o administradores.")
            .setFooter("A√Īadido por J3ffry", message.author.displayAvatarURL())
        message.channel.send({ embed: embedDatos });
    }

    if (message.content.toLowerCase().startsWith(PREFIX + 'jacsempruebadecatalogo')) {
        const embedDatos = new disc.MessageEmbed() 
            .setTitle("ūüďú Reglas ūüďú")
            .setAuthor("JacKsFord", "https://cdn.discordapp.com/avatars/662537267767803915/d4268e1acf93f73d56969aa03ac45adb.webp")
            .setColor('#6ABE45')
            .setDescription(rules)
            .setFooter("Atte.: #Admins", "")
            .setImage("https://cdn.discordapp.com/attachments/816093109666185216/816127080395571220/PicsArt_12-26-01.12.00.jpg")
            .addField("Sanciones", "1) 1er strike - sanci√≥n: Mute 2min\n2) 2do strike - sanci√≥n: Advertencia\n3) 3er strike - sanci√≥n: Kick\n4) 4to strike - sanci√≥n: Ban temporal 1 d√≠a\n5) 5to strike - sanci√≥n: Ban temporal 1 semanas\n6) 6to strike - sanci√≥n: Ban permanente")
            .addField("‚Äé      ‚ÄŹ‚ÄŹ‚Äé", "Cualquier regla que sea irrumpida dentro del server, favor de comunicarla a alguien del staff, con pruebas y/o contexto de la situaci√≥n a tratar, de antemano disfruta tu estancia aqu√≠ y pasatela bien, tqm :D")

        message.channel.send({ embed: embedDatos });
    }

    if (message.content.toLowerCase().startsWith(PREFIX + 'ayudapruebadecatalogo')) {
        const embedDatos = new disc.MessageEmbed() 
            .setTitle("Soporte")
            //.setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor('#8230B4')
            .setDescription("¬°Hola! Bienvenido a este seguro espacio donde puedes contarme todo lo que te atormenta. Dar√© una soluci√≥n concisa en inmediata a tu problema.\n\nCu√©ntame... ¬Ņqu√© te sucede?")
            .setFooter("A√Īadido por "+message.author.username, message.author.displayAvatarURL())

        message.channel.send({ embed: embedDatos });
    }


    if (message.content.toLowerCase() === '!embedpr') {
        const embedDatos = new disc.MessageEmbed() 
            .setTitle("Adi√≥s...")
            .setAuthor("JacKsFord", "https://cdn.discordapp.com/avatars/662537267767803915/d4268e1acf93f73d56969aa03ac45adb.webp")
            .setFooter("Te quiere la comunidad de JacKsitos :D", "https://i.ibb.co/qg1RsWY/cverde.png")
            .setColor('#6ABE45')
            .setDescription('Es una l√°stima que partas, recuerda que a pesar de todo... siempre tendr√°s una comunidad para ti.')
            
        member.send({ embed: embedDatos });
    }*/
   
     
    
});

cl.on('clickButton', async (button) => {
if (button.id === 'ticket') {
    await button.clicker.fetch();

    let person = button.clicker.user.tag;    
    let personid = button.clicker.user;

    let evry = button.guild.roles.cache.find(rol => rol.name == '@everyone');    


    let name = 'ticket'+person.toLowerCase().replace('#', '');

    let exi = button.guild.channels.cache.find(cn => cn.name === name);

    if (exi) {
        exi.send(`${button.clicker.user}`+' No puedes crear otro canal, h√°blanos por aqu√≠.');

        return;
    } 

    const embd = new disc.MessageEmbed() 
            .setTitle("En un momento alguien se pondr√° al tanto de tu situaci√≥n")            
            .setTimestamp()
            .setFooter("POWERED BY J3ffry", 'https://cdn.discordapp.com/avatars/465953219860889600/a_15e6596eb00dfa4e156c1d32f47ba1ff.webp')   
            .setColor('RANDOM')
            .setDescription('¬°Hola, '+`${button.clicker.user}`+'!\nEste espacio es seguro y lo que comentes aqu√≠ **no se ir√° a ninguna parte**.\nMientras esperamos a alguien que te brinde apoyo, cu√©ntame... ¬Ņqu√© te trae por aqu√≠?')

    button.guild.channels.create(name, {
        permissionOverwrites: [
            {
                id: evry.id,
                deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
            },
            {
                id: personid,
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
            }
        ],
        parent: '816353789656694815'
    }).then(c => c.send(embd)).then((msg) => {

            msg.awaitReactions((reaction, user) => {
                if (reaction.emoji.name === 'ūüĎć') {
                    msg.channel.delete();
                }
            })
        })
        .catch(console.error);

        button.defer();
}
    
});

cl.login(TOKEN);