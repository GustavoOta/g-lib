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
    if (isElement(element) === false) return;

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
            message: 'Classe não encontrada: ' + className,
            type: 'danger',
            icon: 'exclamation-triangle',
            position: 'bottom',
            timeout: 4000
        })
        return;
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

export const blurListener = (elementID, callback) => {
    // verifica se o elemento existe
    if (isElement(elementID) === false) return;

    // verfica se o elemeno possui o evento de blur se sim exclua
    if (document.getElementById(elementID).onblur) {
        document.getElementById(elementID).onblur = null;
    }
    document.getElementById(elementID).addEventListener('blur', callback);
}

export const keyupListener = (elementID, callback) => {
    // verifica se o elemento existe
    if (isElement(elementID) === false) return;

    // verfica se o elemeno possui o evento de click se sim exclua
    if (document.getElementById(elementID).onkeyup) {
        document.getElementById(elementID).onkeyup = null
    }
    document.getElementById(elementID).addEventListener('keyup', callback)
}

export const getValue = (elementID) => {
    // verifica se o elemento existe
    if (isElement(elementID) === false) return;

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
    }
};

export const select = (elementID) => {
    if (isElement(elementID) === false) return;
    document.getElementById(elementID).select()
}

export const show = (elementID) => {
    if (isElement(elementID) === false) return;
    document.getElementById(elementID).style.display = ''
}

export const hide = (elementID) => {
    if (isElement(elementID) === false) return;
    document.getElementById(elementID).style.display = 'none'
}

export const toggleView = (elementID) => {
    if (isElement(elementID) === false) return;
    let element = document.getElementById(elementID);
    if (element.style.display === 'none') {
        element.style.display = '';
    } else {
        element.style.display = 'none';
    }
}

export const disable = (elementID) => {
    if (isElement(elementID) === false) return;
    document.getElementById(elementID).disabled = true
}

export const enable = (elementID) => {
    if (isElement(elementID) === false) return;
    document.getElementById(elementID).disabled = false
}

export const addClass = (elementID, className) => {
    document.getElementById(elementID).classList.add(className)
}

export const removeClass = (elementID, className) => {
    document.getElementById(elementID).classList.remove(className)
}

export const innerHTML = async (elementID, html) => {
    if (isElement(elementID) === false) return;
    document.getElementById(elementID).innerHTML = html
}

