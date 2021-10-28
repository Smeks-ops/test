var CurrentUser;
var ComPort;
var follow_count = 0;
var DisplayFollowersNum = 10;
var DisplayLikesNum = 20;
var follow_speed = 0;
var unfollow_speed = 0;
var story_speed = 0;
var like_speed = 0;
var maxStories = 1000;
var comment_speed = 0;
var global_settings = {};
var global_accounts = [];
var global_tags = [];
var global_locations = [];
var started = false;
var paid_sub = false;
var my_followers = [];
var first = false;
var cloud_backup = false;
var start_license = 0;
var last_follow_count = 0;
var clicks = {};
var version = "";
var follow_val = false;
var like_val = false;
var comment_val = false;
var unfollow_val = false;
var user_cloud = true;
var UnfollowedPoolSize = 0;
var FollowedPoolSize = 0;
var LikePoolSize = 0;
var StoryPoolSize = 0;
var CommentPoolSize = 0;
var last_day = 0;
var day = 0;
var bar_follow;
var maxLikes = 1000;
var maxFollows = 1000;
var maxUnfollows =1000;
var maxComments = 1000;
var bar_like;
var bar_story;
var bar_comment;
var bar_unfollow;
var hashtag_dict = {};
var account_dict = {};
var counted_dict = {};
var clicks_dict = {};
var email_name;
var speed_limit = 1000;
var UnfollowAfterDays;
var cloud_db;
var ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = true;
ga.src = 'https://ssl.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);
window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-770495091');


var live_snapshots = [];
var live_tags = [];
var like_accounts = [];
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDOikxj_ImCVr6fdbShkT1JJJMjaeAX5Vo",
    authDomain: "instoo.firebaseapp.com",
    databaseURL: "https://instoo.firebaseio.com",
    projectId: "instoo",
    storageBucket: "instoo.appspot.com",
    messagingSenderId: "4982052513"
};
firebase.initializeApp(config);

