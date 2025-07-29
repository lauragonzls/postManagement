import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';

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
  
  constructor(private postsService: PostsService, private router: Router) {}

  onUpdate() {
    console.log('Updating post:', this.post);
    this.postsService.updatePost(this.post.id, this.post).subscribe(() => {
      console.log('Post updated successfully');
      this.router.navigate(['/posts']);
    });
  } 

  onCancel() {
  }
  goBack(): void {
    this.post = null;
  }
}
