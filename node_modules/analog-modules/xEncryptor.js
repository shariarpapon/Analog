//ENCRYPTION LOGIC
module.exports = { encrypt, decrypt };

const keyLimit = 999;
const masterKey = 101;

const characters =
    [
        'o', '¢', 'Q', ',', '}', 'O', ' ', 's', 'A', 'L', '&', 'K', 'j', '§', '?', 'S', '+', 'W', '-', 'M',
        'u', 'n', 'D', 'e', 'P', 'a', 'G', '£', 'Z', '.', '"', '/', 'p', '\'', 'U', '€', ':', '#', 'X', ')',
        '@', '%', 'x', 'F', ']', 'V', 'R', '`', 'z', 'w', 'E', 'i', 'T', 'v', '(', ';', '°', 'm', 'J', '¥',
        '|', '{', '!', '>', 'd', 'b', 'H', '\\', 'c', '$', '=', 'f', '<', 'h', 't', '^', '~', 'I', 'r', '_',
        'q', 'y', 'Y', 'g', '*', 'B', 'l', 'N', '[', 'C', 'k', '4', '8', '2', '0', '6', '5', '1', '9', '3', '7'
    ];

async function encrypt(input) {
    var output = "";
    var publicKey = Math.floor(Math.random() * 797 + masterKey);
    output += publicKey.toString();
    for (var i = 0; i < input.length; i++) {
        chr = input.charAt(i);
        for (var j = 0; j < characters.length; j++) {
            pseudoChr = characters[j];
            if (pseudoChr == chr) {
                key = j + publicKey;
                output += key.toString();
                break;
            }
        }
    }
    return output;
}

async function decrypt(input) {
    var output = "";
    if (input.startsWith(' '))
        input = input.substring(1);

    var keys = input.match(/.{1,3}/g);
    var publicKey = parseInt(keys[0]);

    for (var i = 1; i < keys.length; i++) {
        var key = parseInt((parseInt(keys[i]) - publicKey));
        output += characters[key];
    }
    return output;
}