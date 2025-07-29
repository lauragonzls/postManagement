import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'custom-popup',
  standalone: true,
  templateUrl: './custom-popup.html',
  styleUrls: ['./custom-popup.css'],
})
export class CustomPopup {
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  @Input() postContent?: string;

  onClose(): void {
    this.close.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }
}
