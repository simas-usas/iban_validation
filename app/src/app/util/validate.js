import codeLengths from 'static/code-lengths';

function mod(string) {
    let checkSum = string.slice(0, 2), 
        fragment;
    for (var offset = 2; offset < string.length; offset += 7) {
        fragment = String(checkSum) + string.substring(offset, offset + 7);
        checkSum = parseInt(fragment, 10) % 97;
    }
    return checkSum;
}

export default function(input) {
    const iban = String(input).toUpperCase().replace(/[^A-Z0-9]/g, ''),
        code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/);
    let digits;

    if (!code || iban.length !== codeLengths[code[1]]) {
        return false;
    }

    digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, (letter) => letter.charCodeAt(0) - 55);

    return mod(digits) === 1 ? true : false;
}