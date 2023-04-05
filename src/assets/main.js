function loadTextFile(filePath, callback) {

    const request = new XMLHttpRequest();
    request.open('GET', filePath, true);

    request.onload = function () {
        if (request.status === 200) {
            callback(request.responseText.split('\n').map(word => word.trim()));
        } else {
            console.error(`Error loading file ${filePath}: ${request.statusText}`);
            callback([]);
        }
    };

    request.onerror = function () {
        console.error(`Error loading file ${filePath}: ${request.statusText}`);
        callback([]);
    };

    request.send();

}

const filePath = 'assets/english-words.txt';

loadTextFile(filePath, function (wordsArray) {

    function isSentenceEnglish(sentence) {
        const words = sentence.split(' ');
        for (let i = 0; i < words.length; i++) {
            if (!wordsArray.includes(words[i].toLowerCase())) {
                return false;
            }
        }
        return true;
    }

    function konvertujUDrugoPismo(recenica) {
        var cirilicno = "";
        var reci = recenica.split(" ");

        const cyrillicMap = {
            'A': 'А', 'a': 'а',
            'B': 'Б', 'b': 'б',
            'V': 'В', 'v': 'в',
            'G': 'Г', 'g': 'г',
            'D': 'Д', 'd': 'д',
            'Đ': 'Ђ', 'đ': 'ђ',
            'E': 'Е', 'e': 'е',
            'Ž': 'Ж', 'ž': 'ж',
            'Z': 'З', 'z': 'з',
            'I': 'И', 'i': 'и',
            'J': 'Ј', 'j': 'ј',
            'K': 'К', 'k': 'к',
            'L': 'Л', 'l': 'л',
            'Lj': 'Љ', 'lj': 'љ',
            'M': 'М', 'm': 'м',
            'N': 'Н', 'n': 'н',
            'Nj': 'Њ', 'nj': 'њ',
            'O': 'О', 'o': 'о',
            'P': 'П', 'p': 'п',
            'R': 'Р', 'r': 'р',
            'S': 'С', 's': 'с',
            'T': 'Т', 't': 'т',
            'Ć': 'Ћ', 'ć': 'ћ',
            'U': 'У', 'u': 'у',
            'F': 'Ф', 'f': 'ф',
            'H': 'Х', 'h': 'х',
            'C': 'Ц', 'c': 'ц',
            'Č': 'Ч', 'č': 'ч',
            'Dž': 'Џ', 'dž': 'џ',
            'Š': 'Ш', 'š': 'ш',
        };

        for (var i = 0; i < reci.length; i++) {
            var rec = reci[i];

            // proveri da li rec sadrzi karaktere q, x, y, ili w
            //regex za i i I karaketer /\b[iI]\b/g.test(rec)

            if (/[qxyw]/i.test(rec) || (isSentenceEnglish(rec) == true && !/\b[iI]\b/g.test(rec) && !rec == 'bio') || /[A-Z].*[A-Z]/.test(rec) || /\d/.test(rec)) {
                cirilicno += rec + " ";
                continue; // preskoci ovu rec
            }

            // inace, konvertuj rec u cirilicu
            var novaRec = "";

            for (var j = 0; j < rec.length; j++) {

                var trenutniZnak = rec.charAt(j);

                if (trenutniZnak in cyrillicMap) {
                    var temp = rec[j + 1];
                    
                    if (trenutniZnak == 'n' && temp == 'j') {
                        novaRec += cyrillicMap['nj']
                        ++j;
                    }

                    else if (trenutniZnak == 'N' && temp == 'j') {
                        novaRec += cyrillicMap['Nj']
                        ++j;
                    }

                    else if (trenutniZnak == 'L' && temp == 'j') {
                        novaRec += cyrillicMap['Lj']
                        ++j;
                    }

                    else if (trenutniZnak == 'l' && temp == 'j') {
                        novaRec += cyrillicMap['lj']
                        ++j;
                    }

                    else if (trenutniZnak == 'D' && temp == 'ž') {
                        novaRec += cyrillicMap['Dž']
                        ++j;
                    }

                    else if (trenutniZnak == 'd' && temp == 'ž') {
                        novaRec += cyrillicMap['dž']
                        ++j;
                    }

                    else
                        novaRec += cyrillicMap[trenutniZnak];
                }

                else {
                    novaRec += trenutniZnak;
                }
            }
            cirilicno += novaRec + " ";
        }

        return cirilicno.trim();
    }

    // Funkcija za konvertiranje iz ćirilice u latinicu
    function cirilicaULatinicu(cirilica) {
        const mapaSlova = {
            'А': 'A', 'а': 'a',
            'Б': 'B', 'б': 'b',
            'В': 'V', 'в': 'v',
            'Г': 'G', 'г': 'g',
            'Д': 'D', 'д': 'd',
            'Ђ': 'Đ', 'ђ': 'đ',
            'Е': 'E', 'е': 'e',
            'Ж': 'Ž', 'ж': 'ž',
            'З': 'Z', 'з': 'z',
            'И': 'I', 'и': 'i',
            'J': 'J', 'j': 'j',
            'К': 'K', 'к': 'k',
            'Л': 'L', 'л': 'l',
            'Љ': 'Lj', 'љ': 'lj',
            'М': 'M', 'м': 'm',
            'Н': 'N', 'н': 'n',
            'Њ': 'Nj', 'њ': 'nj',
            'О': 'O', 'о': 'o',
            'П': 'P', 'п': 'p',
            'Р': 'R', 'р': 'r',
            'С': 'S', 'с': 's',
            'Т': 'T', 'т': 't',
            'Ћ': 'Ć', 'ћ': 'ć',
            'У': 'U', 'у': 'u',
            'Ф': 'F', 'ф': 'f',
            'Х': 'H', 'х': 'h',
            'Ц': 'C', 'ц': 'c',
            'Ч': 'Č', 'ч': 'č',
            'Џ': 'Dž', 'џ': 'dž',
            'Ш': 'Š', 'ш': 'š',
        };

        let latinica = '';

        for (let i = 0; i < cirilica.length; i++) {

            const trenutniZnak = cirilica[i];
            const prevod = mapaSlova[trenutniZnak];
            if (prevod) {
                latinica += prevod;
            } else {
                latinica += trenutniZnak;
            }
        }
        
        return latinica;
    }

    document.getElementById("prvi").oninput = function () {

        var x = document.getElementById("prvi").value;
        var proveraAbecee = proveriAbecedu(x);
        var res = "";
        if (proveraAbecee == 'latinica') {
            res = konvertujUDrugoPismo(x);
        } else if (proveraAbecee == 'cirilica') {
            res = cirilicaULatinicu(x);
        }
        document.getElementById("drugi").innerHTML = res;

    }

    //prepoznavanje da li je latinica ili cirilica 

    function proveriAbecedu(tekst) {
        const mapaCirilica = {
            'Љ': true, 'љ': true,
            'Њ': true, 'њ': true,
            'Ћ': true, 'ћ': true,
            'Ђ': true, 'ђ': true,
            'Џ': true, 'џ': true,
            'А': true, 'а': true,
            'Б': true, 'б': true,
            'В': true, 'в': true,
            'Г': true, 'г': true,
            'Д': true, 'д': true,
            'Ђ': true, 'ђ': true,
            'Е': true, 'е': true,
            'Ж': true, 'ж': true,
            'З': true, 'з': true,
            'И': true, 'и': true,
            'Ј': true, 'ј': true,
            'К': true, 'к': true,
            'Л': true, 'л': true,
            'М': true, 'м': true,
            'Н': true, 'н': true,
            'О': true, 'о': true,
            'П': true, 'п': true,
            'Р': true, 'р': true,
            'С': true, 'с': true,
            'Т': true, 'т': true,
            'У': true, 'у': true,
            'Ф': true, 'ф': true,
            'Х': true, 'х': true,
            'Ц': true, 'ц': true,
            'Ч': true, 'ч': true,
            'Ш': true, 'ш': true,
        };

        const mapaLatinica = {
            'Lj': true, 'lj': true,
            'Nj': true, 'nj': true,
            'Ć': true, 'ć': true,
            'Đ': true, 'đ': true,
            'Dž': true, 'dž': true,
            'A': true, 'a': true,
            'B': true, 'b': true,
            'C': true, 'c': true,
            'Č': true, 'č': true,
            'Ć': true, 'ć': true,
            'D': true, 'd': true,
            'Dž': true, 'dž': true,
            'E': true, 'e': true,
            'F': true, 'f': true,
            'G': true, 'g': true,
            'H': true, 'h': true,
            'I': true, 'i': true,
            'J': true, 'j': true,
            'K': true, 'k': true,
            'L': true, 'l': true,
            'M': true, 'm': true,
            'N': true, 'n': true,
            'O': true, 'o': true,
            'P': true, 'p': true,
            'R': true, 'r': true,
            'S': true, 's': true,
            'Š': true, 'š': true,
            'T': true, 't': true,
            'U': true, 'u': true,
            'V': true, 'v': true,
            'Z': true, 'z': true,
            'Ž': true, 'ž': true,
        };

        for (let i = 0; i < tekst.length; i++) {
            const slovo = tekst[i];
            if (mapaCirilica[slovo]) {
                return 'cirilica';
            }
            if (mapaLatinica[slovo]) {
                return 'latinica';
            }
        }

        // Ako nijedno slovo nije pronađeno u mapi
        return 'nepoznata';
    }

    // obrisi text area-u

    document.getElementById('obrisi').onclick = function () {
        document.getElementById("prvi").value = ''
        document.getElementById("drugi").innerHTML = ''
    }

});

function copyText() {
    const element = document.querySelector('#drugi');
    element.select();
    element.setSelectionRange(0, 99999);
    document.execCommand('copy');
}