function hashCode(str) {
    return str.split('').reduce((prevHash, currVal) =>
        (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);
}

function User(username, user_id, full_name, user_pic_url, followed_time) {
    this.username = username;
    this.user_id = user_id;
    this.full_name = full_name;
    this.user_pic_url = user_pic_url;
    this.followed_time = followed_time;
}

var lastProcessedHour = -1;

$(document).on('click', '#sub-user', function() {
    //////////console.log("click");
    if (paid_sub === false) {
        buySub();
    } else {
        $(".sub-user").hide();

        alert("you already have premium!");
    }
});


$(document).on('click', '#sub-cloud', function() {
    //////////console.log("click");
    if (cloud_backup  === false) {
        buyCloud();
    } else {
        alert("you already have cloud storage!");
    }
});



function getFollowers() {

    var account_name = CurrentUser.username;
    ////////console.log("GetFollowers");
    //	global_tags.push(event.item);

    var get_id_url = "https://www.instagram.com/web/search/topsearch/?context=user&count=0&query=" + account_name;
    if(Math.abs(follow_count - my_followers.length) < 100){
      ////console.log("filled");
       SendMessage("UpdateFollowerCount", "Update", true);
    }else{
      ////console.log("Seeking");
      SendMessage("UpdateFollowerCount", "Update", false);
    }

    $.ajax({
            url: get_id_url,
            method: "GET",
            error: function(request, status, error) {
                var Error = {};
                Error.String = "CollectMediaFromAccountError";
                Error.Request = request;
                Error.Status = status;
                Error.AjaxError = error;
                Error.ExtraData = tagData.tag_name;
                ////////console.log(error);
                //   SendMessage("Error", "Error", Error);
            }
        })
        .done(function(dataobj) {
            var MediaPool = [];
            //////////console.log("Collecting users from account");
            console.log(dataobj);
            //////////console.log(dataobj.users[0].user.pk);
            var account_id = dataobj.users[0].user.pk;

            var UserData = {
                "username": dataobj.users[0].user.username,
                "user_id": dataobj.users[0].user.pk,
                "full_name": dataobj.users[0].user.full_name,
                "user_pic_url": dataobj.users[0].user.profile_pic_url
            };


            var CollectJob = {};
            CollectJob.user_id = account_id;
            CollectJob.cursor_key = null;
            CollectJob.user = UserData;

            SendMessage("GetFollowers", "Job", CollectJob);


            //  SendMessage("RequestCollectJobStatus", "user_id", account_id);


        });




}

function buyCloud() {
    var sku = "cloud2";
    google.payments.inapp.buy({
        'parameters': {
            'env': 'prod'
        },
        'sku': sku,
        'success': (response) => {
            //////////console.log("Purchased");
            alert("Upgraded to Cloud Stoarge! Re-open the dashboard");
            //////////console.log(response);
        },
        'failure': (error) => {
            //////////console.log("Error");
            //alert(error);

            //////////console.log(error);
        }
    });

}


function buySub() {
    var sku = "premium";
    google.payments.inapp.buy({
        'parameters': {
            'env': 'prod'
        },
        'sku': sku,
        'success': (response) => {
            //////////console.log("Purchased");
            alert("Upgraded to Premium! Re-open the dashboard");
            <!-- Event snippet for premium conversion page -->

  gtag('event', 'conversion', {
      'send_to': 'AW-770495091/qdukCP3S5aIBEPOks-8C',
      'transaction_id': ''
  });

            //////////console.log(response);
        },
        'failure': (error) => {
            //////////console.log("Error");
            //alert(error);

            //////////console.log(error);
        }
    });

}




$(document).ready(function() {

  

    $(".backup_picture").on("error", function(){
        $(this).attr('src', 'icon.png');
    });
   


    $("#sidebar-mosaic").click(function() {
        var win = window.open('https://tagmosaic.com', '_blank');
        win.focus();
    });
console.log("mosaic");
    $("#overlay").show();
    $("#sidebar-home").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("home.html", function() {
$('#my-btns .btn').on('click', function(event) {
 // console.log($(this).find('input').val());
  var val = $(this).find('input').val();
 // $('#output').html(val);
 if(val == "Fast"){
   
   if(paid_sub){
//console.log("set faster");
     
                     SendMessage("SetSpeed", "Speed", 1);

   }else{
     buySub();
   }
 }
 
 if(val == "Slow"){
                        SendMessage("SetSpeed", "Speed", 8);

//     console.log("Slow");
   
 }
 
 if(val == "Medium"){
                        SendMessage("SetSpeed", "Speed", 2);

   //  console.log("Medium");
  
 }
 
});



    $(".backup_picture").on("error", function(){
        $(this).attr('src', 'icon.png');
    });


 bar_follow = new ProgressBar.Circle("#container", {
 color: '#d85c35',
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 4,
  trailWidth: 1,
  easing: 'easeInOut',
  duration: 5000,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#d85c35', width: 4 },
  to: { color: '#d85c35', width: 4 },
   // Set default step function for all animate calls
  step: function(state, circle) {
    circle.path.setAttribute('stroke', state.color);
    circle.path.setAttribute('stroke-width', state.width);

    var value = (circle.value() * 100).toFixed(2);
    if (value === 0) {
      circle.setText('');
    } else {
      circle.setText(value);
    }

  }
});
bar_follow.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar_follow.text.style.fontSize = '1rem';

bar_comment = new ProgressBar.Circle("#container2", {
 color: '#d85c35',
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 4,
  trailWidth: 1,
  easing: 'easeInOut',
  duration: 5000,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#d85c35', width: 4 },
  to: { color: '#d85c35', width: 4 },
   // Set default step function for all animate calls
  step: function(state, circle) {
    circle.path.setAttribute('stroke', state.color);
    circle.path.setAttribute('stroke-width', state.width);

    var value = (circle.value() * 100).toFixed(2);
    if (value === 0) {
      circle.setText('');
    } else {
      circle.setText(value);
    }

  }
});

bar_comment.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar_comment.text.style.fontSize = '1rem';

 bar_unfollow = new ProgressBar.Circle("#container3", {
 color: '#d85c35',
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 4,
  trailWidth: 1,
  easing: 'easeInOut',
  duration: 5000,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#d85c35', width: 4 },
  to: { color: '#d85c35', width: 4 },
   // Set default step function for all animate calls
  step: function(state, circle) {
    circle.path.setAttribute('stroke', state.color);
    circle.path.setAttribute('stroke-width', state.width);

    var value = (circle.value() * 100).toFixed(2);
    if (value === 0) {
      circle.setText('');
    } else {
      circle.setText(value);
    }

  }
});


bar_unfollow.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar_unfollow.text.style.fontSize = '1rem';
 bar_like = new ProgressBar.Circle("#container4", {
  color: '#d85c35',
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 4,
  trailWidth: 1,
  easing: 'easeInOut',
  duration: 5000,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#d85c35', width: 4 },
  to: { color: '#d85c35', width: 4 },
   // Set default step function for all animate calls
  step: function(state, circle) {
    circle.path.setAttribute('stroke', state.color);
    circle.path.setAttribute('stroke-width', state.width);

    var value = (circle.value() * 100.00).toFixed(2);
    if (value === 0) {
      circle.setText('');
    } else {
      circle.setText(value);
    }

  }
});

bar_story = new ProgressBar.Circle("#container5", {
  color: '#d85c35',
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 4,
  trailWidth: 1,
  easing: 'easeInOut',
  duration: 5000,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#d85c35', width: 4 },
  to: { color: '#d85c35', width: 4 },
   // Set default step function for all animate calls
  step: function(state, circle) {
    circle.path.setAttribute('stroke', state.color);
    circle.path.setAttribute('stroke-width', state.width);

    var value = (circle.value() * 100.00).toFixed(2);
    if (value === 0) {
      circle.setText('');
    } else {
      circle.setText(value);
    }

  }
});

bar_like.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar_like.text.style.fontSize = '1rem';

 
bar_story.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar_story.text.style.fontSize = '1rem';
            new Toolgif(".my-class", {
                width: 306,
                height: 186,
                borderRadius: 5
            }).toolgif();
            new Toolgif(".my-class2", {
                width: 320,
                height: 121,
                borderRadius: 5
            }).toolgif();

            new Toolgif(".my-class3", {
                width: 232,
                height: 125,
                borderRadius: 5
            }).toolgif();


            if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                $("#progress").attr("src", "disk.gif");
            } else {
                $("#progress").attr("src", "icon.gif");
            }

            //getLicense();
            if (paid_sub) {
                $("#sub_msg").hide();
            }
            if (paid_sub) {
                $(".sub-user").hide();

                $("#purchase").hide();
                $("#upgrade").hide();
                speed_limit = 1000;
                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);
            } else {

                speed_limit = 1000;
                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);

            }
            var jsElm = document.createElement("script");
            jsElm.type = "application/javascript";
            jsElm.src = 'libs/bootstrap_tags/bootstrap-tagsinput.js';
            document.body.appendChild(jsElm);
            SetActiveSidebarItem("#sidebar-likes_comments");

            SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);



            $("#location_tags").on('itemAdded', function(event) {


                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#location_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#location_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<span data-role="remove"></span>');
                }


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(' ').join('').length > 0) {
                        SendMessage("AddLocationToList", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                        global_locations.push(split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                    }
                }

                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });

            $("#media_tags").on('itemAdded', function(event) {


                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<span data-role="remove"></span>');
                }


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(' ').join('').length > 0) {
                        SendMessage("AddTagToList", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                        global_tags.push(split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                    }
                }

                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#comment_tags").on('itemAdded', function(event) {


                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<span data-role="remove"></span>');
                }


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].length > 0) {
                        SendMessage("AddCommentToList", "TagName", split_tags[kk]);
                        // global_tags.push(split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                    }
                }

                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });

            $("#comment_tags").on('itemRemoved', function(event) {


                var tags = event.item;
                var split_tags = tags;

                for (var kk = 0; kk < split_tags.length; kk++) {

                    SendMessage("RemoveCommentFromList", "TagName", split_tags[kk]);
                    var index = global_tags.indexOf(split_tags[kk]);
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });
            $("#media_tags").on('itemRemoved', function(event) {


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {

                    SendMessage("RemoveTagFromList", "TagName", split_tags[kk].split('#').join(''));
                    var index = global_tags.indexOf(split_tags[kk].split('#').join(''));
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });

            $("#media_accounts").on('itemAdded', function(event) {
                SendMessage("AddAccountToList", "TagName", event.item);




                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#media_accounts').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#media_accounts').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<span data-role="remove"></span>');
                }



                var account_name;


                var tags = event.item;
                var split_tags = tags.split(",");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split(',').join('').split(' ').join('').split('@').join('').length > 0) {

                        account_name = split_tags[kk].split(',').join('').split(' ').join('').split('@').join('');
                        var get_id_url = "https://www.instagram.com/web/search/topsearch/?context=user&count=0&query=" + account_name;
                global_accounts.push(account_name);


                        $.ajax({
                                url: get_id_url,
                                method: "GET",
                                error: function(request, status, error) {
                                    var Error = {};
                                    Error.String = "CollectMediaFromAccountError";
                                    Error.Request = request;
                                    Error.Status = status;
                                    Error.AjaxError = error;
                                    Error.ExtraData = tagData.tag_name;

                                    SendMessage("Error", "Error", Error);
                                }
                            })
                            .done(function(dataobj) {
                                var MediaPool = [];
                                ////////console.log("Collecting users from account");
                                ////////console.log(dataobj);
                                ////////console.log(dataobj.users[0].user.pk);
                                var account_id = dataobj.users[0].user.pk;

                                var UserData = {
                                    "username": dataobj.users[0].user.username,
                                    "user_id": dataobj.users[0].user.pk,
                                    "full_name": dataobj.users[0].user.full_name,
                                    "user_pic_url": dataobj.users[0].user.profile_pic_url
                                };


                                var CollectJob = {};
                                CollectJob.user_id = account_id;
                                CollectJob.cursor_key = null;
                                CollectJob.user = UserData;

                                SendMessage("AddCollectJob", "Job", CollectJob);


                                SendMessage("RequestCollectJobStatus", "user_id", account_id);


                            });


                       // global_accounts.push(event.item);



                    }
                }


            });




            $("#media_accounts").on('itemRemoved', function(event) {
                SendMessage("RemoveAccountFromList", "TagName", event.item);
                var index = global_accounts.indexOf(event.item);
                if (index > -1) {
                    global_accounts.splice(index, 1);
                }
                var index = global_tags.indexOf(event.item);
                if (index > -1) {
                    global_tags.splice(index, 1);
                }
                var account_name = event.item;


                var get_id_url = "https://www.instagram.com/web/search/topsearch/?context=user&count=0&query=" + account_name;


                $.ajax({
                        url: get_id_url,
                        method: "GET",
                        error: function(request, status, error) {
                            var Error = {};
                            Error.String = "CollectMediaFromAccountError";
                            Error.Request = request;
                            Error.Status = status;
                            Error.AjaxError = error;
                            Error.ExtraData = tagData.tag_name;

                            SendMessage("Error", "Error", Error);
                        }
                    })
                    .done(function(dataobj) {
                        var MediaPool = [];
                        ////////console.log("Collecting media from account");
                        ////////console.log(dataobj);
                        ////////console.log(dataobj.users[0].user.pk);
                        var account_id = dataobj.users[0].user.pk;

                        SendMessage("RemoveCollectJob", "user_id", account_id);



                        SendMessage("RequestCollectJobStatus", "user_id", account_id);


                    });




            });

         //   SendMessage("RequestSettings", "", "");



            $("#customRange4").change(function() {
               if(paid_sub === false){
                  if(parseInt($("#customRange4").val()) > 1000){
                 var input = document.getElementById("customRange4");
input.value = 1000;
                    
                  }
                }
                follow_speed =  parseInt($("#customRange1").val());
                unfollow_speed = parseInt($("#customRange2").val());
                like_speed =  parseInt($("#customRange3").val());
                story_speed =  parseInt($("#customRange5").val());
                comment_speed = parseInt($("#customRange4").val());


                $("#comment_set").html("Comments/day: " + $("#customRange4").val());

          
                var settings = {};
                ////////console.log(follow_speed);
                settings.FollowSettings = {};
                settings.UnfollowSettings = {};
                settings.CollectFollowers = {};
                settings.CollectFollowings = {};
                settings.LikeSettings = {};
                settings.CommentSettings = {};

                settings.FollowSettings.TimeMin = follow_speed;
                settings.FollowSettings.TimeMax = follow_speed + 10;
                settings.FollowSettings.ErrorTime = 400;

                settings.UnfollowSettings.TimeMin = unfollow_speed;
                settings.UnfollowSettings.TimeMax = unfollow_speed + 10;
                settings.UnfollowSettings.ErrorTime = 400;


                settings.CommentSettings.TimeMin = comment_speed;
                settings.CommentSettings.TimeMax = 450;
                settings.CommentSettings.ErrorTime = 1800;

                settings.LikeSettings.TimeMin = like_speed;
                settings.LikeSettings.TimeMax = like_speed + 10;
                settings.LikeSettings.ErrorTime = 400;

                settings.StorySettings.TimeMin = story_speed;
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 400;
                settings.CollectFollowers.Pool = 1000;
                settings.CollectFollowers.Interval = 100;
                settings.CollectFollowers.ErrorTime = 200;

                settings.CollectFollowings.Pool = 1000;
                settings.CollectFollowings.Interval = 100;
                settings.CollectFollowings.ErrorTime = 200;

                settings.UnfollowAfterDays = UnfollowAfterDays;

                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                settings.Day = dd;
                day = dd;
                if (last_day == 0) {
                    last_day = dd;
                    // SendMessage("ResetPool", "", "");

                } else if (dd != last_day) {
                    SendMessage("ResetPool", "", "");

                }

                last_day = dd;

                SendMessage("UpdateSettings", "Settings", settings);


                settings.FollowSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.FollowSettings.TimeMin));
                settings.FollowSettings.TimeMax = Math.floor((16 * 60 * 60) / parseInt(settings.FollowSettings.TimeMin)) + 10;
                settings.FollowSettings.ErrorTime = 200;

                settings.UnfollowSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.UnfollowSettings.TimeMin));
                settings.UnfollowSettings.TimeMax = Math.floor((16 * 60 * 60) / parseInt(settings.UnfollowSettings.TimeMin)) + 10;
                settings.UnfollowSettings.ErrorTime = 200;

                settings.CommentSettings.TimeMin = comment_speed;
                settings.CommentSettings.TimeMax = 450;
                settings.CommentSettings.ErrorTime = 1800;

                settings.LikeSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.LikeSettings.TimeMin));
                settings.LikeSettings.TimeMax = like_speed + 10;
                settings.LikeSettings.ErrorTime = 200;

                settings.StorySettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.StorySettings.TimeMin));
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 200;
                global_settings = settings;

            });

            $("#customRange1").change(function() {
              if(paid_sub === false){
                  if(parseInt($("#customRange1").val()) > 1000){
                 var input = document.getElementById("customRange1");
input.value = 1000;
                    
                  }
                }
   
                    follow_speed =  parseInt($("#customRange1").val());
                unfollow_speed = parseInt($("#customRange2").val());
                like_speed =  parseInt($("#customRange3").val());
                story_speed =  parseInt($("#customRange5").val());
                comment_speed = parseInt($("#customRange4").val());

                $("#follow_set").html("Follows/day: " + $("#customRange1").val());
             
                
                var settings = {};
                ////////console.log(follow_speed);
                settings.FollowSettings = {};
                settings.UnfollowSettings = {};
                settings.CollectFollowers = {};
                settings.CollectFollowings = {};
                settings.LikeSettings = {};
                settings.CommentSettings = {};

                settings.FollowSettings.TimeMin = follow_speed;
                settings.FollowSettings.TimeMax = follow_speed + 10;
                settings.FollowSettings.ErrorTime = 400;

                settings.UnfollowSettings.TimeMin = unfollow_speed;
                settings.UnfollowSettings.TimeMax = unfollow_speed + 10;
                settings.UnfollowSettings.ErrorTime = 400;

                settings.CommentSettings.TimeMin = comment_speed;
                settings.CommentSettings.TimeMax = 450;
                settings.CommentSettings.ErrorTime = 1800;

                settings.LikeSettings.TimeMin = like_speed;
                settings.LikeSettings.TimeMax = like_speed + 10;
                settings.LikeSettings.ErrorTime = 400;


                settings.StorySettings.TimeMin = story_speed;
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 400;

                settings.CollectFollowers.Pool = 1000;
                settings.CollectFollowers.Interval = 100;
                settings.CollectFollowers.ErrorTime = 200;

                settings.CollectFollowings.Pool = 1000;
                settings.CollectFollowings.Interval = 100;
                settings.CollectFollowings.ErrorTime = 200;

                settings.UnfollowAfterDays = UnfollowAfterDays;

                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                settings.Day = dd;
                day = dd;


                if (last_day == 0) {
                    last_day = dd;
                    //SendMessage("ResetPool", "", "");

                } else if (dd != last_day) {
                    SendMessage("ResetPool", "", "");

                }

                last_day = dd;

                SendMessage("UpdateSettings", "Settings", settings);

                settings.FollowSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.FollowSettings.TimeMin));
                settings.FollowSettings.TimeMax = Math.floor((16 * 60 * 60) / parseInt(settings.FollowSettings.TimeMin)) + 10;
                settings.FollowSettings.ErrorTime = 200;

                settings.UnfollowSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.UnfollowSettings.TimeMin));
                settings.UnfollowSettings.TimeMax = Math.floor((16 * 60 * 60) / parseInt(settings.UnfollowSettings.TimeMin)) + 10;
                settings.UnfollowSettings.ErrorTime = 200;

                settings.CommentSettings.TimeMin = comment_speed;
                settings.CommentSettings.TimeMax = 450;
                settings.CommentSettings.ErrorTime = 1800;

                settings.LikeSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.LikeSettings.TimeMin));
                settings.LikeSettings.TimeMax = like_speed + 10;
                settings.LikeSettings.ErrorTime = 200;

                settings.StorySettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.StorySettings.TimeMin));
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 200;

                global_settings = settings;


            });

            $("#customRange2").change(function() {
 if(paid_sub === false){
                  if(parseInt($("#customRange2").val()) > 1000){
                 var input = document.getElementById("customRange2");
input.value = 1000;
                    
                  }
                }
                       follow_speed =  parseInt($("#customRange1").val());
                unfollow_speed = parseInt($("#customRange2").val());
                like_speed =  parseInt($("#customRange3").val());
                story_speed =  parseInt($("#customRange5").val());
                comment_speed = parseInt($("#customRange4").val());

                $("#unfollow_set").html("Unfollows/day: " + $("#customRange2").val());
         
  
                ////////console.log(unfollow_speed);
                var settings = {};
                settings.FollowSettings = {};
                settings.UnfollowSettings = {};
                settings.CollectFollowers = {};
                settings.CollectFollowings = {};
                settings.LikeSettings = {};
                settings.CommentSettings = {};

                settings.FollowSettings.TimeMin = follow_speed;
                settings.FollowSettings.TimeMax = follow_speed + 10;
                settings.FollowSettings.ErrorTime = 200;

                settings.UnfollowSettings.TimeMin = unfollow_speed;
                settings.UnfollowSettings.TimeMax = unfollow_speed + 10;
                settings.UnfollowSettings.ErrorTime = 200;


                settings.CommentSettings.TimeMin = comment_speed;
                settings.CommentSettings.TimeMax = 450;
                settings.CommentSettings.ErrorTime = 1800;

                settings.LikeSettings.TimeMin = like_speed;
                settings.LikeSettings.TimeMax = like_speed + 10;
                settings.LikeSettings.ErrorTime = 200;

                settings.StorySettings.TimeMin = story_speed;
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 400;

                settings.CollectFollowers.Pool = 1000;
                settings.CollectFollowers.Interval = 100;
                settings.CollectFollowers.ErrorTime = 200;

                settings.CollectFollowings.Pool = 1000;
                settings.CollectFollowings.Interval = 100;
                settings.CollectFollowings.ErrorTime = 200;

                settings.UnfollowAfterDays = UnfollowAfterDays;
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                settings.Day = dd;
                                day = dd;

                if (last_day == 0) {
                    last_day = dd;
                    // SendMessage("ResetPool", "", "");

                } else if (dd != last_day) {
                    SendMessage("ResetPool", "", "");


                }

                last_day = dd;
                SendMessage("UpdateSettings", "Settings", settings);

                settings.FollowSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.FollowSettings.TimeMin));
                settings.FollowSettings.TimeMax = Math.floor((16 * 60 * 60) / parseInt(settings.FollowSettings.TimeMin)) + 10;
                settings.FollowSettings.ErrorTime = 200;

                settings.UnfollowSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.UnfollowSettings.TimeMin));
                settings.UnfollowSettings.TimeMax = Math.floor((16 * 60 * 60) / parseInt(settings.UnfollowSettings.TimeMin)) + 10;
                settings.UnfollowSettings.ErrorTime = 200;

                settings.CommentSettings.TimeMin = comment_speed;
                settings.CommentSettings.TimeMax = 450;
                settings.CommentSettings.ErrorTime = 1800;

                settings.LikeSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.LikeSettings.TimeMin));
                settings.LikeSettings.TimeMax = like_speed + 10;
                settings.LikeSettings.ErrorTime = 200;

                settings.StorySettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.StorySettings.TimeMin));
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 200;
                global_settings = settings;


            });

            $("#customRange3").change(function() {
               if(paid_sub == false){
                  if(parseInt($("#customRange3").val()) > 1000){
                 var input = document.getElementById("customRange3");
input.value = 1000;
                    
                  }
                }
                
                     follow_speed =  parseInt($("#customRange1").val());
                unfollow_speed = parseInt($("#customRange2").val());
                like_speed =  parseInt($("#customRange3").val());
                story_speed =  parseInt($("#customRange5").val());
                comment_speed = parseInt($("#customRange4").val());

               $("#like_set").html("Likes/day: " + $("#customRange3").val());
          
                ////////console.log(like_speed);
                var settings = {};
                settings.FollowSettings = {};
                settings.UnfollowSettings = {};
                settings.CollectFollowers = {};
                settings.CollectFollowings = {};
                settings.LikeSettings = {};
                settings.CommentSettings = {};

                settings.FollowSettings.TimeMin = follow_speed;
                settings.FollowSettings.TimeMax = follow_speed + 10;
                settings.FollowSettings.ErrorTime = 200;

                settings.UnfollowSettings.TimeMin = unfollow_speed;
                settings.UnfollowSettings.TimeMax = unfollow_speed + 10;
                settings.UnfollowSettings.ErrorTime = 200;

                settings.CommentSettings.TimeMin = comment_speed;
                settings.CommentSettings.TimeMax = 450;
                settings.CommentSettings.ErrorTime = 1800;

                settings.LikeSettings.TimeMin = like_speed;
                settings.LikeSettings.TimeMax = like_speed + 10;
                settings.LikeSettings.ErrorTime = 200;


                settings.StorySettings.TimeMin = story_speed;
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 400;

                settings.CollectFollowers.Pool = 1000;
                settings.CollectFollowers.Interval = 100;
                settings.CollectFollowers.ErrorTime = 200;

                settings.CollectFollowings.Pool = 1000;
                settings.CollectFollowings.Interval = 100;
                settings.CollectFollowings.ErrorTime = 200;

                settings.UnfollowAfterDays = UnfollowAfterDays;
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                settings.Day = dd;
                day = dd;

                if (last_day == 0) {
                    last_day = dd;
                    // SendMessage("ResetPool", "", "");

                } else if (dd != last_day) {
                    SendMessage("ResetPool", "", "");
                }

                last_day = dd;
                SendMessage("UpdateSettings", "Settings", settings);


                settings.FollowSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.FollowSettings.TimeMin));
                settings.FollowSettings.TimeMax = Math.floor((16 * 60 * 60) / parseInt(settings.FollowSettings.TimeMin)) + 10;
                settings.FollowSettings.ErrorTime = 200;

                settings.UnfollowSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.UnfollowSettings.TimeMin));
                settings.UnfollowSettings.TimeMax = Math.floor((16 * 60 * 60) / parseInt(settings.UnfollowSettings.TimeMin)) + 10;
                settings.UnfollowSettings.ErrorTime = 200;

                settings.CommentSettings.TimeMin = comment_speed;
                settings.CommentSettings.TimeMax = 450;
                settings.CommentSettings.ErrorTime = 1800;

                settings.LikeSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.LikeSettings.TimeMin));
                settings.LikeSettings.TimeMax = like_speed + 10;
                settings.LikeSettings.ErrorTime = 200;

                settings.StorySettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.StorySettings.TimeMin));
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 200;
                global_settings = settings;

            });

            SendMessage("RequestFollowStatus", "Num", DisplayFollowersNum);

            $("#set-follow-check").click(function() {
 
                SetFollowValue($(this).is(':checked'));
                follow_val = $(this).is(':checked');
                if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                    $("#progress").attr("src", "disk.gif");
                } else {
                    $("#progress").attr("src", "icon.gif");
                }

            });
            $("#set-like-check").click(function() {
  
                SetLikeValue($(this).is(':checked'));
                like_val = $(this).is(':checked');
                if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                    $("#progress").attr("src", "disk.gif");
                } else {
                    $("#progress").attr("src", "icon.gif");
                }

            });


     $("#set-story-check").click(function() {
                SetStoryValue($(this).is(':checked'));
                like_val = $(this).is(':checked');
                if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true || story_val == true) {
                    $("#progress").attr("src", "disk.gif");
                } else {
                    $("#progress").attr("src", "icon.gif");
                }

            });
            $("#set-comment-check").click(function() {
   
                //////console.log("commemt switch");
                SetCommentValue($(this).is(':checked'));
                comment_val = $(this).is(':checked');
                if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                    $("#progress").attr("src", "disk.gif");
                } else {
                    $("#progress").attr("src", "icon.gif");
                }

            });
            $(document).on('click', '.remove-user-collect', function() {
                RemoveCollectJobUser(this);
            });
            $(document).on('click', '.remove-tag-collect', function() {
                RemoveCollectJobTag(this);
            });
            $(document).on('click', '.remove-location-collect', function() {
                RemoveLocationJobTag(this);
            });
            $(document).on('click', '.remove-comment-collect', function() {

                var user_id = $(this).attr("user_id");
                $(this).closest("tr").remove();


                SendMessage("RemoveCommentFromList", "TagName", user_id);
                //	var index = global_tags.indexOf(user_id);
                if (index > -1) {
                    //global_tags.splice(index, 1);
                }
                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
                //	SendMessage("RemoveCommentFromList", "TagName", );
            });

            $("#set-unfollow-check").click(function() {
 
                SetUnfollowValue($(this).is(':checked'));
                unfollow_val = $(this).is(':checked');
                if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                    $("#progress").attr("src", "disk.gif");
                } else {
                    $("#progress").attr("src", "icon.gif");
                }

            });

            SetActiveSidebarItem("#sidebar-home");

            if (CurrentUser) {
                var url = "https://www.instagram.com/web/search/topsearch/?context=user&count=0&query=" + CurrentUser.username;
                $.get(url, function(body, response) {
                    ////////console.log("followers:", body.users[0].user.follower_count);
                    $("#follow_count").html("followers: " + body.users[0].user.follower_count);
                    follow_count = body.users[0].user.follower_count;

                });
            }

            if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                $("#progress").attr("src", "disk.gif");
            } else {
                $("#progress").attr("src", "icon.gif");
            }


            SendMessage("RequestSettings", "", "");
     
 $("#customRange1").val(maxFollows);
  $("#customRange2").val(maxUnfollows);
   $("#customRange3").val(maxLikes);
    $("#customRange4").val(maxComments);
    $("#customRange5").val(maxStories);
    $("#follow_set").html("Follows/day: " + maxFollows);
    $("#unfollow_set").html("Unfollows/day: " + maxUnfollows);
    $("#like_set").html("Likes/day: " + maxLikes);
    $("#story_set").html("Stories/day: " + maxStories);
    $("#comment_set").html("Comments/day: " + maxComments);
            new Toolgif(".my-class", {
                width: 306,
                height: 186,
                borderRadius: 5
            }).toolgif();
            new Toolgif(".my-class2", {
                width: 320,
                height: 121,
                borderRadius: 5
            }).toolgif();
            new Toolgif(".my-class3", {
                width: 232,
                height: 125,
                borderRadius: 5
            }).toolgif();

        });




    });

    function onClick(e) {

        $("#snapshots").html("<h4>Settings Used:</h4> <br>Likes/Day:" + live_snapshots[e.dataPoint.x].LikeSettings.TimeMin + "<br>Follows/day:" + live_snapshots[e.dataPoint.x].FollowSettings.TimeMin + "<br>Unfollows/Day:" + live_snapshots[e.dataPoint.x].UnfollowSettings.TimeMin + "<br>");
        $("#tags").html("<h4>Hashtag Targets:</h4> <br>" + live_tags[e.dataPoint.x]);
        $("#accounts").html("<h4>Account Targets:</h4> <br>" + live_accounts[e.dataPoint.x]);

    }

    $("#sidebar-news").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("news.html", function() {
            SetActiveSidebarItem("#sidebar-news");

        });
    });



    $("#sidebar-referrals").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("referrals.html", function() {



            $("#codes").click(function() {
                var ref_code = $("#lolz").val();
                var rootRef = firebase.database().ref("codes/");

                var urlRef = rootRef;
                urlRef.once("value", function(snapshot) {
                    var obj = snapshot.val() || {};
                    var original = obj[ref_code];
                    var update = {};
                    if (paid_sub) {
                        update[CurrentUser.username] = "paid";

                    } else {
                        update[CurrentUser.username] = "free";

                    }
                    var rootRef2 = firebase.database().ref("referral_stats/" + original);
                    rootRef2.update(update);
                    var update_code = {};
                    update_code[CurrentUser.username] = ref_code;

                    var rootRef3 = firebase.database().ref("user_codes/");
                    rootRef3.update(update_code);

                });

                //	SaveSettings();
            });

            var rootRef = firebase.database().ref("refers/");
            var code = {};
            var refer = {};
            ////console.log(CurrentUser.username);
            code[CurrentUser.username] = Math.abs(hashCode(CurrentUser.username));
            refer[Math.abs(hashCode(CurrentUser.username))] = CurrentUser.username;
            $("#referral_code").html(code[CurrentUser.username]);

            var urlRef = rootRef;
            urlRef.once("value", function(snapshot) {
                var obj = snapshot.val() || {};

                if (!(CurrentUser.username in obj)) {
                    urlRef.update(code);
                    var rootRef2 = firebase.database().ref("codes/");
                    rootRef2.update(refer);
                }


            });


        });
    });

    $("#sidebar-upgrades").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("upgrades.html", function() {
            if (paid_sub) {
                $(".sub-user").hide();

                $("premium_price").html("Purchased Already!");
                $("#sub-user").prop('disabled', true);
            }
            SetActiveSidebarItem("#sidebar-upgrades");

        });

    });



    $("#sidebar-analytics").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("analytics.html", function() {

            if (paid_sub) {
                $("#sub_msg").hide();
            }



            var chart_data = [];
            live_snapshots = [];
            live_tags = [];
            live_accounts = [];
            var ranked_accounts = "";
            var limits = 10;
            if (paid_sub) {
                limits = 100;
                var ranked_data = [];
                var totals = 0;

                var rootRef = firebase.database().ref("deep/" + CurrentUser.username.split('.').join(""));


                var urlRef = rootRef;
                urlRef.once("value", function(snapshot) {
                    var obj = snapshot.val();
                    snapshot.forEach(function(snapshot) {
                        var obj = snapshot.val();
                        ////////console.log(obj);
                        ranked_accounts += snapshot.key + " : " + obj.clicks + "<br>";
                        totals += parseInt(obj.clicks);
                        //ranked_data.push({y: 100*(parseInt(obj.clicks)/totals), label: snapshot.key});

                    });


                    snapshot.forEach(function(snapshot) {
                        var obj = snapshot.val();
                        ////////console.log(obj);
                        //   ranked_accounts += snapshot.key + " : " +  obj.clicks + "<br>";
                        //totals += parseInt(obj.clicks);
                        ranked_data.push({
                            y: 100 * (parseInt(obj.clicks) / totals),
                            label: snapshot.key
                        });

                    });


                    $("#ranks").html("<h4>Ranked Account Targets: Gained Followers</h4> <br>" + ranked_accounts);

                    var chart2 = new CanvasJS.Chart("chartContainer2", {
                        animationEnabled: true,
                        title: {
                            text: "Ranked Account Targets"
                        },
                        data: [{
                            type: "pie",
                            startAngle: 240,
                            yValueFormatString: "##0.00\"%\"",
                            indexLabel: "{label} {y}",
                            dataPoints: ranked_data
                        }]
                    });
                    chart2.render();

                });

            }

            var starCountRef = firebase.database().ref('data2/' + CurrentUser.username.split('.').join(""));

            starCountRef.limitToLast(limits).on('value', function(snapshot) {
                var index = 0;
                snapshot.forEach(function(snapshot) {
                    var obj = snapshot.val();
                    ////////console.log(obj);
                    chart_data.push({
                        x: index,
                        y: parseInt(obj.followers)
                    });
                    index = index + 1;
                    live_snapshots.push(obj.settings);
                    live_tags.push(obj.tags);
                    live_accounts.push(obj.accounts);
                });
                ////////console.log(chart_data);
                var chart = new CanvasJS.Chart("chartContainer", {

                    title: {
                        text: "Live Follower Analytics(Click DataPoints)"
                    },

                    axisX: {
                        title: "Hours"
                    },

                    axisY: {
                        minimum: chart_data[0].y,

                        scaleBreaks: {
                            autoCalculate: true //change it to false
                        },
                        title: "Followers"
                    },
                    data: [{
                        type: "line",
                        click: onClick,
                        dataPoints: chart_data
                    }]
                });

                chart.render();

                var canvas = document.querySelector("canvas");
                var context = canvas.getContext("2d");
                var width = canvas.width;

                context.fillStyle = "white";
                context.fillRect(0, 270, 100, 50);
                $(".canvasjs-chart-credit").hide();



            });
            SetActiveSidebarItem("#sidebar-analytics");


        });
    });

    $("#sidebar-settings").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("settings.html", function() {

            $("#white_accounts").on('itemAdded', function(event) {
                //SendMessage("AddAccountToList", "TagName", event.item);
                var get_id_url = "https://www.instagram.com/web/search/topsearch/?context=user&count=0&query=" + event.item;
                //////////console.log("CollectMediaFromAccount");

                $.ajax({
                        url: get_id_url,
                        method: "GET",
                        error: function(request, status, error) {
                            var Error = {};
                            Error.String = "WhiteError";
                            Error.Request = request;
                            Error.Status = status;
                            Error.AjaxError = error;
                            Error.ExtraData = "USAGE LIMIT ERROR";

                            SendMessage("Error", "Error", Error);
                        }
                    })
                    .done(function(dataobj) {
                        var MediaPool = [];
                        //////////console.log("Checking if user is private");
                        ////////console.log(dataobj);
                        ////////console.log(dataobj.users[0].user.pk);
                        var account_id = dataobj.users[0].user.pk;
                        //////console.log(account_id);
                        //////console.log(dataobj);
                        var addUser = new User(dataobj.users[0].user.username, dataobj.users[0].user.pk, dataobj.users[0].user.full_name, dataobj.users[0].user.profile_pic_url, 0);
                        //////console.log(addUser);
                        SendMessage("AddUserToWhitelistName", "user_id", addUser);

                    });

            });

            $("#set-slow-check").click(function() {
                SetFollowValue();
                SendMessage("SetSlowMode", "slow", $(this).is(':checked'));

            });
            
            $("#set-cloud-check").click(function() {
               // SetFollowValue();
               // SendMessage("SetSlowMode", "slow", $(this).is(':checked'));
               
                if(cloud_backup === false){
                  buyCloud();
                   $("#set-cloud-check").click();
                }else{
                  user_cloud = $(this).is(':checked');
                }
            });
            $("#set-unfollowmode-check").click(function() {
                //	SetFollowValue();
                SendMessage("SetUnfollowMode", "unfollow", $(this).is(':checked'));

            });


            $("#input-unfollow-days").bind('keyup mouseup', function() {
                SendMessage("SetUnfollowDays", "days", $("#input-unfollow-days").val());

                ////console.log($("#input-unfollow-days").val());
            });
            $("#input-unfollow-days").val(UnfollowAfterDays);

            SendMessage("RequestWhitelistStatus", "", "");

            var modal = $('body').siblings("#AddUserToWhitelistModal");
            if (modal.length > 0) {
                modal.remove();
            }
            $('#AddUserToWhitelistModal').insertAfter($('body'));

            SendMessage("RequestWhitelist", "", "");
            $("#whitelist-followings").click(function() {
                WhitelistFollowings($(this).is(':checked'));
            });

            $(document).on('click', '.remove-user-whitelist', function() {
                RemoveWhitelistedUser(this);
            });

            $(document).on('click', '.add-whitelist-user', function() {
                AddUserToWhitelist(this);
            });
            $(document).on('click', '#whitelist-clear', function() {
                SendMessage("ClearWhite", "", "");
            });

            $("#user-search").keyup(function() {
                FilterWhitelistSearch(this);
            });

            $("#whitelist-user").click(function() {
                $("#add-user-results").empty();
                $("#add-user-search").val("");
                $("#AddUserToWhitelistModal").modal('show');
            });

            $("#add-user-search").keyup(function() {
                NewWhitelistUserSearch(this);
            });


            var jsElm = document.createElement("script");
            jsElm.type = "application/javascript";
            jsElm.src = 'libs/bootstrap_tags/bootstrap-tagsinput.js';
            document.body.appendChild(jsElm);
            SetActiveSidebarItem("#sidebar-likes_comments");

            SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            $("#media_tags").on('itemAdded', function(event) {
                SendMessage("AddTagToList", "TagName", event.item);
            });

            $("#media_tags").on('itemRemoved', function(event) {
                SendMessage("RemoveTagFromList", "TagName", event.item);
            });


            SendMessage("RequestSettings", "", "");

            var modal = $('body').siblings("#confirm-reset-modal");
            if (modal.length > 0) {
                modal.remove();
            }
            $('#confirm-reset-modal').insertAfter($('body'));

            $("#default-settings").click(function() {
                SendMessage("ResetPool", "", "");

                //	ResetSettings();
            });

            $("#save-settings").click(function() {
                SaveSettings();
            });

            $(document).on('change', '#import-file-input', function(event) {
                ImportDatabase(event);
            });

            $("#import-database").click(function() {
                $("#import-file-input").click();
            });

            $("#export-database").click(function() {
                SendMessage("ExportDatabase", "", "");
            });

            $("#reset-all").click(function() {
                $("#confirm-reset-modal").modal('show');
            });

            $("#confirm-modal-btn-yes").click(function() {
                SendMessage("ResetAll", "", "");
            });

            SetActiveSidebarItem("#sidebar-settings");
        });
    });

    $("#sidebar-whitelist").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("whitelist.html", function() {
            SendMessage("RequestWhitelistStatus", "", "");

            var modal = $('body').siblings("#AddUserToWhitelistModal");
            if (modal.length > 0) {
                modal.remove();
            }
            $('#AddUserToWhitelistModal').insertAfter($('body'));

            SendMessage("RequestWhitelist", "", "");
            $("#whitelist-followings").click(function() {
                WhitelistFollowings($(this).is(':checked'));
            });

            $(document).on('click', '.remove-user-whitelist', function() {
                RemoveWhitelistedUser(this);
            });

            $(document).on('click', '.add-whitelist-user', function() {
                AddUserToWhitelist(this);
            });

            $("#user-search").keyup(function() {
                FilterWhitelistSearch(this);
            });

            $("#whitelist-user").click(function() {
                $("#add-user-results").empty();
                $("#add-user-search").val("");
                $("#AddUserToWhitelistModal").modal('show');
            });

            $("#add-user-search").keyup(function() {
                NewWhitelistUserSearch(this);
            });

            SetActiveSidebarItem("#sidebar-whitelist");
        });
    });

    $("#sidebar-help").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("help.html", function() {

            if (paid_sub) {
                $("#sub_msg").html("You are using Instoo Premium version. " + version);
            } else {
                $("#sub_msg").html("You are using Instoo Free version. Upgrade to premium to get 3x times faster automation, daily limits up to 1000/day, and more features like detailed analytics! " + version);

            }




            SetActiveSidebarItem("#sidebar-help");
        });
    });

    $("#sidebar-likes-comments").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("likes_comments.html", function() {
            var jsElm = document.createElement("script");
            jsElm.type = "application/javascript";
            jsElm.src = 'libs/bootstrap_tags/bootstrap-tagsinput.js';
            document.body.appendChild(jsElm);
            SetActiveSidebarItem("#sidebar-likes_comments");

            SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            $("#media_tags").on('itemAdded', function(event) {
                SendMessage("AddTagToList", "TagName", event.item);
            });

            $("#media_tags").on('itemRemoved', function(event) {
                SendMessage("RemoveTagFromList", "TagName", event.item);
            });
        });
    });

    $("#sidebar-home").click();
    CreateComPort();
})

