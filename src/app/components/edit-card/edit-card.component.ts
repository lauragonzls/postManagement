import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule 
  ],
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent {
  @Input() post: any;

  constructor(private router: Router) {}

  onUpdate() {
    console.log('Updating post:', this.post);

  }

  onCancel() {
  }
}
