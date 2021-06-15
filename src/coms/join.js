module.exports = {
    nombre: 'jn',
    alias: [',join'],
    uso: '&jn',
    mod: 'yes',
    descripcion: 'Utilízame cuando desees emular una bienvenida.',
    run: (client, message, arg) =>{
        client.emit('guildMemberAdd', message.member);
    }
}