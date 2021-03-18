function reloadGridSpese(){
	var divSpese = document.getElementById('spese');
	var mask = addLoadingMaskToComponent(divSpese)
	var fieldsKeys = ['data','descrizione','importo'];
    asyncRequest(
        '/spese/','GET',null,
		function(res){
			divSpese.store = JSON.parse(res.response);
            reloadGrid(divSpese,fieldsKeys);
            divSpese.scrollTo(0,0);
            mask.remove();
		},
		function(res){
            mask.remove();
		}
	);
}



function submitFormSpese(){
	var pk = document.getElementById('formSpese').pk;
	var importo = document.getElementById('importo');
	var importoValue = importo.value;
	var erroreImporto = document.getElementById('erroreImporto');
	var descrizione = document.getElementById('descrizione');
	var descrizioneValue = descrizione.value;
	var erroreDescrizione = document.getElementById('erroreDescrizione');
	var divSpese = document.getElementById('spese');
	//controlli
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
	var mask = addLoadingMaskToComponent(divSpese)
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

function reloadGrid(gridComponent,fieldsKeys){
	var newBody = document.createElement('tbody');
	var oldBody = gridComponent.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
	var records = gridComponent.store;
	var htmlRows = '';
	var periodo = document.getElementById('periodo').value;
	var filtroDescrizione = document.getElementById('filtro-descrizione').value;
	var dataDa = new Date();
	var totale = 0;
	switch (periodo) {
		case 'ultimo_mese':
			dataDa.setMonth(dataDa.getMonth()-1);
			break;
		case 'ultimo_trimestre':
			dataDa.setMonth(dataDa.getMonth()-3);
			break;
		case 'ultimo_anno':
			dataDa.setMonth(dataDa.getMonth()-12);
			break;
		default:
			dataDa = null;
	}
	for (var s = 0; s < records.length; s++){
		var record = records[s].fields;
		if(!dataDa || new Date(record.data) >= dataDa){
			if(record.descrizione.toLowerCase().indexOf(filtroDescrizione.toLowerCase()) >= 0){
				htmlRows +=	'<tr id='+records[s].pk+'>'+
								'<td class="modifica">'+
									"<a class='edit-button image-button' onclick='setFormSpese("+records[s].pk+","+JSON.stringify(record)+")\'>"+
										'<img src="static/lista_spese/edit.png">'+
									'</a></td>'+
								'<td class="cancella"><a class="delete-button image-button" onclick="deleteSpesa('+records[s].pk+')"><img src="static/lista_spese/delete.png"></td>';
				for(var f = 0; f < fieldsKeys.length; f++){
					htmlRows += '<td class="'+fieldsKeys[f]+' hidden-overflow">'+record[fieldsKeys[f]]+'</td>';
				}
				htmlRows += '</tr>';
				totale += parseFloat(record.importo);
			}
		}
		
	}
	newBody.insertAdjacentHTML('afterbegin',htmlRows);
	oldBody.parentNode.replaceChild(newBody,oldBody);
	gridComponent.scrollTo(0,0);
	var campoTotale = document.getElementById('totale').innerHTML = totale.toFixed(2);
}



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

function deleteSpesa(pk) {
	var divSpese = document.getElementById('spese');
	var mask = addLoadingMaskToComponent(divSpese)
	var fieldsKeys = ['data','descrizione','importo'];
	var view = '/deleteSpesa/' + pk + '/';
	asyncRequest(
        view,'POST',null,
		function(res){
			divSpese.store = JSON.parse(res.response);
            reloadGrid(divSpese,fieldsKeys);
            setFormSpese()
            mask.remove();
		},
		function(res){
            mask.remove();
		}
	);
}

function filtraDatiGriglia(records){
	var periodo = document.getElementById('periodo').value;
	var descrizione = document.getElementById('filtro-descrizione').value;
	var dataDa = new Date();
	switch (periodo) {
		case 'ultimo_mese':
			dataDa.setMonth(dataDa.get(month)-1);
			break;
		case 'ultimo_trimestre':
			dataDa.setMonth(dataDa.get(month)-3);
			break;
		case 'ultimo_anno':
			dataDa.setMonth(dataDa.get(month)-12);
			break;
	}
	var newBody = document.createElement('tbody');
	var body = document.getElementById('table-spesa').getElementsByTagName('tbody')[0];
	var righeGriglia = body.getElementsByTagName('tr');
	for(var r = 0; r < righeGriglia.length; r++){
		var data = righeGriglia[r].getElementsByClassName('data')[0].innerHTML;
		var descrizione = righeGriglia[r].getElementsByClassName('descrizione')[0].innerHTML;
		var importo = righeGriglia[r].getElementsByClassName('importo')[0].innerHTML;
	}
}

function reloadGridData(){
	var divSpese = document.getElementById('spese');
	var fieldsKeys = ['data','descrizione','importo'];
	reloadGrid(divSpese,fieldsKeys);
}