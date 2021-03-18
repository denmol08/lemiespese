from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
# Create your models here.

class Spesa(models.Model):
	data = models.DateField(default=now)
	importo = models.DecimalField(max_digits = 13,decimal_places=2)
	descrizione = models.CharField(max_length=200)
	user = models.ForeignKey(User, on_delete=models.CASCADE);

	def __str__(self):
		return 'Spesa: ' + str(self.pk);