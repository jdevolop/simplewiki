const search = document.querySelector('input[type=search]');
const searchSpace = document.querySelector('.search');
const submit = document.querySelector('button[type=submit]');
const searchTitle = document.querySelector('#searchTitle');
const response = document.querySelector('.response');
// const link = document.querySelector('a');
const variants = document.querySelector('.variants');


let wikiUrl = 'https://ru.wikipedia.org/w/api.php?action=opensearch&origin=*&limit=50&format=json&search=';


response.innerHTML = '<h1>Что ищете?</h1>';

response.style.textAlign = 'center';

search.onkeyup = function() {



        let term = wikiUrl + this.value;


        if (this.value.length !== 0) {

            return ajaxSend(term, 'get', function () {

                if (this.readyState === 4 && this.status === 200) {

                    const got = JSON.parse(this.responseText);


                    searchTitle.innerHTML = got[1][0];
                    searchTitle.style.borderBottom = '1px solid #9c3328';
                    searchTitle.style.width = '300px';

                    response.innerHTML = got[2];
                    response.style.textAlign = '';

                    // link.innerHTML = '>>>&nbsp; View an original page &nbsp;<<<';
                    //
                    // link.onclick = function () {
                    //     window.open(got[3][0]);
                    // }

                } else if (this.readyState !== 4) {
                    searchTitle.innerHTML = '';
                    searchTitle.style.border = '0';

                    // link.innerHTML = '';

                    response.innerHTML = '';

                    let img = document.createElement('img');
                    img.setAttribute('src', './public/images/loading-dots.gif');
                    img.style.margin = 'auto';
                    img.style.display = 'block';

                    response.appendChild(img);
                }
            });
        } else {
            searchTitle.innerHTML = '';
            searchTitle.style.border = '0';



            response.innerHTML = '<h1>Что вам показать...</h1>';
        }

}
















/**
 * Ajax Send Function
 *
 * @param url {String} - request for this url
 * @param method {String} - for request method (GET | POST | ...)
 * @param callback {Function} - for event onReadyStateChange
 * @param params {String} - for some forms in html, sends some params like this .../req/for?{params}
 * @param async {Boolean} - default true, for async or not async query
 */

function ajaxSend(url, method, callback, params, async = true) {
    const state1 = typeof url === 'string' && typeof method === 'string';
    const state2 = params === undefined;
    const state3 = typeof async === 'boolean' && typeof callback === 'function';
    const state4 = params !== undefined && typeof params === 'string'
    if(state1 && state2 && state3){
        const request = new XMLHttpRequest();
        const func = callback || function (data) {};
        request.onreadystatechange = func;

        request.open(method.toUpperCase(), url, async);

        request.send();
    }else if(state1 && state3 && state4){
        const request = new XMLHttpRequest();
        const func = callback || function (data) {};
        request.onreadystatechange = func;

        request.open(method.toUpperCase(), url, async);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(params);
    }else if(url === undefined || method === undefined || callback === undefined){
        return console.error('URL bn Method bolishi shart!!! yoki args berishda xatolik bor');
    }
}