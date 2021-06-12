const disc = require('discord.js');
const config = require("../config.json");
const Canvas = require('canvas');
const { registerFont } = require('canvas');
const fs = require('fs')

const cl = new disc.Client();

const TOKEN = config.token;
const PREFIX = config.prefix;


function Presencia() {
    cl.user.setPresence({
        status: "online",
        activity: {
           name: "twitch.tv/JacKsFord01",
           type: "WATCHING"
        }
     });
}


cl.on("ready", () => {
    console.log("\n|||||||CONECTADO|||||||\n");
    Presencia();
})


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

    const channel = member.guild.channels.cache.find(ch => ch.name === 'pruebas');
	if (!channel) return;


    const canvas = Canvas.createCanvas(700, 250);
	const context = canvas.getContext('2d');

    const background = await Canvas.loadImage('./src/rec/imgs/wallpaper.jpg');
	
	context.drawImage(background, 0, 0, canvas.width, canvas.height);
	

    context.strokeStyle = '#74037b';
	context.strokeRect(0, 0, canvas.width, canvas.height);

    registerFont('comicsans.ttf', { family: 'Comic Sans' })

	context.font = '22px "Comic Sans"';
	context.fillStyle = '#ffffff';
	context.fillText('¡BIENVENIDO A JACKSITOS :D,', canvas.width / 2.5, canvas.height / 3.5);

	context.font = applyText(canvas, `${member.displayName}!`);
	context.fillStyle = '#ffffff';
	context.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	context.beginPath();
	context.arc(125, 125, 100, 0, Math.PI * 2, true);
	context.closePath();
	context.clip();


    console.log(member.user.displayAvatarURL());

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	context.drawImage(avatar, 25, 25, 200, 200);
    const attachment = new disc.MessageAttachment(canvas.toBuffer(), 'bienvenida.png');


	const embedDatos = new disc.MessageEmbed() 
            .setTitle("Bienvenida 🖖")            
            .setColor('#6ABE45')
            .setDescription('Pssssst, pssssst... '+ `${member}`+', ¡me alegra verte aquí!\nTe ofrezco una grandiosa bienvenida a «JacKsitos :D».\n\nDeseo de todo corazón que disfrutes tu estancia, que te la pasas de lo mejor (y que no obtengas un game over :space_invader:)')
            .attachFiles(attachment)
            .setImage('attachment://bienvenida.png')
    
    channel.send(embedDatos);

    const perso = cl.channels.cache.get('820166316166086696')
    const reg = cl.channels.cache.get('816093109666185216')

    const embedDM = new disc.MessageEmbed() 
            .setTitle("No le digas a nadie, pero...")            
            .setColor('#6ABE45')                
            .setDescription('Puedes visitar los canales de '+`${perso}`+' y '+`${reg}`+'. Esto para mejorar tu experiencia en el servidor y con la comunidad en general, agradecemos tu estancia y esperamos que formes parte de JacKsitos :D')
            .addField("‎      ‏‏‎", "‎Atentamente: ***Administración***")
    
    member.send(embedDM);
 });

 cl.on('guildMemberRemove', async member => {
    const embedDatos = new disc.MessageEmbed() 
            .setTitle("Adiós...")            
            .setFooter("Te quiere la comunidad de JacKsitos :D", "https://i.ibb.co/qg1RsWY/cverde.png")
            .setColor('#6ABE45')
            .setDescription('Es una lástima que partas, recuerda que a pesar de todo... siempre tendrás una comunidad para ti.')
            
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
let archv = fs.readdirSync('src/coms/').filter((f) => f.endsWith('.js'));


for (var archi of archv) {
    let comm = require('./coms/'+archi);
    cl.comand.set(comm.nombre, comm)
    console.log(archi + " => TRUE")
}


cl.on("message", async message => {

    if (message.author.bot && message.content === 'Comando creado.') {
        message.delete({ timeout: 5000 })
            .then(msg => console.log(`Mensaje eliminado de ${msg.author.username}`))
            .catch(console.error);
    }
    else if (message.author.bot) return;

    let args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    let cmd = cl.comand.get(command) || cl.comand.find((bus) => bus.alias.includes(command));

    if (cmd) {
        cmd.run(cl, message, args);
    }
    
    console.log(message.author.username + ' dijo: ' + message.content);
    
    if (message.content.toLowerCase()  === 'hola') {
        message.react('👋');
        //message.react(message.guild.emojis.cache.get('c9fa5a58142d229cf34ed71b0c213384'));
    }
    

/*
    if (message.content.toLowerCase().startsWith(PREFIX + 'embedpruebadecatalogo')) {
        const embedDatos = new disc.MessageEmbed() 
            .setTitle(":exclamation: Danos una sugerencia :exclamation:")
            .setColor('#6ABE45')
            .setDescription("Ayúdanos a ser un mejor servidor.\nMenciona en este canal alguna idea o sugerencia sobre cómo podemos mejorar el contenido que manejamos o las acciones que toman los moderadores o administradores.")
            .setFooter("Añadido por J3ffry", message.author.displayAvatarURL())
        message.channel.send({ embed: embedDatos });
    }

    if (message.content.toLowerCase().startsWith(PREFIX + 'jacsempruebadecatalogo')) {
        const embedDatos = new disc.MessageEmbed() 
            .setTitle("📜 Reglas 📜")
            .setAuthor("JacKsFord", "https://cdn.discordapp.com/avatars/662537267767803915/d4268e1acf93f73d56969aa03ac45adb.webp")
            .setColor('#6ABE45')
            .setDescription(rules)
            .setFooter("Atte.: #Admins", "")
            .setImage("https://cdn.discordapp.com/attachments/816093109666185216/816127080395571220/PicsArt_12-26-01.12.00.jpg")
            .addField("Sanciones", "1) 1er strike - sanción: Mute 2min\n2) 2do strike - sanción: Advertencia\n3) 3er strike - sanción: Kick\n4) 4to strike - sanción: Ban temporal 1 día\n5) 5to strike - sanción: Ban temporal 1 semanas\n6) 6to strike - sanción: Ban permanente")
            .addField("‎      ‏‏‎", "Cualquier regla que sea irrumpida dentro del server, favor de comunicarla a alguien del staff, con pruebas y/o contexto de la situación a tratar, de antemano disfruta tu estancia aquí y pasatela bien, tqm :D")

        message.channel.send({ embed: embedDatos });
    }

    if (message.content.toLowerCase().startsWith(PREFIX + 'ayudapruebadecatalogo')) {
        const embedDatos = new disc.MessageEmbed() 
            .setTitle("Soporte")
            //.setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor('#8230B4')
            .setDescription("¡Hola! Bienvenido a este seguro espacio donde puedes contarme todo lo que te atormenta. Daré una solución concisa en inmediata a tu problema.\n\nCuéntame... ¿qué te sucede?")
            .setFooter("Añadido por "+message.author.username, message.author.displayAvatarURL())

        message.channel.send({ embed: embedDatos });
    }


    if (message.content.toLowerCase() === '!embedpr') {
        const embedDatos = new disc.MessageEmbed() 
            .setTitle("Adiós...")
            .setAuthor("JacKsFord", "https://cdn.discordapp.com/avatars/662537267767803915/d4268e1acf93f73d56969aa03ac45adb.webp")
            .setFooter("Te quiere la comunidad de JacKsitos :D", "https://i.ibb.co/qg1RsWY/cverde.png")
            .setColor('#6ABE45')
            .setDescription('Es una lástima que partas, recuerda que a pesar de todo... siempre tendrás una comunidad para ti.')
            
        member.send({ embed: embedDatos });
    }*/
   
     
    
});



/*cl.on("error", (e) => console.error(e));
cl.on("warn", (e) => console.warn(e));
cl.on("debug", (e) => console.info(e));*/

cl.login(TOKEN);