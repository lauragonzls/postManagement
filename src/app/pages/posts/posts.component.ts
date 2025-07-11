import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { EditCardComponent } from '../../components/edit-card/edit-card.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, PostCardComponent, EditCardComponent],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postsService.getPosts().subscribe((data) => {
      this.posts = data.slice(0, 10);
    });
  }

  selectedPost: Post | null = null;

  viewPost(id: number): void {
    const post = this.posts.find((p) => p.id === id);
    if (post) {
      this.selectedPost = post;
    }
  }

  goBack(): void {
    this.selectedPost = null;
    this.isEditing = false;
  }

  isEditing: boolean = false;

  editPost(id: number): void {
    const post = this.posts.find((p) => p.id === id);
    if (post) {
      this.selectedPost = { ...post };
      this.isEditing = true;
    }
  }
  onPostUpdated(updatedPost: Post): void {
    const index = this.posts.findIndex((p) => p.id === updatedPost.id);
    if (index !== -1) {
      this.posts[index] = { ...updatedPost };
    }

    this.goBack();
  }

  deletePost(id: number): void {
    if (confirm('¿Are you sure you want to delete this post?')) {
      this.postsService.deletePost(id).subscribe(() => {
        alert('Post deleted successfully');
        this.loadPosts();
      });
    }
  }
}
