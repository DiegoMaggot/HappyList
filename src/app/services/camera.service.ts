import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

@Injectable()
export class CameraService {

    constructor(private camera: Camera, private base64: Base64) {

    }

    async takePhoto(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const options: CameraOptions = {
                quality: 100,
                destinationType: this.camera.DestinationType.FILE_URI,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
            };

            this.camera.getPicture(options).then(imageData => {

                this.base64.encodeFile(imageData).then((base64File: string) => {
                    resolve(base64File);
                }, (err) => {
                    console.log(err);
                });
            }, (err) => {
                console.log(err);
            });
        });
    }
}
