from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
from django.template import loader
from numpy import random
from django.views.decorators.csrf import csrf_exempt
import json 
from .forms import navForm
from random import randint

def indexInit(request):
    len = request.session.get('len', 50)
    form = navForm()
    arr = random.randint(33, size = (len)).tolist()
    template = loader.get_template('sorting/index.html')
    context = {'arr' : arr, "len": len, "form": form, "status": False}
    output = template.render(context)
    request.session['arr'] = arr
    request.session['len'] = len
    request.session.set_expiry(1000)
    return HttpResponse(output)
    
@csrf_exempt
def index(request):
    data = json.loads(request.body)
    len = int(data['value'])
    len = int(len)
    arr = random.randint(33, size = (len)).tolist()
    context = {'arr' : arr, "len": len}
    template = loader.get_template('sorting/main.html')
    output = template.render(context)
    request.session['arr'] = arr
    request.session['len'] = len
    request.session.set_expiry(1000) 
    return HttpResponse(output)

@csrf_exempt
def bubbleSort(request): 
    arr = request.session.get('arr')
    res = []
    n = len(arr)
    for i in range(n): 
        res.append([])
        for j in range(0, n-i-1): 
            if arr[j] > arr[j+1] : 
                arr[j], arr[j+1] = arr[j+1], arr[j]
                res[-1].append(["element"+str(j+1), "element" + str(j+2), True])
            else:
                res[-1].append(["element"+str(j+1), "element" + str(j+2), False])
        res[-1].append("element" + str(n-i))
    request.session['arr'] = arr
    request.session['len'] = n
    return JsonResponse({'arr': res, "sort": "Bubble"})


@csrf_exempt
def insertionSort(request): 
    arr = request.session.get('arr')
    res = []
    n = len(arr)
    for i in range(1, n): 
        key = arr[i] 
        j = i-1
        res.append(["element" + str(i+1)])
        while j >= 0 and key < arr[j] : 
                arr[j + 1] = arr[j] 
                res[-1].append(["element" + str(j+2), "element" + str(j+1)])
                j -= 1
        arr[j + 1] = key
        res[-1].append("element" + str(j+2))
    request.session['arr'] = arr
    request.session['len'] = n
    return JsonResponse({'arr': res, "sort": "Insertion"})

@csrf_exempt
def selectionSort(request):
    arr = request.session.get('arr')
    res = []
    n = len(arr)
    for i in range(n): 
        min_idx = i 
        res.append(["element" + str(i+1)])
        for j in range(i+1, len(arr)): 
            res[-1].append("element" + str(j+1))
            if arr[min_idx] > arr[j]: 
                min_idx = j 
        arr[i], arr[min_idx] = arr[min_idx], arr[i] 
        res[-1].append("element" + str(min_idx+1))
        
    request.session['arr'] = arr
    request.session['len'] = n
    return JsonResponse({'arr': res, 'sort': "Selection"})

def mergeSort(request):
    arr = request.session.get('arr')
    res = []
    def merge(arr, l, m, r): 
        n1 = m - l + 1
        n2 = r- m 
      
        L = [0] * (n1) 
        R = [0] * (n2) 
      
        for i in range(0 , n1): 
            L[i] = arr[l + i] 
      
        for j in range(0 , n2): 
            R[j] = arr[m + 1 + j] 
      
        i = 0
        j = 0
        k = l
      
        while i < n1 and j < n2 : 
            if L[i] <= R[j]: 
                arr[k] = L[i] 
                res[-1].append(["element" + str(k+1), "element" + str(l+i+1), "element" + str(m+j+2), L[i]])
                i += 1
            else: 
                arr[k] = R[j] 
                res[-1].append(["element" + str(k+1), "element" + str(l+i+1), "element" + str(m+j+2), R[j]])
                j += 1
            k += 1
      
        while i < n1: 
            arr[k] = L[i] 
            res[-1].append(["element" + str(k+1), "element" + str(l+i+1), False, L[i]])
            i += 1
            k += 1
      
        while j < n2: 
            arr[k] = R[j] 
            res[-1].append(["element" + str(k+1), False, "element" + str(m+j+2), R[j]])
            j += 1
            k += 1
      
    def mergeS(arr,l,r): 
        if l < r: 
            m = (l+(r-1))//2
            
            mergeS(arr, l, m) 
            mergeS(arr, m+1, r) 
            res.append([])
            merge(arr, l, m, r) 
                
    mergeS(arr, 0 , len(arr)-1)
    request.session['arr'] = arr
    request.session['len'] = len(arr)
    return JsonResponse({'arr': res, 'sort': "Merge"})

def heapSort(request):
    arr = request.session.get('arr')
    heapify = [[]]
    sort = []
    def bubbleDown(arr, n, i, res):
        largest = i
        l = 2 * i + 1
        r = 2 * i + 2
            
        if l < n and arr[largest] < arr[l]:
            largest = l
            
     
        if r < n and arr[largest] < arr[r]:
            largest = r
     
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i] 
            res[-1].append(["element" + str(i+1), "element" + str(largest+1)])
            bubbleDown(arr, n, largest, res)
        else:
            res[-1].append(["element" + str(i+1), "element" + str(i+1)])
            
    def heapS(arr):
        n = len(arr)
     
        for i in range(n//2 - 1, -1, -1):
            bubbleDown(arr, n, i, heapify)
     
        for i in range(n-1, 0, -1):
            arr[i], arr[0] = arr[0], arr[i]
            sort.append([["element" + str(i+1), "element1"]])
            bubbleDown(arr, i, 0, sort)
            sort[-1].append("element" + str(i+1))
    
    heapS(arr)
    request.session['arr'] = arr
    request.session['len'] = len(arr)
    return JsonResponse({'arr': sort, 'sort': "Heap", "heapify": heapify[0]})

def quickSort(request):
    arr = request.session.get('arr')
    res = []
    def partition(arr, low, high):
        i = (low-1)
        pivot = arr[high]

        for j in range(low, high):
            if arr[j] <= pivot:
                i = i+1
                res[-1].append(["element" + str(i+1), "element" + str(j+1)])
                arr[i], arr[j] = arr[j], arr[i]
     
        arr[i+1], arr[high] = arr[high], arr[i+1]
        res[-1].append(["element" + str(i+2), "element" + str(high+1)])
        return (i+1)
     
    def quickS(arr, low, high):
        if low < high:
            pi = randint(low, high)
            res.append(["element" + str(pi+1), "element" + str(low+1), "element" + str(high+1)])
            arr[high], arr[pi] = arr[pi], arr[high]
            pi = partition(arr, low, high)
            res[-1].append("element" + str(pi + 1))

            quickS(arr, low, pi-1)
            quickS(arr, pi+1, high)
            
    quickS(arr, 0, len(arr) - 1)
    request.session['arr'] = arr
    request.session['len'] = len(arr)
    return JsonResponse({'arr': res, 'sort': "Quick"})

@csrf_exempt
def processForm(request):
    data = json.loads(request.body)
    pref = data['pref']
    if pref == 'Bubble':
        return redirect("/bsort/")
    if pref == 'Insertion':
        return redirect("/isort/")
    if pref == 'Selection':
        return redirect("/ssort/")
    if pref == 'Merge':
        return redirect("/msort/")
    if pref == 'Heap':
        return redirect("/hsort/")
    if pref == 'Quick':
        return redirect("/qsort/")