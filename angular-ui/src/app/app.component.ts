import { Component, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Server } from './shared/server';
import { urlResponse } from './model/url_response_model';
import { urlRequest } from './model/url_request_model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private userService: Server, private _dialog: MatDialog, private _snackbar: MatSnackBar) {
  }

  // displayedColumns = ['ID', 'URL'];

  dataSub = new Subject<string>();
  originalUrl: urlRequest = new urlRequest();
  shortedUrl: urlRequest = new urlRequest();
  loaded: boolean;
  currentPage: number = 10;
  totalRecords: number = 0;

  shortenedUrls: Array<urlResponse> = [];

  ngOnInit() {
    this.getRecentActivity(this.currentPage);
  }

  public shortenUrl(userInputUrl) {
    if (!userInputUrl.value) {
      let simpleSnackBarRef = this._snackbar.open('Please Provide a URL');
      setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), 5000);
      return;
    }
    this.originalUrl.url = userInputUrl.value;
    this.userService.postUrl(this.originalUrl).subscribe((data) => {
      this.getRecentActivity(10);

      let simpleSnackBarRef = this._snackbar.open('The Shortened Url is: ' + data.url);
      setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), 5000);
    }, (err) => {
      console.log(err);
    });
  }

  public getRecentActivity(pageNumber) {
    this.currentPage = pageNumber;
    this.userService.getRecent(pageNumber).subscribe((data) => {
      this.shortenedUrls = [];
      for (let i in data.results.reverse()) {
        this.shortenedUrls.push(data.results[i]);
      }
      this.loaded = true;
      this.getTotalRecords();
    }, (err) => {
      console.log(err);
    });
  }

  public getTotalRecords() {
    this.userService.getTotalRecords().subscribe((data) => {
      this.totalRecords = Math.ceil(parseInt(data) / 10) * 10;
    }, (err) => {
      console.log(err);
    });
  }
}
