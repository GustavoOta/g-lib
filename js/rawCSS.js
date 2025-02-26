

export const rawCSS = (params) => {
    if (!params) alert('rawCSS: params não informado');
    if (!params.pageSize) params.pageSize = 'A4';


    switch (params.fontFamily) {
        case 'Arial':
            params.fontFamily = 'Arial, sans-serif';
            break;
        case 'Times New Roman':
            params.fontFamily = 'Times New Roman, serif';
            break;
        case 'Courier':
            params.fontFamily = 'Courier New, monospace';
            break;
        case 'Consolas':
            params.fontFamily = 'Consolas, monospace';
            break;
        case 'Lucida':
            params.fontFamily = 'Lucida Console, monospace';
            break;
        case 'Monaco':
            params.fontFamily = 'Monaco, monospace';
            break;
        case 'Menlo':
            params.fontFamily = 'Menlo, monospace';
            break;
        default:
            params.fontFamily = 'Lucida Console, monospace';
            break;
    }


    let pageSize = params.pageSize;
    let pageWidth = 0;
    let pageHeight = 0;
    switch (pageSize) {
        case 'A4':
            pageWidth = 210;
            pageHeight = 297;
            break;
        case 'A5':
            pageWidth = 148;
            pageHeight = 210;
            break;
        case 'A6':
            pageWidth = 105;
            pageHeight = 148;
            break;
        case '80mm':
            pageWidth = 80;
            break;
    }
    let css = /*html*/`
    <style>
        @page {
            size: ${pageWidth}mm ${pageHeight !== 0 ? pageHeight + 'mm' : ''};
            margin: 1mm;
        }
        .page-break {
            page-break-before: always;
        }
        body {
            font-family: ${params.fontFamily ? params.fontFamily : 'Arial'};
            font-size: 12px;
            margin: 1mm;
            padding: 1mm;
            page-break-inside: avoid;
        }
        .header-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header-container .logo img {
            max-height: 60px;
        }
        .text-right {
            text-align: right;
        }
        .text-center {
            text-align: center;
        }
        .text-left {
            text-align: left;
        }
        .text-justify {
            text-align: justify;
        }
        .text-uppercase {
            text-transform: uppercase;
        }
        .pull-right {
            float: right;
        }
        .text-bottom {
            vertical-align: bottom;
        }
        .font-bold {
            font-weight: bold;
        }
        .font-italic {
            font-style: italic;
        }
        .font-underline {
            text-decoration: underline;
        }
        .font-overline {
            text-decoration: overline;
        }
        .font-line-through {
            text-decoration: line-through;
        }
        .font-small {
            font-size: 10px;
        }
        .font-medium {
            font-size: 12px;
        }
        .font-large {
            font-size: 14px;
        }
        .font-xlarge {
            font-size: 16px;
        }
        .font-xxlarge {
            font-size: 20px;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
        }
        .border {
            border: 1px solid #000;
        }
        .border-bottom {
            border-bottom: 1px solid #000;
        }
        .border-top {
            border-top: 1px solid #000;
        }
        .mb-2 {
            margin-bottom: 2mm;
        }
        .p1 {
            padding: 2px;
        }
        .p2 {
            padding: 5px;
        }
        .p3 {
            padding: 8px;
        }
        .p4 {
            padding: 10px;
        }
        .p-1 {
            padding: 2px;
        }
        .p-2 {
            padding: 5px;
        }
        .p-3 {
            padding: 8px;
        }
        .p-4 {
            padding: 10px;
        }
    </style>
    `;
    // remove tags
    css = css.replace(/<style>/g, '');
    css = css.replace(/<\/style>/g, '');
    return css;
}