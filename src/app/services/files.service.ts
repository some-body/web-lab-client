import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Song } from '../models/song.model';
import { UploadResult } from '../models/upload-result.model'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import 'rxjs/add/operator/share';

declare var FormData,File,XMLHttpRequest: any;

@Injectable()
export class FilesService {
    private token: string = 'kokoko'; // TODO: Токен получать после авторизации.

    constructor(private http: Http) {
    }

    upload(url: string, file: any):Promise<UploadResult> {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(<UploadResult>JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.open('POST', url, true);

            let formData = new FormData();
            formData.append("file", file, file.name);
            xhr.send(formData);
        });
    }
}