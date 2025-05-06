import { Component, inject, input, output, OnInit } from '@angular/core';
import { Member } from '../../_models/Member';
import { AccountServiceService } from '../../_Services/account-service.service';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Photo } from '../../_models/Photo';
import { MembersService } from '../../_Services/members.service';

@Component({
  selector: 'app-photo-editor',
  imports: [NgClass,FileUploadModule,NgFor,NgIf,NgStyle, DecimalPipe],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit {
  private accountService = inject(AccountServiceService);
  private memberService = inject(MembersService);
  member = input.required<Member>();
  uploader?: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  memberChange = output<Member>();

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e:any){
    this.hasBaseDropZoneOver = e;
  }
  initializeUploader(){
    this.uploader = new FileUploader({
      url:this.baseUrl+ 'users/add-photo',
      authToken:'Bearer ' +this.accountService.currentUser()?.token,
      isHTML5:true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,

    });

    this.uploader.onAfterAddingFile = (file) =>{
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response){
        const photo = JSON.parse(response);
        const updatedMember = {...this.member()};
        updatedMember.photos.push(photo);
        this.memberChange.emit(updatedMember);
        if(photo.isMain){
          const user = this.accountService.currentUser();
          if(user){
            user.photoUrl= photo.url;
            this.accountService.setCurrentUser(user);
          }
          updatedMember.photoUrl = photo.url;
          updatedMember.photos.forEach(p =>{
            if(p.isMain) p.isMain = false;
            if(p.id === photo.id) p.isMain = true;
          });
          this.memberChange.emit(updatedMember);
        }
      }
    }
  }

  setMainPhoto(photo:Photo){
    this.memberService.setMainPhoto(photo).subscribe({
      next: () =>{
        const updatedUser = this.accountService.currentUser();
        if(updatedUser){
          updatedUser.photoUrl= photo.url;
          this.accountService.setCurrentUser(updatedUser);
        }
        const updatedMember = {...this.member()};
        updatedMember.photoUrl = photo.url;
        updatedMember.photos.forEach(p =>{
          if(p.isMain) p.isMain = false;
          if(p.id === photo.id) p.isMain = true;
        });
        this.memberChange.emit(updatedMember);
      }
    })
  }

  deletePhoto(photo: Photo){
    this.memberService.deletePhoto(photo).subscribe({
      next: () =>{
        const updatedMember = {...this.member()};
        updatedMember.photos = updatedMember.photos.filter(p => p.id !== photo.id);
        this.memberChange.emit(updatedMember);
      }
    });
  }
}