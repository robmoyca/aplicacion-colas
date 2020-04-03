const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');
const tktControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = tktControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: tktControl.getUltimoTicket(),
        ultimos4: tktControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'Escritorio es necesario'
            });
        }

        let atenderTicket = tktControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        client.broadcast.emit('ultimos4', { ultimos4: tktControl.getUltimos4() });

        // actualizar o notificar cambios en los ultimos 4



    })
});