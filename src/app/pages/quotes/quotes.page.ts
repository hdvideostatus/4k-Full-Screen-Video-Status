import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
export class QuotesPage implements OnInit {
  allQuotCatList: any = [];
  allQuotesList: any = [];
  allQuotesLanguage: any = [];
  allVideoLangTemp: any = [];
  selectedLang: any = [];
  constructor(
    public router: Router,
    public gs: GlobalService,
    public api: ApiService,
  ) {
    // this.getCetegory();
  }

  ngOnInit() {
    this.getLanguageList();
  }

  segmentChanged(event) {
    this.allCatQuotesList(event.target.value)
    console.log("eventeventeventeventeventeventeventeventeventevent");
  }

  getCetegory(language_id) {
    let body = {
      language_id: language_id,
      start: 0,
    }
    this.api.Qpost('getCategoryList', body).then((res) => {
      if (res['ResponseCode'] == 1) {
        this.allQuotCatList = res['ResultData'];
        console.log("body>>>>", this.allQuotCatList);
        this.allCatQuotesList(this.allQuotCatList[0].category_id)
      } else {
        this.gs.messageToast('Something went wrong');
      }
    }, err => {
      this.gs.messageToast('Something went wrong');
    })
  }

  allCatQuotesList(category_id) {
    let body = {
      category_id: category_id,
      language_id: String(this.gs.selectedLang),
      start: 0,
    }
    this.api.Qpost('getQuotesList', body).then((res) => {
      console.log("allQuotesList>>>>", res);
      if (res['ResponseCode'] == 1) {
        this.allQuotesList = res['ResultData'];
      } else {
        this.gs.messageToast('Something went wrong');
      }
    }, err => {
      this.gs.messageToast('Something went wrong');
    })
  }
  goQuotesSlides(data, index) {
    this.router.navigate(['/quotes-slider'], {
      queryParams: {
        item: JSON.stringify({
          quotesData: data,
          index: index,
        })
      }
    });
  }

  getLanguageList() {
    this.api.Qpost('getLanguageList', '').then(async (res) => {
      console.log("res>>>>>>", res);
      if (res['ResponseCode'] == 1) {
        this.allQuotesLanguage = res['ResultData'];
        console.log(this.allQuotesLanguage);
        // let tempLang = [];
        const setCatLang = () => {
          for (let i in this.allQuotesLanguage) {
            this.allVideoLangTemp.push({
              type: 'checkbox',
              label: this.allQuotesLanguage[i].language_name,
              value: this.allQuotesLanguage[i].language_id,
              checked: this.isLangCheck(this.allQuotesLanguage[i].language_id)
            })
            if (!this.selectedLang.length) {
              this.selectedLang.push(this.allQuotesLanguage[i].language_id)
            }
          }
        }
        await setCatLang();
        console.log("this.allVideoLangTemp>>>", this.allVideoLangTemp);

        this.getCetegory({
          language_id: String(this.selectedLang)
        });
      } else {
        this.gs.messageToast('Something went wrong');
      }
    }, err => {
      console.log("errgetLanguageList>>>>>>>>" + JSON.stringify(err));

      this.gs.messageToast('Something went wrong');
    })
  }

  isLangCheck(language_id) {
    if (this.selectedLang.length) {
      for (let i in this.selectedLang) {
        if (this.selectedLang[i] == language_id) {
          return true
        }
      }
    } else {
      return true
    }
  }

  // loadData(event) {
  //   let body = {
  //     language_id: String(this.gs.selectedLang),
  //     start: this.allQuotCatList.length,
  //   }
  //   console.log("event????", this.allQuotCatList.length);
  //   this.api.post('getHomePageVideoList', body).then((res) => {
  //     if (res['ResponseCode'] == 1) {
  //       this.allQuotCatList = this.allQuotCatList.concat(res['ResultData'])
  //       console.log("this.allQuotCatList>>>>", this.allQuotCatList);
  //     } else {
  //       this.gs.messageToast('Something went wrong');
  //     }
  //   }, err => {
  //     this.gs.messageToast('Something went wrong');
  //   })
  // }

}
