import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-cmn-container',
  imports: [CommonModule],
  animations: [
    trigger('expandCollapse', [
      state(
        'expanded',
        style({ height: '*', opacity: 1, padding: '*', margin: '*' })
      ),
      state(
        'collapsed',
        style({ height: '0px', opacity: 0, padding: '0', margin: '0' })
      ),
      transition('expanded <=> collapsed', animate('400ms ease-in-out')),
    ]),
  ],
  templateUrl: './cmn-container.component.html',
  styleUrl: './cmn-container.component.css'
})
export class CmnContainerComponent implements OnInit {
  @Input() customClass = '';
  @Input() title: string = '';
  @Input() icon: string = '';

  // NEW input for controlling collapsible toggle visibility
  @Input() collapsible: boolean = true;
  @Input() headerActions: string = '';

  isCollapsed = false;
  // Optional right-side action button
  @Input() actionText: string = '';
  @Output() actionClicked = new EventEmitter<void>();

  constructor() {}

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  onActionClick(): void {
    this.actionClicked.emit();
  }

  ngOnInit() {}
}
