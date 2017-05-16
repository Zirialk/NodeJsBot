let fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client({
    forceFetchUsers: true,
    autoReconnect: true,
    guildCreateTimeour: 0
});



///////////////////////////////HOJA DE CALCULO//////////////////////////////////////////////

//FUNCIONES/////////////////////////////////////////////////////////////////////////////////
function commandIs(str, msg){
    return msg.startsWith('!' + str);
}
function check(array){
    return array.map(function(item) { return item['name']; });
}
function queRoll(mem, role){
    if(check(mem.roles).includes(role)){
        return true;
    }else{
        return false;
    }
}

function actualizar(arr, msg){
        msg.channel.fetchMessages().then(messages => msg.channel.bulkDelete(messages)).catch(console.error);
        msg.channel.sendMessage('__***IMPORTANTE : A la hora de repartir el dinero solo se tendrá en cuenta a aquellas personas que estén en la lista.\n(Si alguien asiste pero no está en la lista no cobrará).***___\n')
        msg.channel.sendMessage('\n`COMANDOS DEL NODEBOT:`\n'+' `!yovoy #comando para apuntarse a la node.`\n'+' `!novoy #comando para desapuntarse de la node.`')
        msg.channel.sendMessage('`LISTA DE ASISTENCIA A NODE ('+arr.length+') :`\n');
        msg.channel.sendMessage(''+arr.join('\n')+'\n');
        
}

function borrarPersona(msg){
    var aux = [];
    var j = 0;
    for(var i=0;i<reliq.length;i++){
        if(msg.member.displayName!=reliq[i]){
            aux[j] = reliq[i];
            j++;
        }
    }
    reliq = aux;
}

function borrarA(str){
    var aux = [];
    var j = 0;
    for(var i=0;i<reliq.length;i++){
        if(str!=reliq[i]){
            aux[j] = reliq[i];
            j++;
        }
    }
    reliq = aux;
}

var reliq = [];




//RESPUESTAS BOT/////////////////////////////////////////////////////////////////////
bot.on('message', (message) =>{
    var breliq = true;
    var msg = message.content.split(/[ ]+/);
    if(commandIs('yovoy', msg[0]) && message.channel.name === 'asistencianode'){
        for(i = 0;i<reliq.length;i++){
            if(message.member.displayName === reliq[i]){
                breliq = false;
            }
        }
        if(breliq){
            reliq.push(message.member.displayName);
            message.channel.sendMessage(message.member.displayName +' has sido añadido a la lista \n\n'+ reliq.join('\n'));
            
        }else{
            message.channel.sendMessage('Lo sentimos '+ message.member.displayName + ' ya estás apuntado.');
        }
        actualizar(reliq,message);
    }
    if(commandIs('novoy', msg[0]) && message.channel.name === 'asistencianode'){
       borrarPersona(message);
       actualizar(reliq,message);
    }

    if(commandIs('reiniciarnode', msg[0]) && message.channel.name === 'asistencianode'){
       if(queRoll(message.member,'Oficial') || queRoll(message.member,'GM')){
       actualizar(reliq,message);
       }else{message.channel.sendMessage('Amigo me parece que no tienes permiso para hacer eso')}
    }
    ///AQUIBOT2

});

bot.login('MzE0MTMxOTEwMjk5MjIyMDI2.C_ztrg.AYc2WXxr71vLqaxtxY784ob827g');