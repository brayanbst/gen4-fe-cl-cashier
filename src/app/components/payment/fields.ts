import { Validators } from "@angular/forms"

export const fields = [
  {
    key: 'cardNumber', 
    required: true,
    type: 'select', 
    editable: true, 
    validators: [Validators.required],
    options: [] as any[],
  },
  {
    key: 'expireDate', 
    required: true,
    label: 'Expire Date', 
    type: 'text', 
    editable: true, 
    validators: [Validators.required]
  },
]