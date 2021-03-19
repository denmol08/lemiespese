from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class UserRegistrationForm(UserCreationForm):

	class Meta:
		model = User
		fields = ['username','password1','password2']
		error_messages = {
			'username': {
				'max_length': 'Nome troppo lungo',
				'required': 'Il campo è obbligatorio'
			},
			'password1': {
				'min_length': 'La password è troppo corta',
				'required': 'Il campo è obbligatorio',
				'password_mismatch': 'Le due password non coincidono'
			},
			'password2': {
				'password_mismatch': 'Le due password non coincidono'
			}
		}

	def __init__(self,*args,**kwargs):
		super(UserRegistrationForm,self).__init__(*args,**kwargs)
		self.fields['username'].label = 'Nome utente'
		self.fields['username'].help_text = 'Può contenere al massimo 150 caratteri, tra lettere e numeri'
		self.fields['password1'].help_text = 'Deve contenere almeno 8 caratteri'
		self.fields['password2'].label = 'Verifica password'
		self.fields['password2'].help_text = 'Ripetere la password per la verifica'
			
		
	