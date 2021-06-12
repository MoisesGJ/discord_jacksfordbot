module.exports = {
    nombre: 'ban',
    alias: ['b'],
    descripcion: '',
    run: (client, message, arg) =>{
        if(!message.mentions.users.first()) {
            return message.channel.send('Por favor, especifíca un usuario.');
        }
        // target is who will be banned
        const target = message.guild.members.cache.get(message.mentions.users.first().id);
        // time is how long will the user be banned (in days) it's mutiplied by 1 to convert it from a stirng to  NaN or a number parseInt() works too :)
        const time = arg[1] * 1;
        // checks if there are any arguments
        if(arg.length === 1) {
            message.channel.send('Menciona la razón del baneo.');
            return;
        }
        else if(!isNaN(time)) {
            // this is where the problem is
            try {
                target.send('Has sido baneado de JacKsitos :D'); // << this works
                target.ban({ reason:arg.slice(2).join(' '), days:time }); // << but this doesn't
                /* (node:10484) UnhandledPromiseRejectionWarning: DiscordAPIError: Invalid Form Body
delete_message_days: int value should be less than or equal to 7. */
            }
            catch(error) {
                // this code does not execute
                console.error(error);
                message.reply('No pude ejecutar el comando. :(');
            }
            return;
        }
// this one works as well only when i dont give a time for the ban (if the if statement above returns false )
        else if(typeof arg[1] === 'string') {
            target.ban({ reason:arg.slice(1).join(' ') });
            return;
        }
    },

};