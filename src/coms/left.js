module.exports = {
    nombre: 'left',
    alias: ['lf'],
    uso: '&lf',
    mod: 'yes',
    descripcion: 'Utilízame cuando desees emular una salida.',
    run: (client, message, arg) =>{
        client.emit('guildMemberRemove', message.member);
    }
}