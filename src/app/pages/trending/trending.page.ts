import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.page.html',
  styleUrls: ['./trending.page.scss'],
})
export class TrendingPage implements OnInit {
  allTrendingVideos: any = [];
  constructor(
    public gs: GlobalService,
    public api: ApiService,
    public router: Router
  ) {
    this.getTrendingVideos();
  }

  ngOnInit() {
  }

  getTrendingVideos() {
    let body = {
      language_id: String(this.gs.selectedLang),
      start: this.allTrendingVideos.length,
    }
    this.api.post('getTrendingVideos', body).then((res) => {
      console.log("res>>>>", res);
      if (res['ResponseCode'] == 1) {
        this.allTrendingVideos = res['ResultData'];
        console.log("this.allTrendingVideos>>>>", this.allTrendingVideos);
      } else {
        this.gs.messageToast('Something went wrong');
      }
    }, err => {
      this.gs.messageToast('Something went wrong');
    })
  }

  loadData(event) {
    let body = {
      language_id: String(this.gs.selectedLang),
      start: this.allTrendingVideos.length,
    }
    this.api.post('getTrendingVideos', body).then((res) => {
      if (res['ResponseCode'] == 1) {
        this.allTrendingVideos = this.allTrendingVideos.concat(res['ResultData'])
        console.log("this.allTrendingVideos>>>>", this.allTrendingVideos);
      } else {
        this.gs.messageToast('Something went wrong');
      }
    }, err => {
      this.gs.messageToast('Something went wrong');
    })
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

}
