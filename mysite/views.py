"""
Views for mysite project.
"""
from django.http import HttpResponse
from django.shortcuts import render
from datetime import datetime

def hello_world(request):
    """
    Simple Hello World view.
    """
    context = {
        'name': 'World',
        'current_time': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    return render(request, 'hello.html', context)

def hello_name(request, name):
    """
    Hello view with personalized name.
    """
    context = {
        'name': name,
        'current_time': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    return render(request, 'hello.html', context)