import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
 
  selector: 'app-delete-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule 
  ],
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.css'],
})
export class DeleteCardComponent {
  @Input() message: string = 'Are you sure you want to delete this post? This action cannot be undone.';
  @Input() visible: boolean = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
  close(): void {
    this.visible = false;
    this.cancel.emit();
  }
  onUpdate(): void {
    console.log('Deleting post');
  }
}
