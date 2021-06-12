
module.exports = {
    nombre: 'kick',
    alias: ['k'],
    uso: '&k [MENCIÓN DEL USUARIO]',
    mod: 'yes',
    descripcion: 'Utilízame cuando desees sacar a alguien.',
    run: (client, msg, arg) =>{
        if (msg.member.hasPermission("KICK_MEMBERS")) {
            if (msg.mentions.users.first()) {
                try {
                    msg.mentions.members.first().kick();                
                }
                catch(err) {
                    return msg.react('😭');
                }
            } else {
                return msg.react(msg.guild.emojis.cache.get('816143385625755688'));
            }
        }
        else {
            return msg.react(msg.guild.emojis.cache.get('816143385625755688'));
        }        
    }

}