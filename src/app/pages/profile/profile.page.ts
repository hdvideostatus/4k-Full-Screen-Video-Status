import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileFeed: any = 'myvideo';
  allMyVideos: any = {};
  dataStart: any = 0;
  isVidShare: boolean = false;
  constructor(
    public alertController: AlertController,
    public gs: GlobalService,
    public api: ApiService,
    public socialSharing: SocialSharing,
    public router: Router,
  ) {
    if (this.gs.userData && this.gs.userData.user_id) {
      this.getMyVideos();
    }
    console.log("gs.myFavVideos>>>", gs.myFavVideos);
    console.log("this.userData", this.gs.userData);
  }

  ngOnInit() {
  }

  getMyVideos() {
    let body = {
      user_id: this.gs.userData.user_id,
      start: this.dataStart
    }
    console.log("body>>>>", body);
    this.api.post('getMyVideos', body).then((res) => {
      console.log("getMyVideos>>>>", res);
      if (res['ResponseCode'] == 1) {
        this.allMyVideos = res['ResultData'];
        console.log("this.allCategoryList>>>>", this.allMyVideos);
      } else {
        this.gs.messageToast('Something went wrong');
      }
    }, err => {
      this.gs.messageToast('Something went wrong');
    })
  }

  // goProfile() {
  //   if (this.gs.userData && this.gs.userData.user_id) {
  //     // this.router.navigate(['/upload']);
  //     // this.router.navigate(['/login']);
  //   } else {
  //   }
  // }

  viaVideoShare(vidRow) {
    this.isVidShare = true;
    this.socialSharing.share('👌🏻 10,000+ 4k Full Screen Video Status  (Free)Download Now 👇🏻👇🏻👇🏻👇🏻👇🏻', vidRow.video_url, 'https://play.google.com/store/apps/details?id=com.fullscreenvideostatus.hdvideostatus').then((res) => {
      this.isVidShare = false;
      vidRow.video_share = Number(vidRow.video_share) + 1;
      this.gs.increateCount(vidRow.video_id, "2");
    }, (er) => {
      this.isVidShare = false;
    });
  }

  async unFavConfirm(video_id) {
    const alert = await this.alertController.create({
      header: 'Alert !',
      message: 'Are you sure you want to unfavourite',
      mode: 'ios',
      cssClass: 'alert_ctrl',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Unfavourite',
          cssClass: 'danger-btn',
          handler: () => {
            this.gs.removeFavVideo(video_id);
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  editProfile() {
    this.router.navigate(['/login']);
  }

  goVideoSlides(data, index) {
    this.router.navigate(['/video-slides'], {
      queryParams: {
        item: JSON.stringify({
          videoData: data,
          index: index,
        })
      }
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

}
