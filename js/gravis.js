import { notification } from "../template/notification.js";

export const changeListener = (element, callback) => {
    if (document.getElementById(element)) {
        let el = document.getElementById(element);
        el.removeEventListener('change', callback);
    }
    let el = document.getElementById(element);
    el.addEventListener('change', callback);

}

export const value = (element) => {
    let el = document.getElementById(element);
    return el.value;
}

// from pdv/gravis.js *************************************************************************

export const timeout = null;

export const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

export const clickListener = (elementID, callback) => {

    // verifica se o elemento existe
    const element = document.getElementById(elementID);
    if (!element) {
        notification({
            title: 'Erro',
            message: 'Elemento não encontrado: ' + elementID,
            type: 'danger',
            icon: 'exclamation-triangle',
            position: 'bottom',
            timeout: 2000
        })
        return
    }

    // remove todos os event listeners de click
    const newElement = element.cloneNode(true);
    element.parentNode.replaceChild(newElement, element);

    newElement.addEventListener('click', callback);
}

export const clickListenerClass = (className, callback) => {
    // verifica se o elemento existe
    if (!document.getElementsByClassName(className)) {
        notification({
            title: 'Erro',
            message: 'Elemento não encontrado: ' + className,
            type: 'danger',
            icon: 'exclamation-triangle',
            position: 'bottom',
            timeout: 2000
        })
        return
    }
    // verifica se o elemento possui o evento de click se sim exclua
    if (document.getElementsByClassName(className).onclick) {
        document.getElementsByClassName(className).onclick = null
    }

    let elements = document.getElementsByClassName(className)
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', callback)
    }
}

export const keyupListener = (elementID, callback) => {
    // verifica se o elemento existe
    if (!document.getElementById(elementID)) {
        notification({
            title: 'Erro',
            message: 'Elemento não encontrado: ' + elementID,
            type: 'danger',
            icon: 'exclamation-triangle',
            position: 'bottom',
            timeout: 2000
        })
        return
    }
    // verfica se o elemeno possui o evento de click se sim exclua
    if (document.getElementById(elementID).onkeyup) {
        document.getElementById(elementID).onkeyup = null
    }
    document.getElementById(elementID).addEventListener('keyup', callback)
}

export const getValue = (elementID) => {
    return document.getElementById(elementID).value
}

export const setValue = (elementID, value) => {
    document.getElementById(elementID).value = value
}

export const getAttribute = (element, attribute) => {
    let result = null;
    if (element && element.getAttribute) {
        result = element.getAttribute(attribute)
        //console.log('result', result)
        return result;
    }
    return result;
}

export const focus = (elementID) => {
    const element = document.getElementById(elementID);
    if (element) {
        // Verificar se o documento já tem um elemento focado
        if (document.activeElement && document.activeElement !== element) {
            document.activeElement.blur(); // Remover o foco do elemento atual
        }
        element.focus(); // Definir o foco no novo elemento
    } else {
        notification({
            title: 'Erro',
            message: 'Elemento não encontrado: ' + elementID,
            type: 'danger',
            icon: 'exclamation-triangle',
            position: 'bottom',
            timeout: 2000
        });
    }
};

export const select = (elementID) => {
    document.getElementById(elementID).select()
}

export const show = (elementID) => {
    document.getElementById(elementID).style.display = 'block'
}

export const hide = (elementID) => {
    document.getElementById(elementID).style.display = 'none'
}

export const disable = (elementID) => {
    document.getElementById(elementID).disabled = true
}

export const enable = (elementID) => {
    document.getElementById(elementID).disabled = false
}

export const addClass = (elementID, className) => {
    document.getElementById(elementID).classList.add(className)
}

export const removeClass = (elementID, className) => {
    document.getElementById(elementID).classList.remove(className)
}

export const innerHTML = async (elementID, html) => {
    document.getElementById(elementID).innerHTML = html
}

export const printIframe = (html) => {
    // verifica se o elemento de id printIframe existe se sim exclua
    if (document.getElementById('printIframe')) {
        document.getElementById('printIframe').remove()
    }

    // Criar um iframe dinamicamente
    const iframe = document.createElement('iframe');
    iframe.id = 'printIframe';
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    // Escrever o conteúdo HTML no documento do iframe
    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();

    iframe.onload = () => {
        // Imprimir o conteúdo do iframe após o carregamento
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
    };

}

export const formatDecimalUSToMoedaBR = (value, prefix, signed) => {
    if (typeof value === 'string') {
        value = parseFloat(value)
    }
    // limit float to 2 decimal places and round it 
    value = value.toFixed(2);
    if (!signed) {
        signed = ''
    } else {
        signed = '-'
    }
    if (value == null) {
        value = 0
    }
    if (!prefix) {
        prefix = 'R$ '
    }
    if (prefix == 'none') {
        prefix = ''
    }
    value = value.toString()
    let valueArray = value.split('.')
    let integer = valueArray[0]
    let decimal = valueArray[1]
    let integerBR = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    // add zero if decimal is empty or decimal length is 1
    if (!decimal) {
        decimal = '00'
    }

    if (decimal.length == 1) {
        decimal = decimal + '0'
    }

    return `${signed}${prefix}${integerBR},${decimal}`
}

