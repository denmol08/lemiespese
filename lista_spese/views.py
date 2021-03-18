from django.shortcuts import render
from .models import Spesa
from django.core import serializers
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
import json

@login_required
def home(request):
	return render(request, 'lista_spese/home.html')

@login_required
def spese(request):
	spese = Spesa.objects.all().filter(user=request.user).order_by('-pk')
	data = serializers.serialize('json',spese);
	return HttpResponse(data,content_type='application/json')

@login_required
def addSpesa(request):
	body = json.loads(request.body)
	importo = body.get('importo');
	descrizione = body.get('descrizione')
	spesa = Spesa.objects.create(importo = importo, descrizione = descrizione, user = request.user);
	return spese(request)

@login_required
def editSpesa(request,pk):
	body = json.loads(request.body)
	importo = body.get('importo');
	descrizione = body.get('descrizione')
	spesa = Spesa.objects.get(pk=pk)
	spesa.importo = importo
	spesa.descrizione = descrizione
	spesa.save()
	return spese(request)

@login_required
def deleteSpesa(request,pk):
	spesa = Spesa.objects.get(pk=pk)
	spesa.delete()
	return spese(request)