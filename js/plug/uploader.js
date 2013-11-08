/**
 * Created with JetBrains WebStorm.
 * User: SNSukhanov
 * Date: 08.11.13
 * Time: 16:12
 * To change this template use File | Settings | File Templates.
 */
var uploaderObject = function(params) {

    if(!params.file || !params.url) {
        return false;
    }

    this.xhr = new XMLHttpRequest();
    this.reader = new FileReader();

    this.progress = 0;
    this.uploaded = false;
    this.successful = false;
    this.lastError = false;

    var self = this;

    self.reader.onload = function() {
        self.xhr.upload.addEventListener("progress", function(e) {
            if (e.lengthComputable) {
                self.progress = (e.loaded * 100) / e.total;
                if(params.onprogress instanceof Function) {
                    params.onprogress.call(self, Math.round(self.progress));
                }
            }
        }, false);

        self.xhr.upload.addEventListener("load", function(){
            self.progress = 100;
            self.uploaded = true;
        }, false);

        self.xhr.upload.addEventListener("error", function(){
            self.lastError = {
                code: 1,
                text: 'Error uploading on server'
            };
        }, false);

        self.xhr.onreadystatechange = function () {
            var callbackDefined = params.oncomplete instanceof Function;
            if (this.readyState == 4) {
                if(this.status == 200) {
                    if(!self.uploaded) {
                        if(callbackDefined) {
                            params.oncomplete.call(self, false);
                        }
                    } else {
                        self.successful = true;
                        if(callbackDefined) {
                            params.oncomplete.call(self, true, this.responseText);
                        }
                    }
                } else {
                    self.lastError = {
                        code: this.status,
                        text: 'HTTP response code is not OK ('+this.status+')'
                    };
                    if(callbackDefined) {
                        params.oncomplete.call(self, false);
                    }
                }
            }
        };

        self.xhr.open("POST", params.url);

        var boundary = "xxxxxxxxx";
        self.xhr.setRequestHeader("Content-Type", "multipart/form-data, boundary="+boundary);
        self.xhr.setRequestHeader("Cache-Control", "no-cache");
        self.xhr.setRequestHeader("Access-Token", localStorage.accessToken);

        var body = "--" + boundary + "\r\n";
        body += "Content-Disposition: form-data; name='"+(params.fieldName || 'file')+"'; filename='" + params.file.name + "'\r\n";
        body += "Content-Type: application/octet-stream\r\n\r\n";
        body += self.reader.result + "\r\n";
        body += "--" + boundary + "--";

        if(self.xhr.sendAsBinary) {
            // firefox
            self.xhr.sendAsBinary(body);
        } else {
            // chrome (W3C spec.)
            self.xhr.send(body);
        }

    };

    self.reader.readAsBinaryString(params.file);
};