export const formatDecimalMoedaBRToUS = (value) => {
    // se value = number converte para string
    if (typeof value === 'number') {
        value = value.toString()
    }
    // permtir apenas numeros e virgula
    value = value.replace(/[^0-9,]/g, '')
    value = value.replace(',', '.')
    return value
}

export const keyupMoedaBR = (reqElement, prefix) => {
    let element = document.getElementById(reqElement)
    let valor = element.value
    if (!prefix) {
        prefix = 'R$'
    }

    // limitar a comma para apenas 1 se 2 apaga a ultima
    if (valor.indexOf(',') != -1) {
        if (valor.indexOf(',', valor.indexOf(',') + 1) != -1) {
            valor = valor.substring(0, valor.length - 1)
        }
    }
    // limitar para 2 o numero de decimais apos a visrgula
    if (valor.indexOf(',') != -1) {
        if (valor.length - valor.indexOf(',') > 3) {
            valor = valor.substring(0, valor.length - 1)
        }
    }
    // se o primeiro digito da string é uma comma adicionar 1 zero a esquera ex: 0,
    if (valor.indexOf(',') == 0) {
        valor = '0' + valor
    }
    valor = valor.replace(/[^0-9,.-]/g, '')
    if (valor == '') {
        element.value = ''
        return
    }
    element.value = prefix + ' ' + valor
    if (element.parentElement.classList.contains('has-error')) {
        element.parentElement.classList.remove('has-error')
    }
}

export const today = (lang) => {

    switch (lang) {
        case 'pt-br':
            return today_ptbr()
        case 'en':
            return today_en()
        default:
            return today_ptbr()
    }
}

export const now = (size) => {
    let date = new Date();
    let hour = String(date.getHours()).padStart(2, '0');
    let minute = String(date.getMinutes()).padStart(2, '0');
    let second = String(date.getSeconds()).padStart(2, '0');

    if (!size) {
        size = 'long';
    }
    switch (size) {
        case 'short':
            return `${hour}:${minute}`;
        case 'long':
            return `${hour}:${minute}:${second}`;
        default:
            return `${hour}:${minute}:${second}`;
    }
}

export const formatShortTime = (time) => {
    // time recebe uma string no formato hh:mm:ss
    let timeArray = time.split(':')
    let hour = timeArray[0]
    let minute = timeArray[1]
    return `${hour}:${minute}`
}

export const formatDateUSToBR = (date) => {
    // detectar se a data é no formato dd/mm/yyyy se sim retornar a data
    if (date.indexOf('/') != -1) {
        return date
    }
    let dateArray = date.split('-')
    let year = dateArray[0]
    let month = dateArray[1]
    let day = dateArray[2]
    // se day ou month for 1 digito adicionar 0 a esquerda

    if (day.length == 1) {
        day = '0' + day
    }
    if (month.length == 1) {
        month = '0' + month
    }

    return `${day}/${month}/${year}`
}

export const formatDateBRToUS = (date) => {
    let dateArray = date.split('/')
    let day = dateArray[0]
    let month = dateArray[1]
    let year = dateArray[2]
    return `${year}-${month}-${day}`
}

export const greatings = (template) => {
    let date = new Date()
    let hour = date.getHours()

    let dia = ''
    let tarde = ''
    let noite = ''

    if (!template) template = 'padrao'

    switch (template) {
        case 'padrao':
            dia = 'Bom dia'
            tarde = 'Boa tarde'
            noite = 'Boa noite'
            break;
    }

    if (hour >= 0 && hour < 12) {
        return dia
    } else if (hour >= 12 && hour < 18) {
        return tarde
    } else {
        return noite
    }
}

export const toUpperCaseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const base64ToDownload = (base64, fileName, fileExt) => {
    let fileExtension = 'application/' + fileExt;
    // Create a link element
    let link = document.createElement('a')

    // Set the href and download attributes of the link
    link.href = 'data:' + fileExtension + ';base64,' + base64
    link.download = fileName + '.' + fileExt

    // Simulate a click on the link
    link.click()

    // Remove the link element
    link.remove()


}

export const execClick = (elementID) => {
    // check if element exists
    if (!document.getElementById(elementID)) {
        console.log('elemento não encontrado ou já foi encerrado anteriormente: ' + elementID)
        return
    }
    document.getElementById(elementID).click()
}

function today_en() {
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    // se mes for menor que 10 adicionar 0 a esquerda
    if (month < 10) {
        month = '0' + month
    }
    return `${year}-${month}-${day}`
}

function today_ptbr() {
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    // se day ou month for menor que 10 adicionar 0 a esquerda
    if (day < 10) {
        day = '0' + day
    }
    if (month < 10) {
        month = '0' + month
    }
    return `${day}/${month}/${year}`
}
