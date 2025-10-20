"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.hello_world, name='hello_world'),
    path('hello/', views.hello_world, name='hello'),
    path('hello/<str:name>/', views.hello_name, name='hello_name'),
    path('singlepage/', views.singlepage_app, name='singlepage_app'),
]