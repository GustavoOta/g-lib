import { rawCSS } from "./rawCSS.js"
import { logo } from "./logo.js"

let defautSize = '80mm';

export const rawHTML = (params) => {
    if (!params) alert('rawHTML: params não informado');
    if (!params.title) params.title = 'Gravis Tec';
    if (!params.body) params.body = 'Corpo do HTML não informado';
    if (!params.pageSize) params.pageSize = defautSize;

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

export const rawHTMLHeaderResumed = (params) => {
    if (!params) {
        console.error('rawHTMLHeaderResumed: params não informado');
        return;
    }

    if (!params.size) size = defautSize;
    if (!params.logo) params.logo = logo;

    switch (params.size) {
        case '80mm':
            return  /*html*/`
            <div>
                <div class="text-center font-medium">${params.nomeFantasia}</div>
                <div class="text-center font-medium">CNPJ: ${params.cnpj}</div>
                <hr>
            </div>
            `;
            break;
        case 'A4':
            return  /*html*/`
            <div>
                <div class="logo">
                    <img src="${params.logo}" alt="Logo"  style="height: 70px;">
                </div>
                <div class="text-right">
                    <div class="text-center font-medium">${params.nomeFantasia}</div>
                    <div class="text-center font-medium">CNPJ: ${params.cnpj}</div>
                </div>
                <hr>
            </div>
            `;
            break;
        default:
            console.error('rawHTMLHeaderResumed: Tamanho de papel não reconhecido');
            return;
    }
}


export const rawHTMLHeaderFull = (params) => {
    if (!params) {
        console.error('rawHTMLHeaderFull: params não informado');
        return;
    }
    if (!params.size) {
        console.log('rawHTMLHeaderFull: Tamanho de papel não informado, use size:"80mm" ou size:"A4", foi usado o default 80mm');
        params.size = defautSize;
    }
    if (!params.logo) {
        console.log('rawHTMLHeaderFull: Logo não informado, use logo:"caminho/para/logo.png", foi usado o default logo.png');
        params.logo = logo;
    }
    if (!params.title) {
        console.log('rawHTMLHeaderFull: Título não informado, use title:"Título do Relatório", foi usado o default "Gravis Tec"');
        params.title = 'Gravis Tec';
    }
    if (!params.titleBorderBottom) {
        console.log('rawHTMLHeaderFull: Borda do Título não informado, use titleBorderBottom:"border-bottom", foi usado o default "border-bottom"');
        params.titleBorderBottom = 'border-bottom';
    }
    if (params.titleBorderBottom == 'none') params.titleBorderBottom = '';

    switch (params.size) {
        case '80mm':
            return  /*html*/`
            <div>
                <div class="text-center font-medium">${params.nomeFantasia}</div>
                <div class="text-center font-medium">CNPJ: ${params.cnpj} IE: ${params.ie}</div>
                <div class="text-center font-medium">${params.endereco}</div>
                <hr>
            </div>
            `;
        case 'A4':
            let port = location.port;
            if (port == '') port = 80;
            return  /*html*/`
            <div class="border-bottom">
                <div class="header-container">
                    <div class="logo p-1">
                        <img src="${params.logo}" alt="Logo">
                    </div>
                    <div class="text-right p-2">
                        <div class="font-large p-1">${params.nomeFantasia}</div>
                        <div class="font-large p-1">CNPJ: ${params.cnpj} IE: ${params.ie}</div>
                        <div class="font-large p-1">${params.endereco}</div>
                    </div>
                </div>
            </div>
            <div class="text-center p-2 font-xlarge ${params.titleBorderBottom}">
                <b>${params.title}</b>
            </div>
            `;
        default:
            console.error('rawHTMLHeaderFull: Tamanho de papel não reconhecido');
            return;
    }
}

export const rawHTMLFooter = () => {
    return /*html*/`
        <div class="footer">
            
        </div>
    `;
}

export const extractTable = (tableElementID) => {
    let table = document.getElementById(tableElementID);
    if (!table) {
        console.error(`Table with ID ${tableElementID} not found.`);
        return [];
    }
    // get table colums and insert rows values into an array
    let tableData = [];
    let numRows = table.rows.length - 1;
    let numCols = 0;
    let header = [];
    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];
        let rowData = [];
        for (let j = 0; j < row.cells.length; j++) {
            if (i == 0) {
                header.push(row.cells[j].innerText);
                continue;
            }
            rowData.push(row.cells[j].innerText);
        }
        if (numCols < rowData.length) numCols = rowData.length;
        if (rowData.length > 0) tableData.push(rowData);
    }
    return {
        numRows: numRows,
        numCols: numCols,
        header: header,
        data: tableData
    }
}

export const buildTable = (tableData, css, lastCols) => {
    if (!css) {
        css = {
            table: '',
            thead: '',
            theadTH: '',
            theadTD: '',
            tbody: '',
            tbodyTR: '',
            tbodyTD: '',
        }
        console.log('css não informado, utilizando padrão');
    }
    if (!css.table) css.table = '';
    if (!css.thead) css.thead = '';
    if (!css.theadTH) css.theadTH = '';
    if (!css.theadTD) css.theadTR = '';
    if (!css.tbody) css.tbody = '';
    if (!css.tbodyTR) css.tbodyTR = '';
    if (!css.tbodyTD) css.tbodyTD = '';

    if (lastCols && !lastCols.thFromNum) {
        lastCols.thFromNum = tableData.header.length;
        lastCols.thCss = '';
    }


    let tHeader = tableData.header.map((cell, index) => {
        // thFromNum
        // thCss
        // tdFromNum 
        // tdCss
        let columnClass = 'thColumn-' + index;
        if (lastCols && index >= lastCols.thFromNum - 1) {
            columnClass = lastCols.thCss;
        }
        return `<th class="${css.theadTH} ${columnClass}">${cell}</th>`;
    }).join('');

    let tBody = tableData.data.map(row => {
        let tRow = row.map((cell, index) => {
            let tdColumnClass = 'tdColumn-' + index;
            if (lastCols && index >= lastCols.tdFromNum - 1) {
                tdColumnClass = lastCols.tdCss;
            }
            return `<td class="${css.tbodyTD} ${tdColumnClass}">${cell}</td>`;
        }).join('');
        return `<tr class="${css.tbodyTR}">${tRow}</tr>`;
    }).join('');

    let table = /*html*/`
    <table class="table ${css.table}">
        <thead class="${css.thead}">
            <tr class="${css.theadTR}">
                ${tHeader}
            </tr>
        </thead>
        <tbody class="${css.tbody}">
            ${tBody}
        </tbody>
    </table>
    `;
    return table;
}