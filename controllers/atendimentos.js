const Atendimento = require('../models/atendimento');

module.exports = app => {
    app.get('/atendimento', (request, response) => {
        Atendimento.lista(response);
    });

    app.get('/atendimento/:id', (request, response) => {
        const id = parseInt(request.params.id);

        Atendimento.buscaPorId(id, response);
    });

    app.post('/atendimento', (request, response) => {
        const atendimento = request.body;

        Atendimento.add(atendimento, response);
    });

    app.patch('/atendimento/:id', (request, response) => {
        const id = parseInt(request.params.id);
        const valores = request.body;
        Atendimento.altera(id, valores, response);
    });

    app.delete('/atendimento/:id', (request, response) => {
        const id = parseInt(request.params.id);

        Atendimento.deleta(id, response);
    });
}