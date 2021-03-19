//cookie, per il token csfr per le chiamate post
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function asyncRequest(view,method,jsonBody,callback,callbackErr){
    var xhr = new XMLHttpRequest();
    xhr.open(method, view, true);
    xhr.setRequestHeader('X-CSRFToken' ,getCookie('csrftoken'));
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(xhr);//reloadGrid('Spese',JSON.parse(xhr.response),fieldsKeys);
            } else {
                callbackErr(xhr);
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        callbackErr(xhr);
        console.error(xhr.statusText);
    };
    var body = null;
    if(jsonBody){
        if(typeof jsonBody === 'object'){
            body = JSON.stringify(jsonBody);
        }else{
            body = jsonBody;
        }
    }
    xhr.send(body); 
}

function addLoadingMaskToComponent(component){
    var htmlMask =      
        "<div class='mask'>"+
        "</div>";

    component.insertAdjacentHTML('afterbegin',htmlMask);
    return component.getElementsByClassName('mask')[0];
}

