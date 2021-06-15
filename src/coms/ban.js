module.exports = {
    nombre: 'ban',
    alias: ['b'],
    uso: '&b [MENCIÓN DEL USUARIO] [RAZÓN:palabra] (tiempo:días:1-7)',
    mod: 'yes',
    descripcion: 'Utilízame cuando desees banear a alguien.',
    run: (client, message, arg) => {
        if (message.member.hasPermission("BAN_MEMBERS")) {
            if(!message.mentions.users.first()) {
                return message.channel.send('Por favor, especifíca un usuario.');
            }
        
            const target = message.guild.members.cache.get(message.mentions.users.first().id);
        
            const time = arg[1] * 1;
        
            if(arg.length === 1) {
                message.channel.send('Menciona la razón del baneo.');
                return;
            }
            else if(!isNaN(time)) {
            
                try {
                    target.ban({ reason:arg.slice(2).join(' '), days:time }); 
                    message.react('🤙');
                }
                catch(error) {
                
                    console.error(error);
                    message.reply('No pude ejecutar el comando. :(');
                }
                return;
            }
        
            else if(typeof arg[1] === 'string') {
                target.ban({ reason:arg.slice(1).join(' ') });
                return message.react('🤙');
            }
        }
        else {
            return message.react(message.guild.emojis.cache.get('816143385625755688'));
        }
    }
}