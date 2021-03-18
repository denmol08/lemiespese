# Generated by Django 3.1.7 on 2021-03-16 08:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Spesa',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.DateField()),
                ('importo', models.DecimalField(decimal_places=2, max_digits=13)),
                ('descrizione', models.CharField(max_length=200)),
            ],
        ),
    ]
