from django.db import models

class ListItem(models.Model):
    task = models.CharField(max_length=100)
    completed = models.BooleanField()
