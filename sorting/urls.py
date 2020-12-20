from django.urls import path

from . import views

urlpatterns = [
    path('sort', views.indexInit, name='indexInit'),
    path('sorting', views.index, name='index'),
    path('processForm', views.processForm, name='processForm'),
    path('bsort', views.bubbleSort, name = 'bsort'),
    path('isort', views.insertionSort, name = 'isort'),
    path('ssort', views.selectionSort, name = 'ssort'),
    path('msort', views.mergeSort, name = 'msort'),
    path('hsort', views.heapSort, name = 'hsort'),
    path('qsort', views.quickSort, name = 'qsort'),
]