function SetActiveSidebarItem(sidebar_id) {
    $("#sidebar-home").addClass("sidebar-item");
    $("#sidebar-whitelist").addClass("sidebar-item");
    $("#sidebar-settings").addClass("sidebar-item");
    $("#sidebar-analytics").addClass("sidebar-item");
    $("#sidebar-upgrades").addClass("sidebar-item");

    $("#sidebar-help").addClass("sidebar-item");
    $("#sidebar-likes_comments").addClass("sidebar-item");

    $("#sidebar-home").removeClass("sidebar-item-active");
    $("#sidebar-whitelist").removeClass("sidebar-item-active");
    $("#sidebar-analytics").removeClass("sidebar-item-active");
    $("#sidebar-upgrades").removeClass("sidebar-item-active");

    $("#sidebar-settings").removeClass("sidebar-item-active");
    $("#sidebar-help").removeClass("sidebar-item-active");
    $("#sidebar-likes_comments").removeClass("sidebar-item-active");

    $(sidebar_id).removeClass("sidebar-item");
    $(sidebar_id).addClass("sidebar-item-active");
}

function CreateComPort() {
    ComPort = chrome.runtime.connect({
        name: "instafollow213index"
    });
    ComPort.onMessage.addListener(OnMessageReceive);
}

function SendMessage(tag, msgTag, msg) {
    var sendObj = {
        "Tag": tag
    };
    sendObj[msgTag] = msg;

    ComPort.postMessage(sendObj);
}

