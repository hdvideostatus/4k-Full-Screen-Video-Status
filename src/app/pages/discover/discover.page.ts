import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  allCategoryList: any = [];
  constructor(
    public gs: GlobalService,
    public api: ApiService,
    public router: Router,
  ) {
    this.getCetegory();
  }

  ngOnInit() {
  }

  getCetegory() {
    let body = {
      language_id: String(this.gs.selectedLang),
      start: 0,
    }
    this.api.post('getCategoryList', body).then((res) => {
      if (res['ResponseCode'] == 1) {
        this.allCategoryList = res['ResultData'];
      } else {
        this.gs.messageToast('Something went wrong');
      }
    }, err => {
      this.gs.messageToast('Something went wrong');
    })
  }
  getVideoListByCategory(category_id) {
    let body = {
      category_id: category_id,
      language_id: String(this.gs.selectedLang),
      start: 0,
    }
    this.api.post('getVideoListByCategory', body).then((res) => {
      if (res['ResponseCode'] == 1) {
        this.goVideoSlides(res['ResultData'], 0)
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
