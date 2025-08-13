import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cmn-label',
  imports: [CommonModule],
  templateUrl: './cmn-label.component.html',
  styleUrl: './cmn-label.component.css'
})
export class CmnLabelComponent {

  @Input() public label = '';
  @Input() public id = '';
  @Input() public customLabel = '';
  @Input() public isAstRequired = true;
  @Input() public text = '';
  constructor() {
    this.id = 'lbl' + new Date().getDate().toString();
  }

}
