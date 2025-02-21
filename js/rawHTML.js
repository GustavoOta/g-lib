import { rawCSS } from "./rawCSS.js"

export const rawHTML = (params) => {
    if (!params) alert('rawHTML: params não informado');
    if (!params.title) params.title = 'Gravis Tec';
    if (!params.body) params.body = 'Corpo do HTML não informado';
    if (!params.pageSize) params.pageSize = 'A4';

    return /*html*/`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${params.title}</title>
        <style>${rawCSS(params)}</style>
    </head>
    <body>
        ${params.body}
    </body>
    </html>
    `;
}

export const rawHTMLHeaderResumed = () => {
    let empreendimento = window.session.empreendimento;
    empreendimento = empreendimento[0];
    let nomeFantasia = empreendimento.nome_fantasia;
    let cnpj = empreendimento.cnpj;

    return  /*html*/`
    <div>
        <div class="text-center font-medium">${nomeFantasia}</div>
        <div class="text-center font-medium">CNPJ: ${cnpj}</div>
        <hr>
    </div>
    `;
}
export const rawHTMLHeaderFull = () => {
    let empreendimento = window.session.empreendimento;
    empreendimento = empreendimento[0];
    let nomeFantasia = empreendimento.nome_fantasia;
    let cnpj = empreendimento.cnpj;
    let ie = empreendimento.inscricao_estadual;
    let endereco = empreendimento.endereco;
    return  /*html*/`
    <div>
        <div class="text-center font-medium">${nomeFantasia}</div>
        <div class="text-center font-medium">CNPJ: ${cnpj} IE: ${ie}</div>
        <div class="text-center font-medium">${endereco}</div>
        <hr>
    </div>
    `;
}