// images.js
'use strict';

var reflux = require("reflux");
var merge  = require("merge");
var config = require("../config");

var actions = reflux.createActions({
  'upload': {children: ['completed', 'failed']},
});

var base_url = config.Settings.BASE_URL;

actions.upload.listen(function(options) {
  var self = this;
  // fetch to upload images
  // TODO: lodash to map the images, then upload them in map function
  // TODO: all images uploaded, call completed function, otherwise, failed
  upload_image(options.images.uri, self.completed, self.failed);
});

function upload_image(image_uri, completed, failed) {
  // console.log(image_uri);
  var upload_path = base_url + "/media/upload/";

  var xhr = new XMLHttpRequest();
  xhr.open('POST', upload_path);
  xhr.onload = () => {
    if (xhr.status !== 200 && xhr.status !== 0) {
      failed({status: xhr.status, error: 'Expected HTTP 200 OK response, got ' + xhr.status});
    }
    if (!xhr.responseText) {
      failed({status: 'failed', error: 'No response payload.'});
    }

    // console.log(xhr.responseText);
    var response = JSON.parse(xhr.responseText);
    if (!response.message.file) {
      failed({status: 'failed', error: 'Invalid response payload.'});
    }
    // var params = merge(response, _options.data);
    console.log(response.message.url);
  };
  var formdata = new FormData();
  if (image_uri) {
    var imageSource = {uri: image_uri};
    formdata.append('file', {...imageSource, name: 'tipapp.jpg'});
  }
  // _.each(_options.data, function(val, key) {
  //   formdata.append(key, val);
  // });
  if (xhr.upload) {
    xhr.upload.onprogress = (event) => {
      console.log('upload onprogress', event);
      if (event.lengthComputable) {
        // this.setState({uploadProgress: event.loaded / event.total});
        console.log('uploaded: ' + event.loaded / event.total);
      }
    };
  }
  xhr.send(formdata);
}

module.exports = actions;