

function callFun(value) {  
        $.ajax({
        type: "POST",
            url: "/sorting/",
            data: JSON.stringify({
            "value": value
       }),
       success: function(data) {
           if(data) { 
                $('#main').html(data);
                }
        }
       });
   return false;
};

function callUpdate(value) {
    var output = document.getElementById("val");
    output.innerHTML = value;
}

function changeC(elements, c) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = c;
    }
}

$(document).ready(function(){
    $('input[type="radio"]').change(function(){
        $('label').css("background-color", "#0c0c0d");
        console.log(this.value)
        if(this.value == "Bubble")
            $('li>label[for="id_sort_0"]').css("background-color", "#000000");
        if(this.value == "Insertion")
            $('label[for="id_sort_1"]').css("background-color", "#000000");
        if(this.value == "Selection")
            $('label[for="id_sort_2"]').css("background-color", "#000000");
        if(this.value == "Merge")
            $('label[for="id_sort_3"]').css("background-color", "#000000");
        if(this.value == "Heap")
            $('label[for="id_sort_4"]').css("background-color", "#000000");
        if(this.value == "Quick")
            $('label[for="id_sort_5"]').css("background-color", "#000000");
    });
        $('img').click(function() {
        location.reload();
    });
});

function processForm(form, b) { 
    var pref = form.sort.value;
    var $radioButtons = $("input:radio");
    var anyRadioButtonHasValue = false;

    $radioButtons.each(function(){
        if(this.checked){
            anyRadioButtonHasValue = true;
            return false;
        } 
    });
        
    if(anyRadioButtonHasValue){
        b.disabled = true;
        s = document.getElementById("slider");
        s.disabled = true
        $.ajax({
            type: "POST",
            url: "/processForm/",
            data: JSON.stringify({
            "pref": pref
        }),
        success: 
            function(data) {
                if(data) {
                    changeC(document.getElementsByClassName('element'),  "#d1193e");
    //---------------------BUBBLE------------------------
                    if(data["sort"] == "Bubble"){
                        arr = data["arr"]
                        t = 0
                        for(let i = 0; i < arr.length; i+=1){
                            setTimeout(function(){
                                x = 0
                                for(let j = 0; j < arr[i].length-1; j+=1){
                                    setTimeout(function(){
                                        e1 = document.getElementById(arr[i][j][0])
                                        e2 = document.getElementById(arr[i][j][1])
                                        e1.style.backgroundColor = "#FBA465";
                                        e2.style.backgroundColor = "#f86e51";
                                    }, x)
                                    x+=5
                                    setTimeout(function(){
                                        if(arr[i][j][2]){
                                            var temp = e1.innerHTML
                                            e1.innerHTML = e2.innerHTML
                                            e2.innerHTML = temp
                                        }
                                        e2.style.backgroundColor = "#FBA465";
                                        e1.style.backgroundColor = "#f86e51";
                                    }, x)
                                    x+=5
                                    setTimeout(function(){
                                        e2.style.backgroundColor = "#d1193e";
                                        e1.style.backgroundColor = "#d1193e";
                                    }, x)
                                }
                                setTimeout(function(){
                                    document.getElementById(arr[i][arr[i].length - 1]).style.backgroundColor = "#99b898";
                                }, x)
                            }, t)
                            t+=10*(arr[i].length)
                        }
                        setTimeout(function(){
                            b.disabled = false
                            s.disabled = false
                        }, t);
                    }

    //---------------------INSERTION----------------------                
                    if(data["sort"] == "Insertion"){
                        arr = data["arr"];
                        k=0;
                        for(let i = 0; i < arr.length; i+=1){
                            setTimeout(function(){
                                curr = arr[i]
                                e1 = document.getElementById(curr[0])
                                key = e1.innerHTML;
                                changeC(document.getElementsByClassName('element'),  "#d1193e");
                                e1.style.backgroundColor = "#FBA465";
                                for(let j = 1; j<curr.length-1;j+=1){
                                    setTimeout( function(){
                                        e1.style.backgroundColor = "#f86e51";
                                        e1 = document.getElementById(curr[j][0])
                                        e2 = document.getElementById(curr[j][1])
                                        e1.innerHTML = e2.innerHTML
                                        e2.style.backgroundColor = "#FBA465";
                                    }, 10*j)
                                }
                                setTimeout( function(){
                                    r = curr[curr.length-1]
                                    r = document.getElementById(r)
                                    r.style.bakgroundColor = "#FBA465";
                                    r.innerHTML = key;
                                }, 10*curr.length);

                                setTimeout( function(){
                                    r = curr[curr.length-1]
                                    r = document.getElementById(r)
                                    r.style.bakgroundColor = "#99b898";
                                }, 10*curr.length+10);
                            }, k);
                            k+=10*arr[i].length+10

                        }
                        setTimeout(function(){
                            changeC(document.getElementsByClassName('element'), "#99b898");
                            b.disabled = false
                            s.disabled = false
                        }, k);
                    }

    //---------------------SELECTION-----------------------                
                    if(data["sort"] == "Selection"){
                        arr = data["arr"];
                        k = 0
                        for(let i = 0; i<arr.length; i+=1 ){
                            setTimeout(function(){
                                curr = arr[i]
                                e1 = document.getElementById(curr[0])
                                for(let j = 1; j<curr.length-1;j+=1){
                                    e2 = document.getElementById(curr[j]);
                                    e2.style.backgroundColor = "#d1193e";
                                }
                                x = 0
                                e1.style.backgroundColor = "#FBA465";
                                for(let j = 1; j<curr.length-1;j+=1){
                                    setTimeout( function(){
                                        e2 = document.getElementById(curr[j]);
                                        e2.style.backgroundColor = "#f86e51";
                                    }, x+10);
                                    x+=10
                                }
                                r = document.getElementById(curr[curr.length - 1])
                                setTimeout(function(){
                                    r.style.backgroundColor = "#99b898"
                                }, x+10);
                                x+=10
                                setTimeout(function(){
                                    temp = e1.innerHTML;
                                    e1.innerHTML = r.innerHTML;
                                    r.innerHTML = temp;
                                    r.style.backgroundColor = "#FBA465";
                                    e1.style.backgroundColor = "#99b898";
                                }, x+10)
                                x+=10
                            }, k);
                            k+=(10*arr[i].length + 20)
                        }
                        setTimeout(function(){
                            b.disabled = false
                            s.disabled = false

                        }, k);
                    }

    //---------------------MERGE------------------------
                    if(data["sort"] == "Merge"){
                        arr = data['arr']
                        x = 0
                        for(let i = 0; i < arr.length; i+=1){
                            for(let j = 0; j < arr[i].length; j+=1){
                                setTimeout(function(){
                                    z = false
                                    k = document.getElementById(arr[i][j][0]);
                                    if(arr[i][j][2] && arr[i][j][2]>=arr[i][j][0]){
                                        z = document.getElementById(arr[i][j][2]);
                                        z.style.backgroundColor = "#f86e51";
                                    }
                                    k.style.backgroundColor = "#FBA465";
                                    value = "";
                                    for(let m = 0; m <= arr[i][j][3]; m+=1)
                                        value = value.concat("<br>")
                                    k.innerHTML = value;
                                }, x)
                                x+=10
                                setTimeout(function(){ 
                                    if (z)  
                                        z.style.backgroundColor = "#d1193e";
                                    if(i == (arr.length - 1))
                                        k.style.backgroundColor = "#99b898";
                                    else
                                        k.style.backgroundColor = "#d1193e";
                                }, x)
                            }
                        }

                        setTimeout(function(){
                            changeC(document.getElementsByClassName('element'), "#99b898");
                            b.disabled = false
                            s.disabled = false
                        }, x);
                    }

    //---------------------HEAP-------------------------                
                    if(data["sort"] == "Heap"){
                        arr = data['arr']
                        heapify = data['heapify']
                        x = 0
                        e1 = false;

                        for(let i = 0; i < heapify.length; i+=1){
                            setTimeout(function(){
                                if(e1)
                                    e1.style.backgroundColor = "#f2c85b";
                                e1 = document.getElementById(heapify[i][0])
                                e2 = document.getElementById(heapify[i][1])
                                e1.style.backgroundColor = "#FBA465";
                                e2.style.backgroundColor = "#f86e51";
                                temp = e1.innerHTML
                                e1.innerHTML = e2.innerHTML
                                e2.innerHTML = temp
                            }, x)
                            x+=10
                        }
                        setTimeout(function(){
                            changeC(document.getElementsByClassName('element'), "#f2c85b");
                        }, x)
                        x+=10
                        e1 = e2 =false
                        for(let i = 0; i < arr.length; i+=1){      
                            curr = arr[i]
                            for(let j = 0; j < curr.length - 1; j+=1){
                                setTimeout(function(){  
                                    cc = arr[i][j]
                                    if(e1)
                                        e1.style.backgroundColor = "#f2c85b";
                                    if(e2)
                                        e1.style.backgroundColor = "#f2c85b";
                                    e1 = document.getElementById(cc[0]);
                                    e2 = document.getElementById(cc[1]);
                                    e1.style.backgroundColor = "#FBA465";
                                    e2.style.backgroundColor = "#f86e51";
                                    temp = e1.innerHTML;
                                    e1.innerHTML = e2.innerHTML;
                                    e2.innerHTML = temp;            
                                }, x)
                                x+=10

                            }
                            setTimeout(function(){
                                document.getElementById(arr[i][arr[i].length - 1]).style.backgroundColor = "#99b898";
                            }, x)
                            x+=10
                        }
                        setTimeout(function(){
                            changeC(document.getElementsByClassName('element'), "#99b898");
                            b.disabled = false
                            s.disabled = false
                        }, x)
                        x+=10
                    }
                    
    //---------------------QUICK---------------------                                  
                    if(data["sort"] == "Quick"){
                        arr = data['arr']
                        t = 0
                        for(let i = 0; i<arr.length; i+=1){
                            setTimeout(() => {
                                pi = document.getElementById(arr[i][0])
                                low = document.getElementById(arr[i][1])
                                high = document.getElementById(arr[i][2])
                                pi.style.backgroundColor = "#f86e51";
                                low.style.backgroundColor = "#FBA465";
                                high.style.backgroundColor = "#FBA465";
                                var x = 10;
                                setTimeout(function(){
                                    var temp = pi.innerHTML;
                                    pi.innerHTML = high.innerHTML;
                                    high.innerHTML = temp;
                                    high.style.backgroundColor = "#f86e51";
                                    pi.style.backgroundColor = "#d1193e";
                                }, x)
                                x+=10
                                for(let j = 3; j < arr[i].length - 1; j+=1){
                                    setTimeout(function(){
                                        e1 = document.getElementById(arr[i][j][0])
                                        e2 = document.getElementById(arr[i][j][1])
                                        e1.style.backgroundColor = "#f86e51";
                                        e2.style.backgroundColor = "#FBA465";
                                        var temp = e1.innerHTML
                                        e1.innerHTML = e2.innerHTML
                                        e2.innerHTML = temp
                                    }, x)
                                    x+=10
                                    setTimeout(function(){
                                        e1.style.backgroundColor = "#d1193e";
                                        e2.style.backgroundColor = "#d1193e";
                                    }, x)
                                }
                                setTimeout(function(){
                                    document.getElementById(arr[i][arr[i].length - 1]).style.backgroundColor = "#99b898";
                                }, x)
                            }, t)
                            t+=10
                            t+=(arr[i].length-2)*10
                        }
                        setTimeout(function(){
                            changeC(document.getElementsByClassName('element'), "#99b898");
                            b.disabled = false
                            s.disabled = false
                        }, t)
                    }
                }       
            }
        });
    }
    else
        alert("Please select a choice.")
};