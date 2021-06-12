module.exports = {
    nombre: 'elim',
    alias: ['cls'],
    uso: '&cls [NÚMERO DE MENSAJES A BORRAR <2-99>]',
    mod: 'yes',
    descripcion: 'Utilízame cuando desees eliminar varios mensajes de un canal.',
    run: async (client, message, arg) =>{
        const ndel = parseInt(arg[0], 10);

        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            if (isNaN(ndel)) {     
                    return message.react(message.guild.emojis.cache.get('816143385625755688'));
                } 
            else if (ndel < 2 || ndel > 99) {
                return message.channel.send('```Ingresa un número entre 2 y 99.```');
            }
            else {
                message.channel.bulkDelete((ndel+1), true);

                setTimeout(function() {
                    return message.channel.send('```Mensajes eliminados.```');
                }, 1000);
                
            }
        }
        else {              
            return message.react(message.guild.emojis.cache.get('817824399838150667'));
        }  
    }
}