function GotDatabase(database) {
    cloud_db = database;


}


function OnMessageReceive(msg) {



    if (msg.Tag == "UserFollowComplete") {



        OnFollowedUser(msg.User);



    } else if (msg.Tag == "DispatchFollowStatus") {
        UpdateFollowStatus(msg.AllUsers);
    } else  if (msg.Tag == "SendUserHeader") {
console.log(CurrentUser);
            SendMessage("GotUserHeader", "User", CurrentUser);
    } else if (msg.Tag == "StatusUpdate") {
        UpdateStatus(msg.Status);
    } else  if (msg.Tag == "UpdateStory") {
	console.log("updateSToryS");

        console.log(msg.story);
    } else if (msg.Tag == "GotDatabase") {
        GotDatabase(msg.Database);
    } else if (msg.Tag == "SendFollowers") {
        UpdateFollowers(msg.Status);
    } else if (msg.Tag == "SendAccountsDict") {
        UpdateAccountsDict(msg.Accounts);
        ////////console.log("Got Accounts dict");

    } else if (msg.Tag == "SendTagsDict") {
        UpdateTagsDict(msg.Hashtags);
        ////////console.log("Got Accounts dict");

    } else if (msg.Tag == "UserUnfollowComplete") {



        OnUnfollowedUser(msg.User);


    } else if (msg.Tag == "OnLikedMediaComplete") {

        OnLikedMedia(msg.Media);
    } else  if (msg.Tag == "OnStoryMediaComplete") {

        OnStoryMedia(msg.Media);
    } else if (msg.Tag == "OnCommentedMediaComplete") {


        OnCommentedMedia(msg.Media);
    } else if (msg.Tag == "Settings") {
        SetSettings(msg.Settings);
    } else if (msg.Tag == "AddedWhitelistUsers") {
        ClearWhitelistTable();
        AddedWhitelistUsers(msg.Users);
    } else if (msg.Tag == "UpdatedWhitelistUsers") {
        AddedWhitelistUsers(msg.Users);
    } else if (msg.Tag == "UserLoggedIn") {


        SendMessage("RequestFollowStatus", "Num", DisplayFollowersNum);
        $("#overlay").hide();
        if (paid_sub) {
            SendMessage("SetPaidMode", "paid", true);
            $('.sub-user').hide();
            $("#purchase").hide();
            $("#upgrade").hide();
            speed_limit = 1000;
            $("#customRange1").attr("max", speed_limit);
            $("#customRange2").attr("max", speed_limit);
            $("#customRange3").attr("max", speed_limit);
        } else {
            speed_limit = 1000;
            $("#customRange1").attr("max", speed_limit);
            $("#customRange2").attr("max", speed_limit);
            $("#customRange3").attr("max", speed_limit);
        }

        if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
            $("#progress").attr("src", "disk.gif");
        } else {
            $("#progress").attr("src", "icon.gif");
        }
        ////////console.log("Getting License!");


        // getLicense();


    } else if (msg.Tag == "UserLoggedOut") {
	console.log("LOGOUT");
console.log(CurrentUser);
        $("#overlay").show();
    } else if (msg.Tag == "ReceiveFilteredFollowings") {
        ProcessFilteredFollowings(msg.Users);
    } else if (msg.Tag == "ReceiveWhitelistStatus") {
        SetWhitelistStatus(msg.Status);
    } else if (msg.Tag == "UpdateMediaStatus") {
        UpdateMediaStatus(msg.Status);
    } else if (msg.Tag == "Error" && msg.type == "FollowError") {
        $("#errors").html("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Follow Usage Limit Warning!</strong> The bot is slowing down on follows for 30 minutes. Log out at Instagram.com to delete your cookies. If this message persists, test Instagram.com to check if you have a 3 day block, and wait if you do. We recommend using the story viewer, since it has much higher limits. </div>");

    } else if (msg.Tag == "Error" && msg.type == "UnfollowError") {
        $("#errors").html("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Unfollow Usage Limit Warning!</strong> The bot is slowing down on unfollows for 30 minutes.  Log out at Instagram.com to delete your cookies. If this message persists, test Instagram.com to check if you have a 3 day block, and wait if you do. We recommend using the story viewer, since it has much higher limits. </div>");
    } else if (msg.Tag == "Error" && msg.type == "LikeError") {
        $("#errors").html("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Likes Usage Limit Warning!</strong> The bot is sleeping on likes for 30 minutes.  Log out at Instagram.com to delete your cookies. If this message persists, test Instagram.com to check if you have a 3 day block, and wait if you do. We recommend using the story viewer, since it has much higher limits. </div>");
    } else  if (msg.Tag == "Error" && msg.type == "StoryError") {
console.log("STORY ERROR");
        $("#errors").html("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>Sleeping on story viewing for a bit. Hang tight for 30 minutes.</div>");
    } else if (msg.Tag == "Error" && msg.type == "CommentError") {
        $("#errors").html("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Comments Usage Limit Warning!</strong> The bot is sleeping on comments for 30 minutes.  Log out at Instagram.com to delete your cookies. If this message persists, test Instagram.com to check if you have a 3 day block, and wait if you do. We recommend using the story viewer, since it has much higher limits. </div>");
    }
}


