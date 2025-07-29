import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post.model';


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
  @Output() save = new EventEmitter<Post>();
  
  constructor(private postsService: PostsService) {}

  onUpdate() {
    if (this.post && this.post.id) {
      this.postsService.updatePost(this.post.id, this.post).subscribe((updatedPost) => {
        this.save.emit(updatedPost);
      });
    }
  }
  onCancel() {
  }
  
}
