const disc = require('discord.js');
const fs = require('fs');

module.exports = {
    nombre: 'help',
    alias: ['h'],
    uso: '&h',
    mod: 'no',
    descripcion: 'Con este comando puedes ver los comandos que puedes usar.',
    run: (client, message, arg) =>{
        let cmmlst = 
        {
            nombre: [],
            uso: [],
            desc: []
        }

        let archv = fs.readdirSync('src/coms/').filter((f) => f.endsWith('.js'));
        let dm = true;

        for (var archi of archv) {
            const comma = require('../coms/'+archi);
            
            if (message.member.hasPermission("BAN_MEMBERS")) {
                cmmlst.nombre.push(`&${comma.nombre}`);
                cmmlst.uso.push(`${comma.uso}`);
                cmmlst.desc.push(`${comma.descripcion}`);
            }
            else{ 
                dm = false;
                if (`${comma.mod}` === 'no') {
                    cmmlst.nombre.push(`&${comma.nombre}`);
                    cmmlst.uso.push(`${comma.uso}`);
                    cmmlst.desc.push(`${comma.descripcion}`);
                }
            }
        }

        const embed = new disc.MessageEmbed() 
            .setTitle('COMANDOS')
            .setColor('RANDOM')
            .setTimestamp()            
            .setFooter('Powered by J3ffry', 'https://cdn.discordapp.com/avatars/465953219860889600/a_d351adce1104b0e3749519fce432196a.webp')
            
            
            console.log(`${cmmlst.uso[0]}`)
            let i = 0;

            while (i < cmmlst.nombre.length) {
                embed.addField(`___${cmmlst.nombre[i]}___`, `_Uso: ${cmmlst.uso[i]}`+`\nDescripción: ${cmmlst.desc[i]}_`, true)
                i++;
            }

        if (dm) { 
            message.member.send(embed); 
            message.delete({ timeout: 1000 }); 
        }
    
        else return message.channel.send(embed);     
        
    }
}
