import { Directive, ElementRef, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[roomLabel]',
  standalone: true,
})
export class RoomsLabelDirective {
  private htmlElement?: ElementRef<HTMLElement>;
  private _errors?: ValidationErrors | null = null;

  @Input() fieldName: string = '';

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    //console.log(this._errors);
    // this.setErrorMessage();
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;

    this.htmlElement.nativeElement.innerHTML = 'red';
  }

  ngOnChanges(): void {
    this.setErrorMessage();
  }

  setStyle() {
    if (!this.htmlElement) return;
    this.htmlElement.nativeElement.classList.add('text-sm', 'text-red-500');
  }

  setErrorMessage(): void {
    //console.log(this.fieldName);

    if (!this.htmlElement) return;

    if (!this._errors) {
      this.htmlElement.nativeElement.innerHTML = '';
      return;
    }

    // Creamos un array con las claves de los errores
    const errors = Object.keys(this._errors);
    //console.log(errors);

    if (errors.includes('required')) {
      const capitalizedFieldName =
        this.fieldName.charAt(0).toUpperCase() + this.fieldName.slice(1);
      this.htmlElement.nativeElement.innerText = `${capitalizedFieldName} is required.`;
      return;
    }

    if (errors.includes('minlength')) {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];

      this.htmlElement.nativeElement.innerText = `Minimum ${current}/${min} characters.`;
      return;
    }

    if (errors.includes('maxlength')) {
      const max = this._errors!['maxlength']['requiredLength'];
      const current = this._errors!['maxlength']['actualLength'];

      this.htmlElement.nativeElement.innerText = `Maximum ${current}/${max} characters.`;
      return;
    }

    if (errors.includes('pattern')) {
      this.htmlElement.nativeElement.innerText = 'Invalid email format.';
      return;
    }
  }
}
