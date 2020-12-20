from django import forms

class navForm(forms.Form):
    CHOICES=[("Bubble", "BUBBLE"), ("Insertion", "INSERTION"), ("Selection", "SELECTION"), ("Merge", "MERGE"), ("Heap","HEAP"), ("Quick", "QUICK")]
    sort = forms.ChoiceField(choices=CHOICES, widget=forms.RadioSelect)