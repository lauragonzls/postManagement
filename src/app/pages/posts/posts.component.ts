import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { EditCardComponent } from '../../components/edit-card/edit-card.component';
import { CustomPopup } from '../../custom-popup/custom-popup';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, PostCardComponent, EditCardComponent, CustomPopup],
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
    this.showPopup = false;
  }

  isEditing: boolean = false;
  showPopup: boolean = false;


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

  openPostPopup(id: number): void {
    this.showPopup = true;
    this.postsService.getPost(id).subscribe((post) => {
      this.selectedPost = post;
    });
  }
  deletePost(): void {
    this.showPopup = false;
    console.log('Deleting post:', this.selectedPost?.id);
    // this.postsService.deletePost(this.selectedPost.id).subscribe(() => {
    //   this.posts = this.posts.filter((post) => post.id !== id);
    //   this.selectedPost = null;
    //   this.isEditing = false;
    //   this.showPopup = false;
    // });
  }
  createPost(id:number, title:string, body:string): void {
    const newPost: Post = {
      userId: 1,
      id: 0,
      title: title,
      body: body,
    };

    this.postsService.createPost(newPost).subscribe((createdPost) => {
      this.posts.push(createdPost);
      this.selectedPost = createdPost;
      this.isEditing = true;
    });
}
}
