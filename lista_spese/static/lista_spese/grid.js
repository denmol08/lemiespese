//chiamata async per recuperare i valori dal db
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


//ricarica della griglia, dopo l'applicazione dei filtri
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

	//per ogni record applico filti e in caso lo aggiungo alla table
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

//chiamata async per la cancellazione di un record e ricarica grid
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

function reloadGridData(){
	var divSpese = document.getElementById('spese');
	var fieldsKeys = ['data','descrizione','importo'];
	reloadGrid(divSpese,fieldsKeys);
}