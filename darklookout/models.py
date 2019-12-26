from django.db import models

class Users(models.Model):
    name = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    userType = models.CharField(max_length=200)

class Links(models.Model):
    link = models.CharField(max_length=200)

class Notifications(models.Model):
    title = models.CharField(max_length=200)
    message = models.CharField(max_length=200)
    status = models.CharField(max_length=200)

class AdminNotifications(models.Model):
    title = models.CharField(max_length=200)
    message = models.CharField(max_length=200)
    status = models.CharField(max_length=200)
