import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';
import { HotToastService } from '@ngneat/hot-toast';
import { EditorModule } from 'primeng/editor';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtServiceService } from 'src/app/services/jwt-service.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
  tags = [
    { name: '#news', value: '#news' },
    { name: '#latest', value: '#latest' },
    { name: '#sports', value: '#sports' },
    { name: '#technology', value: '#technology' },
    { name: '#devices', value: '#devices' },
    { name: '#gaming', value: '#gaming' },
    { name: '#beauty', value: '#beauty' }
  ]

  userID : number = 0

  addForm = new FormGroup({
    title: new FormControl('',[Validators.required]),
    content: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
    tags: new FormControl('',[Validators.required]),
    //published: new FormControl()
  });
  feature_image = ''
  preset: string = "i8maua2c";
  file: string = ''

  cloudinaryUrl: string = 'http://api.cloudinary.com/v1_1/next-gen-files/image/upload';


  constructor(private blogService: BlogService, private toast: HotToastService, private http: HttpClient,private jwt: JwtServiceService) { }
  ngOnInit(): void {
    this.userID = this.jwt.getData(sessionStorage.getItem('key'))?.id;
  }

  submitForm(form: FormGroup) {
    if (form.valid) {
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('upload_preset', 'zvryv0vg');

      this.http.post(this.cloudinaryUrl, formData).pipe(
        this.toast.observe({
          loading: 'Saving...',
          success: 'Blog Saved',
          error: 'Couldn\'t save blog',
        })
      ).subscribe(async (res: any) => {
        let cloud_result = await res.url;
        this.feature_image = cloud_result;
        let selectTags = ''
      form.value.tags.forEach((tag: any) => {
        selectTags += tag.value;
      });
      let data = {
        title: form.value.title,
        category: form.value.category,
        content: form.value.content,
        tags: selectTags,
        published: true,
        author_id: this.userID,
        feature_image: this.feature_image
      }
      this.blogService.addBlog(data).
        pipe(
          this.toast.observe({
            loading: 'Publishing...',
            success: 'Blog published',
            error: 'Couldn\'t publish post',
          })
        ).subscribe((res: any) => {

          form.reset()
        }, (err: HttpErrorResponse) => {
          console.log(err)
        })

      }, (err: HttpErrorResponse) => {
        console.log(err)
      })


    }

  }

  setDraft(form: FormGroup) {
    if (form.valid) {
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('upload_preset', 'zvryv0vg');

      this.http.post(this.cloudinaryUrl, formData).pipe(
        this.toast.observe({
          loading: 'Saving...',
          success: 'Blog Saved',
          error: 'Couldn\'t save blog',
        })
      ).subscribe(async (res: any) => {
        let cloud_result = await res.url;
        this.feature_image = cloud_result;
        let selectTags = ''
      form.value.tags.forEach((tag: any) => {
        selectTags += tag.value;
      });
      let data = {
        title: form.value.title,
        category: form.value.category,
        content: form.value.content,
        tags: selectTags,
        published: false,
        author_id: 1,
        feature_image: this.feature_image
      }
      this.blogService.addBlog(data).
        pipe(
          this.toast.observe({
            loading: 'Publishing...',
            success: 'Blog published',
            error: 'Couldn\'t publish post',
          })
        ).subscribe((res: any) => {
          form.reset()
        }, (err: HttpErrorResponse) => {
          console.log(err)
        })

      }, (err: HttpErrorResponse) => {
        console.log(err)
      })


    }
  }

  async onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }




}
