from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),
    path('login/userLogin', views.userLogin, name='userLogin'),
    path('users', views.users, name='users'),
    path('crawler', views.crawler, name='crawler'),
    path('crawler/initCrawler', views.initCrawler, name='initCrawler'),
    path('crawler/createLink', views.createLink, name='createLink'),
    path('crawler/linksview', views.linksview, name='linksview'),
    path('users/createUser', views.createUser, name='createUser'),
    path('users/createNotification', views.createNotification, name='createNotification'),
    path('users/createAdminNotification', views.createAdminNotification, name='createAdminNotification'),
    path('users/getAllUsers', views.getAllUsers, name='getAllUsers'),
    path('getNewNotification',views.getNewNotification, name='getNewNotification'),
    path('updateNotification',views.updateNotification, name='updateNotification'),
     path('getNewAdminNotification',views.getNewAdminNotification, name='getNewAdminNotification'),
    path('updateAdminNotification',views.updateAdminNotification, name='updateAdminNotification')
]
