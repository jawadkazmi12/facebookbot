from django.shortcuts import render, redirect
from django.http import HttpResponse
from .dLSpider import DarkSpider
from .models import Users
from .models import Links
from .models import Notifications
from .models import AdminNotifications
import json
from django.core import serializers

def login(request):
    return render(request,'dashboard/login.html',{"page":"login"})

def index(request):
    return render(request,'dashboard/index.html',{"page":"index"})

def users(request):
    return render(request,'dashboard/users.html',{"page":"users"})

def crawler(request):
    link = Links.objects.all()
    
    return render(request,'dashboard/crawler.html',{"link":link})
    
def initCrawler(request):
    dark = DarkSpider()
    response = dark.initiateCrawler()
    return HttpResponse(json.dumps({'response': response}), content_type="application/json")

def getAllUsers(request):
    users_list = serializers.serialize("json",Users.objects.all())
    return HttpResponse(json.dumps({'response': users_list}), content_type="application/json")

def userLogin(request):
    email = json.loads(request.body).get('email')
    password = json.loads(request.body).get('password')

    users_list = serializers.serialize("json", Users.objects.filter(email=email).filter(password=password))
    
    return HttpResponse(json.dumps({'users': users_list}), content_type="application/json")




def createUser(request):
    
    name = json.loads(request.body).get('name')
    email = json.loads(request.body).get('email')
    password = json.loads(request.body).get('password')
    phone = json.loads(request.body).get('phone')
    company = json.loads(request.body).get('company')
    userType = json.loads(request.body).get('userType')

    newUser = Users(name=name,company=company,email=email,password=password,phone=phone,userType=userType)

    newUser.save()

    return HttpResponse(json.dumps({'response': "User has been created!"}), content_type="application/json")


def linksview(request):
    link = Links.objects.all()
    print(link)
    return render(request,'dashboard/crawler.html',{"link":link})    


def createLink(request):
    print ("Hello I'm Kazmi")
    
    link = request.POST['link']    
    
    newLink = Links(link=link)
    
    newLink.save()

    return redirect('crawler')


def createNotification(request):
    title = json.loads(request.body).get('title')
    message = json.loads(request.body).get('message')
    status = "new"
    newNotification = Notifications(title=title,message=message,status=status)
    newNotification.save()

    return HttpResponse(json.dumps({'response': "Notification has been sent!"}), content_type="application/json")

def createAdminNotification(request):
    title = json.loads(request.body).get('title')
    message = json.loads(request.body).get('message')
    status = "new"
    newNotification = AdminNotifications(title=title,message=message,status=status)
    newNotification.save()

    return HttpResponse(json.dumps({'response': "Notification has been sent!"}), content_type="application/json")

def updateAdminNotification(request):
    AdminNotifications.objects.filter(status="new").update(status='read')
    return HttpResponse(json.dumps({'response': "Notification has been read!"}), content_type="application/json")

def getNewAdminNotification(request):
    notifications_list = serializers.serialize("json", AdminNotifications.objects.filter(status="new"))
    return HttpResponse(json.dumps({'response': notifications_list}), content_type="application/json")

def updateNotification(request):
    Notifications.objects.filter(status="new").update(status='read')
    return HttpResponse(json.dumps({'response': "Notification has been read!"}), content_type="application/json")

def getNewNotification(request):
    notifications_list = serializers.serialize("json", Notifications.objects.filter(status="new"))
    return HttpResponse(json.dumps({'response': notifications_list}), content_type="application/json")