function ImportDatabase(event) {
    var file = event.target.files[0];
    if (file) {
        var fileReader = new FileReader();
        fileReader.onload = function(event) {
            var content = event.target.result;
            SendMessage("ImportDatabase", "Database", content);
        }
        fileReader.readAsText(file);
    }
    alert("Loaded Database Successfully!");

}

function SetSettings(settings) {
    ////console.log("set settings")

    ////////console.log(Math.floor((16*60*60)/settings.FollowSettings.TimeMin));
    ////////console.log(Math.floor((16*60*60)/settings.UnfollowSettings.TimeMin));
    ////////console.log(Math.floor((16*60*60)/settings.LikeSettings.TimeMin));
    //  $("#customRange1").val(settings.maxFollows);
    //  $("#customRange2").val(settings.maxUnfollows);
    //  $("#customRange3").val(settings.maxLikes);
    //    $("#customRange4").val(settings.maxComments);

    ////console.log(settings);


    //  $("#customRange1").val(follow_val);
    //  $("#customRange2").val(unfollow_val);
    //  $("#customRange3").val(like_val);
    //  $("#follow_set").html("Follows/day: " + follow_val);
    //  $("#unfollow_set").html("Unfollows/day: " + unfollow_val);
    //  $("#like_set").html("Likes/day: " + like_val);


    $("#input-follow-time-min").val(settings.FollowSettings.TimeMin);
    $("#input-follow-time-max").val(settings.FollowSettings.TimeMax);
    $("#input-follow-error-time").val(settings.FollowSettings.ErrorTime);

    $("#input-unfollow-time-min").val(settings.UnfollowSettings.TimeMin);
    $("#input-unfollow-time-max").val(settings.UnfollowSettings.TimeMax);
    $("#input-unfollow-error-time").val(settings.UnfollowSettings.ErrorTime);

    $("#input-user-pool-num").val(settings.CollectFollowers.Pool);
    $("#input-user-collect-time").val(settings.CollectFollowers.Interval);
    $("#input-user-error-time").val(settings.CollectFollowers.ErrorTime);

    $("#input-following-pool-num").val(settings.CollectFollowings.Pool);
    $("#input-following-collect-time").val(settings.CollectFollowings.Interval);
    $("#input-following-error-time").val(settings.CollectFollowings.ErrorTime);

    $("#input-unfollow-days").val(settings.UnfollowAfterDays);
    $("#set-slow-check").prop("checked", settings.slow);
    $("#set-cloud-check").prop("checked", user_cloud && cloud_backup);
    
    $("#set-unfollowmode-check").prop("checked", settings.unfollow_mode);

    // global_settings = settings;

}
Array.prototype.unique = function() {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

function SaveSettings() {
    var settings = {};
    settings.FollowSettings = {};
    settings.UnfollowSettings = {};
    settings.CollectFollowers = {};
    settings.CollectFollowings = {};
    settings.LikeSettings = {};
    settings.CommentSettings = {};

    settings.FollowSettings.TimeMin = follow_speed;
    settings.FollowSettings.TimeMax = follow_speed + 10;
    settings.FollowSettings.ErrorTime = 200;

    settings.UnfollowSettings.TimeMin = unfollow_speed;
    settings.UnfollowSettings.TimeMax = unfollow_speed + 10;
    settings.UnfollowSettings.ErrorTime = 200;

    settings.CommentSettings.TimeMin = comment_speed;
    settings.CommentSettings.TimeMax = 450;
    settings.CommentSettings.ErrorTime = 1800;

    settings.LikeSettings.TimeMin = like_speed;
    settings.LikeSettings.TimeMax = like_speed + 10;
    settings.LikeSettings.ErrorTime = 200;

                settings.StorySettings.TimeMin = story_speed;
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 400;

    settings.CollectFollowers.Pool = 1000;
    settings.CollectFollowers.Interval = 100;
    settings.CollectFollowers.ErrorTime = 200;

    settings.CollectFollowings.Pool = 1000;
    settings.CollectFollowings.Interval = 100;
    settings.CollectFollowings.ErrorTime = 200;


    settings.CollectFollowers.Pool = $("#input-user-pool-num").val();
    settings.CollectFollowers.Interval = $("#input-user-collect-time").val();
    settings.CollectFollowers.ErrorTime = $("#input-user-error-time").val();

    settings.CollectFollowings.Pool = $("#input-following-pool-num").val();
    settings.CollectFollowings.Interval = $("#input-following-collect-time").val();
    settings.CollectFollowings.ErrorTime = $("#input-following-error-time").val();
    UnfollowAfterDays = $("#input-unfollow-days").val();
    settings.UnfollowAfterDays = $("#input-unfollow-days").val();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    settings.Day = dd;
                    day = dd;

    ////console.log("Sent Settings");
    ////console.log(settings);
    SendMessage("UpdateSettings", "Settings", settings);




}

function ResetSettings() {
    SendMessage("ResetSettings", "", "");
}

function SetFollowValue(value) {
    SendMessage("SetFollowValue", "Value", value);
}

function SetCommentValue(value) {
    SendMessage("SetCommentValue", "Value", value);
}


function SetLikeValue(value) {
    SendMessage("SetLikeValue", "Value", value);
}
function SetStoryValue(value) {
    SendMessage("SetStoryValue", "Value", value);
}
function SetUnfollowValue(value) {
    SendMessage("SetUnfollowValue", "Value", value);
}

function WhitelistFollowings(start) {
    SendMessage("WhitelistFollowings", "Start", start);
}

function SetWhitelistStatus(status) {
    $("#whitelist-followings").prop("checked", status.Enabled);
    if (status.Enabled) {
        $("#whitelist-followings-text").text("Add Followings");
    } else {
        $("#whitelist-followings-text").text("Add Followings");
    }
}

function RemoveWhitelistedUser(button) {
    var user_id = $(button).attr("user_id");
    $(button).closest("tr").remove();

    SendMessage("RemoveWhitelistUser", "user_id", user_id);
}


function RemoveCollectJobTag(button) {
    var user_id = $(button).attr("user_id");
    $(button).closest("tr").remove();


    SendMessage("RemoveTagFromList", "TagName", user_id);
    var index = global_tags.indexOf(user_id);
    if (index > -1) {
        global_tags.splice(index, 1);
    }
    SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


}

function RemoveLocationJobTag(button) {
    var user_id = $(button).attr("user_id");
    $(button).closest("tr").remove();


    SendMessage("RemoveLocationFromList", "TagName", user_id);
    //	var index = global_tags.indexOf(user_id);
    if (index > -1) {
        //global_tags.splice(index, 1);
    }
    SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


}

function RemoveCollectJobUser(button) {
    var user_id = $(button).attr("user_id");
    $(button).closest("tr").remove();

    SendMessage("RemoveCollectJob", "user_id", user_id);
}

function UpdateFollowers(status) {
    ////console.log("Got Followers:");
    ////console.log(status);


    my_followers = my_followers.concat(status);

    ////console.log(my_followers);

    SendMessage("SendMyFollowers", "followers", my_followers);



}

function UpdateAccountsDict(status) {
    ////////console.log("Accounts Dict:");
    ////////console.log(status);
    account_dict = status;


}

function UpdateTagsDict(status) {
    ////////console.log("Accounts Dict:");
    ////////console.log(status);
    hashtag_dict = status;


}

function UpdateStatus(status) {
console.log(status);


if(status.TagPool.length == 0 &&  global_tags.length > 0){
for(var kk = 0; kk < global_tags.length; kk++){
 
SendMessage("AddTagToList", "TagName", global_tags[kk].replace("<br>",""));

}

}


if(status.UserPool.length > 1000 || status.MediaPool.length > 1000){
        SendMessage("ClearMemory", "story", "");
}

    $("#user-pool-num").text(status.UserPoolSize);
    $("#follow-pool-num").text(status.FollowedPoolSize);
    $("#unfollow-pool-num").text(status.UnfollowedPoolSize);
    $("#like-pool-num").text(status.LikePoolSize);
    $("#story-pool-num").text(status.StoryCount);
    $("#comment-pool-num").text(status.CommentPoolSize);
UnfollowedPoolSize = status.UnfollowedPoolSize;
FollowedPoolSize = status.FollowedPoolSize;
LikePoolSize = status.LikePoolSize;
StoryPoolSize = status.StoryPoolSize;
CommentPoolSize = status.CommentPoolSize;
  //  $("#customRange1").val(status.maxFollows);
  //  $("#customRange2").val(status.maxUnfollows);
//    $("#customRange3").val(status.maxLikes);
//    $("#customRange4").val(status.maxComments);
    //////console.log("StartComment");
    //////console.log(status.StartComment);
    ////console.log(status);
    if (status.CurrentUser) {
      //console.log(status.CollectFollowingsJob);
      //console.log(status.CollectFollowings);
UnfollowAfterDays = status.UnfollowAfterDays;
        //  _gaq.push(['_trackEvent', "clicked", 'clicked']);
        
        $("#overlay").hide();

        if (paid_sub) {
            $(".sub-user").hide();
            //    $("#sub_msg").hide();
            SendMessage("SetPaidMode", "paid", true);

            $("#purchase").hide();
            $("#upgrade").hide();
            speed_limit = 1000;
            $("#customRange1").attr("max", speed_limit);
            $("#customRange2").attr("max", speed_limit);
            $("#customRange3").attr("max", speed_limit);
        } else {
            speed_limit = 1000;
            $("#customRange1").attr("max", speed_limit);
            $("#customRange2").attr("max", speed_limit);
            $("#customRange3").attr("max", speed_limit);
        }

        if (started == false) {

            getLicense();
            if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                $("#progress").attr("src", "disk.gif");
            } else {
                $("#progress").attr("src", "icon.gif");
            }




            setInterval(function() {
                _gaq.push(['_trackPageview', '/follow']);
                getFollowers();




            }, 240000);



setInterval(function() {
if(cloud_backup === true && user_cloud === true){
 var rootRef = firebase.database().ref("databases/" + CurrentUser.username.split('.').join(""));

                rootRef.update(cloud_db);

            //     		getFollowers();

}
            }, 60000);

            setInterval(function() {
              
              
 var rootRef = firebase.database().ref("dailys/" + CurrentUser.username.split('.').join("")+ '/' + day);
                          

                    var urlRef = rootRef;
                    urlRef.once("value", function(snapshot) {
                      ////console.log("dailys");
                      var obj = snapshot.val();
                      ////console.log(obj);
                      if(  obj == null || obj.follows < FollowedPoolSize || obj.comments < CommentPoolSize || obj.likes < LikePoolSize || obj.unfollows <  UnfollowedPoolSize){
  //  $("#customRange1").val(status.maxFollows
  firebase.database().ref('dailys/' + CurrentUser.username.split('.').join("") + '/' + day).set({
                            follows: FollowedPoolSize,
                            comments: CommentPoolSize,
                            likes: LikePoolSize,
                            unfollows: UnfollowedPoolSize
                        });
                      }
                        
});
                var d = new Date();
                var currentHour = d.getHours();
                if (true) {
                    var url = "https://www.instagram.com/web/search/topsearch/?context=user&count=0&query=" + status.CurrentUser.username;
                    $.get(url, function(body, response) {
                        ////////console.log("followers:", body.users[0].user.follower_count);
                        $("#follow_count").html("followers: " + body.users[0].user.follower_count);



                        follow_count = body.users[0].user.follower_count;
                        if (last_follow_count != follow_count) {



                        }


                        last_follow_count = follow_count;

                    });


                    // do stuff
                    ////////console.log("new hour");
                    var d_num = Date.parse(d);
                    d_num = Math.floor(d_num / (1000 * 60 * 60));
                    lastProcessedHour = currentHour;
                    if (follow_count != 0) {
                        var rootRef = firebase.database().ref("data2/" + status.CurrentUser.username.split('.').join(""))
                        firebase.database().ref('data2/' + status.CurrentUser.username.split('.').join("") + '/' + d_num).set({
                            followers: follow_count,
                            settings: global_settings,
                            tags: global_tags,
                            accounts: global_accounts
                        });
                    }

                    var urlRef = rootRef;
                }

                if (paid_sub) {

                    $(".sub-user").hide();

                    firebase.database().ref('stats/' + CurrentUser.username.split('.').join("") + '/accounts').update(
                        account_dict
                    );
                    firebase.database().ref('stats/' + CurrentUser.username.split('.').join("") + '/hashtags').update(
                        hashtag_dict
                    );
                    //////console.log("Accounts Dictfirebase:");
                    //////console.log(account_dict);
                }

               // getFollowers();
                //_gaq.push(['_trackEvent', "updatestats", 'clicked']);
                //	_gaq.push(['_trackPageview', '/index']);

               


                if (paid_sub) {

                    var rootRef = firebase.database().ref("counted/" + CurrentUser.username.split('.').join(""));


                    var urlRef = rootRef;
                    urlRef.once("value", function(snapshot) {

                        var counted = snapshot.val();
                        ////console.log("counted");
                        ////console.log(counted);

                        var rootRef2 = firebase.database().ref("stats/" + CurrentUser.username.split('.').join(""));


                        var urlRef2 = rootRef2;
                        urlRef2.once("value", function(snapshot) {
                            var obj = snapshot.val();
                            ////console.log("stats");
                            ////console.log(obj);
                            snapshot.forEach(function(child) {
                                var obj = child.val();
                                //////console.log(child.key+": "+child.val());
                                ////console.log("One ");
                                ////console.log(obj);
                                for (var kk = 0; kk < my_followers.length; kk++) {
                                    var temp = my_followers[kk].username;
                                    temp = temp.replace(/\W/g, '');

                                    var temp_counted = {};
                                    if (counted != null) {
                                        temp_counted = counted;
                                    }
                                    if ((temp in obj) && !(temp in temp_counted)) {
                                        ////console.log("Followed back!");
                                        ////console.log(temp);


                                        var ref = firebase.database().ref('deep/' + CurrentUser.username.split('.').join("") + '/' + obj[temp] + '/clicks');
                                        ref.transaction(function(currentClicks) {
                                            // If node/clicks has never been set, currentRank will be `null`.
                                            return (currentClicks || 0) + 1;
                                        });
                                        firebase.database().ref('counted/' + CurrentUser.username.split('.').join("") + "/" + temp).set({
                                            follower: true
                                        });


                                        var refremove = firebase.database().ref('stats/' + CurrentUser.username.split('.').join("") + '/accounts/' + temp);
                                        refremove.remove();
                                        //counted_dict[temp] = {follower: true};
                                        //clicks_dict[obj[temp]] = clicks_dict[obj[temp]] + 1;




                                    }
                                }
                                // var usr = username;

                            });

                            ////////console.log("stats/");
                            ////////console.log(obj);
                        });

                    });
                }



            }, 1800000);
        }

        CurrentUser = status.CurrentUser;
        if (started == false) {
            getFollowers();
           started = true;

            ////////console.log("Getting Followers");
            var rootRef = firebase.database().ref("databases/" + CurrentUser.username.split('.').join(""));


            var urlRef = rootRef;
            urlRef.once("value", function(snapshot) {
                var obj = snapshot.val();
	              var Database = null;

                ////console.log("Firebase Database");
                ////console.log(obj);
                for (var kk = 0; kk < obj.length; kk++) {
                    if (obj[kk].user_id == CurrentUser.user_id) {
                        ////console.log("Matched User");
                        SendMessage("LoadCloudDB", "Database", obj);
			                	Database = obj[kk].database;
                        my_followers = JSON.parse(Database.my_followers);

      var Settings = JSON.parse(Database.Settings);

      maxFollows = Settings.maxFollows;
      maxUnfollows = Settings.maxUnfollows;
      maxLikes = Settings.maxLikes;
      maxStories = Settings.maxStories;
      maxComments = Settings.maxComments;
 $("#customRange1").val(maxFollows);
  $("#customRange2").val(maxUnfollows);
   $("#customRange3").val(maxLikes);
    $("#customRange4").val(maxComments);
    $("#customRange5").val(maxStories);
    $("#follow_set").html("Follows/day: " + maxFollows);
    $("#unfollow_set").html("Unfollows/day: " + maxUnfollows);
    $("#like_set").html("Likes/day: " + maxLikes);
    $("#story_set").html("Stories/day: " + maxStories);
    $("#comment_set").html("Comments/day: " + maxComments);
                    }

                }


            });

        }

        $(".img-current-user").attr("src", status.CurrentUser.user_pic_url);
    }


    $("#set-follow-check").prop("checked", status.StartFollow);
    $("#set-unfollow-check").prop("checked", status.StartUnfollow);
    $("#set-story-check").prop("checked", status.StartStory);
    $("#set-like-check").prop("checked", status.StartLike);
    $("#set-comment-check").prop("checked", status.StartComment);


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');

    if (status.Day == 0) {
        last_day = dd;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
                        day = dd;

        SendMessage("UpdateDay", "Day", dd);
    } else if (status.Day != dd) {
        SendMessage("ResetPool", "", "");
    }

    UpdateCollectJobStatus(status.CollectJobs);
    
    
    
    var follow_percent = status.FollowTime.Time/status.FollowTime.Max;
        var unfollow_percent = status.UnfollowTime.Time/status.UnfollowTime.Max;
        var comment_percent = status.CommentTime.Time/status.CommentTime.Max;
      var like_percent = status.LikeOrCommentTime.Time/status.LikeOrCommentTime.Max;
         var story_percent = status.StoryTime.Time/status.StoryTime.Max;

console.log(story_percent);
if(story_percent > 5){
    SendMessage("ClearPools", "Request", "test");
}
bar_follow.animate(1.0 - follow_percent);  // Number from 0.0 to 1.0

bar_unfollow.animate(1.0 - unfollow_percent);  // Number from 0.0 to 1.0
bar_like.animate(1.0 - like_percent);  // Number from 0.0 to 1.0
bar_comment.animate(1.0 - comment_percent);  // Number from 0.0 to 1.0
bar_story.animate(1.0 - story_percent);  // Number from 0.0 to 1.0
}

