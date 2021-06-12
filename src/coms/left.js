module.exports = {
    nombre: 'left',
    alias: ['lf'],
    descripcion: '',
    run: (client, message, arg) =>{
        client.emit('guildMemberRemove', message.member);
    }
}