export const getInnerHTML = (elementID) => {
    // check if element exists if not notify it
    if (isElement(elementID) === false) return;
    return document.getElementById(elementID).innerHTML
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

export const formatDecimalMoedaBRToUS = (value, toFloat) => {
    // se value = number converte para string
    if (typeof value === 'number') {
        value = value.toString()
    }
    // permtir apenas numeros e virgula
    value = value.replace(/[^0-9,]/g, '')
    value = value.replace(',', '.')
    if (toFloat === true) return parseFloat(value);
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

export const plusMonthFromDate = (date, months) => {
    let day, month, year;

    if (date.includes('/')) {
        // Formato brasileiro dd/mm/yyyy
        let dateArray = date.split('/');
        day = dateArray[0];
        month = dateArray[1];
        year = dateArray[2];
    } else if (date.includes('-')) {
        // Formato americano yyyy-mm-dd
        let dateArray = date.split('-');
        year = dateArray[0];
        month = dateArray[1];
        day = dateArray[2];
    } else {
        throw new Error('Formato de data inválido, utilize dd/mm/yyyy ou yyyy-mm-dd');
    }

    let newDate = new Date(year, month - 1, day);
    newDate.setMonth(newDate.getMonth() + months);

    let newDay = newDate.getDate();
    let newMonth = newDate.getMonth() + 1;
    let newYear = newDate.getFullYear();

    if (newDay < 10) {
        newDay = '0' + newDay;
    }
    if (newMonth < 10) {
        newMonth = '0' + newMonth;
    }

    if (date.includes('/')) {
        // Retornar no formato brasileiro dd/mm/yyyy
        return `${newDay}/${newMonth}/${newYear}`;
    } else {
        // Retornar no formato americano yyyy-mm-dd
        return `${newYear}-${newMonth}-${newDay}`;
    }
}

export const diffDaysFromDates = (dateYoung, dateOld) => {
    let dayYoung, monthYoung, yearYoung;
    let dayOld, monthOld, yearOld;

    if (dateYoung.includes('/')) {
        // Formato brasileiro dd/mm/yyyy
        let dateYoungArray = dateYoung.split('/');
        dayYoung = dateYoungArray[0];
        monthYoung = dateYoungArray[1];
        yearYoung = dateYoungArray[2];
    } else if (dateYoung.includes('-')) {
        // Formato americano yyyy-mm-dd
        let dateYoungArray = dateYoung.split('-');
        yearYoung = dateYoungArray[0];
        monthYoung = dateYoungArray[1];
        dayYoung = dateYoungArray[2];
    } else {
        throw new Error('Formato de data inválido para dateYoung');
    }

    if (dateOld.includes('/')) {
        // Formato brasileiro dd/mm/yyyy
        let dateOldArray = dateOld.split('/');
        dayOld = dateOldArray[0];
        monthOld = dateOldArray[1];
        yearOld = dateOldArray[2];
    } else if (dateOld.includes('-')) {
        // Formato americano yyyy-mm-dd
        let dateOldArray = dateOld.split('-');
        yearOld = dateOldArray[0];
        monthOld = dateOldArray[1];
        dayOld = dateOldArray[2];
    } else {
        throw new Error('Formato de data inválido para dateOld');
    }

    let dateYoungObj = new Date(yearYoung, monthYoung - 1, dayYoung);
    let dateOldObj = new Date(yearOld, monthOld - 1, dayOld);
    let diffTime = dateYoungObj - dateOldObj;
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

export const calcJurosCompostos = (capital, taxa, periodoDias) => {
    let juros = capital * Math.pow(1 + taxa / 100, periodoDias) - capital;
    return juros;
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
        return;
    }
    document.getElementById(elementID).click();
}

export const ifEmptyReturnZero = (value, toStringType) => {
    switch (value) {
        case undefined:
        case null:
        case 'undefined':
        case 'null':
        case 'NaN':
        case '':
        case ' ':
        case '0':
        case false:
        case NaN:
            if (toStringType === true) return '0';
            return 0;
        default:
            return value;
    }
}

export const gotoTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

export const gotoBottom = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

// VALIDATION FROM VALIDATION
export const maskInputCPF = (element) => {
    if (!element) return
    if (element.value == '') return
    // se o numero excesso de numeros apaga o ultimo
    if (element.value.length > 14) {
        element.value = element.value.substring(0, 14)
    }

    element.value = element.value.replace(/\D/g, "")
    element.value = element.value.replace(/(\d{3})(\d)/, "$1.$2")
    element.value = element.value.replace(/(\d{3})(\d)/, "$1.$2")
    element.value = element.value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}
export const maskInputCNPJ = (element) => {

    // verifica se é uma string ou é um elemento se for string converte para elemento
    if (typeof element == 'string') {
        element = document.getElementById(element)
    }

    // se o numero de digitos do cnpj excesso de numeros apaga o ultimo
    if (element.value.length > 18) {
        element.value = element.value.substring(0, 18)
    }
    // se o numeri de digitos for invalido muda a cor da borda para vermelho do bootstrap <div class="form-group has-error">
    if (element.value.length < 18) {
        element.parentElement.classList.add('has-error')
    } else {
        element.parentElement.classList.remove('has-error')
    }
    element.value = element.value.replace(/\D/g, "")
    element.value = element.value.replace(/(\d{2})(\d)/, "$1.$2")
    element.value = element.value.replace(/(\d{3})(\d)/, "$1.$2")
    element.value = element.value.replace(/(\d{3})(\d)/, "$1/$2")
    element.value = element.value.replace(/(\d{4})(\d{1,2})$/, "$1-$2")
}
export const maskInputCEP = (element) => {
    if (typeof element == 'string') {
        element = document.getElementById(element);
    }

    // se o numero excesso de numeros apaga o ultimo
    if (element.value.length > 9) {
        element.value = element.value.substring(0, 9)
    }
    // se o numero de digitos for invalido muda a cor da borda para vermelho do bootstrap <div class="form-group has-error">
    if (element.value.length < 9) {
        element.parentElement.classList.add('has-error')
    } else {
        element.parentElement.classList.remove('has-error')
    }

    element.value = element.value.replace(/\D/g, "")
    element.value = element.value.replace(/(\d{5})(\d)/, "$1-$2")

    // se os digitos são validos remove a cor da borda de erro
    if (element.value.length == 9) {
        element.parentElement.classList.remove('has-error')
    }
}
export const maskInputCelular = (element) => {
    if (typeof element == 'string') {
        element = document.getElementById(element);
    }
    // mascar de telefone celular formato (99) 99999-9999
    // se o numero excesso de numeros apaga o ultimo
    if (element.value.length > 15) {
        element.value = element.value.substring(0, 15)
    }
    // colocar a pontuação de formato de telefone celular
    element.value = element.value.replace(/\D/g, "")
    element.value = element.value.replace(/(\d{2})(\d)/, "($1) $2")
    element.value = element.value.replace(/(\d{5})(\d)/, "$1-$2")
}
export const maskInputTelefone = (element) => {
    if (typeof element == 'string') {
        element = document.getElementById(element);
    }
    // mascar de telefone fixo formato (99) 9999-9999
    // se o numero excesso de numeros apaga o ultimo
    if (element.value.length > 14) {
        element.value = element.value.substring(0, 14)
    }
    // colocar a pontuação de formato de telefone fixo
    element.value = element.value.replace(/\D/g, "")
    element.value = element.value.replace(/(\d{2})(\d)/, "($1) $2")
    element.value = element.value.replace(/(\d{4})(\d)/, "$1-$2")
}
export const validarUF = (element) => {
    // se o numero excesso de numeros apaga o ultimo
    if (element.value.length > 2) {
        element.value = element.value.substring(0, 2)
    }
    // se o numero de digitos for invalido muda a cor da borda para vermelho do bootstrap <div class="form-group has-error">
    if (element.value.length < 2) {
        element.parentElement.classList.add('has-error')
    } else {
        element.parentElement.classList.remove('has-error')
    }
    element.value = element.value.toUpperCase()
    // permitir apenas UF validas
    if (element.value == 'AC' || element.value == 'AL' || element.value == 'AP' || element.value == 'AM' || element.value == 'BA' || element.value == 'CE' || element.value == 'DF' || element.value == 'ES' || element.value == 'GO' || element.value == 'MA' || element.value == 'MT' || element.value == 'MS' || element.value == 'MG' || element.value == 'PA' || element.value == 'PB' || element.value == 'PR' || element.value == 'PE' || element.value == 'PI' || element.value == 'RJ' || element.value == 'RN' || element.value == 'RS' || element.value == 'RO' || element.value == 'RR' || element.value == 'SC' || element.value == 'SP' || element.value == 'SE' || element.value == 'TO') {
        element.parentElement.classList.remove('has-error')
    } else {
        element.parentElement.classList.add('has-error')
    }
}
export const returnCFOP = (valor) => {

    if (!valor) return ''
    //console.log('passed value to returnCFOP: ' + valor)
    // verifica se é string e converte para string
    if (typeof valor != 'string') valor = valor.toString()
    // formato 5.101
    let valorFormatado = valor.replace(/\D/g, "")

    valorFormatado = valorFormatado.replace(/(\d{1})(\d)/, "$1.$2")
    return valorFormatado
}
export const onlyINT = (num) => {
    let regex = /[0-9]/
    let numFormatado = ''
    for (let i = 0; i < num.length; i++) {
        if (regex.test(num[i])) {
            numFormatado += num[i]
        }
    }
    numFormatado = parseInt(numFormatado)
    return numFormatado
}
export const onlyNumberAsString = (num) => {
    num = num.replace(/\D/g, '');
    return num;
}
export const blurMoedaBR = (reqElement) => {
    // formatar campo input para moeda br
    let element = document.getElementById(reqElement)
    let valor = element.value
    // se a string == '' adicionar R$ 0,00
    if (valor == '') {
        valor = 'R$ 0,00'
        element.value = valor
        return
    }

    // colocar pontuação de milhar
    valor = valor.replace('.', '')
    valor = valor.replace(',', '.')
    valor = parseFloat(valor)
    valor = valor.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    valor = 'R$ ' + valor
    element.value = valor
}
/* DUPLICATED export const keyupMoedaBR = (reqElement) => {
    let element = document.getElementById(reqElement)
    let valor = element.value

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
    element.value = valor
    if (element.parentElement.classList.contains('has-error')) {
        element.parentElement.classList.remove('has-error')
    }
} */
export const clickFocusMoedaBR = (reqElement) => {
    let element = document.getElementById(reqElement)
    let valor = element.value
    valor = valor.replace('R$', '')
    valor = valor.replace(' ', '')
    valor = valor.replace('  ', '')
    valor = valor.replace(/[^0-9,.-]/g, '')
    element.value = valor
    element.select()
}
export const displayMoedaBR = (reqElement, valor) => {
    let element = document.getElementById(reqElement)
    element.value = valor
    // check if valor is string or not, if not convert to string
    if (typeof valor != 'string') valor = valor.toString()
    // if valor is 0 or empty, display R$ 0,00
    if (valor == '0' || valor == '') {
        element.value = 'R$ 0,00'
        return
    }
    // remove all char that is not a number of 0 - 9 or dot
    valor = valor.replace(/[^0-9,.-]/g, '')
    // output format R$ 9.999,99 template
    valor = formatarMoedaBR(valor)
    element.value = valor
}
export const returnMoedaBR = (valor) => {
    //console.log('returnMoedaBR RAW: ' + valor)
    // check if valor is string or not, if not convert to string
    if (valor == null) return 'R$ 0,00'
    if (typeof valor != 'string') valor = valor.toString()
    // if valor is 0 or empty, display R$ 0,00
    if (valor == '0' || valor == '') {
        return 'R$ 0,00'
    }
    // remove all char that is not a number of 0 - 9 or dot
    valor = valor.replace(/[^0-9,.-]/g, '')
    //console.log('returnMoedaBR REGEX: ' + valor)
    // output format R$ 9.999,99 template
    valor = formatarMoedaBR(valor)
    //console.log('returnMoedaBR FORMATADO: ' + valor)
    return valor
}
export const keyupPorcentagemBR = (reqElement) => {
    let element = document.getElementById(reqElement)
    let valor = element.value

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
    element.value = valor
    if (element.parentElement.classList.contains('has-error')) {
        element.parentElement.classList.remove('has-error')
    }
}
export const clickFocusPorcentagemBR = (reqElement) => {
    let element = document.getElementById(reqElement)
    let valor = element.value
    valor = valor.replace('%', '')
    valor = valor.replace(' ', '')
    valor = valor.replace('  ', '')
    valor = valor.replace(/[^0-9,.-]/g, '')
    element.value = valor
    element.select()
}
export const blurPorcentagemBR = (reqElement) => {
    // formatar campo input para moeda br
    let element = document.getElementById(reqElement)
    let valor = element.value
    // se a string == '' adicionar R$ 0,00
    if (valor == '') {
        valor = '0%'
        element.value = valor
        return
    }

    // colocar pontuação de milhar
    valor = valor.replace('.', '')
    valor = valor.replace(',', '.')
    valor = parseFloat(valor)
    valor = valor.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 3 })
    valor = valor + '%'
    element.value = valor
}
export const displayPorcentagemBR = (reqElement, valor) => {
    let element = document.getElementById(reqElement)
    element.value = valor
    // check if valor is string or not, if not convert to string
    if (typeof valor != 'string') valor = valor.toString()
    // if valor is 0 or empty, display ''
    if (valor == '0' || valor == '') {
        element.value = 'não aplicado'
        return
    }
    // remove all char that is not a number of 0 - 9 or dot
    valor = valor.replace(/[^0-9,.-]/g, '')
    // converte para float
    valor = parseFloat(valor)
    // limita decimal para 2 digitos
    valor = valor.toFixed(2)
    valor = valor.toString()
    valor = valor.replace('.', ',')
    element.value = valor + '%'
    //console.log('validating markup: ' + element.value)
}
export const keyupQntBR = (reqElement) => {

    let element = document.getElementById(reqElement)
    let valor = element.value
    // se na string a virgula for o unico digito, adicionar 0 a esquerda
    if (valor == ',') {
        valor = '0,'
    }
    /*     if (valor[valor.length - 1] == ',') {
            valor = '0' + valor
        } */
    // allow numbers from 0 to 9 and allow dot and comma
    valor = valor.replace(/[^0-9,.-]/g, '')
    // limit to 3 decimal places
    valor = valor.replace(/(,*\,[0-9][0-9][0-9]).*/g, '$1')
    // if is two commans inside the string, remove the last one
    valor = valor.replace(/(,.*?),/g, '$1')

    element.value = valor
    if (element.parentElement.classList.contains('has-error')) {
        element.parentElement.classList.remove('has-error')
    }
}
export const blurQntBR = (reqElement) => {
    let element = document.getElementById(reqElement)
    let valor = element.value

    if (valor == '') valor = '0'

    element.value = valor
}
export const clickFocusQntBR = (reqElement) => {
    let element = document.getElementById(reqElement)
    let valor = element.value

    if (valor == '0') {
        element.select()
    }
}
export const displayQntBR = (reqElement, valor) => {
    let element = document.getElementById(reqElement)
    element.value = valor
    // check if valor is string or not, if not convert to string
    if (typeof valor != 'string') valor = valor.toString()
    // if valor is 0 or empty, display 0
    if (valor == '0' || valor == '') {
        element.value = '0'
        return
    }
    // remove all char that is not a number of 0 - 9 or dot
    valor = valor.replace(/[^0-9,.-]/g, '')
    // output format 9.999,99 template
    valor = formatarDecimal3Digitos(valor)
    valor = valor.replace(',000', '')
    valor = valor.replace(',00', '')
    valor = valor.replace(',0', '')
    element.value = valor
}
export const returnQntBR = (valor) => {
    // Primeiro, verifique se o valor é undefined ou null
    if (valor === undefined || valor === null) {
        console.error('Valor é undefined ou null')
        return '0'
    }

    // check if valor is string or not, if not convert to string
    if (typeof valor != 'string') valor = valor.toString()
    // if valor is 0 or empty, display 0
    if (valor == '0' || valor == '') {
        return '0'
    }
    // remove all char that is not a number of 0 - 9 or dot
    valor = valor.replace(/[^0-9,.-]/g, '')
    // output format 9.999,99 template

    valor = formatarDecimal3Digitos(valor)
    valor = valor.replace(',000', '')
    valor = valor.replace(',00', '')
    return valor
}
export const keyupNCM = (reqElement) => {
    let element = document.getElementById(reqElement)
    let valor = element.value
    // allow numbers from 0 to 9 and allow dot and comma
    valor = valor.replace(/[^0-9]/g, '')
    // limit to 3 decimal places
    valor = valor.replace(/(,[0-9][0-9][0-9]).*/g, '$1')
    // if is two commans inside the string, remove the last one
    valor = valor.replace(/(.*?),/g, '$1')
    element.value = valor

    if (element.parentElement.classList.contains('has-error')) {
        element.parentElement.classList.remove('has-error')
    }
}
export const clickFocusNCM = (reqElement) => {
    let element = document.getElementById(reqElement)
    let valor = element.value

    if (valor == '0') {
        element.select()
    }
}
export const blurNCM = (reqElement) => {
    let element = document.getElementById(reqElement)
    let valor = element.value

    if (valor == '') valor = '0'
    element.value = valor
}
export const displayNCM = (reqElement, valor) => {
    if (valor == '0') {
        element.value = ''
        return
    }
    if (!valor) {
        //console.log('displayNCM: valor is undefined')
        return
    }
    if (valor == '') {
        //console.log('displayNCM: valor is 0 or empty')
        return
    }
    // NCM template for 63.09.0010 = ??.??.????
    let element = document.getElementById(reqElement)
    element.value = valor
    // check if valor is string or not, if not convert to string
    if (typeof valor != 'string') valor = valor.toString()
    // if valor is 0 or empty, display nothing

    // remove all char that is not a number of 0 - 9
    valor = valor.replace(/[^0-9]/g, '')
    // check if valor is 8 digits, if not return error on input then focus
    if (valor.length != 8) {
        element.parentElement.classList.add('has-error')
        element.select()
        return
    }
    if (element.parentElement.classList.contains('has-error')) {
        element.parentElement.classList.remove('has-error')
    }
    // format valor to NCM template
    valor = valor.replace(/(\d{2})(\d)/, "$1.$2")
    valor = valor.replace(/(\d{2})(\d)/, "$1.$2")
    element.value = valor
}
export const returnNCM = (valor) => {
    //console.log('Passed value to returnNCM: ' + valor)
    // NCM template for 63.09.0010 = ??.??.????
    // check if valor is string or not, if not convert to string
    if (typeof valor != 'string') valor = valor.toString()
    // if valor is 0 or empty, display nothing

    if (valor == '0' || valor == '') {
        return ''
    }
    // remove all char that is not a number of 0 - 9
    valor = valor.replace(/[^0-9]/g, '')
    // check if valor is 8 digits, if not return error on input then focus
    if (valor.length != 8) {
        return valor + 'inválido.'
    }
    // format valor to NCM template
    valor = valor.replace(/(\d{2})(\d)/, "$1.$2")
    valor = valor.replace(/(\d{2})(\d)/, "$1.$2")
    return valor
}
export const returnCEST = (valor) => {
    if (!valor) {
        console.log('returnCEST: valor is undefined')
        return ''
    }
    // check if valor is string or not, if not convert to string
    if (typeof valor != 'string') valor = valor.toString()
    if (valor == '0' || valor == '') {
        console.log('returnCEST: valor is 0 or empty')
        return ''
    }
    // remove all char that is not a number of 0 - 9
    valor = valor.replace(/[^0-9]/g, '')
    // limit char to 7
    valor = valor.substring(0, 7)
    // output format 	28.063.00
    valor = valor.replace(/(\d{2})(\d)/, "$1.$2")
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2")
    return valor

}
export const formatarMoedaBR = (valor) => {
    // check if is not a float, if not convert to float
    if (typeof valor != 'number') valor = parseFloat(valor)
    return valor.toLocaleString('pt-BR',
        {
            style: 'currency',
            currency: 'BRL',
            currencyDisplay: 'symbol',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
}
export const formatarMoedaBR3Digitos = (valor) => {
    if (typeof valor != 'number') valor = parseFloat(valor)
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 3, maximumFractionDigits: 3 })
}
export const formatarDecimal2Digitos = (valor) => {
    // ckeck if is not a float, if not convert to float
    if (typeof valor != 'number') valor = parseFloat(valor)
    return valor.toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
export const formatarDecimal3Digitos = (valor) => {
    if (typeof valor != 'number') valor = parseFloat(valor)
    return valor.toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 3, maximumFractionDigits: 3 })
}
export const formatarPercent2Digitos = (valor) => {
    valor = parseFloat(valor)
    return valor.toLocaleString('pt-BR',
        {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
}
export const formatarPercent3Digitos = (valor) => {
    if (typeof valor != 'number') valor = parseFloat(valor)
    return valor.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 3, maximumFractionDigits: 3 })
}
export const keyupYear = (year) => {
    if (year == '') return
    // limitar a 4 digitos
    if (year.length > 4) {
        year = year.substring(0, 4)
    }
    // permitir apenas numeros
    year = year.replace(/\D/g, "")

    // se ano for menor que 4000 ou maior que o ano atual, alertar erro
    if (year < 4000 || year > new Date().getFullYear()) {
        alert('Ano inválido')
        return
    }
    return year
}
export const clearWrongWhiteSpace = (string) => {
    if (!string) return ''
    if (string == '') return ''
    // convert to string
    string = string.toString()

    // do not allow more than 1 whitespace
    string = string.replace(/\s{2,}/g, ' ')
    // do not allow whitespace at the beginning of the string
    string = string.replace(/^\s+/, '')
    // do not allow whitespace at the end of the string
    string = string.replace(/\s+$/, '')
    return string
}
export const returnDataBR = (date) => {
    // convet format date == YYYY-MM-DD to DD/MM/YYYY
    let dateParts = date.split('-')
    return dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0]

}
export const returnTelCel = (numeroEmString) => {
    // retornar (00) 00000-0000 para celular ou (00) 0000-0000 telefone
    // Se o numeroEmString == null, undefined ou vazio, retornar ''
    if (!numeroEmString) return ''
    // limpar a string de qualquer caracter que não seja um número
    let numero = numeroEmString.replace(/\D/g, '')
    // verificar se é telefone ou celular
    if (numero.length == 10) {
        // telefone fixo
        numero = numero.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
        numeroEmString = numero
    } else if (numero.length == 11) {
        // celular
        numero = numero.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
        numeroEmString = numero
    }
    return numeroEmString
}

//*********** FIM DE VALIDATION ***********//



export const removeParentClass = (element, className) => {
    if (element.parentElement.classList.contains(className)) {
        element.parentElement.classList.remove(className)
    }
}

export const addParentClass = (element, className) => {
    if (!element.parentElement.classList.contains(className)) {
        element.parentElement.classList.add(className)
    }
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

function isElement(elementID) {
    let elementName = 'desconhecido';
    // se o elemento é uma string converte para elemento
    if (typeof elementID == 'string') {
        elementName = elementID;
        elementID = document.getElementById(elementID)
    }
    if (elementID) {
        return true;
    } else {
        notification({
            title: 'Erro',
            message: 'Elemento não encontrado: ' + elementName,
            type: 'danger',
            icon: 'exclamation-triangle',
            position: 'bottom',
            timeout: 4000
        });
        return false;
    }
}