function NewWhitelistUserSearch(input) {
    var text = $(input).val().toLowerCase();
    var Request = {};
    Request.Text = text;
    Request.Count = 20;
    SendMessage("RequestFilteredFollowings", "Request", Request);
}

function FilterWhitelistSearch(input) {
    var text = $(input).val().toLowerCase();
    var whitelist_block = $("#whitelisted-users");
    $(whitelist_block).find("tr").each(function() {
        if ($(this).text().toLowerCase().indexOf(text) < 0 && text != "") {
            $(this).hide();
        } else {
            $(this).show();
        }
    });
}




function getLicense() {

}

function onLicenseFetched(error, status, response) {
    function extensionIconSettings(badgeColorObject, badgeText, extensionTitle) {
        chrome.browserAction.setBadgeBackgroundColor(badgeColorObject);
        chrome.browserAction.setBadgeText({
            text: badgeText
        });
        chrome.browserAction.setTitle({
            title: extensionTitle
        });
    }
    var licenseStatus = "";
    if (status === 200 && response) {
        response = JSON.parse(response);
        licenseStatus = parseLicense(response);
    } else {
        ////////console.log("FAILED to get license. Free trial granted.");
        licenseStatus = "unknown";
    }
    if (licenseStatus) {
        if (licenseStatus === "Full") {
            window.localStorage.setItem('instooislicensed', 'true');
            extensionIconSettings({
                color: [0, 0, 0, 0]
            }, "", "Instoo is enabled.");
        } else if (licenseStatus === "None") {
            //chrome.browserAction.setIcon({path: icon}); to disabled - grayed out?
            extensionIconSettings({
                color: [0, 0, 0, 0]
            }, "", "Instoo is enabled.");
            //$("#purchase").show();
            //	$("#chrome").hide();

            //redirect to a page about paying as well?
        } else if (licenseStatus === "Free") {
            window.localStorage.setItem('instooislicensed', 'true');
            extensionIconSettings({
                color: [255, 0, 0, 0]
            }, "", window.localStorage.getItem('daysLeftInappnameTrial') + " days left in free trial.");
        } else if (licenseStatus === "unknown") {
            //this does mean that if they don't approve the permissions,e
            //it works free forever. This might not be ideal
            //$("#chrome").show();
            $("#purchase").hide();

            //however, if the licensing server isn't working, I would prefer it to work.
            window.localStorage.setItem('instooislicensed', 'false');
            extensionIconSettings({
                color: [0, 0, 0, 0]
            }, "", "Instoo is enabled.");
        }
    }
    window.localStorage.setItem('appnameLicenseCheckComplete', 'true');
}

