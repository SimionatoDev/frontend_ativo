
import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLabelVerdeVermelho]'
})
export class LabelVerdeVermelhoDirective implements OnChanges {
  @Input("ITSOK") itsok: boolean  = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    this.updateTextColor();
  }

  private updateTextColor() {
    const color = this.itsok ? 'green' : 'red';
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }
}
