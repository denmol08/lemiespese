# lemiespese
Le mie spese

<h2>Requisiti</h2>
<p>
-Python 3.6+
</p>
<p>
  Le altre librerie richieste vanno installate eseguendo il comando (dalla root del progetto):
  pip install -r requirements.txt
</p>

<h2>Configurazione</h2>
<p>
  Vanno create due enviroment variables. <br>
  LS_DEBUG_VALUE: True o False, in base all'ambiente di deploy (False per produzione) <br>
  LS_SECURITY_KEY: chiave random usata da django per la sicurezza. Può essere generata con secrets di python (vedi https://docs.python.org/3/library/secrets.html)
</p>
<p>
  Creazione super user: <br>
  Eseguire comando "python manage.py createsuperuser"
</p>
<p>
  Aggiungere l'host nella lista di host in settings.py ALLOWED_HOSTS
</p>