/*****************************************************************************
 * Parse the license and determine if the user should get a free trial
 *  - if license.accessLevel == "FULL", they've paid for the app
 *  - if license.accessLevel == "FREE_TRIAL" they haven't paid
 *    - If they've used the app for less than TRIAL_PERIOD_DAYS days, free trial
 *    - Otherwise, the free trial has expired
 *****************************************************************************/

function parseLicense(license) {
    var TRIAL_PERIOD_DAYS = 300;
    var licenseStatusText;
    var licenceStatus;


    // instantiate global application state object for Chrome Storage and feed in firebase data
    // Chrome Storage will store our global state as a a JSON stringified value.
    ////////console.log(license);


    if (license.result && license.accessLevel == "FULL") {

        start_license = parseInt(license.createdTime, 10);




        ////////console.log("Fully paid & properly licensed.");
        $("#purchase").hide();
        $("#upgrade").hide();
        //		$("#chrome").hide();
        $(".sub-user").hide();

        paid_sub = true;
        speed_limit = 1000;
        $("#customRange1").attr("max", speed_limit);
        $("#customRange2").attr("max", speed_limit);
        $("#customRange3").attr("max", speed_limit);


        LicenseStatus = "Full";



    } else if (license.result && license.accessLevel == "FREE_TRIAL") {

        start_license = parseInt(license.createdTime, 10);

        var daysAgoLicenseIssued = Date.now() - parseInt(license.createdTime, 10);
        daysAgoLicenseIssued = daysAgoLicenseIssued / 1000 / 60 / 60 / 24;
        if (daysAgoLicenseIssued <= TRIAL_PERIOD_DAYS) {
            window.localStorage.setItem('daysLeftInCGTrial', TRIAL_PERIOD_DAYS - daysAgoLicenseIssued);
            ////////console.log(daysAgoLicenseIssued);
            //  window.alert("Warning: You're using the free trial and your automation will run at half speed. Upgrade in the Google Chrome Store.");

            $("#upgrade").hide();


            ////////console.log("Checking license again");
            chrome.identity.getProfileUserInfo(function(userInfo) {

                ////////console.log(userInfo.email);

                var email_name = userInfo.email;
                email_name = email_name.replace(/\W/g, '');

                var rootRef = firebase.database().ref("users2/" + email_name);


                var urlRef = rootRef;
                urlRef.once("value", function(snapshot) {
                    if (snapshot.exists() == false) {
                        ////////console.log("Trial expired");
                        //  		$("#chrome").hide();

                        //	$("#purchase").show();

                    }
                    snapshot.forEach(function(child) {
                        ////////console.log(child.key+": "+child.val());
                        if (child.val() == true) {
                            $("#upgrade").hide();
                            // 		$("#chrome").hide();

                            $("#purchase").hide();
                            speed_limit = 1000;
                            paid_sub = true;
                            $(".sub-user").hide();

                            $("#customRange1").attr("max", speed_limit);
                            $("#customRange2").attr("max", speed_limit);
                            $("#customRange3").attr("max", speed_limit);
                            ////////console.log("Backend Paid");
                        } else if (child.val() == false) {
                            ////////console.log("Trial Forced Expired");
                            //	$("#purchase").show();
                            // $("#upgrade").show();

                            //	$("#chrome").hide();

                        }
                    });
                });
                /* Use userInfo.email, or better (for privacy) userInfo.id
                They will be empty if user is not signed in in Chrome */
            });


            ////////console.log("Free trial, still within trial period");
            LicenseStatus = "Free";
        } else {
            ////////console.log(daysAgoLicenseIssued);
            //$("#upgrade").show();
            //		$("#purchase").show();

            ////////console.log("Free trial, trial period expired.");

            ////////console.log("Checking license again");
            chrome.identity.getProfileUserInfo(function(userInfo) {

                ////////console.log(userInfo.email);

                var email_name = userInfo.email;
                email_name = email_name.replace(/\W/g, '');

                var rootRef = firebase.database().ref("users2/" + email_name);


                var urlRef = rootRef;
                urlRef.once("value", function(snapshot) {
                    if (snapshot.exists() == false) {
                        ////////console.log("Trial expired");
                        //  		$("#chrome").hide();

                        	$("#purchase").show();

                    }
                    snapshot.forEach(function(child) {
                        ////////console.log(child.key+": "+child.val());
                        if (child.val() == true) {
                            $("#upgrade").hide();
                            // 		$("#chrome").hide();

                            $("#purchase").hide();
                            speed_limit = 1000;
                            paid_sub = true;
                            $(".sub-user").hide();

                            $("#customRange1").attr("max", speed_limit);
                            $("#customRange2").attr("max", speed_limit);
                            $("#customRange3").attr("max", speed_limit);
                            ////////console.log("Backend Paid");
                        } else if (child.val() == false) {
                            ////////console.log("Trial Forced Expired");
                            $("#purchase").show();
                            $("#upgrade").show();

                            //	$("#chrome").hide();

                        }
                    });
                });
                /* Use userInfo.email, or better (for privacy) userInfo.id
                They will be empty if user is not signed in in Chrome */
            });


            LicenseStatus = "None";
            //open a page telling them it is not working since they didn't pay?
        }
    } else {
        ////////console.log("No license ever issued.");

        $("#upgrade").show();


        LicenseStatus = "None";
        //open a page telling them it is not working since they didn't pay?
        //$("#purchase").show();

    }




    if (license.createdTime != null) {

        start_license = parseInt(license.createdTime, 10);

    }
    return LicenseStatus;
}




// Helper Util for making authenticated XHRs
function xhrWithAuth(method, url, interactive, callback) {
    ////////console.log(url);
    var retry = true;
    var access_token;
    getToken();

    function getToken() {
        ////////console.log("Calling chrome.identity.getAuthToken", interactive);
        chrome.identity.getAuthToken({
            interactive: interactive
        }, function(token) {
            if (chrome.runtime.lastError) {
                callback(chrome.runtime.lastError);
                return;
            }
            ////////console.log("chrome.identity.getAuthToken returned a token", token);
            access_token = token;
            requestStart();
        });
    }

    function requestStart() {
        ////////console.log("Starting authenticated XHR...");
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        xhr.onreadystatechange = function(oEvent) {
            if (xhr.readyState === 4) {
                if (xhr.status === 401 && retry) {
                    retry = false;
                    chrome.identity.removeCachedAuthToken({
                            'token': access_token
                        },
                        getToken);
                } else if (xhr.status === 200) {
                    ////////console.log("Authenticated XHR completed.");
                    callback(null, xhr.status, xhr.response);
                }
            } else {
                ////////console.log("Error - " + xhr.statusText);
            }
        }
        try {
            xhr.send();
        } catch (e) {
            ////////console.log("Error in xhr - " + e);
        }
    }
}



