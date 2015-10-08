var frisby = require('frisby');
var chance = require('chance').Chance();

var host_path = "http://192.168.99.100:8888/api";

var get_nonce_path = "/get_nonce/";
var get_nonce_param = "controller=user&method=register";

frisby.globalSetup({
  timeout: 30*1000
});

frisby.create('Capstone user register getting nonce')
  .get(host_path + get_nonce_path + '?' + get_nonce_param)
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    "status":"ok","controller":"user","method":"register"
  })
  .expectJSONTypes({
    nonce: String,
  })
  .after(function(err, res, body) {
    // console.log(JSON.parse(body).nonce);
    var register_path = "/user/register/";
    var username = chance.word();
    var email = chance.email();
    var display_name = chance.name();
    var register_param = "username=" + username + "&email=" + email + "&nonce=" + JSON.parse(body).nonce + "&display_name=" + display_name + "&user_pass=12345678"
    // curl -vd "username=tom&email=rlee@book.com&nonce=a49b876f87&display_name=Tom&user_pass=12345678"
    frisby.create('Register a new user')
      .get(host_path + register_path + '?' + register_param)
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
      // {"status":"ok","cookie":"sam|1445406890|CIJtpAJ4CMEsa8CuF2Jtj0o36mbk0deakoUbyaNfFxS|b1d6b900c6ced3fda3c4105ecd56945d3c4d3f958e78d0029a0a0c8903f98378","user_id":4}
      .expectJSON({
        "status":"ok"
      })
      .expectJSONTypes({
        cookie: String,
        user_id: Number,
      })
      .after(function(err, res, body) {
        // curl -vd "controller=user&method=generate_auth_cookie" "http://192.168.99.100:8888/api/get_nonce/"
        get_nonce_param = "controller=user&method=generate_auth_cookie";
        frisby.create('Get nonce for generating auth cookie')
          .get(host_path + get_nonce_path + '?' + get_nonce_param)
          .expectStatus(200)
          .expectHeaderContains('content-type', 'application/json')
          .expectJSON({
            "status":"ok","controller":"user","method":"generate_auth_cookie"
          })
          .expectJSONTypes({
            nonce: String,
          })
          .after(function(err, res, body) {
            // console.log(JSON.parse(body).nonce);
            // curl -vd "username=tom&password=12345678&nonce=a15b2f6d70" "http://192.168.99.100:8888/api/user/generate_auth_cookie/
            var auth_cookie_path = "/user/generate_auth_cookie/";
            var auth_cookie_params = "username=" + username + "&password=12345678&nonce=" + JSON.parse(body).nonce;
            frisby.create('Get auth cookie')
              .get(host_path + auth_cookie_path + '?' + auth_cookie_params)
              .expectStatus(200)
              .expectHeaderContains('content-type', 'application/json')
              .expectJSON({
                "status":"ok"
              })
              .expectJSONTypes({
                cookie: String,
                cookie_name: String,
                // user: function(val) { console.log(val); }
              })
              .after(function(err, res, body) {
                get_nonce_param = "controller=posts&method=create_post";
                var res_json = JSON.parse(body);
                var cookie = res_json.cookie_name + '=' + res_json.cookie;
                // console.log(cookie);
                frisby.create('Get create post nonce')
                  // .addHeader('Set-Cookie', cookie)
                  .get(host_path + get_nonce_path + '?' + get_nonce_param, {headers: {"Cookie": cookie}})
                  // .inspectJSON()
                  // .inspectHeaders()
                  .expectStatus(200)
                  .expectHeaderContains('content-type', 'application/json')
                  .expectJSON({
                    "status":"ok","controller":"posts","method":"create_post"
                  })
                  .expectJSONTypes({
                    nonce: String, //function(val) { console.log(val); },
                  })
                  .after(function(err, res, body) {
                    if (err) console.log(err);
                    // console.log(res);
                    // console.log(body);
                    // Post a new post
                    var title = chance.sentence();
                    var content = chance.paragraph();
                    // "nonce=a415728090&title=Test Title&content=Test Content and something publish&author=tom&status=publish"
                    var create_post_path = "/posts/create_post/";
                    var create_post_params = "nonce=" + JSON.parse(body).nonce
                                          + "&title=" + title
                                          + "&content=" + content
                                          + "&author=" + username + "&status=publish";

                    frisby.create('Create a new post')
                      .get(host_path + create_post_path + '?' + create_post_params, {headers: {"Cookie": cookie}})
                      // .inspectJSON()
                      .expectStatus(200)
                      .expectHeaderContains('content-type', 'application/json')
                      .expectJSON({
                        "status":"ok",
                      })
                      .expectJSON('post', {
                        "status": "publish",
                      })
                      .expectJSONTypes('post', {
                        id: Number,
                      })
                      .after(function(err, res, body) {
                        if (err) console.log(err);
                        // console.log(res.headers);
                      })
                      .toss();
                  })
                  .toss();
              })
              .toss();
          })
          .toss();
      })
      .toss();
  })
  .toss();