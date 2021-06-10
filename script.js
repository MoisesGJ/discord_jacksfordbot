const disc = require('discord.js');
const config = require("./config.json");
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
    console.log("CONECTADO");
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

    const background = await Canvas.loadImage('./wallpaper.jpg');
	
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


    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	context.drawImage(avatar, 25, 25, 200, 200);
    const attachment = new disc.MessageAttachment(canvas.toBuffer(), 'bienvenida.png');

	const embedDatos = new disc.MessageEmbed() 
            .setTitle("Bienvenida 🖖")            
            .setColor('#6ABE45')
            .setThumbnail("https://images-ext-2.discordapp.net/external/9up4vzX2eUOUQ3QMyJ2BDgCcH7DOe6nexoknseXfHUY/https/cdn.mee6.xyz/guild-images/815359123821690910/4ff9804c4f6f0da5126fa355c068f99fadf202e0408858514d1f3a7743d8bff6.png?width=473&height=473")
            .setDescription('Pssssst, pssssst... '+ `${member}`+', ¡me alegra verte aquí!\nTe ofrezco una grandiosa bienvenida a «JacKsitos :D».\n\nDeseo de todo corazón que disfrutes tu estancia, que te la pasas de lo mejor (y que no obtengas un game over :space_invader:)')
            .attachFiles(attachment)
            .setImage('attachment://bienvenida.png')
            .addField('Reglas', 'Visita el canal #〚:paperclip:〛reglas para saber lo que es bueno o malo en este servidor y para que todos la pasemos cool por aquí.')
            .addField('Personalización', 'Visita el canal #〚:art:〛personalización para que puedas ajustar algunas preferencias como el color o las notificaciones que deseas ver y mejorar tu experiencia en el servidor.')

    channel.send(embedDatos);
 });

 cl.on('guildMemberRemove', async member => {
    const embedDatos = new disc.MessageEmbed() 
            .setTitle("Adiós...")
            .setAuthor("JacKsFord", "https://cdn.discordapp.com/avatars/662537267767803915/d4268e1acf93f73d56969aa03ac45adb.webp")
            .setFooter("Te quiere la comunidad de JacKsitos :D", "https://i.ibb.co/qg1RsWY/cverde.png")
            .setColor('#6ABE45')
            .setDescription('Es una lástima que partas, recuerda que a pesar de todo... siempre tendrás una comunidad para ti.')
            
        member.send({ embed: embedDatos });

    const channel = member.guild.channels.cache.find(ch => ch.name === 'pruebas');
	if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
	const context = canvas.getContext('2d');

    const background = await Canvas.loadImage('./wallpaperdp.jpg');
	
	context.drawImage(background, 0, 0, canvas.width, canvas.height);
	

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    
    x = canvas.width / 2 - avatar.width / 2;
    y = 25;

	context.drawImage(avatar, x, y, 150, 150);

    const cruz = await Canvas.loadImage('./cruz.png');

    context.drawImage(cruz, x, y, 150, 150);

    registerFont('comicsans.ttf', { family: 'Comic Sans' })

    context.fillStyle = '#ffffff'; // White text
    context.font = '35px "Comic Sans"';
    let text = `${member.user.tag}`;
    x = canvas.width / 2 - context.measureText(text).width / 2;
    context.fillText(text, x, 60 + avatar.height);

    context.font = '30px "Comic Sans"';
    text = '☠️ HA SUFRIDO UN GAME OVER ☠️';
    x = canvas.width / 2 - context.measureText(text).width / 2;
    context.fillText(text, x, 100 + avatar.height);

    const attachment = new disc.MessageAttachment(canvas.toBuffer(), 'despedida.png');

	
    channel.send('', attachment);
});


function cambiarValor(array, valorABuscar, valorViejo, valorNuevo) {
    array.forEach(function (elemento) { // recorremos el array
    
       //asignamos el valor del elemento dependiendo del valor a buscar, validamos que el valor sea el mismo y se reemplaza con el nuevo. 
      elemento[valorABuscar] = elemento[valorABuscar] == valorViejo ? valorNuevo : elemento[valorABuscar]
    });
    return array;
}
  

cl.on("message", message => {
    console.log(message.author.username + ' dijo: ' + message.content);
        
    const user = `${message.author}`;

    //PRUEBA DE INGRESO A SERVER
    if (message.content === '!join') {
		cl.emit('guildMemberAdd', message.member);
	}

    //PRUEBA DE salida A SERVER
    if (message.content === '!left') {
		cl.emit('guildMemberRemove', message.member);
	}

    if (message.content.toLowerCase().includes('!ac ')) {
        //■aggcom

        try {
            const txt = fs.readFileSync('./comandos.json', 'utf8');
            var objg = JSON.parse(txt); 

            var can = objg["Datos"][0]["Cantidad"];
            var cantn = (parseInt(can)+1);
            
           // console.log(cantn);

            //const rg = '"Contenido":\[([^]*)\]';
            var newConten = txt.match(/"Contenido":\[([^]*)\]/g);
            console.log(newConten);

            let ncon = newConten[0].replace(/"Contenido":\[/g, "");
            ncon = ncon.replace(']', '');
            let ncona = ncon.replace("'", "");


            var Data = {"Datos":[{"Cantidad":`${cantn}`}],"Contenido":[`${ncona}`]};

           
                //\[([^]*)\]  [^{\}]+(?=})
            //let dat = JSON.parse(Data)    
            console.log(Data)

            fs.writeFileSync('./comandos.json', JSON.parse(Data));
            


            let cmmq = message.content.split(" ");

            let nllam = cmmq[1];

            let ncont = message.content.replace(/!ac /g, "");
            ncont = ncont.replace(nllam+" ", "");

            let ncom = {
                Comando: {
                    Llamada: `${nllam}`,
                    Respuesta: `${ncont}`
                }                             
            };

            fs.readFile('./comandos.json', 'utf8', (err, data) => {
                if (err) {
                    console.log("ERROR:", err)
                    return
                }
            
                obj = JSON.parse(data); 
                obj.Contenido.push(ncom); 
                json = JSON.stringify(obj); 
                fs.writeFile('./comandos.json', json, function (err) {
                    if (err) return console.log(err);
                    console.log('Añad OK');
                });
        });

          } catch (err) {
            console.error(err);
          }
          

    
    
        

        

        
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
    }*/

    if (message.content.toLowerCase()  === 'hola') {
        message.react('👋');
        //message.react(message.guild.emojis.cache.get('c9fa5a58142d229cf34ed71b0c213384'));
    }

        try {
            const data = fs.readFileSync('./comandos.json', 'utf8');

            dataa = JSON.parse(data);
            
            
          } catch (err) {
            console.error(err);
          }
          

    
    var cant = dataa["Datos"][0]["Cantidad"];
    
    for (let i = 0; i <= (parseInt(cant) - 1); i++) {
        var comm = dataa["Contenido"][i]["Comando"]["Llamada"];

        if (message.content.toLowerCase() === comm) {
            
            var resp = dataa["Contenido"][i]["Comando"]["Respuesta"];

            let respuest;

            if (resp.includes('{user}')) {               
                respuest = resp.replace('{user}', user);
            }
            else {
                respuest = resp;
            }
            
            message.channel.send(respuest);
        }
    }
     
    
});



/*cl.on("error", (e) => console.error(e));
cl.on("warn", (e) => console.warn(e));
cl.on("debug", (e) => console.info(e));*/

cl.login(TOKEN);