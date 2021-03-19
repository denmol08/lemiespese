

function submitFormSpese(){
	var pk = document.getElementById('formSpese').pk;
	var importo = document.getElementById('importo');
	var importoValue = importo.value;
	var erroreImporto = document.getElementById('erroreImporto');
	var descrizione = document.getElementById('descrizione');
	var descrizioneValue = descrizione.value;
	var erroreDescrizione = document.getElementById('erroreDescrizione');
	var divSpese = document.getElementById('spese');

	//esecuzione controlli sui campi
	var controlliSuperati = true;
	var regExpImporto = /^\d+\.?\d{0,2}$/;
	if(!importoValue && importoValue !== 0){
		//importo non valorizzato
		erroreImporto.innerHTML = 'Campo obbligatorio';
		importo.classList.add('errore-input-form')
		controlliSuperati = false;
	}else if(!regExpImporto.test(importoValue)){
		//importo non valido
		erroreImporto.innerHTML = 'Importo non valido, può avere al massimo due decimali';
		importo.classList.add('errore-input-form')
		controlliSuperati = false;
	}else{
		importo.classList.remove('errore-input-form')
		erroreImporto.innerHTML = '';
	}
	if(!descrizioneValue){
		//descrizione non valorizzata
		erroreDescrizione.innerHTML = 'Campo obbligatorio';
		descrizione.classList.add('errore-input-form')
		controlliSuperati = false;
	}else{
		descrizione.classList.remove('errore-input-form')
		erroreDescrizione.innerHTML = '';
	}
	if(!controlliSuperati){
		return;
	}

	//aggiunta maschera di caricamento sulla griglia (in main.js)
	var mask = addLoadingMaskToComponent(divSpese)

	//chiamate per inserimento o edit
	var fieldsKeys = ['data','descrizione','importo'];
	var view = '/addSpesa/';
	if(pk){
		view = '/editSpesa/' + pk + '/';
	}
	var jsonBody = {
		'importo' : importoValue,
		'descrizione' : descrizioneValue
	}
	asyncRequest(
        view,'POST',jsonBody,
		function(res){
            divSpese.store = JSON.parse(res.response);
            reloadGrid(divSpese,fieldsKeys);
            if(!pk){
            	setFormSpese()
            }
            mask.remove();
		},
		function(res){
            mask.remove();
		}
	);
}


//valorizzazione dei campi del form (con dei valori per l'edit o vuoti per l'inserimento)
function setFormSpese(pk,record){
	var formSpese = document.getElementById('formSpese');
	var buttonSubmit = document.getElementById('setSpesaButton');
	formSpese.pk = pk;
	var campoImporto = document.getElementById('importo');
	var campoDescrizione = document.getElementById('descrizione');
	var erroreImporto = document.getElementById('erroreImporto');
	var erroreDescrizione = document.getElementById('erroreDescrizione');
	erroreImporto.innerHTML = '';
	erroreDescrizione.innerHTML = '';
	campoImporto.classList.remove('errore-input-form');
	campoDescrizione.classList.remove('errore-input-form');
	if(record){
		campoImporto.value = record.importo;
		campoDescrizione.value = record.descrizione;
	}else{
		campoImporto.value = '';
		campoDescrizione.value = '';
	}
}