function ClearWhitelistTable() {
    $("#whitelisted-users").empty();
}


function AddUserToWhitelist(input) {
    var user_id = $(input).attr("user_id");
    $(input).closest("li").remove();

    SendMessage("AddUserToWhitelist", "user_id", user_id);
}

function ProcessFilteredFollowings(users) {
    var filter_users_block = $("#add-user-results");
    filter_users_block.empty();
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        var userRow = `
		<li class="add-whitelist-user" user_id=` + user.user_id + `>
		<div class="row">
		<div class="col-md-2"><a href='https://www.instagram.com/` + user.username + `/' target='_blank'><img class='backup_picture img-rounded' width='64'  height='64' src='` + user.user_pic_url + `'/></a></div>
		<div class='col-md-5 align-mid-vertical text-instafollow-td'>` + user.username + `</div><div class='col-md-5 text-instafollow-td align-mid-vertical'>` + user.full_name + `</div>
		</div>
		</li>
		`;

        $(filter_users_block).append(userRow);
    }
}

function AddedWhitelistUsers(users) {
    var whitelist_block = $("#whitelisted-users");
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        var userRow = `
		<tr>
		<td><a href='https://www.instagram.com/` + user.username + `/' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` + user.user_pic_url + `'/></a></td>
		<td class='align-mid-vertical text-instafollow-td'>` + user.username + `</td><td class='text-instafollow-td align-mid-vertical'>` + user.full_name + `</td>
		<td style="vertical-align: middle;">
		<button class="btn-danger remove-user-whitelist" user_id=` + user.user_id + `><span class="glyphicon glyphicon-remove"></span></button></td>
		</tr>
		`;
        $(whitelist_block).prepend(userRow);
    }

    FilterWhitelistSearch($("#user-search"));
}

function UpdateCollectJobStatus(Jobs) {
    var collect_block = $("#collect-users-block");
    var collect_table = $(collect_block).find("tbody");
    $(collect_table).empty();
    var added_tags = [];

    for (var i = 0; i < Jobs.length; i++) {
        var user = Jobs[i].user;

        if (user != null) {
            added_tags.push(user);

            var index = global_accounts.indexOf(user.username + "<br>");
            if (index == -1) {
                global_accounts.push(user.username + "<br>");
            }

            var userRow = `
		<tr><td style="vertical-align: middle;">
		<button class="btn-danger remove-user-collect" user_id=` + user.user_id + `><span class="glyphicon glyphicon-remove"></span></button></td>
		<td><a href='https://www.instagram.com/` + user.username + `/' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` + user.user_pic_url + `'/></a></td>
		<td class='align-mid-vertical text-instafollow-td'>` + user.username + `</td>
		
		</tr>
		`;
            $(collect_table).prepend(userRow);
        }
    }
}

function HandleError(Error) {


}


function UpdateMediaStatus(Status) {
    var like_block = $("#like-block");
    var like_table = $(like_block).find("tbody");
    $(like_table).empty();

    for (var i = 0; i < Status.LikedMedias.length; i++) {
        OnLikedMedia(Status.LikedMedias[i]);
    }
    var story_block = $("#story-block");
    var story_table = $(story_block).find("tbody");
    $(story_table).empty();

    for (var i = 0; i < Status.StoryMedia.length; i++) {
		
        OnStoryMedia(Status.StoryMedia[i]);
    }


    var comment_block = $("#comment-block");
    var comment_table = $(comment_block).find("tbody");
    $(comment_table).empty();

    for (var i = 0; i < Status.CommentedMedias.length; i++) {
        OnCommentedMedia(Status.CommentedMedias[i]);
    }

    ////////console.log(Status);

    var tag_block = $("#collect-tags-block");
    var tag_table = $(tag_block).find("tbody");
    $(tag_table).empty();
    var added_tags = [];
    for (var i = 0; i < Status.Tags.length; i++) {
        var index = global_tags.indexOf(Status.Tags[i].tag_name + "<br>");
        if (index == -1) {
            global_tags.push(Status.Tags[i].tag_name + "<br>");
        }

        var user = Status.Tags[i].tag_name;
        if (true) {
            added_tags.push(user);

            var userRow = `
		<tr><td style="vertical-align: middle;">
		<button class="btn-danger remove-tag-collect" user_id=` + user + `><span class="glyphicon glyphicon-remove"></span></button></td>
		<td>#</td>
		<td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
		
		</tr>
		`;
            $(tag_table).prepend(userRow);
        }
    }
    //////console.log(Status.Locations);
    var tag_block2 = $("#collect-locations-block");
    var tag_table2 = $(tag_block2).find("tbody");
    $(tag_table2).empty();
    for (var i = 0; i < Status.Locations.length; i++) {
        //	var index = global_tags.indexOf(Status.Tags[i].tag_name + "<br>");
        if (index == -1) {
            //global_tags.push(Status.Tags[i].tag_name + "<br>");
        }

        var user = Status.Locations[i].tag_name;
        if (true) {
            added_tags.push(user);

            var userRow = `
		<tr><td style="vertical-align: middle;">
		<button class="btn-danger remove-location-collect" user_id=` + user + `><span class="glyphicon glyphicon-remove"></span></button></td>
		
		<td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
		
		</tr>
		`;
            $(tag_table2).prepend(userRow);
        }
    }

    //////console.log("Comments");
    //////console.log(Status.Comments);
    var tag_block3 = $("#collect-comments-block");
    var tag_table3 = $(tag_block3).find("tbody");
    $(tag_table3).empty();
    for (var i = 0; i < Status.Comments.length; i++) {
        //	var index = global_tags.indexOf(Status.Tags[i].tag_name + "<br>");
        if (index == -1) {
            //global_tags.push(Status.Tags[i].tag_name + "<br>");
        }

        var user = Status.Comments[i].tag_name;
        if (true) {
            added_tags.push(user);

            var userRow = `
		<tr><td style="vertical-align: middle;">
		<button class="btn-danger remove-comment-collect" user_id="` + user + `"><span class="glyphicon glyphicon-remove"></span></button></td>
		
		<td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
		
		</tr>
		`;
            $(tag_table3).prepend(userRow);
        }
    }

    $('#media_tags').tagsinput('removeAll');
    for (var i = 0; i < Status.Tags.length; i++) {
        //////////console.log(Status.Tags[i].tag_name);
        //$("#media_tags").tagsinput('add', Status.Tags[i].tag_name);
    }
}

function UpdateFollowStatus(AllUsers) {
    var FollowedUsers = AllUsers.FollowedUsers;
    var UnfollowedUsers = AllUsers.UnfollowedUsers;

    var follow_block = $("#follow-block");
    var follow_table = $(follow_block).find("tbody");
    $(follow_table).empty()

    var unfollow_block = $("#unfollow-block");
    var unfollow_table = $(unfollow_block).find("tbody");
    $(unfollow_table).empty();

    for (var i = 0; i < FollowedUsers.length; i++) {
        OnFollowedUser(FollowedUsers[i]);
    }

    for (var i = 0; i < UnfollowedUsers.length; i++) {
        OnUnfollowedUser(UnfollowedUsers[i]);
    }
}

function OnStoryMedia(user) {
console.log(user);
    var userRow = `
	<tr>
	<td><a href='https://www.instagram.com/` + user.username + `/' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` + user.user_pic_url + `'/></a></td>
	<td class='align-mid-vertical text-instafollow-td'>` + user.username + `</td><td class='text-instafollow-td align-mid-vertical'>` + user.full_name + `</td>
	</tr>
	`;

    var follow_block = $("#story-block");
    var follow_table = $(follow_block).find("tbody");
    $(follow_table).prepend(userRow);

    var table_rows = $(follow_table).find("tr");
    var num_rows = table_rows.length;
    if (num_rows > DisplayFollowersNum) {
        var start_delete = num_rows - (num_rows - DisplayFollowersNum);
        $(table_rows).slice(start_delete).remove();
    }
}
function OnFollowedUser(user) {
    var userRow = `
	<tr>
	<td><a href='https://www.instagram.com/` + user.username + `/' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` + user.user_pic_url + `'/></a></td>
	<td class='align-mid-vertical text-instafollow-td'>` + user.username + `</td><td class='text-instafollow-td align-mid-vertical'>` + user.full_name + `</td>
	</tr>
	`;

    var follow_block = $("#follow-block");
    var follow_table = $(follow_block).find("tbody");
    $(follow_table).prepend(userRow);

    var table_rows = $(follow_table).find("tr");
    var num_rows = table_rows.length;
    if (num_rows > DisplayFollowersNum) {
        var start_delete = num_rows - (num_rows - DisplayFollowersNum);
        $(table_rows).slice(start_delete).remove();
    }
}

function OnUnfollowedUser(user) {
    var userRow = `
	<tr>
	<td><a href='https://www.instagram.com/` + user.username + `/' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` + user.user_pic_url + `'/></a></td>
	<td class='align-mid-vertical text-instafollow-td'>` + user.username + `</td><td class='text-instafollow-td align-mid-vertical'>` + user.full_name + `</td>
	</tr>
	`;

    var unfollow_block = $("#unfollow-block");
    var unfollow_table = $(unfollow_block).find("tbody");
    $(unfollow_table).prepend(userRow);

    var table_rows = $(unfollow_table).find("tr");
    var num_rows = table_rows.length;
    if (num_rows > DisplayFollowersNum) {
        var start_delete = num_rows - (num_rows - DisplayFollowersNum);
        $(table_rows).slice(start_delete).remove();
    }

}

function OnLikedMedia(media) {
    var mediaRow = `
	<tr>
	<td><a href='https://www.instagram.com/p/` + media.shortcode + `/' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'   src='` + media.media_src + `'/></a></td>
	<td class='align-mid-vertical text-instafollow-td'>` + media.caption + `</td>
	</tr>
	`;

    var like_bock = $("#like-block");
    var like_table = $(like_bock).find("tbody");
    $(like_table).prepend(mediaRow);

    var table_rows = $(like_table).find("tr");
    var num_rows = table_rows.length;
    if (num_rows > DisplayLikesNum) {
        var start_delete = num_rows - (num_rows - DisplayLikesNum);
        $(table_rows).slice(start_delete).remove();
    }
}

function OnCommentedMedia(media) {
    var mediaRow = `
	<tr>
	<td><a href='https://www.instagram.com/p/` + media.media.shortcode + `/' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` + media.media.media_src + `'/></a></td>
	<td class='align-mid-vertical text-instafollow-td'>` + media.media.caption + `</td>
	</tr>
	`;

    var like_bock = $("#comment-block");
    var like_table = $(like_bock).find("tbody");
    $(like_table).prepend(mediaRow);

    var table_rows = $(like_table).find("tr");
    var num_rows = table_rows.length;
    if (num_rows > DisplayLikesNum) {
        var start_delete = num_rows - (num_rows - DisplayLikesNum);
        $(table_rows).slice(start_delete).remove();
    }
}
