module.exports = {
    nombre: 'sil',
    alias: ['s'],
    uso: '&s [MENCIÓN DEL USUARIO]',
    mod: 'yes',
    descripcion: 'Utilízame cuando desees silenciar a alguien.',
    run: (client, message, arg) =>{
        let miembro = message.mentions.members.first();
    
        let role = message.guild.roles.cache.find((rl) => rl.name === 'Silenciado');
        let perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");
    
        if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
         
        if(message.mentions.users.size < 1) return message.reply('Debe mencionar a un miembro.').catch(console.error);
        //if(!nombrerol) return message.channel.send('Escriba el nombre del rol a agregar, `&s [MENCIÓN DEL USUARIO]`');
        if(!role) return message.channel.send('Rol no encontrado en el servidor.');
        
        miembro.roles.add(role).catch(console.error);
        message.channel.send(`El rol **${role.name}** fue agregado correctamente a **${miembro.user.username}**.`);
    
    }
};