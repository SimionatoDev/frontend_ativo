import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLabelValue]'
})
export class LabelValueDirective {
  @Input("LABEL") label: string = "NOME";
  @Input("VALUE") value: string = "MARCOS RENATO FALCONI";

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const labelElement = this.renderer.createElement('span');
    const valueElement = this.renderer.createElement('span');

    this.renderer.setStyle(labelElement, 'color', 'blue');
    this.renderer.setStyle(labelElement, 'font-weight', 'bold');
    this.renderer.setStyle(valueElement, 'color', 'black');
    this.renderer.setStyle(labelElement, 'margin-right', '5px');

    const labelText = this.renderer.createText(this.label);
    const valueText = this.renderer.createText(this.value);

    this.renderer.appendChild(labelElement, labelText);
    this.renderer.appendChild(valueElement, valueText);

    this.renderer.appendChild(this.el.nativeElement, labelElement);
    this.renderer.appendChild(this.el.nativeElement, valueElement);
  }

}
