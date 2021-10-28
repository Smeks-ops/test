var CurrentUser;
var ComPort;
var follow_count_num = 0;
var following_count_num = 0;
var linkedin_data = [];
var instagram_data = [];
var user_stats = [];
var last_ten_min = 1000000;
var last_ten_max = 0;
var DisplayFollowersNum = 10;
var DisplayLikesNum = 20;
var user_email = "";
var dashboardMode = 0;
var postedInst = false;
var follow_speed = 0;
var emailed = false;
var enable_get_followers = false;
var unfollow_speed = 0;
var story_speed = 0;
var unfollowInstoo = false;
var post_stats = false;
var tiktok_data = [];
var tiktok_data = [];
var hoursLeft = 8;
var twitter_data = [];
var like_speed = 0;
var follower_data = [];
var daily_data = [];
var blacklist = [];
var filters = [];
var minPhotos = 1;
var minFollowers = 100;
var minFollowing = 100;
var maxFollowers = 100000;
var maxFollowing = 100000;
var EnableFilters = false;
var update_interval = false;
var IdealTargets = [];
var addIdeal = true;
var follower_growth = 0;
var set_update = false;
var collectSelfFollowers = false;
var tiktok_speed = 0;
var twitter_speed = 0;
var facebook_speed = 0;

var unfollow_mode = false;
var DMMode = true;
window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

var mode = "instagram";
var StartTime = "";
var AutoActions = [];
var analytics = [];
var startDate = "";
var chart_data;
var analytics_chart;
var stopDate = "";
var cal_events = [];
var activity_log = "";
var instooData = [];
var schedule_list = "";
var user_followers = [];
var calendar;
var chart3;
var chart;
var chart2;
var canvas;
var Duration = 8;
var logged_in = false;
var startedTutorial = false;
var likeCount = 0;
var myCollectJob = {};
var maxStories = 1000;
var user_plan;
var comment_speed = 0;
var global_settings = {};
var global_accounts = [];
var gotAnalytics = false;
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

var StartReact = false;
var StartSchedule = false;
var reacts = [];

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
var maxUnfollows = 1000;
var maxComments = 10;
var bar_like;
var bar_story;
var bar_comment;
var bar_unfollow;
var hashtag_dict = {};
var account_dict = {};
var counted_dict = {};
var clicks_dict = {};
var email_name;
var speed_limit = 100;
var UnfollowAfterDays;
var cloud_db;

var live_snapshots = [];
var live_tags = [];
var like_accounts = [];

var selectedAccount = "";
var loadedAccounts = false;
var updated_cloud = false;

window.dataLayer = window.dataLayer || [];
(function(global) {
    var MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var COLORS = [
        '#4dc9f6',
        '#f67019',
        '#f53794',
        '#537bc4',
        '#acc236',
        '#166a8f',
        '#00a950',
        '#58595b',
        '#8549ba'
    ];

    var Samples = global.Samples || (global.Samples = {});
    var Color = global.Color;

    Samples.utils = {
        srand: function(seed) {
            this._seed = seed;
        },

        rand: function(min, max) {
            var seed = this._seed;
            min = min === undefined ? 0 : min;
            max = max === undefined ? 1 : max;
            this._seed = (seed * 9301 + 49297) % 233280;
            return min + (this._seed / 233280) * (max - min);
        },

        numbers: function(config) {
            var cfg = config || {};
            var min = cfg.min || 0;
            var max = cfg.max || 1;
            var from = cfg.from || [];
            var count = cfg.count || 8;
            var decimals = cfg.decimals || 8;
            var continuity = cfg.continuity || 1;
            var dfactor = Math.pow(10, decimals) || 0;
            var data = [];
            var i, value;

            for (i = 0; i < count; ++i) {
                value = (from[i] || 0) + this.rand(min, max);
                if (this.rand() <= continuity) {
                    data.push(Math.round(dfactor * value) / dfactor);
                } else {
                    data.push(null);
                }
            }

            return data;
        },

        labels: function(config) {
            var cfg = config || {};
            var min = cfg.min || 0;
            var max = cfg.max || 100;
            var count = cfg.count || 8;
            var step = (max - min) / count;
            var decimals = cfg.decimals || 8;
            var dfactor = Math.pow(10, decimals) || 0;
            var prefix = cfg.prefix || '';
            var values = [];
            var i;

            for (i = min; i < max; i += step) {
                values.push(prefix + Math.round(dfactor * i) / dfactor);
            }

            return values;
        },

        months: function(config) {
            var cfg = config || {};
            var count = cfg.count || 12;
            var section = cfg.section;
            var values = [];
            var i, value;

            for (i = 0; i < count; ++i) {
                value = MONTHS[Math.ceil(i) % 12];
                values.push(value.substring(0, section));
            }

            return values;
        },

        color: function(index) {
            return COLORS[index % COLORS.length];
        },

        transparentize: function(color, opacity) {
            var alpha = opacity === undefined ? 0.5 : 1 - opacity;
            return Color(color).alpha(alpha).rgbString();
        }
    };

    // DEPRECATED
    window.randomScalingFactor = function() {
        return Math.round(Samples.utils.rand(-100, 100));
    };
    Samples.utils.srand(Date.now());
}(this));



function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

async function RankTargets(recents) { 
}





$(document).on('change', '#minPhoto', function(event) {
    d = document.getElementById("minPhoto").value;
    SendMessage("minPhoto", "minPhoto", d);


});



$(document).on('change', '#maxFollower', function(event) {
    d = document.getElementById("maxFollower").value;
    SendMessage("maxFollowers", "maxFollowers", d);


});

$(document).on('change', '#minFollower', function(event) {
    d = document.getElementById("minFollower").value;
    SendMessage("minFollowers", "minFollowers", d);


});

$(document).on('change', '#minFollowing', function(event) {
    d = document.getElementById("minFollowing").value;
    SendMessage("minFollowing", "minFollowing", d);


});
$(document).on('change', '#maxFollowing', function(event) {
    d = document.getElementById("maxFollowing").value;
    SendMessage("maxFollowing", "maxFollowing", d);


});
$(document).on('click', '#whitelist-user', function(event) {
    var user = prompt("Please enter the username exactly");
    if (user) {
        var split_users = user.split(",");
        for (var kk = 0; kk < split_users.length; kk++) {
            SendMessage("AddUserToWhitelistName", "username", split_users[kk].split(',').join('').split(' ').join('').split('@').join(''));
        }

        $("#add-user-results").empty();
        $("#add-user-search").val("");
    }

});

$(document).on('click', '.remove-user-whitelist', function(event) {

    RemoveWhitelistedUser(this);

});

$(document).on('click', '.add-whitelist-user', function(event) {




    AddUserToWhitelist(this);
});
$(document).on('click', '#whitelist-clear', function(event) {
    SendMessage("ClearWhite", "", "");

});
$(document).on('click', '#clear-filter', function(event) {
    SendMessage("ClearFilters", "user", "");
});
$(document).on('click', '#add-filter', function(event) {
    var new_blacklist = prompt("Please enter a word to add it to the fitlers:");
    if (new_blacklist && new_blacklist.includes(",")) {
        var split = new_blacklist.split(",");
        for (var kk = 0; kk < split.length; kk++) {
            SendMessage("AddToFilters", "user", split[kk].split("@").join(""));

        }

    } else if (new_blacklist.includes(" ")) {
        var split = new_blacklist.split(" ");
        for (var kk = 0; kk < split.length; kk++) {
            SendMessage("AddToFilters", "user", split[kk].split("@").join(""));

        }

    } else {

        SendMessage("AddToFilters", "user", new_blacklist.split("@").join(""));
    }

    var followers_string = "";
    for (var kk = 0; kk < user_followers.length; kk++) {
        followers_string += user_followers[kk] + ", ";

    }
    var ideal_targets_string = "";

    for (var kk = 0; kk < IdealTargets.length; kk++) {
        ideal_targets_string += IdealTargets[kk].username + " followers: " + IdealTargets[kk].followers + "<br> ";

    }

    var blacklist_string = "";

    for (var kk = 0; kk < blacklist.length; kk++) {
        blacklist_string += blacklist[kk] + ",  ";

    }


    var filter_string = "";

    for (var kk = 0; kk < filters.length; kk++) {
        filter_string += filters[kk] + ",  ";

    }
    $("#followers_list").html("Followers " + user_followers.length + "/" + follow_count_num + ": " + followers_string + "<br>");
    $("#activity_log").html("<br>Activity Log: <br>" + activity_log);
    $("#blacklist").html("<br>Blacklist of profiles to never re-visit:  <br>" + blacklist_string);
    $("#filters").html("<br>Words to avoid in bio text and photo content:  <br>" + filter_string);

    $("#IdealTargets").html("<br>Ideal Account Targets: <br>" + ideal_targets_string);


});


$(document).on('click', '#add-blacklist', function(event) {
    var new_blacklist = prompt("Please enter a username exactly to add it to the blacklist:");
    if (new_blacklist && new_blacklist.includes(",")) {
        var split = new_blacklist.split(",");
        for (var kk = 0; kk < split.length; kk++) {
            SendMessage("AddToBlacklist", "user", split[kk].split("@").join(""));

        }

    } else if (new_blacklist.includes(" ")) {
        var split = new_blacklist.split(" ");
        for (var kk = 0; kk < split.length; kk++) {
            SendMessage("AddToBlacklist", "user", split[kk].split("@").join(""));

        }

    } else {

        SendMessage("AddToBlacklist", "user", new_blacklist.split("@").join(""));
    }

    var followers_string = "";
    for (var kk = 0; kk < user_followers.length; kk++) {
        followers_string += user_followers[kk] + ", ";

    }
    var ideal_targets_string = "";

    for (var kk = 0; kk < IdealTargets.length; kk++) {
        ideal_targets_string += IdealTargets[kk].username + " followers: " + IdealTargets[kk].followers + "<br> ";

    }

    var blacklist_string = "";

    for (var kk = 0; kk < blacklist.length; kk++) {
        blacklist_string += blacklist[kk] + ",  ";

    }


    var filter_string = "";

    for (var kk = 0; kk < filters.length; kk++) {
        filter_string += filters[kk] + ",  ";

    }
    $("#followers_list").html("Followers " + user_followers.length + "/" + follow_count_num + ": " + followers_string + "<br>");
    $("#activity_log").html("<br>Activity Log: <br>" + activity_log);
    $("#blacklist").html("<br>Blacklist of profiles to never re-visit:  <br>" + blacklist_string);
    $("#filters").html("<br>Words to avoid in bio text and photo content:  <br>" + filter_string);

    $("#IdealTargets").html("<br>Ideal Account Targets: <br>" + ideal_targets_string);



});

async function sendSched() { 

    var now = new Date(stopDate);
    var daysOfYear = [];
    for (var d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
        await timer(1000);

        var td = new Date(d);
        var newD = td.toISOString().split("T")[0];

    }
}



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



function getFollowers() {
    if (CurrentUser && CurrentUser.username) {

        $(".img-current-user").attr("src", CurrentUser.user_pic_url);

        $(".img-current-user").show();


        if (gotAnalytics == false) {
            gotAnalytics = true;
            chart_data = [];
            live_snapshots = [];
            live_tags = [];
            live_accounts = [];
            var ranked_accounts = "";
            var limits = 1000;
            if (paid_sub) {
                limits = 1000;
                var ranked_data = [];
                var totals = 0;

            }

            var d = new Date();
            var currentHour = d.getHours();

            var d_num = Date.parse(d);
            d_num = Math.floor(d_num / (1000 * 60 * 60));
            var dat = {
                followers: follow_count_num,
                hour: d_num,
                user_id: CurrentUser.user_id,
                mode: mode
            };
            if (follow_count_num != 0) {
             var data = {
                followers: follow_count_num,
                hour: d_num,
                user_id: CurrentUser.user_id,
                mode: "instagram"
            };

             SendMessage("PostStats", "data", data);

            }

        }
        var account_name = CurrentUser.username;
       


    }

}

function roughSizeOfObject(object) {

    var objectList = [];
    var stack = [object];
    var bytes = 0;

    while (stack.length) {
        var value = stack.pop();

        if (typeof value === 'boolean') {
            bytes += 4;
        } else if (typeof value === 'string') {
            bytes += value.length * 2;
        } else if (typeof value === 'number') {
            bytes += 8;
        } else if (
            typeof value === 'object' &&
            objectList.indexOf(value) === -1
        ) {
            objectList.push(value);

            for (var i in value) {
                stack.push(value[i]);
            }
        }
    }
    return bytes;
}







$(document).ready(function() {

    $("#userLogin").show();
  
    CreateComPort();
    $("#starttiktok").parent().removeClass("hide");

    $("#startinstagram").parent().addClass("active");
    $("#starttiktok").parent().removeClass("active");
    $(document).on('click', '.remove-user-whitelist', function(event) {

        RemoveWhitelistedUser(this);

    });
    $("#userLogin").click(function() {
        SendMessage("userLogin", "", "");

    });
    SendMessage("GetUserStats", "", "");

    setInterval(function() {
        if(hoursLeft > 0){
        SendMessage("refreshStats", "", "");
    }
        if (roughSizeOfObject(cloud_db) < 15000000) {


          
            
        }

    }, 1000 * 60 * 60)

    setInterval(function() {

        if (update_interval) {
            updated_cloud = true;
            update_interval = false;
        }

    }, 1000 * 60)




    $(document).on('click', '.add-whitelist-user', function(event) {




        AddUserToWhitelist(this);
    });
    $(document).on('click', '#whitelist-clear', function(event) {
        SendMessage("ClearWhite", "", "");

    });
    $("#cloud-backup").click(function() {

        alert("Settings saved to cloud!");
        if (roughSizeOfObject(cloud_db) < 15000000) {
           
        }

    });
    $("#cloud-clear").click(function() {
        SendMessage("ResetAll", "", "");

        alert("Cloud backup cleared!");
      

        SendMessage("ResetAll", "", "");

    });




    version = chrome.runtime.getManifest().version;

    $('#version').attr('name', version);
    $("#sidebar-wrapper").show();
    setTimeout(function() {
        var buttons = document.getElementsByTagName('div');
        for (var kk = 0; kk < buttons.length; kk++) {

            buttons[kk].classList.remove("hide");
        }
        version = chrome.runtime.getManifest().version;

        $('#version').attr('name', version);
        $("#sidebar-wrapper").show();

    }, 5000);
    setTimeout(function() {
        var buttons = document.getElementsByTagName('div');
        for (var kk = 0; kk < buttons.length; kk++) {

            buttons[kk].classList.remove("hide");
        }
        version = chrome.runtime.getManifest().version;

        $('#version').attr('name', version);
        $("#sidebar-wrapper").show();

    }, 10000);



    $(".backup_picture").on("error", function() {
        $(this).attr('src', 'icon.png');
    });
    user_plan = $("#plan").attr("name");
    $("#sidebar-mosaic").click(function() {
        var win = window.open('https://tagmosaic.com', '_blank');
        win.focus();
    });
    $("#overlay").show();

    $("#sidebar-home-tinder2").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("tinder.html", function() {

            dashboardMode = 3;

            var data2 = [];
            if ($("#data2").attr("name") && $("#data2").attr("name").length > 2) {
                data2 = [];
            }
            var chart_data = null;
            chart_data = [];
            var minimum = 10000;
            var labels = [];
            var min = 10000000;
            var max = 0;


            for (var index = 0; index < data2.length; index++) {
                var obj = data2[index];
                if (CurrentUser && obj.user_id == CurrentUser.user_id) {
                    chart_data.push(
                        parseInt(obj.followers)
                    );
                    if (obj.followers > max) {
                        max = obj.followers;
                    }

                    if (obj.followers < min) {
                        min = obj.followers;
                    }
                    labels.push(index);
                    if (parseInt(obj.followers) < minimum) {
                        minimum = parseInt(obj.followers);
                    }
                }
            }
            if (chart_data.length > 1) {
                $('#growth').html('You grown ' + max - min + ' followers using Instoo');
            }
            let config = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Instagram Followers',
                        backgroundColor: window.chartColors.red,
                        borderColor: window.chartColors.red,
                        data: chart_data,
                        fill: false,
                    }]
                },
                options: {
                    maintainAspectRatio: false,

                    responsive: true,
                    title: {
                        display: false,
                        text: 'Followers'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Hour'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Followers'
                            }
                        }]
                    }
                }
            };



            mode = "tinder";
            gotAnalytics = false;


            version = chrome.runtime.getManifest().version;

            setTimeout(function() {
   


                if (CurrentUser && CurrentUser.username) {

                    $(".img-current-user").attr("src", CurrentUser.user_pic_url);
                    $(".img-current-user").show();

                }
            }, 240000);


            $('#version').attr('name', version);
            if (user_plan == "lifetime" || user_plan == "linkstories" || user_plan == "instoo2" || user_plan == "linkyear" || user_plan == "instoogold" || user_plan == "instooyearly" || user_plan == "instoopro" || user_plan == "instoogold2") {
                speed_limit = 300;

                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);


            }

            $('#media_accounts').tagsinput({
                trimValue: true
            });

            $('#media_tags').tagsinput({
                trimValue: true
            });
            $('#media_tags2').tagsinput({
                trimValue: true
            });

            $('#comment_tags').tagsinput({
                trimValue: true,
                delimiter: ']',
                confirmKeys: [13]
            });

            $('#location_tags').tagsinput({
                trimValue: true
            });



            $('#my-btns .btn').on('click', function(event) {

                var val = $(this).find('input').val();
                if (val == "Fast") {
                    $("#fast").addClass('active');
                    $("#slow").removeClass('active');
                    $("#medium").removeClass('active');

                    if (paid_sub) {

                        SendMessage("SetSpeedTinder", "Speed", 1);

                    } else {
                        buySub();
                    }
                }

                if (val == "Slow") {
                    $("#slow").addClass('active');
                    $("#fast").removeClass('active');
                    $("#medium").removeClass('active');
                    SendMessage("SetSpeedTinder", "Speed", 8);


                }

                if (val == "Medium") {
                    $("#medium").addClass('active');
                    $("#slow").removeClass('active');
                    $("#fast").removeClass('active');
                    SendMessage("SetSpeedTinder", "Speed", 2);


                }

            });

            SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);



            $("#comment_tags").on('itemAdded', function(event) {


                var tagsinputWidth = 200; 
                var tagWidth = $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); 
                if (tagWidth > tagsinputWidth) {
                    var tagsText = event.item; 
                    var res = tagsText.substr(0, 5); 
                    $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags;

                SendMessage("AddCommentToListTinder", "TagName", tags);
             

                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });

            $("#comment_tags").on('itemRemoved', function(event) {


                var tags = event.item;
                var split_tags = tags;

                for (var kk = 0; kk < split_tags.length; kk++) {

                    SendMessage("RemoveCommentFromListTinder", "TagName", split_tags[kk]);
                    var index = global_tags.indexOf(split_tags[kk]);
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#customRangeTinderComments").change(function() {
                if (paid_sub === false) {
                    if (parseInt($("#customRangeTinderComments").val()) > 1000) {
                        var input = document.getElementById("customRangeTinderComments");
                        input.value = 1000;

                    }
                }

                var follow_tinder_speed = parseInt($("#customRangeTinderComments").val());

                $("#comment_tinder_set").html("DMs/day: " + $("#customRangeTinderComments").val());


                SendMessage("UpdateTinderCommentLimit", "limit", follow_tinder_speed);




            });


            $("#customRangeTinderLikes").change(function() {
                if (paid_sub == false) {
                    if (parseInt($("#customRangeTinderLikes").val()) > 1000) {
                        var input = document.getElementById("customRangeTinderLikes");
                        input.value = 1000;

                    }
                }


                var follow_tinder_speed = parseInt($("#customRange1").val());
                var like_tinder_speed = parseInt($("#customRangeTinderLikes").val());


                $("#like_tinder_set").html("Likes/day: " + $("#customRangeTinderLikes").val());

                SendMessage("UpdateTinderLikeLimit", "limit", like_tinder_speed);

            });

            SendMessage("RequestFollowStatus", "Num", DisplayFollowersNum);
            $("#slow").click(function() {
                var user_plan = $("#plan").attr("name");

                SendMessage("SetSpeedTinder", "Num", 3);
                $("#slow").addClass('active');
                $("#fast").removeClass('active');
                $("#medium").removeClass('active');

            });
            $("#medium").click(function() {
                var user_plan = $("#plan").attr("name");




                SendMessage("SetSpeedTinder", "Num", 2);
                $("#medium").addClass('active');
                $("#slow").removeClass('active');
                $("#fast").removeClass('active');

            });
            $("#fast").click(function() {
                var user_plan = $("#plan").attr("name");

                SendMessage("SetSpeedTinder", "Num", 1);



                $("#fast").addClass('active');
                $("#slow").removeClass('active');
                $("#medium").removeClass('active');

            });

            $("#set-follow-tinder-check").click(function() {
                SendMessage("SetFollowTinder", "Value", $(this).is(':checked'));

            });
            $("#set-like-tinder-check").click(function() {
                SendMessage("SetLikeTinder", "Value", $(this).is(':checked'));

            });
            $("#set-follow-check").click(function() {
                $("#set-unfollow-check").prop("checked", false);
                SetUnfollowValue(false);
                SetFollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }
            });
            $("#set-like-check").click(function() {

                SetLikeValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });


            $("#set-story-check").click(function() {
                SetStoryValue($(this).is(':checked'));


                if ($(this).is(':checked') != true) {
                    $("#set-like-check").prop("checked", false);
                    SetLikeValue(false);
                    $("#set-follow-check").prop("checked", false);
                    SetFollowValue(false);

                    $("#set-unfollow-check").prop("checked", false);
                    SetUnfollowValue(false);
                    $("#set-comment-check").prop("checked", false);
                    SetCommentValue(false);
                }

            });
            $("#set-comment-check").click(function() {
                SetCommentValue($(this).is(':checked'));

                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", status.StartLike);
                }

            });
            $(document).on('click', '.remove-user-collect', function() {
                RemoveCollectJobUser(this);

            });
            $(document).on('click', '.remove-tag-collect', function() {
                RemoveCollectJobTagTikTok(this);
            });
            $(document).on('click', '.remove-location-collect', function() {
                RemoveLocationJobTag(this);
            });
            $(document).on('click', '.remove-comment-collect', function() {

                $(this).closest("tr").remove();
                SendMessage("RemoveCommentFromList", "TagName", $(this).attr("user_id"));
                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
            });




            $("#set-unfollow-check").click(function() {
                $("#set-follow-check").prop("checked", false);
                SetFollowValue(false);

                SetUnfollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            SetActiveSidebarItem("#sidebar-home");


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
            $("#comment_set").html("DMs/day: " + maxComments);


            SetActiveSidebarItem("#sidebar-home-tinder2");

        });
    });
    $("#sidebar-home-crm").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("crm.html", function() {

            dashboardMode = 6;
            $("#validateInstagramFollowers").click(function() {

                SendMessage("validateInstagramFollowers", "Num", "DisplayLikesNum");

            });

            $("#validateFollowers").click(function() {
                var followers_list = prompt("Enter a comma seperated list of followers to rank targets[dogs, dogsofinstagram, dog]:");
                var splits = followers_list.split(",");
                for (var kk = 0; kk < splits.length; kk++) {
                    splits[kk] = splits[kk].split(" ").join("").split("#").join("").split("@").join("");
                }


                for (var kk = 0; kk < instagram_data.length; kk++) {

                    if (splits.includes(instagram_data[kk].username)) {
                        instagram_data[kk].connected = "yes";
                    }
                }
                for (var kk = 0; kk < linkedin_data.length; kk++) {
                    if (splits.includes(linkedin_data[kk].username)) {
                        linkedin_data[kk].connected = "yes";
                    }
                }




                SendMessage("UpdateInstagramData", "instagram_data", instagram_data);
                SendMessage("UpdateLinkedinData", "linkedin_data", linkedin_data);

            });


            $("#validateSales").click(function() {
                var sales_list = prompt("Enter a comma seperated list of sales to rank targets(dogs, 10, dogsofinstagram, 20, dog, 30):");
                var splits = sales_list.split(",");
                for (var kk = 0; kk < splits.length; kk++) {
                    splits[kk] = splits[kk].split(" ").join("").split("#").join("").split("@").join("");
                }
                for (var kk = 0; kk < instagram_data.length; kk++) {
                    if (splits.includes(instagram_data[kk].username)) {
                        instagram_data[kk].sales += parseFloat(splits[splits.indexOf(instagram_data[kk].username) + 1]);
                    }
                }
                for (var kk = 0; kk < linkedin_data.length; kk++) {
                    if (splits.includes(linkedin_data[kk].username)) {
                        linkedin_data[kk].sales += parseFloat(splits[splits.indexOf(linkedin_data[kk].username) + 1]);
                    }
                }


                SendMessage("UpdateInstagramData", "instagram_data", instagram_data);
                SendMessage("UpdateLinkedinData", "linkedin_data", linkedin_data);
            });
            mode = "crm";
            gotAnalytics = false;


            SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


            SetActiveSidebarItem("#sidebar-home-crm");

        });
    });




    $("#sidebar-home-link2").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("linkedin.html", function() {

            dashboardMode = 5;

            var data2 = [];
            if ($("#data2").attr("name") && $("#data2").attr("name").length > 2) {
                data2 = [];
            }
            var chart_data = null;
            chart_data = [];
            var minimum = 10000;
            var labels = [];
            var min = 10000000;
            var max = 0;


            for (var index = 0; index < data2.length; index++) {
                var obj = data2[index];
                if (CurrentUser && obj.user_id == CurrentUser.user_id) {
                    chart_data.push(
                        parseInt(obj.followers)
                    );
                    if (obj.followers > max) {
                        max = obj.followers;
                    }

                    if (obj.followers < min) {
                        min = obj.followers;
                    }
                    labels.push(index);
                    if (parseInt(obj.followers) < minimum) {
                        minimum = parseInt(obj.followers);
                    }
                }
            }
            if (chart_data.length > 1) {
                $('#growth').html('You grown ' + max - min + ' followers using Instoo');
            }
            let config = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Instagram Followers',
                        backgroundColor: window.chartColors.red,
                        borderColor: window.chartColors.red,
                        data: chart_data,
                        fill: false,
                    }]
                },
                options: {
                    maintainAspectRatio: false,

                    responsive: true,
                    title: {
                        display: false,
                        text: 'Followers'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Hour'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Followers'
                            }
                        }]
                    }
                }
            };


            mode = "linkedin";
            gotAnalytics = false;


            version = chrome.runtime.getManifest().version;

            setTimeout(function() {

                if (CurrentUser && CurrentUser.username) {

                    $(".img-current-user").attr("src", CurrentUser.user_pic_url);
                    $(".img-current-user").show();

                }
            }, 240000);


            $('#version').attr('name', version);
            if (user_plan == "lifetime" || user_plan == "linkstories" || user_plan == "instoo2" || user_plan == "linkyear" || user_plan == "instoogold" || user_plan == "instooyearly" || user_plan == "instoopro" || user_plan == "instoogold2") {
                speed_limit = 300;

                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);


            }

           


            $('#my-btns .btn').on('click', function(event) {

                var val = $(this).find('input').val();
                if (val == "Fast") {
                    $("#fast").addClass('active');
                    $("#slow").removeClass('active');
                    $("#medium").removeClass('active');

                    if (paid_sub) {

                        SendMessage("SetSpeedLinkedin", "Speed", 1);

                    } else {
                        buySub();
                    }
                }

                if (val == "Slow") {
                    $("#slow").addClass('active');
                    $("#fast").removeClass('active');
                    $("#medium").removeClass('active');
                    SendMessage("SetSpeedLinkedin", "Speed", 8);


                }

                if (val == "Medium") {
                    $("#medium").addClass('active');
                    $("#slow").removeClass('active');
                    $("#fast").removeClass('active');
                    SendMessage("SetSpeedLinkedin", "Speed", 2);


                }

            });
            $('#media_accounts').tagsinput({
                trimValue: true
            });

            $('#media_tags').tagsinput({
                trimValue: true
            });
            $('#media_tags2').tagsinput({
                trimValue: true
            });

            $('#comment_tags').tagsinput({
                trimValue: true,
                delimiter: ']',
                confirmKeys: [13]
            });

            $('#location_tags').tagsinput({
                trimValue: true
            });

            SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


            $("#media_tags").on('itemAdded', function(event) {

                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(" ").join("%20").length > 0) {
                        SendMessage("AddTagToListLinkedin", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(" ").join("%20"));
                        global_tags.push(split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                    }
                }

                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#comment_tags").on('itemAdded', function(event) {


                var tagsinputWidth = 200; 
                var tagWidth = $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); 
                if (tagWidth > tagsinputWidth) {
                    var tagsText = event.item; 
                    var res = tagsText.substr(0, 5); 
                    $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags;

                SendMessage("AddCommentToListLinkedin", "TagName", tags);
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

                    SendMessage("RemoveTagFromListLinkedin", "TagName", split_tags[kk].split('#').join(''));
                    var index = global_tags.indexOf(split_tags[kk].split('#').join(''));
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#customRangeLinkedinFollows").change(function() {
                if (paid_sub === false) {
                    if (parseInt($("#customRangeLinkedinFollows").val()) > 1000) {
                        var input = document.getElementById("customRangeLinkedinFollows");
                        input.value = 1000;

                    }
                }

                var follow_Linkedin_speed = parseInt($("#customRangeLinkedinFollows").val());
                var like_Linkedin_speed = parseInt($("#customRange3").val());

                $("#follow_Linkedin_set").html("Follows/day: " + $("#customRangeLinkedinFollows").val());


                SendMessage("UpdateLinkedinFollowLimit", "limit", follow_Linkedin_speed);




            });


            $("#customRangeLinkedinLikes").change(function() {
                if (paid_sub == false) {
                    if (parseInt($("#customRangeLinkedinLikes").val()) > 1000) {
                        var input = document.getElementById("customRangeLinkedinLikes");
                        input.value = 1000;

                    }
                }


                var follow_Linkedin_speed = parseInt($("#customRange1").val());
                var like_Linkedin_speed = parseInt($("#customRangeLinkedinLikes").val());


                $("#like_Linkedin_set").html("Likes/day: " + $("#customRangeLinkedinLikes").val());

                SendMessage("UpdateLinkedinLikeLimit", "limit", like_Linkedin_speed);

            });

            SendMessage("RequestFollowStatus", "Num", DisplayFollowersNum);

            $("#export_linkedin").click(function() {
                var json = linkedin_data
                for (var kk = 0; kk < json.length; kk++) {
                    json[kk].html = "";
                }


                var fields = Object.keys(json)
                var replacer = function(key, value) {
                    return value === null ? '' : value
                }
                var csv = json.map(function(row) {
                    return fields.map(function(fieldName) {
                        return JSON.stringify(row[fieldName], replacer)
                    }).join(',')
                })
                csv.unshift(fields.join(',')) // add header column
                csv = csv.join('\r\n');
                SendMessage("DownloadJson", "url", linkedin_data);

            });
            $("#slow").click(function() {
                var user_plan = $("#plan").attr("name");

                SendMessage("SetSpeedLinkedin", "Num", 3);
                $("#slow").addClass('active');
                $("#fast").removeClass('active');
                $("#medium").removeClass('active');

            });
            $("#medium").click(function() {
                var user_plan = $("#plan").attr("name");




                SendMessage("SetSpeedLinkedin", "Num", 2);
                $("#medium").addClass('active');
                $("#slow").removeClass('active');
                $("#fast").removeClass('active');

            });
            $("#fast").click(function() {
                var user_plan = $("#plan").attr("name");

                SendMessage("SetSpeedLinkedin", "Num", 1);



                $("#fast").addClass('active');
                $("#slow").removeClass('active');
                $("#medium").removeClass('active');

            });

            $("#set-follow-Linkedin-check").click(function() {
                SendMessage("SetFollowLinkedin", "Value", $(this).is(':checked'));

            });
            $("#set-like-Linkedin-check").click(function() {
                SendMessage("SetLikeLinkedin", "Value", $(this).is(':checked'));

            });
            $("#set-follow-check").click(function() {
                $("#set-unfollow-check").prop("checked", false);
                SetUnfollowValue(false);
                SetFollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }
            });
            $("#set-like-check").click(function() {

                SetLikeValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            $("#set-Linkedin-check").click(function() {
                SetLinkedinValue($(this).is(':checked'));
                $("#errors").html("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button> To automate Linkedin, open Linkedin.com in a new tab, then log in. Instoo will use your hashtags to like/follow automatically, so add some hashtags.<br> Linkedin is growing 2x faster than Instagram, so it's a useful platform to crosspromote both. Simply add a link to your Instagram in Linkedin bios/videos, or add Linkedin links in Instagram. Let us know how this new feature works for you! :)<br></div>");

            });

            $("#set-story-check").click(function() {
                SetStoryValue($(this).is(':checked'));


                if ($(this).is(':checked') != true) {
                    $("#set-like-check").prop("checked", false);
                    SetLikeValue(false);
                    $("#set-follow-check").prop("checked", false);
                    SetFollowValue(false);

                    $("#set-unfollow-check").prop("checked", false);
                    SetUnfollowValue(false);
                    $("#set-comment-check").prop("checked", false);
                    SetCommentValue(false);
                }

            });
            $("#set-comment-check").click(function() {
                SetCommentValue($(this).is(':checked'));

                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", status.StartLike);
                }

            });
            $(document).on('click', '.remove-user-collect', function() {
                RemoveCollectJobUser(this);

            });
            $(document).on('click', '.remove-tag-collect', function() {
                RemoveCollectJobTagLinkedin(this);
            });
            $(document).on('click', '.remove-location-collect', function() {
                RemoveLocationJobTag(this);
            });
            $(document).on('click', '.remove-comment-collect', function() {

                $(this).closest("tr").remove();
                SendMessage("RemoveCommentFromList", "TagName", $(this).attr("user_id"));
                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
            });




            $("#set-unfollow-check").click(function() {
                $("#set-follow-check").prop("checked", false);
                SetFollowValue(false);

                SetUnfollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            SetActiveSidebarItem("#sidebar-home");


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
            $("#comment_set").html("DMs/day: " + maxComments);

            //getFollowers();

            SetActiveSidebarItem("#sidebar-home-link2");

        });
    });


    $("#sidebar-home-tiktok").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("tiktok.html", function() {

            dashboardMode = 1;

            var data2 = [];
            if ($("#data2").attr("name") && $("#data2").attr("name").length > 2) {
                data2 = [];
            }
            var chart_data = null;
            chart_data = [];
            var minimum = 10000;
            var labels = [];
            var min = 10000000;
            var max = 0;


            for (var index = 0; index < data2.length; index++) {
                var obj = data2[index];
                if (CurrentUser && obj.user_id == CurrentUser.user_id) {
                    chart_data.push(
                        parseInt(obj.followers)
                    );
                    if (obj.followers > max) {
                        max = obj.followers;
                    }

                    if (obj.followers < min) {
                        min = obj.followers;
                    }
                    labels.push(index);
                    if (parseInt(obj.followers) < minimum) {
                        minimum = parseInt(obj.followers);
                    }
                }
            }
            if (chart_data.length > 1) {
                $('#growth').html('You grown ' + max - min + ' followers using Instoo');
            }
            let config = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Instagram Followers',
                        backgroundColor: window.chartColors.red,
                        borderColor: window.chartColors.red,
                        data: chart_data,
                        fill: false,
                    }]
                },
                options: {
                    maintainAspectRatio: false,

                    responsive: true,
                    title: {
                        display: false,
                        text: 'Followers'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Hour'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Followers'
                            }
                        }]
                    }
                }
            };


            mode = "tiktok";
            gotAnalytics = false;


            version = chrome.runtime.getManifest().version;

            setTimeout(function() {


                if (CurrentUser && CurrentUser.username) {

                    $(".img-current-user").attr("src", CurrentUser.user_pic_url);
                    $(".img-current-user").show();

                }
            }, 240000);


            $('#version').attr('name', version);
            if (user_plan == "lifetime" || user_plan == "linkstories" || user_plan == "instoo2" || user_plan == "linkyear" || user_plan == "instoogold" || user_plan == "instooyearly" || user_plan == "instoopro" || user_plan == "instoogold2") {
                speed_limit = 300;

                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);


            }

            $('#media_accounts').tagsinput({
                trimValue: true
            });

            $('#media_tags').tagsinput({
                trimValue: true
            });
            $('#media_tags2').tagsinput({
                trimValue: true
            });

            $('#comment_tags').tagsinput({
                trimValue: true,
                delimiter: ']',
                confirmKeys: [13]
            });

            $('#location_tags').tagsinput({
                trimValue: true
            });



            $('#my-btns .btn').on('click', function(event) {

                var val = $(this).find('input').val();
                if (val == "Fast") {
                    $("#fast").addClass('active');
                    $("#slow").removeClass('active');
                    $("#medium").removeClass('active');

                    if (paid_sub) {

                        SendMessage("SetSpeedTikTok", "Speed", 1);

                    } else {
                        buySub();
                    }
                }

                if (val == "Slow") {
                    $("#slow").addClass('active');
                    $("#fast").removeClass('active');
                    $("#medium").removeClass('active');
                    SendMessage("SetSpeedTikTok", "Speed", 8);


                }

                if (val == "Medium") {
                    $("#medium").addClass('active');
                    $("#slow").removeClass('active');
                    $("#fast").removeClass('active');
                    SendMessage("SetSpeedTikTok", "Speed", 2);


                }

            });

            SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


            $("#media_tags").on('itemAdded', function(event) {

                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(' ').join('').length > 0) {
                        SendMessage("AddTagToListTikTok", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
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
                    $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags;

                SendMessage("AddCommentToListTikTok", "TagName", tags);

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

                    SendMessage("RemoveTagFromListTikTok", "TagName", split_tags[kk].split('#').join(''));
                    var index = global_tags.indexOf(split_tags[kk].split('#').join(''));
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#customRangeTikTokFollows").change(function() {
                if (paid_sub === false) {
                    if (parseInt($("#customRangeTikTokFollows").val()) > 1000) {
                        var input = document.getElementById("customRangeTikTokFollows");
                        input.value = 1000;

                    }
                }

                var follow_tiktok_speed = parseInt($("#customRangeTikTokFollows").val());
                var like_tiktok_speed = parseInt($("#customRange3").val());

                $("#follow_tiktok_set").html("Follows/day: " + $("#customRangeTikTokFollows").val());


                SendMessage("UpdateTikTokFollowLimit", "limit", follow_tiktok_speed);




            });


            $("#customRangeTikTokLikes").change(function() {
                if (paid_sub == false) {
                    if (parseInt($("#customRangeTikTokLikes").val()) > 1000) {
                        var input = document.getElementById("customRangeTikTokLikes");
                        input.value = 1000;

                    }
                }


                var follow_tiktok_speed = parseInt($("#customRange1").val());
                var like_tiktok_speed = parseInt($("#customRangeTikTokLikes").val());


                $("#like_tiktok_set").html("Likes/day: " + $("#customRangeTikTokLikes").val());

                SendMessage("UpdateTikTokLikeLimit", "limit", like_tiktok_speed);

            });

            SendMessage("RequestFollowStatus", "Num", DisplayFollowersNum);
            $("#slow").click(function() {
                var user_plan = $("#plan").attr("name");

                SendMessage("SetSpeedTikTok", "Num", 3);
                $("#slow").addClass('active');
                $("#fast").removeClass('active');
                $("#medium").removeClass('active');

            });
            $("#medium").click(function() {
                var user_plan = $("#plan").attr("name");




                SendMessage("SetSpeedTikTok", "Num", 2);
                $("#medium").addClass('active');
                $("#slow").removeClass('active');
                $("#fast").removeClass('active');

            });
            $("#fast").click(function() {
                var user_plan = $("#plan").attr("name");

                SendMessage("SetSpeedTikTok", "Num", 1);



                $("#fast").addClass('active');
                $("#slow").removeClass('active');
                $("#medium").removeClass('active');

            });

            $("#set-follow-tiktok-check").click(function() {
                SendMessage("SetFollowTikTok", "Value", $(this).is(':checked'));

            });
            $("#set-like-tiktok-check").click(function() {
                SendMessage("SetLikeTikTok", "Value", $(this).is(':checked'));

            });
            $("#set-follow-check").click(function() {
                $("#set-unfollow-check").prop("checked", false);
                SetUnfollowValue(false);
                SetFollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }
            });
            $("#set-like-check").click(function() {

                SetLikeValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            $("#set-tiktok-check").click(function() {
                SetTikTokValue($(this).is(':checked'));
                $("#errors").html("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button> To automate TikTok, open tiktok.com in a new tab, then log in. Instoo will use your hashtags to like/follow automatically, so add some hashtags.<br> Tiktok is growing 2x faster than Instagram, so it's a useful platform to crosspromote both. Simply add a link to your Instagram in Tiktok bios/videos, or add TikTok links in Instagram. Let us know how this new feature works for you! :)<br></div>");

            });

            $("#set-story-check").click(function() {
                SetStoryValue($(this).is(':checked'));


                if ($(this).is(':checked') != true) {
                    $("#set-like-check").prop("checked", false);
                    SetLikeValue(false);
                    $("#set-follow-check").prop("checked", false);
                    SetFollowValue(false);

                    $("#set-unfollow-check").prop("checked", false);
                    SetUnfollowValue(false);
                    $("#set-comment-check").prop("checked", false);
                    SetCommentValue(false);
                }

            });
            $("#set-comment-check").click(function() {
                SetCommentValue($(this).is(':checked'));

                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", status.StartLike);
                }

            });
            $(document).on('click', '.remove-user-collect', function() {
                RemoveCollectJobUser(this);

            });
            $(document).on('click', '.remove-tag-collect', function() {
                RemoveCollectJobTagTikTok(this);
            });
            $(document).on('click', '.remove-location-collect', function() {
                RemoveLocationJobTag(this);
            });
            $(document).on('click', '.remove-comment-collect', function() {

                $(this).closest("tr").remove();
                SendMessage("RemoveCommentFromList", "TagName", $(this).attr("user_id"));
                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
            });




            $("#set-unfollow-check").click(function() {
                $("#set-follow-check").prop("checked", false);
                SetFollowValue(false);

                SetUnfollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            SetActiveSidebarItem("#sidebar-home");


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
            $("#comment_set").html("DMs/day: " + maxComments);


            SetActiveSidebarItem("#sidebar-home-tiktok");

        });
    });

    $("#sidebar-home-facebook").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("facebook.html", function() {

            dashboardMode = 7;

            var data2 = [];
            if ($("#data2").attr("name") && $("#data2").attr("name").length > 2) {
                data2 = [];
            }
            var chart_data = null;
            chart_data = [];
            var minimum = 10000;
            var labels = [];
            var min = 10000000;
            var max = 0;


            for (var index = 0; index < data2.length; index++) {
                var obj = data2[index];
                if (CurrentUser && obj.user_id == CurrentUser.user_id) {
                    chart_data.push(
                        parseInt(obj.followers)
                    );
                    if (obj.followers > max) {
                        max = obj.followers;
                    }

                    if (obj.followers < min) {
                        min = obj.followers;
                    }
                    labels.push(index);
                    if (parseInt(obj.followers) < minimum) {
                        minimum = parseInt(obj.followers);
                    }
                }
            }
            if (chart_data.length > 1) {
                $('#growth').html('You grown ' + max - min + ' followers using Instoo');
            }
            let config = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Instagram Followers',
                        backgroundColor: window.chartColors.red,
                        borderColor: window.chartColors.red,
                        data: chart_data,
                        fill: false,
                    }]
                },
                options: {
                    maintainAspectRatio: false,

                    responsive: true,
                    title: {
                        display: false,
                        text: 'Followers'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Hour'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Followers'
                            }
                        }]
                    }
                }
            };

           

            mode = "facebook";
            gotAnalytics = false;


            version = chrome.runtime.getManifest().version;

            setTimeout(function() {
             


                if (CurrentUser && CurrentUser.username) {

                    $(".img-current-user").attr("src", CurrentUser.user_pic_url);
                    $(".img-current-user").show();

                }
            }, 240000);


            $('#version').attr('name', version);
            if (user_plan == "lifetime" || user_plan == "linkstories" || user_plan == "instoo2" || user_plan == "linkyear" || user_plan == "instoogold" || user_plan == "instooyearly" || user_plan == "instoopro" || user_plan == "instoogold2") {
                speed_limit = 300;

                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);


            }

            $('#media_accounts').tagsinput({
                trimValue: true
            });

            $('#media_tags').tagsinput({
                trimValue: true
            });
            $('#media_tags2').tagsinput({
                trimValue: true
            });

            $('#comment_tags').tagsinput({
                trimValue: true,
                delimiter: ']',
                confirmKeys: [13]
            });

            $('#location_tags').tagsinput({
                trimValue: true
            });



            $('#my-btns .btn').on('click', function(event) {

                var val = $(this).find('input').val();
                if (val == "Fast") {
                    $("#fast").addClass('active');
                    $("#slow").removeClass('active');
                    $("#medium").removeClass('active');

                    if (paid_sub) {

                        SendMessage("SetSpeedfacebook", "Speed", 1);

                    } else {
                        buySub();
                    }
                }

                if (val == "Slow") {
                    $("#slow").addClass('active');
                    $("#fast").removeClass('active');
                    $("#medium").removeClass('active');
                    SendMessage("SetSpeedfacebook", "Speed", 8);


                }

                if (val == "Medium") {
                    $("#medium").addClass('active');
                    $("#slow").removeClass('active');
                    $("#fast").removeClass('active');
                    SendMessage("SetSpeedfacebook", "Speed", 2);


                }

            });

            SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


            $("#media_tags").on('itemAdded', function(event) {

                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(' ').join('').length > 0) {
                        SendMessage("AddTagToListfacebook", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                        global_tags.push(split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                    }
                }

                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#media_accounts").on('itemAdded', function(event) {
                console.log("CODES THAT RUS 2");

                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#media_accounts').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#media_accounts').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(' ').join('').length > 0) {
                        SendMessage("AddAccountToListfacebook", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
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
                    $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags;

                SendMessage("AddCommentToListfacebook", "TagName", tags);

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

                    SendMessage("RemoveTagFromListfacebook", "TagName", split_tags[kk].split('#').join(''));
                    var index = global_tags.indexOf(split_tags[kk].split('#').join(''));
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#customRangefacebookFollows").change(function() {
                if (paid_sub === false) {
                    if (parseInt($("#customRangefacebookFollows").val()) > 1000) {
                        var input = document.getElementById("customRangefacebookFollows");
                        input.value = 1000;

                    }
                }

                var follow_facebook_speed = parseInt($("#customRangefacebookFollows").val());
                var like_facebook_speed = parseInt($("#customRange3").val());

                $("#follow_facebook_set").html("Friends/day: " + $("#customRangefacebookFollows").val());


                SendMessage("UpdatefacebookFollowLimit", "limit", follow_facebook_speed);




            });


            $("#customRangefacebookLikes").change(function() {
                if (paid_sub == false) {
                    if (parseInt($("#customRangefacebookLikes").val()) > 1000) {
                        var input = document.getElementById("customRangefacebookLikes");
                        input.value = 1000;

                    }
                }


                var follow_facebook_speed = parseInt($("#customRange1").val());
                var like_facebook_speed = parseInt($("#customRangefacebookLikes").val());


                $("#like_facebook_set").html("Likes/day: " + $("#customRangefacebookLikes").val());

                SendMessage("UpdatefacebookLikeLimit", "limit", like_facebook_speed);

            });

            SendMessage("RequestFollowStatus", "Num", DisplayFollowersNum);
            $("#slow").click(function() {
                var user_plan = $("#plan").attr("name");

                SendMessage("SetSpeedfacebook", "Num", 3);
                $("#slow").addClass('active');
                $("#fast").removeClass('active');
                $("#medium").removeClass('active');

            });
            $("#medium").click(function() {
                var user_plan = $("#plan").attr("name");




                SendMessage("SetSpeedfacebook", "Num", 2);
                $("#medium").addClass('active');
                $("#slow").removeClass('active');
                $("#fast").removeClass('active');

            });
            $("#fast").click(function() {
                var user_plan = $("#plan").attr("name");

                SendMessage("SetSpeedfacebook", "Num", 1);



                $("#fast").addClass('active');
                $("#slow").removeClass('active');
                $("#medium").removeClass('active');

            });

            $("#set-follow-facebook-check").click(function() {
                SendMessage("SetFollowfacebook", "Value", $(this).is(':checked'));

            });
            $("#set-like-facebook-check").click(function() {
                SendMessage("SetLikefacebook", "Value", $(this).is(':checked'));

            });
            $("#set-follow-check").click(function() {
                $("#set-unfollow-check").prop("checked", false);
                SetUnfollowValue(false);
                SetFollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }
            });
            $("#set-like-check").click(function() {

                SetLikeValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            $("#set-facebook-check").click(function() {
                SetfacebookValue($(this).is(':checked'));
                $("#errors").html("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button> To automate facebook, open facebook.com in a new tab, then log in. Instoo will use your hashtags to like/follow automatically, so add some hashtags.<br> facebook is growing 2x faster than Instagram, so it's a useful platform to crosspromote both. Simply add a link to your Instagram in facebook bios/videos, or add facebook links in Instagram. Let us know how this new feature works for you! :)<br></div>");

            });

            $("#set-story-check").click(function() {
                SetStoryValue($(this).is(':checked'));


                if ($(this).is(':checked') != true) {
                    $("#set-like-check").prop("checked", false);
                    SetLikeValue(false);
                    $("#set-follow-check").prop("checked", false);
                    SetFollowValue(false);

                    $("#set-unfollow-check").prop("checked", false);
                    SetUnfollowValue(false);
                    $("#set-comment-check").prop("checked", false);
                    SetCommentValue(false);
                }

            });
            $("#set-comment-check").click(function() {
                SetCommentValue($(this).is(':checked'));

                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", status.StartLike);
                }

            });
            $(document).on('click', '.remove-user-collect', function() {
                RemoveCollectJobUser(this);

            });
            $(document).on('click', '.remove-tag-collect', function() {
                RemoveCollectJobTagfacebook(this);
            });
            $(document).on('click', '.remove-location-collect', function() {
                RemoveLocationJobTag(this);
            });
            $(document).on('click', '.remove-comment-collect', function() {

                $(this).closest("tr").remove();
                SendMessage("RemoveCommentFromList", "TagName", $(this).attr("user_id"));
                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
            });




            $("#set-unfollow-check").click(function() {
                $("#set-follow-check").prop("checked", false);
                SetFollowValue(false);

                SetUnfollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            SetActiveSidebarItem("#sidebar-home");


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
            $("#comment_set").html("DMs/day: " + maxComments);

            //getFollowers();

            SetActiveSidebarItem("#sidebar-home-facebook");

        });
    });


    $("#sidebar-home-pinterest").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("pinterest.html", function() {

            dashboardMode = 6;

            var data2 = [];
            if ($("#data2").attr("name") && $("#data2").attr("name").length > 2) {
                data2 = [];
            }
            var chart_data = null;
            chart_data = [];
            var minimum = 10000;
            var labels = [];
            var min = 10000000;
            var max = 0;


            for (var index = 0; index < data2.length; index++) {
                var obj = data2[index];
                if (CurrentUser && obj.user_id == CurrentUser.user_id) {
                    chart_data.push(
                        parseInt(obj.followers)
                    );
                    if (obj.followers > max) {
                        max = obj.followers;
                    }

                    if (obj.followers < min) {
                        min = obj.followers;
                    }
                    labels.push(index);
                    if (parseInt(obj.followers) < minimum) {
                        minimum = parseInt(obj.followers);
                    }
                }
            }
            if (chart_data.length > 1) {
                $('#growth').html('You grown ' + max - min + ' followers using Instoo');
            }
            let config = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Instagram Followers',
                        backgroundColor: window.chartColors.red,
                        borderColor: window.chartColors.red,
                        data: chart_data,
                        fill: false,
                    }]
                },
                options: {
                    maintainAspectRatio: false,

                    responsive: true,
                    title: {
                        display: false,
                        text: 'Followers'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Hour'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Followers'
                            }
                        }]
                    }
                }
            };

            mode = "pinterest";
            gotAnalytics = false;


            version = chrome.runtime.getManifest().version;

            setTimeout(function() {


                if (CurrentUser && CurrentUser.username) {

                    $(".img-current-user").attr("src", CurrentUser.user_pic_url);
                    $(".img-current-user").show();

                }
            }, 240000);


            $('#version').attr('name', version);
            if (user_plan == "lifetime" || user_plan == "linkstories" || user_plan == "instoo2" || user_plan == "linkyear" || user_plan == "instoogold" || user_plan == "instooyearly" || user_plan == "instoopro" || user_plan == "instoogold2") {
                speed_limit = 300;

                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);


            }

            $('#media_accounts').tagsinput({
                trimValue: true
            });

            $('#media_tags').tagsinput({
                trimValue: true
            });
            $('#media_tags2').tagsinput({
                trimValue: true
            });

            $('#comment_tags').tagsinput({
                trimValue: true,
                delimiter: ']',
                confirmKeys: [13]
            });

            $('#location_tags').tagsinput({
                trimValue: true
            });



            $('#my-btns .btn').on('click', function(event) {

                var val = $(this).find('input').val();
                if (val == "Fast") {
                    $("#fast").addClass('active');
                    $("#slow").removeClass('active');
                    $("#medium").removeClass('active');

                    if (paid_sub) {

                        SendMessage("SetSpeedPinterest", "Speed", 1);

                    } else {
                        buySub();
                    }
                }

                if (val == "Slow") {
                    $("#slow").addClass('active');
                    $("#fast").removeClass('active');
                    $("#medium").removeClass('active');
                    SendMessage("SetSpeedPinterest", "Speed", 8);


                }

                if (val == "Medium") {
                    $("#medium").addClass('active');
                    $("#slow").removeClass('active');
                    $("#fast").removeClass('active');
                    SendMessage("SetSpeedPinterest", "Speed", 2);


                }

            });

            SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


            $("#media_tags").on('itemAdded', function(event) {

                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(' ').join('').length > 0) {
                        SendMessage("AddTagToListPinterest", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
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
                    $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags;

                SendMessage("AddCommentToListPinterest", "TagName", tags);
       

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

                    SendMessage("RemoveTagFromListPinterest", "TagName", split_tags[kk].split('#').join(''));
                    var index = global_tags.indexOf(split_tags[kk].split('#').join(''));
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#customRangePinterestFollows").change(function() {
                if (paid_sub === false) {
                    if (parseInt($("#customRangePinterestFollows").val()) > 1000) {
                        var input = document.getElementById("customRangePinterestFollows");
                        input.value = 1000;

                    }
                }

                var follow_pinterest_speed = parseInt($("#customRangePinterestFollows").val());
                var like_pinterest_speed = parseInt($("#customRange3").val());

                $("#follow_pinterest_set").html("Follows/day: " + $("#customRangePinterestFollows").val());


                SendMessage("UpdatePinterestFollowLimit", "limit", follow_pinterest_speed);




            });


            $("#customRangePinterestLikes").change(function() {
                if (paid_sub == false) {
                    if (parseInt($("#customRangePinterestLikes").val()) > 1000) {
                        var input = document.getElementById("customRangePinterestLikes");
                        input.value = 1000;

                    }
                }


                var follow_pinterest_speed = parseInt($("#customRange1").val());
                var like_pinterest_speed = parseInt($("#customRangePinterestLikes").val());


                $("#like_pinterest_set").html("Likes/day: " + $("#customRangePinterestLikes").val());

                SendMessage("UpdatePinterestLikeLimit", "limit", like_pinterest_speed);

            });

            SendMessage("RequestFollowStatus", "Num", DisplayFollowersNum);
            $("#slow").click(function() {
                var user_plan = $("#plan").attr("name");

                SendMessage("SetSpeedPinterest", "Num", 3);
                $("#slow").addClass('active');
                $("#fast").removeClass('active');
                $("#medium").removeClass('active');

            });
            $("#medium").click(function() {
                var user_plan = $("#plan").attr("name");




                SendMessage("SetSpeedPinterest", "Num", 2);
                $("#medium").addClass('active');
                $("#slow").removeClass('active');
                $("#fast").removeClass('active');

            });
            $("#fast").click(function() {
                var user_plan = $("#plan").attr("name");

                SendMessage("SetSpeedPinterest", "Num", 1);



                $("#fast").addClass('active');
                $("#slow").removeClass('active');
                $("#medium").removeClass('active');

            });

            $("#set-follow-pinterest-check").click(function() {
                SendMessage("SetFollowPinterest", "Value", $(this).is(':checked'));

            });
            $("#set-like-pinterest-check").click(function() {
                SendMessage("SetLikePinterest", "Value", $(this).is(':checked'));

            });
            $("#set-follow-check").click(function() {
                $("#set-unfollow-check").prop("checked", false);
                SetUnfollowValue(false);
                SetFollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }
            });
            $("#set-like-check").click(function() {

                SetLikeValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });



            $("#set-story-check").click(function() {
                SetStoryValue($(this).is(':checked'));


                if ($(this).is(':checked') != true) {
                    $("#set-like-check").prop("checked", false);
                    SetLikeValue(false);
                    $("#set-follow-check").prop("checked", false);
                    SetFollowValue(false);

                    $("#set-unfollow-check").prop("checked", false);
                    SetUnfollowValue(false);
                    $("#set-comment-check").prop("checked", false);
                    SetCommentValue(false);
                }

            });
            $("#set-comment-check").click(function() {
                SetCommentValue($(this).is(':checked'));

                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", status.StartLike);
                }

            });
            $(document).on('click', '.remove-user-collect', function() {
                RemoveCollectJobUser(this);

            });
            $(document).on('click', '.remove-tag-collect', function() {
                RemoveCollectJobTagPinterest(this);
            });
            $(document).on('click', '.remove-location-collect', function() {
                RemoveLocationJobTag(this);
            });
            $(document).on('click', '.remove-comment-collect', function() {

                $(this).closest("tr").remove();
                SendMessage("RemoveCommentFromList", "TagName", $(this).attr("user_id"));
                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
            });




            $("#set-unfollow-check").click(function() {
                $("#set-follow-check").prop("checked", false);
                SetFollowValue(false);

                SetUnfollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            SetActiveSidebarItem("#sidebar-home");


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
            $("#comment_set").html("DMs/day: " + maxComments);

            //getFollowers();

            SetActiveSidebarItem("#sidebar-home-pinterest");

        });
    });



    $("#sidebar-home-tw").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("twitter.html", function() {

            dashboardMode = 2;

            var data2 = [];
            if ($("#data2").attr("name") && $("#data2").attr("name").length > 2) {
                data2 = [];
            }
            var chart_data = null;
            chart_data = [];
            var minimum = 10000;
            var labels = [];
            var min = 10000000;
            var max = 0;


            for (var index = 0; index < data2.length; index++) {
                var obj = data2[index];
                if (CurrentUser && obj.user_id == CurrentUser.user_id) {
                    chart_data.push(
                        parseInt(obj.followers)
                    );
                    if (obj.followers > max) {
                        max = obj.followers;
                    }

                    if (obj.followers < min) {
                        min = obj.followers;
                    }
                    labels.push(index);
                    if (parseInt(obj.followers) < minimum) {
                        minimum = parseInt(obj.followers);
                    }
                }
            }
            if (chart_data.length > 1) {
                $('#growth').html('You grown ' + max - min + ' followers using Instoo');
            }
            let config = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Instagram Followers',
                        backgroundColor: window.chartColors.red,
                        borderColor: window.chartColors.red,
                        data: chart_data,
                        fill: false,
                    }]
                },
                options: {
                    maintainAspectRatio: false,

                    responsive: true,
                    title: {
                        display: false,
                        text: 'Followers'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Hour'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Followers'
                            }
                        }]
                    }
                }
            };


            mode = "twitter";
            gotAnalytics = false;


            version = chrome.runtime.getManifest().version;

            setTimeout(function() {

                if (CurrentUser && CurrentUser.username) {

                    $(".img-current-user").attr("src", CurrentUser.user_pic_url);
                    $(".img-current-user").show();

                }
            }, 240000);


            $('#version').attr('name', version);
            if (user_plan == "lifetime" || user_plan == "linkstories" || user_plan == "instoo2" || user_plan == "linkyear" || user_plan == "instoogold" || user_plan == "instooyearly" || user_plan == "instoopro" || user_plan == "instoogold2") {
                speed_limit = 300;

                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);


            }

            $('#media_accounts').tagsinput({
                trimValue: true
            });

            $('#media_tags').tagsinput({
                trimValue: true
            });
            $('#media_tags2').tagsinput({
                trimValue: true
            });

            $('#comment_tags').tagsinput({
                trimValue: true,
                delimiter: ']',
                confirmKeys: [13]
            });

            $('#location_tags').tagsinput({
                trimValue: true
            });



            $('#my-btns .btn').on('click', function(event) {

                var val = $(this).find('input').val();
                if (val == "Fast") {
                    $("#fast").addClass('active');
                    $("#slow").removeClass('active');
                    $("#medium").removeClass('active');

                    if (paid_sub) {

                        SendMessage("SetSpeedTwitter", "Speed", 1);

                    } else {
                        buySub();
                    }
                }

                if (val == "Slow") {
                    $("#slow").addClass('active');
                    $("#fast").removeClass('active');
                    $("#medium").removeClass('active');
                    SendMessage("SetSpeedTwitter", "Speed", 8);


                }

                if (val == "Medium") {
                    $("#medium").addClass('active');
                    $("#slow").removeClass('active');
                    $("#fast").removeClass('active');
                    SendMessage("SetSpeedTwitter", "Speed", 2);


                }

            });

            SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


            $("#media_tags").on('itemAdded', function(event) {

                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(' ').join('%20').length > 0) {
                        SendMessage("AddTagToListTwitter", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(' ').join('%20'));
                        global_tags.push(split_tags[kk].split('#').join('').split(',').join('').split(' ').join('%20'));
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
                    $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags;

                SendMessage("AddCommentToListTwitter", "TagName", tags);


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

                    SendMessage("RemoveTagFromListTwitter", "TagName", split_tags[kk].split('#').join(''));
                    var index = global_tags.indexOf(split_tags[kk].split('#').join(''));
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#customRangeTwitterFollows").change(function() {
                if (paid_sub === false) {
                    if (parseInt($("#customRangeTwitterFollows").val()) > 1000) {
                        var input = document.getElementById("customRangeTwitterFollows");
                        input.value = 1000;

                    }
                }

                var follow_Twitter_speed = parseInt($("#customRangeTwitterFollows").val());
                var like_Twitter_speed = parseInt($("#customRange3").val());

                $("#follow_Twitter_set").html("Retweets/day: " + $("#customRangeTwitterFollows").val());


                SendMessage("UpdateTwitterFollowLimit", "limit", follow_Twitter_speed);




            });


            $("#customRangeTwitterLikes").change(function() {
                if (paid_sub == false) {
                    if (parseInt($("#customRangeTwitterLikes").val()) > 1000) {
                        var input = document.getElementById("customRangeTwitterLikes");
                        input.value = 1000;

                    }
                }


                var follow_Twitter_speed = parseInt($("#customRange1").val());
                var like_Twitter_speed = parseInt($("#customRangeTwitterLikes").val());


                $("#like_Twitter_set").html("Likes/day: " + $("#customRangeTwitterLikes").val());

                SendMessage("UpdateTwitterLikeLimit", "limit", like_Twitter_speed);

            });

            SendMessage("RequestFollowStatus", "Num", DisplayFollowersNum);
            $("#slow").click(function() {
                var user_plan = $("#plan").attr("name");

                SendMessage("SetSpeedTwitter", "Num", 3);
                $("#slow").addClass('active');
                $("#fast").removeClass('active');
                $("#medium").removeClass('active');

            });
            $("#medium").click(function() {
                var user_plan = $("#plan").attr("name");




                SendMessage("SetSpeedTwitter", "Num", 2);
                $("#medium").addClass('active');
                $("#slow").removeClass('active');
                $("#fast").removeClass('active');

            });
            $("#fast").click(function() {
                var user_plan = $("#plan").attr("name");

                SendMessage("SetSpeedTwitter", "Num", 1);



                $("#fast").addClass('active');
                $("#slow").removeClass('active');
                $("#medium").removeClass('active');

            });

            $("#set-follow-twitter-check").click(function() {
                SendMessage("SetFollowTwitter", "Value", $(this).is(':checked'));
                ////////////console.log();

            });
            $("#set-like-twitter-check").click(function() {
                SendMessage("SetLikeTwitter", "Value", $(this).is(':checked'));

            });
            $("#set-follow-check").click(function() {
                $("#set-unfollow-check").prop("checked", false);
                SetUnfollowValue(false);
                SetFollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }
            });
            $("#set-like-check").click(function() {

                SetLikeValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            $("#set-twitter-check").click(function() {
                SetTwitterValue($(this).is(':checked'));
                $("#errors").html("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button> To automate Twitter, open Twitter.com in a new tab, then log in. Instoo will use your hashtags to like/follow automatically, so add some hashtags.<br> Twitter is growing 2x faster than Instagram, so it's a useful platform to crosspromote both. Simply add a link to your Instagram in Twitter bios/videos, or add Twitter links in Instagram. Let us know how this new feature works for you! :)<br></div>");

            });

            $("#set-story-check").click(function() {
                SetStoryValue($(this).is(':checked'));


                if ($(this).is(':checked') != true) {
                    $("#set-like-check").prop("checked", false);
                    SetLikeValue(false);
                    $("#set-follow-check").prop("checked", false);
                    SetFollowValue(false);

                    $("#set-unfollow-check").prop("checked", false);
                    SetUnfollowValue(false);
                    $("#set-comment-check").prop("checked", false);
                    SetCommentValue(false);
                }

            });
            $("#set-comment-check").click(function() {
                SetCommentValue($(this).is(':checked'));

                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", status.StartLike);
                }

            });
            $(document).on('click', '.remove-user-collect', function() {
                RemoveCollectJobUser(this);

            });
            $(document).on('click', '.remove-tag-collect', function() {
                RemoveCollectJobTagTwitter(this);
            });
            $(document).on('click', '.remove-location-collect', function() {
                RemoveLocationJobTag(this);
            });
            $(document).on('click', '.remove-comment-collect', function() {

                $(this).closest("tr").remove();
                SendMessage("RemoveCommentFromList", "TagName", $(this).attr("user_id"));
                //  var index = global_tags.indexOf(user_id);
                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
                //  SendMessage("RemoveCommentFromList", "TagName", );
            });




            $("#set-unfollow-check").click(function() {
                $("#set-follow-check").prop("checked", false);
                SetFollowValue(false);

                SetUnfollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            SetActiveSidebarItem("#sidebar-home");


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
            $("#comment_set").html("DMs/day: " + maxComments);


            SetActiveSidebarItem("#sidebar-home-tw");

        });
    });
    $("#sidebar-home").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("home.html", function() {


            dashboardMode = 0;

            $("#tiktoksettings").hide();


            mode = "instagram";
            var data2 = user_stats;
            console.log(data2);
            var chart_data = null;
            chart_data = [];
            follower_data = data2;
            var min = 10000000;
            var max = 0;
            var counter = 0;
            if (started) {
                var minimum = 10000;
                var labels = [];
                for (var index = data2.length - 1; index > data2.length - 100; index--) {
                    if (index >= 0) {
                        var obj = data2[index];
                        if (CurrentUser && obj.user_id == CurrentUser.user_id && (chart_data.length < 2 || Math.abs(parseInt(obj.followers) - chart_data[chart_data.length - 1]) < 200)) {
                            chart_data.push(
                                parseInt(obj.followers)
                            );
                            if (obj.followers > max) {
                                max = obj.followers;
                            }

                            if (obj.followers < min) {
                                min = obj.followers;
                            }
                            labels.push(counter);
                            counter++;
                            if (parseInt(obj.followers) < minimum) {
                                minimum = parseInt(obj.followers);
                            }
                        }
                    }
                }
                chart_data.reverse();

                if (chart_data.length > 1) {
                    $('#growth').html(max - min);
                    if (max - min > 100) {
                    }
                }
                let config = {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Instagram Followers',
                            backgroundColor: window.chartColors.red,
                            borderColor: window.chartColors.red,
                            data: chart_data,
                            fill: false,
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,

                        responsive: true,
                        title: {
                            display: false,
                            text: 'Followers'
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false,
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Hour'
                                }
                            }],
                            yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Folowers'
                                }
                            }]
                        }
                    }
                };

                let ctx = document.getElementById('canvas').getContext('2d');
                ctx.height = 250;

                let myLine = new Chart(ctx, config);
            }
            gotAnalytics = false;

            version = chrome.runtime.getManifest().version;

            setTimeout(function() {

                if (CurrentUser && CurrentUser.username) {

                    $(".img-current-user").attr("src", CurrentUser.user_pic_url);
                    $(".img-current-user").show();

                }
            }, 240000);


            $('#version').attr('name', version);
            if (user_plan == "lifetime" || user_plan == "linkstories" || user_plan == "instoo2" || user_plan == "linkyear" || user_plan == "instoogold" || user_plan == "instooyearly" || user_plan == "instoopro" || user_plan == "instoogold2") {
                speed_limit = 1000;

                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);


            } else {


            }


            $('#media_accounts').tagsinput({
                trimValue: true
            });

            $('#media_tags').tagsinput({
                trimValue: true
            });
            $('#media_tags2').tagsinput({
                trimValue: true
            });


            $("#finalstep").click(function() {
                $("#set-story-check").prop("checked", true);
                $("#set-follow-check").prop("checked", true);
                $("#set-like-check").prop("checked", true);

                SetStoryValue(true);
                SetLikeValue(true);
                SetFollowValue(true);

            });
            $('#comment_tags').tagsinput({
                trimValue: true,
                delimiter: ']',
                confirmKeys: [13]
            });

            $('#location_tags').tagsinput({
                trimValue: true
            });



            $('#my-btns .btn').on('click', function(event) {

                var val = $(this).find('input').val();
                if (val == "Fast") {
                    $("#fast").addClass('active');
                    $("#slow").removeClass('active');
                    $("#medium").removeClass('active');

                    if (paid_sub) {

                        SendMessage("SetSpeed", "Speed", 1);

                    } else {
                        buySub();
                    }
                }

                if (val == "Slow") {
                    $("#slow").addClass('active');
                    $("#fast").removeClass('active');
                    $("#medium").removeClass('active');
                    SendMessage("SetSpeed", "Speed", 8);


                }

                if (val == "Medium") {
                    $("#medium").addClass('active');
                    $("#slow").removeClass('active');
                    $("#fast").removeClass('active');
                    SendMessage("SetSpeed", "Speed", 2);


                }

            });



            $(".backup_picture").on("error", function() {
                $(this).attr('src', 'icon.png');
            });



            if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                $("#progress").attr("src", "disk.gif");
            } else {
                $("#progress").attr("src", "icon.gif");
            }

            if (paid_sub) {
                $("#sub_msg").hide();
            }
            if (paid_sub) {
                $(".sub-user").hide();

                $("#purchase").hide();
                $("#upgrade").hide();

                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);
            } else {


                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);

            }

            SetActiveSidebarItem("#sidebar-likes_comments");

            SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);



            $("#location_tags").on('itemAdded', function(event) {


                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#location_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#location_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
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
                    $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags.split(",");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(' ').join('').length > 0) {
                        SendMessage("AddTagToList", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                        global_tags.push(split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                    }
                }

                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });

            $("#media_tags2").on('itemAdded', function(event) {


                var tags = event.item;
                var split_tags = tags.split(",");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(' ').join('').length > 0) {
                        SendMessage("AddTagToList", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                    }
                }

                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });

            $("#comment_tags").on('itemAdded', function(event) {


                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags;
                SendMessage("AddCommentToList", "TagName", tags);
              

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
            $("#media_tags2").on('itemRemoved', function(event) {


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

                console.log("CODES THAT RUS 1");

                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#media_accounts').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#media_accounts').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }



                var account_name;


                var tags = event.item;
                var split_tags = tags.split(",");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split(',').join('').split(' ').join('').split('@').join('').length > 0) {

                        account_name = split_tags[kk].split(',').join('').split(' ').join('').split('@').join('');

                        global_accounts.push(account_name);
                        if (account_name.match(/^[0-9a-z._]+$/) || account_name.includes(".") || account_name.includes("_")) {
                            if (account_name.includes("https://")) {
                                account_name = account_name.split("/")[3];
                            }
                            SendMessage("CollectFromAccount", "account_name", account_name);
                        }



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





            });




            $("#customRange5").change(function() {
                if (paid_sub === false) {
                    if (parseInt($("#customRange5").val()) > 10000) {
                        var input = document.getElementById("customRange5");
                        input.value = 10000;

                    }
                }
                follow_speed = parseInt($("#customRange1").val());
                unfollow_speed = parseInt($("#customRange2").val());
                like_speed = parseInt($("#customRange3").val());
                story_speed = parseInt($("#customRange5").val());
                comment_speed = parseInt($("#customRange4").val());


                $("#story_set").html("Stories/day: " + $("#customRange5").val());


                var settings = {
                    FollowSettings: {},
                    UnfollowSettings: {},
                    LikeSettings: {},
                    CommentSettings: {},
                    CollectFollowers: {},
                    CollectFollowings: {},
                    StorySettings: {},
                    TikTokSettings: {}
                };
                settings.FollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.UnfollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowers = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.LikeSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CommentSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.StorySettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };

                settings.TikTokSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
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


                settings.TikTokSettings.TimeMin = tiktok_speed;
                settings.TikTokSettings.TimeMax = tiktok_speed + 10;
                settings.TikTokSettings.ErrorTime = 400;

                settings.UnfollowAfterDays = UnfollowAfterDays;



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
            $("#customRange4").change(function() {
                if (paid_sub === false) {
                    if (parseInt($("#customRange4").val()) > 1000) {
                        var input = document.getElementById("customRange4");
                        input.value = 1000;

                    }
                }
                follow_speed = parseInt($("#customRange1").val());
                unfollow_speed = parseInt($("#customRange2").val());
                like_speed = parseInt($("#customRange3").val());
                story_speed = parseInt($("#customRange5").val());
                comment_speed = parseInt($("#customRange4").val());


                $("#comment_set").html("DMs/day: " + $("#customRange4").val());


                var settings = {
                    FollowSettings: {},
                    UnfollowSettings: {},
                    LikeSettings: {},
                    CommentSettings: {},
                    CollectFollowers: {},
                    CollectFollowings: {},
                    StorySettings: {},
                    TikTokSettings: {}
                };
                settings.FollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.UnfollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowers = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.LikeSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CommentSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.StorySettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };

                settings.TikTokSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
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


                settings.TikTokSettings.TimeMin = tiktok_speed;
                settings.TikTokSettings.TimeMax = tiktok_speed + 10;
                settings.TikTokSettings.ErrorTime = 400;

                settings.UnfollowAfterDays = UnfollowAfterDays;



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
                if (paid_sub === false) {
                    if (parseInt($("#customRange1").val()) > 1000) {
                        var input = document.getElementById("customRange1");
                        input.value = 1000;

                    }
                }

                follow_speed = parseInt($("#customRange1").val());
                unfollow_speed = parseInt($("#customRange2").val());
                like_speed = parseInt($("#customRange3").val());
                story_speed = parseInt($("#customRange5").val());
                comment_speed = parseInt($("#customRange4").val());

                $("#follow_set").html("Follows/day: " + $("#customRange1").val());


                var settings = {
                    FollowSettings: {},
                    UnfollowSettings: {},
                    LikeSettings: {},
                    CommentSettings: {},
                    CollectFollowers: {},
                    CollectFollowings: {},
                    StorySettings: {},
                    TikTokSettings: {}
                };
                settings.FollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.UnfollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowers = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.LikeSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CommentSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.StorySettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.TikTokSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
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


                settings.TikTokSettings.TimeMin = tiktok_speed;
                settings.TikTokSettings.TimeMax = tiktok_speed + 10;
                settings.TikTokSettings.ErrorTime = 400;
                settings.UnfollowAfterDays = UnfollowAfterDays;



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
                if (paid_sub === false) {
                    if (parseInt($("#customRange2").val()) > 1000) {
                        var input = document.getElementById("customRange2");
                        input.value = 1000;

                    }
                }
                follow_speed = parseInt($("#customRange1").val());
                unfollow_speed = parseInt($("#customRange2").val());
                like_speed = parseInt($("#customRange3").val());
                story_speed = parseInt($("#customRange5").val());
                comment_speed = parseInt($("#customRange4").val());

                $("#unfollow_set").html("Unfollows/day: " + $("#customRange2").val());


                var settings = {
                    FollowSettings: {},
                    UnfollowSettings: {},
                    LikeSettings: {},
                    CommentSettings: {},
                    CollectFollowers: {},
                    CollectFollowings: {},
                    StorySettings: {},
                    TikTokSettings: {}
                };
                settings.FollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.UnfollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowers = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.LikeSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CommentSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.StorySettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.TikTokSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
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


                settings.TikTokSettings.TimeMin = tiktok_speed;
                settings.TikTokSettings.TimeMax = tiktok_speed + 10;
                settings.TikTokSettings.ErrorTime = 400;


                settings.UnfollowAfterDays = UnfollowAfterDays;

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
                if (paid_sub == false) {
                    if (parseInt($("#customRange3").val()) > 1000) {
                        var input = document.getElementById("customRange3");
                        input.value = 1000;

                    }
                }

                follow_speed = parseInt($("#customRange1").val());
                unfollow_speed = parseInt($("#customRange2").val());
                like_speed = parseInt($("#customRange3").val());
                story_speed = parseInt($("#customRange5").val());
                comment_speed = parseInt($("#customRange4").val());

                $("#like_set").html("Likes/day: " + $("#customRange3").val());

                var settings = {
                    FollowSettings: {},
                    UnfollowSettings: {},
                    LikeSettings: {},
                    CommentSettings: {},
                    CollectFollowers: {},
                    CollectFollowings: {},
                    StorySettings: {},
                    TikTokSettings: {}
                };
                settings.FollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.UnfollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowers = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.LikeSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CommentSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.StorySettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };

                settings.TikTokSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };

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



                settings.TikTokSettings.TimeMin = tiktok_speed;
                settings.TikTokSettings.TimeMax = tiktok_speed + 10;
                settings.TikTokSettings.ErrorTime = 400;



                settings.UnfollowAfterDays = UnfollowAfterDays;

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
            $("#slow").click(function() {
                var user_plan = $("#plan").attr("name");

                SendMessage("SetSpeed", "Num", 3);
                $("#slow").addClass('active');
                $("#fast").removeClass('active');
                $("#medium").removeClass('active');

            });
            $("#medium").click(function() {
                var user_plan = $("#plan").attr("name");




                SendMessage("SetSpeed", "Num", 2);
                $("#medium").addClass('active');
                $("#slow").removeClass('active');
                $("#fast").removeClass('active');

            });
            $("#fast").click(function() {
                var user_plan = $("#plan").attr("name");


                SendMessage("SetSpeed", "Num", 1);



                $("#fast").addClass('active');
                $("#slow").removeClass('active');
                $("#medium").removeClass('active');
            });
            $("#set-follow-check").click(function() {
                $("#set-unfollow-check").prop("checked", false);
                SetUnfollowValue(false);
                SetFollowValue($(this).is(':checked'));
                follow_val = $(this).is(':checked');
                if (follow_val) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }
                if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                    $("#progress").attr("src", "disk.gif");
                } else {
                    $("#progress").attr("src", "icon.gif");
                }

            });
            $("#set-like-check").click(function() {

                SetLikeValue($(this).is(':checked'));
                like_val = $(this).is(':checked');
                if (like_val) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", status.StartLike);
                }

                if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                    $("#progress").attr("src", "disk.gif");
                } else {
                    $("#progress").attr("src", "icon.gif");
                }

            });


            $("#set-story-check").click(function() {
                SetStoryValue($(this).is(':checked'));
                like_val = $(this).is(':checked');
                if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                    $("#progress").attr("src", "disk.gif");
                } else {
                    $("#progress").attr("src", "icon.gif");
                }

                if (like_val != true) {
                    $("#set-like-check").prop("checked", false);
                    SetLikeValue(false);
                    $("#set-follow-check").prop("checked", false);
                    SetFollowValue(false);

                    $("#set-unfollow-check").prop("checked", false);
                    SetUnfollowValue(false);
                    $("#set-comment-check").prop("checked", false);
                    SetCommentValue(false);
                }

            });
            $("#set-comment-check").click(function() {
                SetCommentValue($(this).is(':checked'));
                comment_val = $(this).is(':checked');
                if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                    $("#progress").attr("src", "disk.gif");
                } else {
                    $("#progress").attr("src", "icon.gif");
                }
                if (comment_val) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", status.StartLike);
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
                //  var index = global_tags.indexOf(user_id);

                SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
                //  SendMessage("RemoveCommentFromList", "TagName", );
            });




            $("#set-unfollow-check").click(function() {
                $("#set-follow-check").prop("checked", false);
                SetFollowValue(false);

                SetUnfollowValue($(this).is(':checked'));
                unfollow_val = $(this).is(':checked');
                if (unfollow_val) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }
                if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                    $("#progress").attr("src", "disk.gif");
                } else {
                    $("#progress").attr("src", "icon.gif");
                }

            });

            SetActiveSidebarItem("#sidebar-home");



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
            $("#comment_set").html("DMs/day: " + maxComments);







            $("#startinstagram").parent().addClass("active");

            SetActiveSidebarItem("#sidebar-home");


        });




    });

    function onClick(e) {

        $("#snapshots").html("<h4>Settings Used:</h4> <br>Likes/Day:" + live_snapshots[e.dataPoint.x].LikeSettings.TimeMin + "<br>Follows/day:" + live_snapshots[e.dataPoint.x].FollowSettings.TimeMin + "<br>Unfollows/Day:" + live_snapshots[e.dataPoint.x].UnfollowSettings.TimeMin + "<br>");
        $("#tags").html("<h4>Hashtag Targets:</h4> <br>" + live_tags[e.dataPoint.x]);
        $("#accounts").html("<h4>Account Targets:</h4> <br>" + live_accounts[e.dataPoint.x]);

    }






    $("#sidebar-settings").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("settings.html", function() {
            var followers_string = "";
            for (var kk = 0; kk < user_followers.length; kk++) {
                followers_string += user_followers[kk] + ", ";

            }
            var ideal_targets_string = "";

            for (var kk = 0; kk < IdealTargets.length; kk++) {
                ideal_targets_string += IdealTargets[kk].username + " followers: " + IdealTargets[kk].followers + "<br> ";

            }

            let element = document.getElementById("minPhoto");
            element.value = minPhotos;

            let element1 = document.getElementById("minFollowing");
            element1.value = minFollowing;

            let element2 = document.getElementById("maxFollowing");
            element2.value = maxFollowing;
            let element3 = document.getElementById("minFollower");
            element3.value = minFollowers;
            let element4 = document.getElementById("maxFollower");
            element4.value = maxFollowers;
            var blacklist_string = "";

            for (var kk = 0; kk < blacklist.length; kk++) {
                blacklist_string += blacklist[kk] + ",  ";

            }


            var filter_string = "";

            for (var kk = 0; kk < filters.length; kk++) {
                filter_string += filters[kk] + ",  ";

            }
            $("#followers_list").html("Followers " + user_followers.length + "/" + follow_count_num + ": " + followers_string + "<br>");
            $("#activity_log").html("<br>Activity Log: <br>" + activity_log);
            $("#blacklist").html("<br>Blacklist of profiles to never re-visit:  <br>" + blacklist_string);
            $("#filters").html("<br>Words to avoid in bio text and photo content:  <br>" + filter_string);

            $("#IdealTargets").html("<br>Ideal Account Targets: <br>" + ideal_targets_string);

            $("#export").click(function() {
                    SendMessage("ExportDatabase", "", "");


                }

            );
            $("#switch-account").click(function() {
                    SendMessage("switch-account", "", "");
                    alert("Please wait 30 seconds while the Instagram tab navigates to your new profile. Make sure to log into the correct account at Instagram.com first. You can also re-install the extension to switch accounts.");


                }

            );
            $(document).on('change', '#import-file-input', function(event) {
                ImportDatabase(event);
            });

            $("#import").click(function() {
                $("#import-file-input").click();
            });

            $("#generateHashtags").click(function() {
                var theme = prompt("Enter the theme of the profile(1 word only).");
                theme = theme.split(" ")[0];


                $.ajax({
                        url: "https://instoo.com/user/getBestTargets",
                        method: "POST",
                        data: {
                            "theme": theme
                        },
                        error: function(request, status, error) {
                            var Error = {};
                            Error.String = "CollectMediaFromAccountError";
                            Error.Request = request;
                            Error.Status = status;
                            Error.AjaxError = error;

                        }
                    })
                    .done(function(dataobj) {

                        $('#hashtagsOutput').append("<h3>Best hashtags based on our logs:" + dataobj + "</h3>");

                    });


            });



            $("#cloud-backup").click(function() {

                alert("Settings saved to cloud!");

                if (roughSizeOfObject(cloud_db) < 15000000) {
                    
                }

            });
            $("#cloud-clear").click(function() {

                alert("Cloud backup cleared!");
         

                SendMessage("ResetAll", "", "");

            });




            $("#add_followers").click(function() {
                var whitelist_users = [];

                for (var kk = 0; kk < user_followers.length; kk++) {
                    whitelist_users.push(user_followers[kk]);

                }
                SendMessage("AddUserToWhitelistNameList", "username", whitelist_users);

            });

            $("#set-backgrounddm-check").click(function() {
                SendMessage("SetDMMode", "mode", $(this).is(':checked'));


            });

            $("#set-enablefilters-check").click(function() {
                SendMessage("SetEnableFilters", "mode", $(this).is(':checked'));


            });
            $("#set-collectfollowers-check").click(function() {
                SendMessage("SetCollectFollowers", "mode", $(this).is(':checked'));
            });
        

            


            $("#white_accounts").on('itemAdded', function(event) {
               

            });




            $("#set-slow-check").click(function() {
                SetFollowValue();
                SendMessage("SetSlowMode", "slow", $(this).is(':checked'));

            });


            $("#set-unfollowinstoo-check").prop("checked", unfollow_mode);
            $("#set-unfollowinstoo-check").click(function() {
                SendMessage("Setunfollowinstoo", "unfollowInstoo", $(this).is(':checked'));

            });

            $("#set-addideal-check").prop("checked", addIdeal);

            $("#set-addideal-check").click(function() {
                SendMessage("Setaddideal", "addideal", $(this).is(':checked'));

            });

         

            $("#set-collectfollowers-check").prop("checked", collectSelfFollowers);

            $("#set-backgrounddm-check").prop("checked", DMMode);
            $("#set-enablefilters-check").prop("checked", EnableFilters);

            $("#set-react-check").prop("checked", StartReact);
            $("#set-react-check").click(function() {
                StartReact = $(this).is(':checked');
                SendMessage("SetReactMode", "reacts", StartReact);
                var result = $('input[type="checkbox"]:checked') // this return collection of items checked
                if (result.length > 0) {
                    reacts = [];
                    result.each(function() {
                        reacts.push($(this).val());
                    });

                    SendMessage("SetReacts", "reacts", reacts);


                }

            });

            $("#set-cloud-check").click(function() {

                if (cloud_backup === false) {
                    buyCloud();
                    $("#set-cloud-check").click();
                } else {
                    user_cloud = $(this).is(':checked');
                }
            });


            $("#set-unfollowmode-check").prop("checked", unfollow_mode);

            $("#set-unfollowmode-check").click(function() {
                enable_get_followers = $(this).is(':checked');
                SendMessage("SetUnfollowMode", "unfollow", $(this).is(':checked'));
            });


            $("#input-unfollow-days").bind('keyup mouseup', function() {
                SendMessage("SetUnfollowDays", "days", $("#input-unfollow-days").val());

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


            $("#user-search").keyup(function(event) {
                event.preventDefault();

                FilterWhitelistSearch(this);

            });


            $("#add-user-search").keyup(function() {
                NewWhitelistUserSearch(this);
            });


            SetActiveSidebarItem("#sidebar-likes_comments");

            SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


            SendMessage("RequestSettings", "", "");

            var modal = $('body').siblings("#confirm-reset-modal");
            if (modal.length > 0) {
                modal.remove();
            }
            $('#confirm-reset-modal').insertAfter($('body'));

            $("#default-settings").click(function() {
                SendMessage("ResetPool", "", "");

            });

            $("#save-settings").click(function() {
                SaveSettings();
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



   

    $("#sidebar-home").click();

    SendMessage("OpenInstagramFast", "Speed", 1);
})

function SetActiveSidebarItem(sidebar_id) { 
    $("#sidebar-home").addClass("sidebar-item");
    $("#sidebar-home-tiktok").addClass("sidebar-item");
    $("#sidebar-home-facebook").addClass("sidebar-item");

    $("#sidebar-home-tw").addClass("sidebar-item");
    $("#sidebar-home-tinder2").addClass("sidebar-item");
    $("#sidebar-home-link2").addClass("sidebar-item");
    $("#sidebar-home-crm").addClass("sidebar-item");
    $("#sidebar-home-pinterest").addClass("sidebar-item");

    $("#sidebar-whitelist").addClass("sidebar-item");
    $("#sidebar-settings").addClass("sidebar-item");
    $("#sidebar-analytics").addClass("sidebar-item");
    $("#sidebar-upgrades").addClass("sidebar-item");

    $("#sidebar-help").addClass("sidebar-item");
    $("#sidebar-likes_comments").addClass("sidebar-item");

    $("#sidebar-home").removeClass("sidebar-item-active");
    $("#sidebar-home-tiktok").removeClass("sidebar-item-active");
    $("#sidebar-home-facebook").removeClass("sidebar-item-active");

    $("#sidebar-home-tinder2").removeClass("sidebar-item-active");
    $("#sidebar-home-link2").removeClass("sidebar-item-active");
    $("#sidebar-home-crm").removeClass("sidebar-item-active");
    $("#sidebar-home-pinterest").removeClass("sidebar-item-active");

    $("#sidebar-home-tw").removeClass("sidebar-item-active");

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
    if (typeof ComPort != "undefined") {
        ComPort.postMessage(sendObj);
    }
}

function GotDatabase(database) {

    cloud_db = database;
    update_interval = true;
    if (!loadedAccounts) {
        if (document.getElementById("accounts")) {
            document.getElementById("accounts").remove();
        }
        var usernames = [];
        for (var kk = 0; kk < cloud_db.length; kk++) {
            usernames.push(cloud_db[kk].username);

        }
        var values = usernames;
        var select = document.createElement("select");
        select.name = "accounts";
        select.id = "accounts";
        select.style.width = "80%";
        SendMessage("LoadAccount", "account", selectedAccount);

        select.value = selectedAccount;
        for (const val of values) {
            var option = document.createElement("option");
            option.value = val;
            option.text = val.charAt(0).toUpperCase() + val.slice(1);
            select.appendChild(option);
        }
        loadedAccounts = true;
        select.addEventListener("click", function() {
            selectedAccount = this.value;
            SendMessage("LoadAccount", "account", this.value);

            let element = document.getElementById("accounts");
            element.value = this.value;
            $("#accounts").val(this.value);


        });

    }


}

function checkObject(user_id, array) {
    for (var jj = 0; jj < array.length; jj++) {
        if (array[jj].target == user_id) {
            return [array[jj]];
        }
    }

    return [];
}

function OnMessageReceive(msg) {

    if (msg.Tag == "UserFollowComplete") {
        OnFollowedUser(msg.User);
    } else if (msg.Tag == "ReloadCharts") {
        instagram_data = msg.data.instagram_data;
        linkedin_data = msg.data.linkedin_data;
        var target_dic = {};

        var like_block = $("#crm-table");
        var like_table = $(like_block).find("tbody");
        $(like_table).empty();
        var html = "<br><br><table style='  border: 1px solid black; padding:10px; width:100%;'><tr><td></td><td>Contact</td><td>Email</td><td>Sales</td><td>Target</td><td>Website</td><td>Twitter</td><td>Birthday</td><td>Connected</td></tr>";
        for (var i = 0; i < linkedin_data.length; i++) {
            if (typeof linkedin_data[i] != "undefined")
                html += "<tr><td><img width='100px' src='" + linkedin_data[i].img + "'></img></td><td><a target='_blank' rel='noopener noreferrer' href='https://linkedin" + linkedin_data[i].url.split("linkedin")[1] + "'>" + linkedin_data[i].username + "</a></td><td><a href='#' onclick='editEmail(" + i + ")'>" + linkedin_data[i].email + "</a></td><td><a href='#' onclick='editSales(" + i + ")'>" + linkedin_data[i].sales + "</a></td><td><a href='#' onclick='editTargret(" + i + ")'>" + linkedin_data[i].target + "</a></td><td><a href='#' onclick='editWebsite(" + i + ")'>" + linkedin_data[i].website + "</a></td><td><a href='#' onclick='editTwitter(" + i + ")'>" + linkedin_data[i].twitter + "</a></td><td><a href='#' onclick='editBirthday(" + i + ")'>" + linkedin_data[i].birthday + "</a></td><td><a href='#' onclick='editConnected(" + i + ")'>" + linkedin_data[i].connected + "</a></td></tr>";
            if (linkedin_data[i].target in target_dic) {
                target_dic[linkedin_data[i].target].leads++;
                target_dic[linkedin_data[i].target].sales += parseInt(linkedin_data[i].sales);
                if (linkedin_data[i].connected != "none") {
                    target_dic[linkedin_data[i].target].connected++;
                }
            } else {
                var did_connect = 0;
                if (linkedin_data[i].connected != "none") {
                    did_connect = 1;
                }


                target_dic[linkedin_data[i].target] = {
                    leads: 1,
                    sales: parseInt(linkedin_data[i].sales),
                    connected: did_connect
                };
            }

        }


        for (var i = 0; i < instagram_data.length; i++) {
            if (typeof instagram_data[i] != "undefined")
                html += "<tr><td><img width='100px' src='" + instagram_data[i].img + "'></img></td><td><a target='_blank' rel='noopener noreferrer' href='" + instagram_data[i].url + "'>" + instagram_data[i].username + "</a></td><td><a href='#' onclick='editInstaEmail(" + i + ")'>" + instagram_data[i].email + "</a></td><td><a href='#' onclick='editInstaSales(" + i + ")'>" + instagram_data[i].sales + "</a></td><td><a href='#' onclick='editInstaTargret(" + i + ")'>" + instagram_data[i].target + "</a></td><td><a href='#' onclick='editInstaWebsite(" + i + ")'>" + instagram_data[i].website + "</a></td><td><a href='#' onclick='editInstaTwitter(" + i + ")'>" + instagram_data[i].twitter + "</a></td><td><a href='#' onclick='editInstaBirthday(" + i + ")'>" + instagram_data[i].birthday + "</a></td><td><a href='#' onclick='editInstaConnected(" + i + ")'>" + instagram_data[i].connected + "</a></td></tr>";
            if (instagram_data[i].target in target_dic) {
                target_dic[instagram_data[i].target].leads++;
                target_dic[instagram_data[i].target].sales += parseInt(instagram_data[i].sales);
                if (instagram_data[i].connected != "none") {
                    target_dic[instagram_data[i].target].connected++;
                }
            } else {

                var did_connect = 0;
                if (instagram_data[i].connected != "none") {
                    did_connect = 1;
                }

                target_dic[instagram_data[i].target] = {
                    leads: 1,
                    sales: parseInt(instagram_data[i].sales),
                    connected: did_connect
                };
            }

        }
        html += "</table><script>function editInstaConnected(num){ window.postMessage({mode: 'Instaconnected' ,edit: num} , '*');} function editInstaBirthday(num){ window.postMessage({mode: 'Instabirthday' ,edit: num} , '*');}function editInstaTwitter(num){ window.postMessage({mode: 'Instatwitter' ,edit: num} , '*');} function editInstaWebsite(num){ window.postMessage({mode: 'Instawebsite' ,edit: num} , '*');} function editInstaTarget(num){ window.postMessage({mode: 'Instatarget' ,edit: num} , '*');} function editInstaSales(num){ window.postMessage({mode: 'Instasales' ,edit: num} , '*');}function editInstaEmail(num){ window.postMessage({mode: 'Instaemail' ,edit: num} , '*');}function editConnected(num){ window.postMessage({mode: 'connected' ,edit: num} , '*');} function editBirthday(num){ window.postMessage({mode: 'birthday' ,edit: num} , '*');}function editTwitter(num){ window.postMessage({mode: 'twitter' ,edit: num} , '*');} function editWebsite(num){ window.postMessage({mode: 'website' ,edit: num} , '*');} function editTarget(num){ window.postMessage({mode: 'target' ,edit: num} , '*');} function editSales(num){ window.postMessage({mode: 'sales' ,edit: num} , '*');}function editEmail(num){ window.postMessage({mode: 'email' ,edit: num} , '*');}</script>";
        $(like_block).html(html);

        var target_block = $("#target-table");
        var target_table = $(target_block).find("tbody");
        $(target_table).empty();
        var html_target = "<br><br><table style='  border: 1px solid black; padding:10px; width:100%;'><tr><td>Target</td><td>Sales</td><td>Leads</td><td>Gained Followers</td></tr>";
        for (var key in target_dic) {
            if (target_dic.hasOwnProperty(key)) {
                html_target += "<tr><td>" + key + "</td><td>" + target_dic[key].sales + "</td><td> " + target_dic[key].leads + "</td><td>" + target_dic[key].connected + "</td></tr>";
            }

        }
        html_target += "</table>";

        $(target_block).html(html_target);




    } else if (msg.Tag == "setLanguage") { 
        $("#errors").prepend("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>Instoo has detected that the langauge at instagram.com is not set to English. Please follow these steps: <br>1) Click your profile picture in the top right corner, then click Profile. <br>2) Click Edit Profile.<br>3) Click Language at the very bottom of the page and select a new language.<br>4) Select English. It's in small gray text on the last line of the page to make it easy.</div>");


    } else if (msg.Tag == "UserFollowCompleteTikTok") { 

        OnFollowedUserTikTok(msg.User);



    } else if (msg.Tag == "UserFollowCompletefacebook") { 

        OnFollowedUserfacebook(msg.User);



    } else if (msg.Tag == "UserFollowCompletePinterest") { 

        OnFollowedUserPinterest(msg.User);



    } else if (msg.Tag == "UserFollowCompleteLinkedin") { 

        OnFollowedUserLinkedin(msg.User);



    } else if (msg.Tag == "RefreshPage") { 
        window.location.reload(true);


    } else if (msg.Tag == "UserFollowCompleteTwitter") { 

        OnFollowedUserTwitter(msg.User);



    } else if (msg.Tag == "UserLikeCompleteTikTok") { 
        OnLikedMediaTikTok(msg.User);



    } else if (msg.Tag == "UserLikeCompletefacebook") {


        OnLikedMediafacebook(msg.User);



    } else if (msg.Tag == "UserLikeCompletePinterest") { 



        OnLikedMediaPinterest(msg.User);



    } else if (msg.Tag == "UserLikeCompleteLinkedin") { 




        OnLikedMediaLinkedin(msg.User);



    } else if (msg.Tag == "UserLikeCompleteTinder") { 



        OnLikedMediaTinder(msg.User);



    } else if (msg.Tag == "UserLikeCompleteTwitter") {


        OnLikedMediaTwitter(msg.User);



    } else if (msg.Tag == "DispatchFollowStatus") {
        UpdateFollowStatus(msg.AllUsers);
    } else if (msg.Tag == "SetPhoto") {
        $(".img-current-user").attr("src", msg.user.profile_pic_url);
        CurrentUser = msg.user;

        user_email = $("#email").attr("name");
        var user_plan = $("#plan").attr("name");

        $.post('https://instoo.com/user/postInst', {
                email: user_email,
                username: CurrentUser.username
            },
            function(returnedData) {
                if (returnedData && returnedData.length > 1 && CurrentUser.username != "nala_awoon" && !user_email.includes("ikeda.group")) {
                    $("#trial").show();
                    SetFollowValue(false);
                    SetUnfollowValue(false);
                    SetStoryValue(false);
                    $("#set-story-check").prop("checked", false);

                    $("#set-follow-check").prop("checked", false);
                    $("#set-unfollow-check").prop("checked", false);
                    $("#set-story-check").prop("checked", false);
                    $("#set-like-check").prop("checked", false);
                    $("#set-comment-check").prop("checked", false);
                }
            });

    } else if (msg.Tag == "LoadCloud") {
        started = true;
        var loaded = false;
        var obj = [];
  
        SendMessage("loadLocal", "Database", "obj");


    } else if (msg.Tag == "RecentFollowers") {
        var recentFollowers = msg.ExtractedUsers;
        instooData = [];
        for (var kk = 0; kk < recentFollowers.length; kk++) {
            var found = checkObject(recentFollowers[kk].user_id, instooData);
            if (found.length > 0) {
              
            }

        }

    } else if (msg.Tag == "RankedID") {


    } else if (msg.Tag == "LoopingTargets") {

        $("#errors").prepend("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>Instoo is looping your targets("  +  msg.Media + "), which means they do not actively gain followers fast enough.<br><b> If you have 20+ account targets, please remove these. You should add 20 more account targets with under 100k followers.</b><br> Bot auto-turned off to avoid looping the same targets. The first day after adding new targets, make sure they actively gain relevant followers. It will tell you which target all profiles came from on the Instagram tab and Instoo tab,so you can remove irrelevant ones. </div>");

        $("#set-story-check").prop("checked", false);
        $("#set-follow-check").prop("checked", false);
        $("#set-like-check").prop("checked", false);

        SetStoryValue(false);
        SetLikeValue(false);
        SetFollowValue(false);

       

    } else if (msg.Tag == "userData") {
        $("#follow_count").html("followers: " + msg.User.edge_followed_by.count);
        follow_count_num = msg.User.edge_followed_by.count;
        if (follow_count_num < 1000) {
            SendMessage("SetSpeed", "Num", 2);
            
        $("#fast").removeClass('active');
        $("#slow").removeClass('active');
        $("#medium").addClass('active');
        }

        if (follow_count_num < 200) {
            SendMessage("SetSpeed", "Num", 8);
            
        $("#fast").removeClass('active');
        $("#slow").addClass('active');
        $("#medium").removeClass('active');
        }
        var account_id = msg.User.id;

        var UserData = {
            "username": msg.User.username,
            "user_id": msg.User.id,
            "full_name": msg.User.full_name,
            "user_pic_url": msg.User.profile_pic_url
        };


        var CollectJob = {};
        CollectJob.user_id = account_id;
        CollectJob.cursor_key = null;
        CollectJob.user = UserData;
        myCollectJob = CollectJob;
        SendMessage("myCollectJob", "Job", CollectJob);



    } else if (msg.Tag == "gotStats") {
        follow_count_num = parseInt(msg.followers.followers.split(",").join("").split(".").join("").split(" ").join(""));
        following_count_num = parseInt(msg.followers.following.split(",").join("").split(".").join("").split(" ").join(""));

        var d = new Date();
        var currentHour = d.getHours();
        if (follow_count_num < 1000) {
            SendMessage("SetSpeed", "Num", 2);
            
        $("#fast").removeClass('active');
        $("#slow").removeClass('active');
        $("#medium").addClass('active');
        }

        if (follow_count_num < 200) {
            SendMessage("SetSpeed", "Num", 3);
            
        $("#fast").removeClass('active');
        $("#slow").addClass('active');
        $("#medium").removeClass('active');

        }
        var d_num = Date.parse(d);
        d_num = Math.floor(d_num / (1000 * 60 * 60));
        var dat = {
            followers: follow_count_num,
            hour: d_num,
            user_id: msg.followers.CurrentUser.user_id,
            mode: mode
        };
        if (follow_count_num > 10) {
            var data = {
                followers: follow_count_num,
                hour: d_num,
                user_id: CurrentUser.user_id,
                mode: "instagram"
            };

             SendMessage("PostStats", "data", data);

        }

    } else if (msg.Tag == "SendUserHeader") {
        SendMessage("GotUserHeader", "User", CurrentUser);
    } else if (msg.Tag == "BackupCloud") {

        if (enable_get_followers) {
        }
        if (true) {


        }

    } else if (msg.Tag == "StatusUpdate") {
        UpdateStatus(msg.Status);
    } else if (msg.Tag == "SkipFollowStory") {
        $("#errors").html("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" + msg.text + " </div>");
    } else if (msg.Tag == "UpdateStory") {

    } else if (msg.Tag == "GotDatabase") {
        GotDatabase(msg.Database);
    } else if (msg.Tag == "SendFollowers") {
        UpdateFollowers(msg.Status);
    } else if (msg.Tag == "blocked") {
        window.location.href = "https://instoo.com/pause";

        $("#set-story-check").prop("checked", false);
        $("#set-follow-check").prop("checked", false);
        $("#set-like-check").prop("checked", false);

        SetStoryValue(false);
        SetLikeValue(false);
        SetFollowValue(false);
    } else if (msg.Tag == "SendAccountsDict") {
        UpdateAccountsDict(msg.Accounts);

    } else if (msg.Tag == "SendTagsDict") {
        UpdateTagsDict(msg.Hashtags);

    } else if (msg.Tag == "UserUnfollowComplete") {



        OnUnfollowedUser(msg.User);


    } else if (msg.Tag == "OnLikedMediaComplete") {

        OnLikedMedia(msg.Media);
    } else if (msg.Tag == "OnStoryMediaComplete") {

        OnStoryMedia(msg.Media);
    } else if (msg.Tag == "Pause") {

        $("#set-follow-check").prop("checked", false);
        $("#set-unfollow-check").prop("checked", false);
        $("#set-story-check").prop("checked", false);
        $("#set-like-check").prop("checked", false);
        $("#set-comment-check").prop("checked", false);

        // OnStoryMedia(msg.Media);
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

        logged_in = true;
        loadedAccounts = false;

        SendMessage("RequestFollowStatus", "Num", DisplayFollowersNum);
        $("#overlay").hide();
        if (paid_sub) {
            SendMessage("SetPaidMode", "paid", true);
            $('.sub-user').hide();
            $("#purchase").hide();
            $("#upgrade").hide();

            $("#customRange1").attr("max", speed_limit);
            $("#customRange2").attr("max", speed_limit);
            $("#customRange3").attr("max", speed_limit);
        } else {

            $("#customRange1").attr("max", speed_limit);
            $("#customRange2").attr("max", speed_limit);
            $("#customRange3").attr("max", speed_limit);
        }

        if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
            $("#progress").attr("src", "disk.gif");
        } else {
            $("#progress").attr("src", "icon.gif");
        }
  


    } else if (msg.Tag == "UserLoggedOut") {
        logged_in = false;
        loadedAccounts = false;
        if (!(mode == "twitter") && !(mode == "tiktok") && !$("#set-story-check").is(':checked') && !$("#set-like-check").is(':checked') && !$("#set-follow-check").is(':checked') && !$("#set-unfollow-check").is(':checked') && !$("#set-comment-check").is(':checked')) {
            $("#overlay").show();

        }
        setTimeout(function() {
            if (!logged_in) {
                SendMessage("OpenInstagram", "Speed", 1);
            }
        }, 10000);
    } else if (msg.Tag == "ReceiveFilteredFollowings") {
        ProcessFilteredFollowings(msg.Users);
    } else if (msg.Tag == "RankTargets") {

        RankTargets(msg.recents);


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
    } else if (msg.Tag == "Error" && msg.type == "StoryError") {
        $("#errors").html("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>Randomly sleeping on story viewing for a bit to appear human. Hang tight for 2-30 minutes.</div>");
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

    settings.TikTokSettings.TimeMin = tiktok_speed;
    settings.TikTokSettings.TimeMax = tiktok_speed + 10;
    settings.TikTokSettings.ErrorTime = 400;


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

}

function RemoveWhitelistedUser(button) {
    var user_id = $(button).attr("user_id");
    $(button).closest("tr").remove();

    SendMessage("RemoveWhitelistUser", "user_id", user_id);
}

function RemoveCollectJobTagLinkedin(button) {
    var user_id = $(button).attr("user_id");
    $(button).closest("tr").remove();


    SendMessage("RemoveTagFromListLinkedin", "TagName", user_id);
    var index = global_tags.indexOf(user_id);
    if (index > -1) {
        global_tags.splice(index, 1);
    }
    SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


}

function RemoveCollectJobTagPinterest(button) {
    var user_id = $(button).attr("user_id");
    $(button).closest("tr").remove();


    SendMessage("RemoveTagFromListPinterest", "TagName", user_id);
    var index = global_tags.indexOf(user_id);
    if (index > -1) {
        global_tags.splice(index, 1);
    }
    SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


}

function RemoveCollectJobTagTikTok(button) {
    var user_id = $(button).attr("user_id");
    $(button).closest("tr").remove();


    SendMessage("RemoveTagFromListTikTok", "TagName", user_id);
    var index = global_tags.indexOf(user_id);
    if (index > -1) {
        global_tags.splice(index, 1);
    }
    SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


}

function RemoveCollectJobTagfacebook(button) {
    var user_id = $(button).attr("user_id");
    $(button).closest("tr").remove();


    SendMessage("RemoveTagFromListfacebook", "TagName", user_id);
    var index = global_tags.indexOf(user_id);
    if (index > -1) {
        global_tags.splice(index, 1);
    }
    SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


}

function RemoveCollectJobTagTwitter(button) {
    var user_id = $(button).attr("user_id");
    $(button).closest("tr").remove();


    SendMessage("RemoveTagFromListTwitter", "TagName", user_id);
    var index = global_tags.indexOf(user_id);
    if (index > -1) {
        global_tags.splice(index, 1);
    }
    SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


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
    if (index > -1) {
    }
    SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


}

function RemoveCollectJobUser(button) {
    var user_id = $(button).attr("user_id");
    $(button).closest("tr").remove();
    SendMessage("RemoveCollectJob", "user_id", user_id);
    SendMessage("RemoveAccountFromList", "TagName", user_id);
}

function UpdateFollowers(status) {
    my_followers = my_followers.concat(status);
    SendMessage("SendMyFollowers", "followers", my_followers);

}
Date.prototype.isSameDateAs = function(pDate) {
    return (
        this.getFullYear() === pDate.getFullYear() &&
        this.getMonth() === pDate.getMonth() &&
        this.getDate() === pDate.getDate()
    );
}

function UpdateAccountsDict(status) {
    account_dict = status;


}

function UpdateTagsDict(status) {
    hashtag_dict = status;


}

function UpdateStatus(status) {


    hoursLeft = status.hoursLeft;


    if (updated_cloud) {
        if (roughSizeOfObject(cloud_db) < 15000000) {

           
        }
        updated_cloud = false;
    }
    if (emailed == false && follow_count_num < 1000 && follow_count_num != 0) {
        SendMessage("SetSpeed", "Num", 2);
        
        $("#fast").removeClass('active');
        $("#slow").removeClass('active');
        $("#medium").addClass('active');

        $("#errors").html("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button> Instoo has detected you have a smaller account with under 1,000 followers. Speeds will naturally ramp up to 2x faster after you pass 1,000 followers.<br><br></div>");

    }


    if (emailed == false && following_count_num < 1000 && following_count_num != 0) {
        SendMessage("SetSpeed", "Num", 2);
        
        $("#fast").removeClass('active');
        $("#slow").removeClass('active');
        $("#medium").addClass('active');

        $("#errors").html("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button> Instoo has detected you have a smaller account that is following under 1000 other users(as in people you follow). Speeds will naturally ramp up to 2x faster after you follow more than 1000 users.<br><br></div>");

    }
    if (emailed == false && following_count_num < 200 && following_count_num != 0) {

        $("#fast").removeClass('active');
        $("#slow").addClass('active');
        $("#medium").removeClass('active');

        SendMessage("SetSpeed", "Num", 8);
        $("#errors").html("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button> Instoo has detected you have a smaller account, following under 200 users(meaning users you follow). Please pause Instoo and manually follow over 200, since Instoo allows medium(4x faster speeds) after 200. You should post photos regularly, and use the account by liking/following until you pass 200 followers and following. This takes most users a few days. Then it takes most users 1-2 months on medium mode to reach 1,000 followers, which allows fast mode. Contact the live chat to request target research from our account manager to help start. <br><br></div>");
        alert("Instoo has detected you have a smaller account, following under 200 users(meaning users you follow). Please pause Instoo and manually follow over 200, since Instoo allows medium(4x faster speeds) after 200. You should post photos regularly, and use the account by liking/following until you pass 200 followers and following. This takes most users a few days. Then it takes most users 1-2 months on medium mode to reach 1,000 followers, which allows fast mode. Contact the live chat to request target research from our account manager to help start. ");
       
        SetFollowValue(false);
        SetUnfollowValue(false);
        SetStoryValue(false);
        $("#set-story-check").prop("checked", false);

        $("#set-follow-check").prop("checked", false);
        $("#set-unfollow-check").prop("checked", false);
        $("#set-story-check").prop("checked", false);
        $("#set-like-check").prop("checked", false);
        $("#set-comment-check").prop("checked", false);
        if (emailed == false) {
          
            emailed = true;
        }
    }


    if (emailed == false && follow_count_num < 200 && follow_count_num != 0) {


        SendMessage("SetSpeed", "Num", 8);

        
        $("#fast").removeClass('active');
        $("#slow").addClass('active');
        $("#medium").removeClass('active');

        $("#errors").html("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button> Instoo has detected you have a smaller account with under 200 followers. Please pause Instoo and manually raise your followers over 200, since Instoo allows medium(4x faster speeds) after 200. You should post photos regularly, and use the account by liking/following until you pass 200 followers. This takes most users a few days. Then it takes most users 1-2 months on medium mode to reach 1,000 followers, which allows fast mode. Contact the live chat to request target research from our account manager to help start. <br><br></div>");
        alert(" Instoo has detected you have a smaller account with under 200 followers. Please pause Instoo and manually raise your followers over 200, since Instoo allows medium(4x faster speeds) after 200. You should post photos regularly, and use the account by liking/following until you pass 200 followers. This takes most users a few days. Then it takes most users 1-2 months on medium mode to reach 1,000 followers, which allows fast mode. Contact the live chat to request target research from our account manager to help start. ");
        
        SetFollowValue(false);
        SetUnfollowValue(false);
        SetStoryValue(false);
        $("#set-story-check").prop("checked", false);

        $("#set-follow-check").prop("checked", false);
        $("#set-unfollow-check").prop("checked", false);
        $("#set-story-check").prop("checked", false);
        $("#set-like-check").prop("checked", false);
        $("#set-comment-check").prop("checked", false);
        if (emailed == false) {
         
            emailed = true;
        }
    }
    console.log(status);
    user_stats = status.user_stats;
    reacts = status.reacts;
    StartReact = status.StartReact;
    EnableFilters = status.EnableFilters;
    unfollow_mode = status.unfollow_mode;
    activity_log = status.activity_log;
    blacklist = status.blacklist;
    filters = status.filters;
    minFollowing = status.minFollowing;
    maxFollowing = status.maxFollowing;
    minPhotos = status.minPhotos;
    minFollowers = status.minFollowers;
    maxFollowers = status.maxFollowers;

    user_followers = status.user_followers;
    analytics = status.true_analytics;
    IdealTargets = status.IdealTargets;
    DMMode = status.backgroundDMs;
    addIdeal = status.addIdeal;
    unfollowInstoo = status.unfollowInstoo;
    collectSelfFollowers = status.collectSelfFollowers;
    if (status.UserPool.length > 1000 || status.MediaPool.length > 1000) {
        SendMessage("ClearMemory", "story", "");
    }

    UnfollowedPoolSize = status.UnfollowedPoolSize;
    FollowedPoolSize = status.FollowedPoolSize;
    LikePoolSize = status.LikePoolSize;
    StoryPoolSize = status.StoryPoolSize;
    CommentPoolSize = status.CommentPoolSize;

    if (dashboardMode == 1) {

        $("#follow-pool-tiktok-num").text(status.FollowedPoolTikTokSize);
        $("#like-pool-tiktok-num").text(status.LikedPoolTikTokSize);
        $("#tiktok-pool-num").text(status.TikTokSize);
        $("#customRangeTikTokFollows").val(status.MaxTikTokFollows);
        $("#customRangeTikTokLikes").val(status.MaxTikTokLikes);

        $("#follow_tiktok_set").html("Follows/day: " + status.MaxTikTokFollows);
        $("#like_tiktok_set").html("Likes/day: " + status.MaxTikTokLikes);

        $("#set-follow-tiktok-check").prop("checked", status.StartTikTokFollow);
        $("#set-like-tiktok-check").prop("checked", status.StartTikTokLike);
    } else if (dashboardMode == 7) {

        $("#follow_facebook_set").html("Friends/day: " + status.MaxfacebookFollows);
        $("#like_facebook_set").html("Likes/day: " + status.MaxfacebookLikes);

        $("#follow-pool-facebook-num").text(status.FollowedPoolfacebook.length);
        $("#like-pool-facebook-num").text(status.LikedPoolfacebookSize);
        $("#facebook-pool-num").text(status.facebookSize);
        $("#customRangefacebookFollows").val(status.MaxfacebookFollows);
        $("#customRangefacebookLikes").val(status.MaxfacebookLikes);

        $("#set-follow-facebook-check").prop("checked", status.StartfacebookFollow);
        $("#set-like-facebook-check").prop("checked", status.StartfacebookLike);
    } else if (dashboardMode == 6) {

        $("#follow-pool-pinterest-num").text(status.FollowedPoolPinterestSize);
        $("#like-pool-pinterest-num").text(status.LikedPoolPinterestSize);
        $("#pinterest-pool-num").text(status.PinterestSize);
        $("#customRangePinterestFollows").val(status.MaxPinterestFollows);
        $("#customRangePinterestLikes").val(status.MaxPinterestLikes);

        $("#follow_pinterest_set").html("Follows/day: " + status.MaxPinterestFollows);
        $("#like_pinterest_set").html("Likes/day: " + status.MaxPinterestLikes);

        $("#set-follow-pinterest-check").prop("checked", status.StartPinterestFollow);
        $("#set-like-pinterest-check").prop("checked", status.StartPinterestLike);
    } else if (dashboardMode == 0) {


        $("#user-pool-num").text(status.UserPoolSize);
        $("#follow-pool-num").text(status.FollowedPoolSize);
        $("#unfollow-pool-num").text(status.UnfollowedPoolSize);
        $("#like-pool-num").text(status.LikePoolSize);

        $("#story-pool-num").text(status.StoryCount);
        $("#comment-pool-num").text(status.CommentPoolSize);

        $("#customRange1").val(status.maxFollows);
        $("#customRange2").val(status.maxUnfollows);
        $("#customRange3").val(status.maxLikes);
        $("#customRange4").val(status.maxComments);
        $("#customRange5").val(status.maxStories);
        $("#follow_set").html("Follows/day: " + status.maxFollows);
        $("#unfollow_set").html("Unfollows/day: " + status.maxUnfollows);
        $("#like_set").html("Likes/day: " + status.maxLikes);
        $("#story_set").html("Stories/day: " + status.maxStories);
        $("#comment_set").html("DMs/day: " + status.maxComments);

        $("#set-follow-check").prop("checked", status.StartFollow);
        $("#set-unfollow-check").prop("checked", status.StartUnfollow);
        $("#set-story-check").prop("checked", status.StartStory);
        $("#set-like-check").prop("checked", status.StartLike);
        $("#set-comment-check").prop("checked", status.StartComment);
    } else if (dashboardMode == 2) {
        $("#follow-pool-twitter-num").text(status.FollowedPoolTwitter.length);
        $("#like-pool-twitter-num").text(status.LikedMediaTwitter.length);
        $("#customRangeTwitterFollows").val(status.MaxTwitterFollows);
        $("#customRangeTwitterLikes").val(status.MaxTwitterLikes);

        $("#follow_twitter_set").html("Retweets/day: " + status.MaxTwitterFollows);
        $("#like_twitter_set").html("Likes/day: " + status.MaxTwitterLikes);

        $("#set-follow-twitter-check").prop("checked", status.StartTwitterFollow);
        $("#set-like-twitter-check").prop("checked", status.StartTwitterLike);
    } else if (dashboardMode == 3) {


        $("#like-pool-tinder-num").text(status.LikedMediaTinder.length);
        $("#customRangeTinderLikes").val(status.MaxTinderLikes);
        $("#customRangeTinderComments").val(status.maxTinderComments);
        $("#comment_tinder_set").html("DMs/day: " + status.maxTinderComments);

        $("#like_tinder_set").html("Likes/day: " + status.MaxTinderLikes);
        $("#set-comment-tinder-check").prop("checked", status.StartComment);

        $("#set-like-tinder-check").prop("checked", status.StartTinderLike);
    } else if (dashboardMode == 5) {
        linkedin_data = status.linkedin_data;
        $("#follow-pool-linkedin-num").text(status.FollowedPoolLinkedin.length);

        $("#like-pool-linkedin-num").text(status.linkedin_data.length);
        $("#customRangeLinkedinLikes").val(status.MaxLinkedinLikes);
        $("#customRangeLinkedinFollows").val(status.maxLinkedinFollows);
        $("#follow_linkedin_set").html("Connections/day: " + status.MaxLinkedinFollows);

        $("#like_linkedin_set").html("Leads/day: " + status.MaxLinkedinLikes);
        $("#set-follow-Linkedin-check").prop("checked", status.StartLinkedinFollow);

        $("#set-like-Linkedin-check").prop("checked", status.StartLinkedinLike);
    }
    if (status.CurrentUser) {

        $("#overlay").hide();


        $(".img-current-user").attr("src", status.CurrentUser.user_pic_url);
        $(".img-current-user").show();
        if (typeof CurrentUser != "undefined" && CurrentUser.username != status.CurrentUser.username && status.CurrentUser.username.length > 0) {
            SendMessage("LoadAccount", "account", status.CurrentUser.username);

        }
        CurrentUser = status.CurrentUser;

        if (CurrentUser.username.length > 0 && postedInst == false) {
            postedInst = true;
            user_email = $("#email").attr("name");
            var user_plan = $("#plan").attr("name");

            $.post('https://instoo.com/user/postInst', {
                    email: user_email,
                    username: CurrentUser.username
                },
                function(returnedData) {
                    if (returnedData && returnedData.length > 1 && user_plan != "lifetime") {
                        $("#trial").show();
                        SetFollowValue(false);
                        SetUnfollowValue(false);
                        SetStoryValue(false);
                        $("#set-story-check").prop("checked", false);

                        $("#set-follow-check").prop("checked", false);
                        $("#set-unfollow-check").prop("checked", false);
                        $("#set-story-check").prop("checked", false);
                        $("#set-like-check").prop("checked", false);
                        $("#set-comment-check").prop("checked", false);
                    }
                });
        }

        $("#accounts").val(CurrentUser.username);

        if (started == false) {


            $("#errors").html("");
            var user_plan ="lifetime";
     
     
            if (status.CurrentUser.user_id) {
                var data2 = status.user_stats;
                if ($("#data2").attr("name") && $("#data2").attr("name").length > 2) {
                    data2 = [];
                }
                var chart_data = null;
                chart_data = [];
                follower_data = data2;
                var min = 10000000;
                var max = 0;

                var dailys = [];
                daily_data = dailys;
                var minimum = 10000;
                var labels = [];
                var counter = 0;
                var minimum = 10000;
                var labels = [];
                for (var index = data2.length - 1; index > data2.length - 100; index--) {
                    if (index >= 0) {
                        var obj = data2[index];
                        if (CurrentUser && obj.user_id == CurrentUser.user_id && (chart_data.length < 2 || Math.abs(parseInt(obj.followers) - chart_data[chart_data.length - 1]) < 200)) {
                            chart_data.push(
                                parseInt(obj.followers)
                            );
                            if (obj.followers > max) {
                                max = obj.followers;
                            }

                            if (obj.followers < min) {
                                min = obj.followers;
                            }
                            labels.push(counter);
                            counter++;
                            if (parseInt(obj.followers) < minimum) {
                                minimum = parseInt(obj.followers);
                            }
                        }
                    }
                }
                chart_data.reverse();

                if (chart_data.length > 1) {
                    $('#growth').html(max - min);
                    if (max - min > 100) {
                    }
                }
                let config = {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Instagram Followers',
                            backgroundColor: window.chartColors.red,
                            borderColor: window.chartColors.red,
                            data: chart_data,
                            fill: false,
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,

                        responsive: true,
                        title: {
                            display: false,
                            text: 'Followers'
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false,
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Hour'
                                }
                            }],
                            yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Folowers'
                                }
                            }]
                        }
                    }
                };

                let ctx = document.getElementById('canvas').getContext('2d');
                ctx.height = 250;

                let myLine = new Chart(ctx, config);

            }




            started = true;
            if (status.hoursLeft > 0) {
                setTimeout(function() {
                    hoursLeft = 0;
                    $("#set-follow-check").prop("checked", false);
                    SetFollowValue(false);
                    $("#set-like-check").prop("checked", false);
                    SetLikeValue(false);
                    $("#set-unfollow-check").prop("checked", false);
                    SetUnfollowValue(false);
                    $("#set-unfollow-check").prop("checked", false);
                    SetUnfollowValue(false);
                    SendMessage("ZeroHour", "Database", "obj");

                    SetStoryValue(false);
                    $("#set-story-check").prop("checked", false);

                    $("#errors").html("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>Congrats! Instoo has run for a full day. All actions turned off after 8 hours automatically. Turn it on again tomorrow to grow constantly daily =)</div>");
                    var data2 = [];
                    if ($("#data2").attr("name") && $("#data2").attr("name").length > 2) {
                        data2 = [];
                    }
                    var chart_data = null;
                    chart_data = [];
                    var minimum = 10000;
                    var labels = [];
                    var min = 10000000;
                    var max = 0;


                    for (var index = 0; index < data2.length; index++) {
                        var obj = data2[index];
                        if (CurrentUser && obj.user_id == CurrentUser.user_id) {
                            chart_data.push(
                                parseInt(obj.followers)
                            );

                        }

                    }

                    for (var kk = chart_data.length - 1; kk > chart_data.length - 11; kk--) {
                        if (chart_data[kk] < last_ten_min) {
                            last_ten_min = chart_data[kk];
                        }
                        if (chart_data[kk] > last_ten_max) {
                            last_ten_max = chart_data[kk];
                        }
                    }






                    var email_msg = "";
                    if (StoryPoolSize > 0 && Math.abs(last_ten_max - last_ten_min) > 5 && Math.abs(last_ten_max - last_ten_min) != 10000000 && Math.abs(last_ten_max - last_ten_min) < 1000) {
                        if (user_plan == "lifetime") {
                            email_msg = "Based on your activity logs, it appears you figured out how to use Instoo properly. We recommend a/b testing targets and photos to optimize your growth rate to 30-50 per day. Also increase your followers and following counter over 1000 to be able to use fast mode. If you have free time anytime, please consider leaving a short review: https://appsumo.com/instoo/#reviews";
                        } else {
                            email_msg = "Based on your activity logs, it appears you figured out how to use Instoo properly. We recommend a/b testing targets and photos to optimize your growth rate to 30-50 per day. Also increase your followers and following counter over 1000 to be able to use fast mode.";

                        }
                    }

                    if (Math.abs(last_ten_max - last_ten_min) < 5 && StoryPoolSize > 100 && Math.abs(last_ten_max - last_ten_min) == 0) {
                        email_msg = "Based on your activity logs, you did not gain followers despite running all day. We recommend changing targets and posting more photos with the same theme. Contact the live chat for help researching targets.";

                    }

                    if (Math.abs(last_ten_max - last_ten_min) < 5 && StoryPoolSize == 0 && activity_log.length == 0) {
                        email_msg = "Based on your activity logs, the bot did not actually run over 8 hours due to some setup issue. Please make sure to add 20 account targets, then enable the likes and follows switch. Then check the chrome is not de-activating the instagram tab by leaving it in focus for 1 hour. If chrome deactivates the tab, make sure to disable javascript throttling, and run Instoo in a chrome based browser by itself to multitask in chrome yourself. Contact the live chat for help researching targets.";

                    }

                    if (Math.abs(last_ten_max - last_ten_min) < 5 && LikePoolSize > 0 && StoryPoolSize / LikePoolSize > 10) {
                        email_msg = "Based on your activity logs, you ran many stories but few likes. It is possible chrome is de-activating the tab to save CPU. To test this theory, lease Instagram in focus while Instoo runs for 1 hour. You can run Instoo in another chrome based browser to solve this problem. Contact the live chat for help researching targets."
                    }


                    if (Math.abs(last_ten_max - last_ten_min) < 5 && StoryPoolSize > 0 && LikePoolSize == 0 && FollowedPoolSize == 0) {
                        email_msg = "Based on your activity logs, only stories ran. Please check this article to fix: https://help.instoo.com/kb/337/690/stories-only-working-but-not-likesfollowsunfollows. Contact the live chat for help researching targets.";
                    }

                    if (Math.abs(last_ten_max - last_ten_min) < 5 && StoryPoolSize > 0 && LikePoolSize > 0 && FollowedPoolSize == 0) {
                        email_msg = "Based on your activity logs, only stories + likes ran. We highly recommend using follows as well to trigger the Instagram promotion algorithm and achieve the average growth rates on fast mode. Contact the live chat for help researching targets.";
                    }

                    if(last_ten_min != 100000 && 
                        last_ten_max != 0){
                 
                }else{
                  
                }

                }, status.hoursLeft * 60 * 60 * 1000);
            }else{


                $("#set-follow-check").prop("checked", false);
                SetFollowValue(false);
                $("#set-like-check").prop("checked", false);
                SetLikeValue(false);
                $("#set-unfollow-check").prop("checked", false);
                SetUnfollowValue(false);
                $("#set-unfollow-check").prop("checked", false);
                SetUnfollowValue(false);

                SetStoryValue(false);
                $("#set-story-check").prop("checked", false);

                $("#errors").html("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>Congrats! Instoo has run for a full day. All actions turned off after 8 hours automatically. Turn it on again tomorrow to grow constantly daily =) Click 'reset limits' on the settings page if the daily 8 hour counter has not reset today accidentally.</div>");
             
            }
            console.log("Hours left: " + status.hoursLeft * 60 * 60 * 1000);
            console.log(hoursLeft);
            console.log(status.hoursLeft);
            hoursLeft = status.hoursLeft;
            var loaded = false;

            var obj = [];
            SendMessage("loadLocal", "Database", "obj");



            

            getFollowers();

        }


    }






    UpdateCollectJobStatus(status.AccountTargets);
   if (status.StoryTime.Time / status.StoryTime.Max < -.05 && $("#set-story-check").is(':checked')) {

        $("#errors").html("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>You have not added any targets. Please add some account targets.</div>");
    }
    if (status.StartStory) {
        $("#container").html((status.StoryTime.Time).toFixed(0) + " seconds till next action<br>" + hoursLeft + " Hours Left Today");
    }


    if (mode == "twitter" && (status.StartTwitterLike || status.StartTwitterFollow)) {
        $("#container").html((status.TwitterTime.Time).toFixed(0) + " seconds till next action<br>" + hoursLeft + " Hours Left Today");
    }

    if (mode == "tiktok" && (status.StartTikTokLike || status.StartTikTokFollow)) {
        $("#container").html((status.TikTokTime.Time).toFixed(0) + " seconds till next action<br>" + hoursLeft + " Hours Left Today");
    }

    if (mode == "facebook" && (status.StartfacebookLike || status.StartfacebookFollow)) {
        $("#container").html((status.facebookTime.Time).toFixed(0) + " seconds till next action<br>" + hoursLeft + " Hours Left Today");
    }


    var d = new Date();

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
        licenseStatus = "unknown";
    }
    if (licenseStatus) {
        if (licenseStatus === "Full") {
            window.localStorage.setItem('instooislicensed', 'true');
            extensionIconSettings({
                color: [0, 0, 0, 0]
            }, "", "Instoo is enabled.");
        } else if (licenseStatus === "None") {
            extensionIconSettings({
                color: [0, 0, 0, 0]
            }, "", "Instoo is enabled.");
           
        } else if (licenseStatus === "Free") {
            window.localStorage.setItem('instooislicensed', 'true');
            extensionIconSettings({
                color: [255, 0, 0, 0]
            }, "", window.localStorage.getItem('daysLeftInappnameTrial') + " days left in free trial.");
        } else if (licenseStatus === "unknown") {
           
            $("#purchase").hide();

            window.localStorage.setItem('instooislicensed', 'false');
            extensionIconSettings({
                color: [0, 0, 0, 0]
            }, "", "Instoo is enabled.");
        }
    }
    window.localStorage.setItem('appnameLicenseCheckComplete', 'true');
}


function parseLicense(license) {
    var TRIAL_PERIOD_DAYS = 300;
    var licenseStatusText;
    var licenceStatus;


    if (license.result && license.accessLevel == "FULL") {

        start_license = parseInt(license.createdTime, 10);




        $("#purchase").hide();
        $("#upgrade").hide();
        $(".sub-user").hide();

        paid_sub = true;

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
         
            $("#upgrade").hide();
    LicenseStatus = "Free";
        } else {
           

            LicenseStatus = "None";
        }
    } else {

        $("#upgrade").show();


        LicenseStatus = "None";
   
    }




    if (license.createdTime != null) {

        start_license = parseInt(license.createdTime, 10);

    }
    return LicenseStatus;
}




function xhrWithAuth(method, url, interactive, callback) {
    var retry = true;
    var access_token;
    getToken();

    function getToken() {
        chrome.identity.getAuthToken({
            interactive: interactive
        }, function(token) {
            if (chrome.runtime.lastError) {
                callback(chrome.runtime.lastError);
                return;
            }
            access_token = token;
            requestStart();
        });
    }

    function requestStart() {
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
                    callback(null, xhr.status, xhr.response);
                }
            } else {
            }
        }
        try {
            xhr.send();
        } catch (e) {
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
    <div class="col-md-2"> ` + i + `. <a href='https://www.instagram.com/` + user.username + `/' target='_blank'><img class='backup_picture img-rounded' width='64'  height='64' src='` + user.user_pic_url + `'/></a></div>
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
    <td> ` + i + `. <a href='https://www.instagram.com/` + user.username + `/' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` + user.user_pic_url + `'/></a></td>
    <td class='align-mid-vertical text-instafollow-td'>` + user.username + `</td><td class='text-instafollow-td align-mid-vertical'>` + user.full_name + `</td>
    <td style="vertical-align: middle;">
    <button class="btn-danger remove-user-whitelist" user_id=` + user.user_id + `><i class="fas fa-times"></i></button></td>
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
    ////////console.log(Jobs);
    for (var i = 0; i < Jobs.length; i++) {
        var user = Jobs[i];

        if (user != null) {
            added_tags.push(user);

            var index = global_accounts.indexOf(user + "<br>");
            if (index == -1) {
                global_accounts.push(user + "<br>");
            }

            var userRow = `
    <tr><td style="vertical-align: middle;">
    <button class="btn-danger remove-user-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
    <td class='align-mid-vertical text-instafollow-td'><a href='https://www.instagram.com/` + user + `/' target='_blank'>@
    ` + user + `</a></td>
    
    </tr>
    `;
            $(collect_table).prepend(userRow);
        }
    }
}

function UpdateCollectTags(Jobs) {
    var tag_block = $("#collect-tags-block");
    var tag_table = $(tag_block).find("tbody");
    $(tag_table).empty();
    var added_tags = [];
    for (var i = 0; i < Jobs.length; i++) {
        var index = global_tags.indexOf(Jobs[i].tag_name + "<br>");
        if (index == -1) {
            global_tags.push(Jobs[i].tag_name + "<br>");
        }

        var user = Jobs[i].tag_name;
        if (true) {
            added_tags.push(user);

            var userRow = `
    <tr><td style="vertical-align: middle;">
    <button class="btn-danger remove-tag-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
    <td>#</td>
    <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
    
    </tr>
    `;
            $(tag_table).prepend(userRow);
        }
    }
}

function HandleError(Error) {


}
var current_edit = 0;

window.addEventListener("message", (event) => {

    if (event.data.mode == "email") {
        linkedin_data[event.data.edit].email = prompt("Enter new email:");

    }

    if (event.data.mode == "sales") {
        linkedin_data[event.data.edit].sales = prompt("Enter new sales:");

    }
    if (event.data.mode == "target") {
        linkedin_data[event.data.edit].target = prompt("Enter new target:");

    }
    if (event.data.mode == "website") {
        linkedin_data[event.data.edit].website = prompt("Enter new website:");

    }
    if (event.data.mode == "connected") {
        linkedin_data[event.data.edit].connected = prompt("Enter new connected:");

    }
    if (event.data.mode == "birthday") {
        linkedin_data[event.data.edit].birthday = prompt("Enter new birthday:");

    }
    if (event.data.mode == "twitter") {
        linkedin_data[event.data.edit].twitter = prompt("Enter new twitter:");

    }
    if (event.data.mode == "Instaemail") {
        instagram_data[event.data.edit].email = prompt("Enter new email:");

    }

    if (event.data.mode == "Instasales") {
        instagram_data[event.data.edit].sales = prompt("Enter new sales:");

    }
    if (event.data.mode == "Instatarget") {
        instagram_data[event.data.edit].target = prompt("Enter new target:");

    }
    if (event.data.mode == "Instawebsite") {
        instagram_data[event.data.edit].website = prompt("Enter new website:");

    }
    if (event.data.mode == "Instaconnected") {
        instagram_data[event.data.edit].connected = prompt("Enter new connected:");

    }
    if (event.data.mode == "Instabirthday") {
        instagram_data[event.data.edit].birthday = prompt("Enter new birthday:");

    }
    if (event.data.mode == "Instatwitter") {
        instagram_data[event.data.edit].twitter = prompt("Enter new twitter:");

    }

    SendMessage("UpdateInstagramData", "instagram_data", instagram_data);
    var target_dic = {};

    SendMessage("UpdateLinkedinData", "linkedin_data", linkedin_data);
    var like_block = $("#crm-table");
    var like_table = $(like_block).find("tbody");
    $(like_table).empty();
    var html = "<br><br><table style='  border: 1px solid black; padding:10px; width:100%;'><tr><td></td><td>Contact</td><td>Email</td><td>Sales</td><td>Target</td><td>Website</td><td>Twitter</td><td>Birthday</td><td>Connected</td></tr>";
    for (var i = 0; i < linkedin_data.length; i++) {
        if (typeof linkedin_data[i] != "undefined")
            html += "<tr><td><img width='100px' src='" + linkedin_data[i].img + "'></img></td><td><a target='_blank' rel='noopener noreferrer' href='https://linkedin" + linkedin_data[i].url.split("linkedin")[1] + "'>" + linkedin_data[i].username + "</a></td><td><a href='#' onclick='editEmail(" + i + ")'>" + linkedin_data[i].email + "</a></td><td><a href='#' onclick='editSales(" + i + ")'>" + linkedin_data[i].sales + "</a></td><td><a href='#' onclick='editTargret(" + i + ")'>" + linkedin_data[i].target + "</a></td><td><a href='#' onclick='editWebsite(" + i + ")'>" + linkedin_data[i].website + "</a></td><td><a href='#' onclick='editTwitter(" + i + ")'>" + linkedin_data[i].twitter + "</a></td><td><a href='#' onclick='editBirthday(" + i + ")'>" + linkedin_data[i].birthday + "</a></td><td><a href='#' onclick='editConnected(" + i + ")'>" + linkedin_data[i].connected + "</a></td></tr>";
        if (linkedin_data[i].target in target_dic) {
            target_dic[linkedin_data[i].target].leads++;
            target_dic[linkedin_data[i].target].sales += parseInt(linkedin_data[i].sales);
            if (linkedin_data[i].connected != "none") {
                target_dic[linkedin_data[i].target].connected++;
            }
        } else {
            var did_connect = 0;
            if (linkedin_data[i].connected != "none") {
                did_connect = 1;
            }


            target_dic[linkedin_data[i].target] = {
                leads: 1,
                sales: parseInt(linkedin_data[i].sales),
                connected: did_connect
            };
        }

    }


    for (var i = 0; i < instagram_data.length; i++) {
        if (typeof instagram_data[i] != "undefined")
            html += "<tr><td><img width='100px' src='" + instagram_data[i].img + "'></img></td><td><a target='_blank' rel='noopener noreferrer' href='" + instagram_data[i].url + "'>" + instagram_data[i].username + "</a></td><td><a href='#' onclick='editInstaEmail(" + i + ")'>" + instagram_data[i].email + "</a></td><td><a href='#' onclick='editInstaSales(" + i + ")'>" + instagram_data[i].sales + "</a></td><td><a href='#' onclick='editInstaTargret(" + i + ")'>" + instagram_data[i].target + "</a></td><td><a href='#' onclick='editInstaWebsite(" + i + ")'>" + instagram_data[i].website + "</a></td><td><a href='#' onclick='editInstaTwitter(" + i + ")'>" + instagram_data[i].twitter + "</a></td><td><a href='#' onclick='editInstaBirthday(" + i + ")'>" + instagram_data[i].birthday + "</a></td><td><a href='#' onclick='editInstaConnected(" + i + ")'>" + instagram_data[i].connected + "</a></td></tr>";
        if (instagram_data[i].target in target_dic) {
            target_dic[instagram_data[i].target].leads++;
            target_dic[instagram_data[i].target].sales += parseInt(instagram_data[i].sales);
            if (instagram_data[i].connected != "none") {
                target_dic[instagram_data[i].target].connected++;
            }
        } else {

            var did_connect = 0;
            if (instagram_data[i].connected != "none") {
                did_connect = 1;
            }

            target_dic[instagram_data[i].target] = {
                leads: 1,
                sales: parseInt(instagram_data[i].sales),
                connected: did_connect
            };
        }

    }
    html += "</table><script>function editInstaConnected(num){ window.postMessage({mode: 'Instaconnected' ,edit: num} , '*');} function editInstaBirthday(num){ window.postMessage({mode: 'Instabirthday' ,edit: num} , '*');}function editInstaTwitter(num){ window.postMessage({mode: 'Instatwitter' ,edit: num} , '*');} function editInstaWebsite(num){ window.postMessage({mode: 'Instawebsite' ,edit: num} , '*');} function editInstaTarget(num){ window.postMessage({mode: 'Instatarget' ,edit: num} , '*');} function editInstaSales(num){ window.postMessage({mode: 'Instasales' ,edit: num} , '*');}function editInstaEmail(num){ window.postMessage({mode: 'Instaemail' ,edit: num} , '*');}function editConnected(num){ window.postMessage({mode: 'connected' ,edit: num} , '*');} function editBirthday(num){ window.postMessage({mode: 'birthday' ,edit: num} , '*');}function editTwitter(num){ window.postMessage({mode: 'twitter' ,edit: num} , '*');} function editWebsite(num){ window.postMessage({mode: 'website' ,edit: num} , '*');} function editTarget(num){ window.postMessage({mode: 'target' ,edit: num} , '*');} function editSales(num){ window.postMessage({mode: 'sales' ,edit: num} , '*');}function editEmail(num){ window.postMessage({mode: 'email' ,edit: num} , '*');}</script>";
    $(like_block).html(html);

    var target_block = $("#target-table");
    var target_table = $(target_block).find("tbody");
    $(target_table).empty();
    var html_target = "<br><br><table style='  border: 1px solid black; padding:10px; width:100%;'><tr><td>Target</td><td>Sales</td><td>Leads</td><td>Gained Followers</td></tr>";
    for (var key in target_dic) {
        if (target_dic.hasOwnProperty(key)) {
            html_target += "<tr><td>" + key + "</td><td>" + target_dic[key].sales + "</td><td> " + target_dic[key].leads + "</td><td>" + target_dic[key].connected + "</td></tr>";
        }

    }
    html_target += "</table>";

    $(target_block).html(html_target);


});

function UpdateMediaStatus(Status) {
    if (mode == "crm") {
        var like_block = $("#crm-table");
        linkedin_data = Status.linkedin_data;
        instagram_data = Status.instagram_data;
        var target_dic = {};
        var like_table = $(like_block).find("tbody");
        $(like_table).empty();
        var html = "<br><br><table style='  border: 1px solid black; padding:10px; width:100%;'><tr><td></td><td>Contact</td><td>Email</td><td>Sales</td><td>Target</td><td>Website</td><td>Twitter</td><td>Birthday</td><td>Connected</td></tr>";
        for (var i = 0; i < linkedin_data.length; i++) {
            if (typeof linkedin_data[i] != "undefined")
                html += "<tr><td><img width='100px' src='" + linkedin_data[i].img + "'></img></td><td><a target='_blank' rel='noopener noreferrer' href='https://linkedin" + linkedin_data[i].url.split("linkedin")[1] + "'>" + linkedin_data[i].username + "</a></td><td><a href='#' onclick='editEmail(" + i + ")'>" + linkedin_data[i].email + "</a></td><td><a href='#' onclick='editSales(" + i + ")'>" + linkedin_data[i].sales + "</a></td><td><a href='#' onclick='editTargret(" + i + ")'>" + linkedin_data[i].target + "</a></td><td><a href='#' onclick='editWebsite(" + i + ")'>" + linkedin_data[i].website + "</a></td><td><a href='#' onclick='editTwitter(" + i + ")'>" + linkedin_data[i].twitter + "</a></td><td><a href='#' onclick='editBirthday(" + i + ")'>" + linkedin_data[i].birthday + "</a></td><td><a href='#' onclick='editConnected(" + i + ")'>" + linkedin_data[i].connected + "</a></td></tr>";
            if (linkedin_data[i].target in target_dic) {
                target_dic[linkedin_data[i].target].leads++;
                target_dic[linkedin_data[i].target].sales += parseInt(linkedin_data[i].sales);
                if (linkedin_data[i].connected != "none") {
                    target_dic[linkedin_data[i].target].connected++;
                }
            } else {
                var did_connect = 0;
                if (linkedin_data[i].connected != "none") {
                    did_connect = 1;
                }


                target_dic[linkedin_data[i].target] = {
                    leads: 1,
                    sales: parseInt(linkedin_data[i].sales),
                    connected: did_connect
                };
            }
        }

        for (var i = 0; i < instagram_data.length; i++) {
            if (typeof instagram_data[i] != "undefined")
                html += "<tr><td><img width='100px' src='" + instagram_data[i].img + "'></img></td><td><a target='_blank' rel='noopener noreferrer' href='" + instagram_data[i].url + "'>" + instagram_data[i].username + "</a></td><td><a href='#' onclick='editInstaEmail(" + i + ")'>" + instagram_data[i].email + "</a></td><td><a href='#' onclick='editInstaSales(" + i + ")'>" + instagram_data[i].sales + "</a></td><td><a href='#' onclick='editInstaTargret(" + i + ")'>" + instagram_data[i].target + "</a></td><td><a href='#' onclick='editInstaWebsite(" + i + ")'>" + instagram_data[i].website + "</a></td><td><a href='#' onclick='editInstaTwitter(" + i + ")'>" + instagram_data[i].twitter + "</a></td><td><a href='#' onclick='editInstaBirthday(" + i + ")'>" + instagram_data[i].birthday + "</a></td><td><a href='#' onclick='editInstaConnected(" + i + ")'>" + instagram_data[i].connected + "</a></td></tr>";
            if (instagram_data[i].target in target_dic) {
                target_dic[instagram_data[i].target].leads++;
                target_dic[instagram_data[i].target].sales += parseInt(instagram_data[i].sales);
                if (instagram_data[i].connected != "none") {
                    target_dic[instagram_data[i].target].connected++;
                }
            } else {

                var did_connect = 0;
                if (instagram_data[i].connected != "none") {
                    did_connect = 1;
                }

                target_dic[instagram_data[i].target] = {
                    leads: 1,
                    sales: parseInt(instagram_data[i].sales),
                    connected: did_connect
                };
            }
        }
        html += "</table><script>function editInstaConnected(num){ window.postMessage({mode: 'Instaconnected' ,edit: num} , '*');} function editInstaBirthday(num){ window.postMessage({mode: 'Instabirthday' ,edit: num} , '*');}function editInstaTwitter(num){ window.postMessage({mode: 'Instatwitter' ,edit: num} , '*');} function editInstaWebsite(num){ window.postMessage({mode: 'Instawebsite' ,edit: num} , '*');} function editInstaTarget(num){ window.postMessage({mode: 'Instatarget' ,edit: num} , '*');} function editInstaSales(num){ window.postMessage({mode: 'Instasales' ,edit: num} , '*');}function editInstaEmail(num){ window.postMessage({mode: 'Instaemail' ,edit: num} , '*');}function editConnected(num){ window.postMessage({mode: 'connected' ,edit: num} , '*');} function editBirthday(num){ window.postMessage({mode: 'birthday' ,edit: num} , '*');}function editTwitter(num){ window.postMessage({mode: 'twitter' ,edit: num} , '*');} function editWebsite(num){ window.postMessage({mode: 'website' ,edit: num} , '*');} function editTarget(num){ window.postMessage({mode: 'target' ,edit: num} , '*');} function editSales(num){ window.postMessage({mode: 'sales' ,edit: num} , '*');}function editEmail(num){ window.postMessage({mode: 'email' ,edit: num} , '*');}</script>";
      

        $(like_block).prepend(html);


        var target_block = $("#target-table");
        var target_table = $(target_block).find("tbody");
        $(target_table).empty();
        var html_target = "<br><br><table style='  border: 1px solid black; padding:10px; width:100%;'><tr><td>Target</td><td>Sales</td><td>Leads</td><td>Gained Followers</td></tr>";
        for (var key in target_dic) {
            if (target_dic.hasOwnProperty(key)) {
                html_target += "<tr><td>" + key + "</td><td>" + target_dic[key].sales + "</td><td> " + target_dic[key].leads + "</td><td>" + target_dic[key].connected + "</td></tr>";
            }

        }
        html_target += "</table>";

        $(target_block).html(html_target);

    } else
    if (mode == "instagram") {
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
    <button class="btn-danger remove-tag-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
    <td>#</td>
    <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
    
    </tr>
    `;
                $(tag_table).prepend(userRow);
            }
        }
        var tag_block2 = $("#collect-locations-block");
        var tag_table2 = $(tag_block2).find("tbody");
        $(tag_table2).empty();
        for (var i = 0; i < Status.Locations.length; i++) {
            if (index == -1) {
            }

            var user = Status.Locations[i].tag_name;
            if (true) {
                added_tags.push(user);

                var userRow = `
    <tr><td style="vertical-align: middle;">
    <button class="btn-danger remove-location-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
    
    <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
    
    </tr>
    `;
                $(tag_table2).prepend(userRow);
            }
        }

       var tag_block3 = $("#collect-comments-block");
        var tag_table3 = $(tag_block3).find("tbody");
        $(tag_table3).empty();
        for (var i = 0; i < Status.Comments.length; i++) {
            if (index == -1) {
            }

            var user = Status.Comments[i].tag_name;
            if (true) {
                added_tags.push(user);

                var userRow = `
    <tr><td style="vertical-align: middle;">
    <button class="btn-danger remove-comment-collect" user_id="` + user + `"><i class="fas fa-times"></i></button></td>
    
    <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
    
    </tr>
    `;
                $(tag_table3).prepend(userRow);
            }
        }

 
    } else if (mode == "twitter") {
        var like_block = $("#like-twitter-block");
        var like_table = $(like_block).find("tbody");
        $(like_table).empty();

        for (var i = 0; i < Status.LikedMediaTwitter.length; i++) {
            if (Status.LikedMediaTwitter[i]) {
                OnLikedMediaTwitter(Status.LikedMediaTwitter[i]);
            }
        }
        var follow_block = $("#follow-block-twitter");
        var follow_table = $(follow_block).find("tbody");
        $(follow_table).empty()

        for (var i = 0; i < Status.FollowedPoolTwitter.length; i++) {
            if (Status.FollowedPoolTwitter[i]) {
                OnFollowedUserTwitter(Status.FollowedPoolTwitter[i]);
            }
        }

        var tag_block = $("#collect-tags-block");
        var tag_table = $(tag_block).find("tbody");
        $(tag_table).empty();
        var added_tags = [];
        for (var i = 0; i < Status.TagPoolTwitter.length; i++) {
            var index = global_tags.indexOf(Status.TagPoolTwitter[i].tag_name + "<br>");
            if (index == -1) {
                global_tags.push(Status.TagPoolTwitter[i].tag_name + "<br>");
            }

            var user = Status.TagPoolTwitter[i].tag_name;
            if (true) {
                added_tags.push(user);

                var userRow = `
    <tr><td style="vertical-align: middle;">
    <button class="btn-danger remove-tag-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
    <td></td>
    <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
    
    </tr>
    `;
                $(tag_table).prepend(userRow);
            }
        }

    } else if (mode == "tiktok") {
        var like_block = $("#like-tiktok-block");
        var like_table = $(like_block).find("tbody");
        $(like_table).empty();

        for (var i = 0; i < Status.LikedMediaTikTok.length; i++) {
            OnLikedMediaTikTok(Status.LikedMediaTikTok[i]);
        }
        var follow_block = $("#follow-block-tiktok");
        var follow_table = $(follow_block).find("tbody");
        $(follow_table).empty()

        for (var i = 0; i < Status.FollowedPoolTikTok.length; i++) {
            OnFollowedUserTikTok(Status.FollowedPoolTikTok[i]);
        }

        var tag_block = $("#collect-tags-block");
        var tag_table = $(tag_block).find("tbody");
        $(tag_table).empty();
        var added_tags = [];
        for (var i = 0; i < Status.TagsTikTok.length; i++) {
            var index = global_tags.indexOf(Status.TagsTikTok[i].tag_name + "<br>");
            if (index == -1) {
                global_tags.push(Status.TagsTikTok[i].tag_name + "<br>");
            }

            var user = Status.TagsTikTok[i].tag_name;
            if (true) {
                added_tags.push(user);

                var userRow = `
    <tr><td style="vertical-align: middle;">
    <button class="btn-danger remove-tag-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
    <td>#</td>
    <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
    
    </tr>
    `;
                $(tag_table).prepend(userRow);
            }
        }

    } else if (mode == "facebook") {
        var like_block = $("#like-facebook-block");
        var like_table = $(like_block).find("tbody");
        $(like_table).empty();

        for (var i = 0; i < Status.LikedMediafacebook.length; i++) {
            OnLikedMediafacebook(Status.LikedMediafacebook[i]);
        }
        var follow_block = $("#follow-block-facebook");
        var follow_table = $(follow_block).find("tbody");
        $(follow_table).empty()

        for (var i = 0; i < Status.FollowedPoolfacebook.length; i++) {
            OnFollowedUserfacebook(Status.FollowedPoolfacebook[i]);
        }

        var tag_block = $("#collect-tags-block");
        var tag_table = $(tag_block).find("tbody");
        $(tag_table).empty();
        console.log(Status);
        var added_tags = [];
        for (var i = 0; i < Status.Tagsfacebook.length; i++) {
            var index = global_tags.indexOf(Status.Tagsfacebook[i].tag_name + "<br>");
            if (index == -1) {
                global_tags.push(Status.Tagsfacebook[i].tag_name + "<br>");
            }

            var user = Status.Tagsfacebook[i].tag_name;
            if (true) {
                added_tags.push(user);

                var userRow = `
    <tr><td style="vertical-align: middle;">
    <button class="btn-danger remove-tag-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
    <td>#</td>
    <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
    
    </tr>
    `;
                $(tag_table).prepend(userRow);

            }
        }



        var tag_block = $("#collect-accounts-block");
        var tag_table = $(tag_block).find("tbody");
        $(tag_table).empty();
        console.log(Status);
        var added_tags = [];
        for (var i = 0; i < Status.AccountPoolfacebook.length; i++) {
            var index = global_tags.indexOf(Status.AccountPoolfacebook[i].tag_name + "<br>");
            if (index == -1) {
                global_tags.push(Status.AccountPoolfacebook[i].tag_name + "<br>");
            }

            var user = Status.AccountPoolfacebook[i].tag_name;
            if (true) {
                added_tags.push(user);

                var userRow = `
    <tr><td style="vertical-align: middle;">
    <button class="btn-danger remove-tag-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
    <td>#</td>
    <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
    
    </tr>
    `;
                $(tag_table).prepend(userRow);


            }

        }

    } else if (mode == "pinterest") {
        var like_block = $("#like-pinterest-block");
        var like_table = $(like_block).find("tbody");
        $(like_table).empty();

        for (var i = 0; i < Status.LikedMediaPinterest.length; i++) {
            OnLikedMediaPinterest(Status.LikedMediaPinterest[i]);
        }
        var follow_block = $("#follow-block-pinterest");
        var follow_table = $(follow_block).find("tbody");
        $(follow_table).empty()

        for (var i = 0; i < Status.FollowedPoolPinterest.length; i++) {
            OnFollowedUserPinterest(Status.FollowedPoolPinterest[i]);
        }

        var tag_block = $("#collect-tags-block");
        var tag_table = $(tag_block).find("tbody");
        $(tag_table).empty();
        var added_tags = [];
        for (var i = 0; i < Status.TagsPinterest.length; i++) {
            var index = global_tags.indexOf(Status.TagsPinterest[i].tag_name + "<br>");
            if (index == -1) {
                global_tags.push(Status.TagsPinterest[i].tag_name + "<br>");
            }

            var user = Status.TagsPinterest[i].tag_name;
            if (true) {
                added_tags.push(user);

                var userRow = `
    <tr><td style="vertical-align: middle;">
    <button class="btn-danger remove-tag-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
    <td>#</td>
    <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
    
    </tr>
    `;
                $(tag_table).prepend(userRow);
            }
        }

    } else if (mode == "linkedin") {
        var like_block = $("#like-linkedin-block");
        var like_table = $(like_block).find("tbody");
        $(like_table).empty();

        for (var i = 0; i < Status.linkedin_data.length; i++) {
            OnLikedMediaLinkedin(Status.linkedin_data[i]);
        }
        var tag_block = $("#collect-tags-block");
        var tag_table = $(tag_block).find("tbody");
        $(tag_table).empty();
        var added_tags = [];
        for (var i = 0; i < Status.TagPoolLinkedin.length; i++) {
            var index = global_tags.indexOf(Status.TagPoolLinkedin[i].tag_name + "<br>");
            if (index == -1) {
                global_tags.push(Status.TagPoolLinkedin[i].tag_name + "<br>");
            }

            var user = Status.TagPoolLinkedin[i].tag_name;
            if (true) {
                added_tags.push(user);

                var userRow = `
    <tr><td style="vertical-align: middle;">
    <button class="btn-danger remove-tag-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
    <td>#</td>
    <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
    
    </tr>
    `;
                $(tag_table).prepend(userRow);
            }
        }

    } else if (mode == "tinder") {

        var tag_block3 = $("#collect-comments-block");
        var tag_table3 = $(tag_block3).find("tbody");
        $(tag_table3).empty();
        for (var i = 0; i < Status.CommentsTinder.length; i++) {
     

            var user = Status.CommentsTinder[i].tag_name;
            if (true) {

                var userRow = `
    <tr><td style="vertical-align: middle;">
    <button class="btn-danger remove-comment-collect" user_id="` + user + `"><i class="fas fa-times"></i></button></td>
    
    <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
    
    </tr>
    `;
                $(tag_table3).prepend(userRow);
            }
        }

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
    var userRow = `
  <tr>
  <td><a href='https://www.instagram.com/` + user.username + `/' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` + user.user_pic_url + `'/></a></td>
  <td class='align-mid-vertical text-instafollow-td'>` + user.username + `</td><td class='text-instafollow-td align-mid-vertical'>` + user.full_name + `(@` + user.target + `)</td>
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

function OnFollowedUserTwitter(user) {
    var userRow = `
  <tr>
  <td><a href='` + user.url + `' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` + user.img + `'/></a></td>
  <td class='align-mid-vertical text-instafollow-td'>` + user.username + `</td><td class='text-instafollow-td align-mid-vertical'>` + user.username + `</td>
  </tr>
  `;

    var follow_block = $("#follow-block-twitter");
    var follow_table = $(follow_block).find("tbody");
    $(follow_table).prepend(userRow);

    var table_rows = $(follow_table).find("tr");
    var num_rows = table_rows.length;
    if (num_rows > DisplayFollowersNum) {
        var start_delete = num_rows - (num_rows - DisplayFollowersNum);
        $(table_rows).slice(start_delete).remove();
    }
}

function OnFollowedUserLinkedin(user) {
    var userRow = `
  <tr>
  <td><a href='` + user.url + `' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` + user.img + `'/></a></td>
  <td class='align-mid-vertical text-instafollow-td'>` + user.username + `</td><td class='text-instafollow-td align-mid-vertical'>` + user.username + `</td>
  </tr>
  `;

    var follow_block = $("#follow-block-linkedin");
    var follow_table = $(follow_block).find("tbody");
    $(follow_table).prepend(userRow);

    var table_rows = $(follow_table).find("tr");
    var num_rows = table_rows.length;
    if (num_rows > DisplayFollowersNum) {
        var start_delete = num_rows - (num_rows - DisplayFollowersNum);
        $(table_rows).slice(start_delete).remove();
    }
}

function OnFollowedUserPinterest(user) {
    //console.log(user);
    var userRow = `
  <tr>
  <td><a href='` + user.url + `' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` + user.img + `'/></a></td>
  <td class='align-mid-vertical text-instafollow-td'>` + user.username + `</td><td class='text-instafollow-td align-mid-vertical'>` + user.username + `</td>
  </tr>
  `;

    var follow_block = $("#follow-block-pinterest");
    var follow_table = $(follow_block).find("tbody");
    $(follow_table).prepend(userRow);

    var table_rows = $(follow_table).find("tr");
    var num_rows = table_rows.length;
    if (num_rows > DisplayFollowersNum) {
        var start_delete = num_rows - (num_rows - DisplayFollowersNum);
        $(table_rows).slice(start_delete).remove();
    }
}

function OnFollowedUserTikTok(user) {
    var userRow = `
  <tr>
  <td><a href='` + user.url + `' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` + user.img + `'/></a></td>
  <td class='align-mid-vertical text-instafollow-td'>` + user.username + `</td><td class='text-instafollow-td align-mid-vertical'>` + user.username + `</td>
  </tr>
  `;

    var follow_block = $("#follow-block-tiktok");
    var follow_table = $(follow_block).find("tbody");
    $(follow_table).prepend(userRow);

    var table_rows = $(follow_table).find("tr");
    var num_rows = table_rows.length;
    if (num_rows > DisplayFollowersNum) {
        var start_delete = num_rows - (num_rows - DisplayFollowersNum);
        $(table_rows).slice(start_delete).remove();
    }
}

function OnFollowedUserfacebook(user) {
    var userRow = `
  <tr>
  <td><a href='` + user.url + `' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` + user.img + `'/></a></td>
  <td class='align-mid-vertical text-instafollow-td'>` + user.username + `</td><td class='text-instafollow-td align-mid-vertical'>` + user.username + `</td>
  </tr>
  `;

    var follow_block = $("#follow-block-facebook");
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
    ////////////console.log(user);
    var userRow = `
  <tr>
  <td><a href='https://www.instagram.com/` + user.username + `/' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` + user.user_pic_url + `'/></a></td>
  <td class='align-mid-vertical text-instafollow-td'>` + user.username + `</td>
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

function OnLikedMediaLinkedin(media) {
    likeCount++;
    var mediaRow = `
  <tr>
  <td><a href='https://linkedin` + media.url.split("linkedin")[1] + `' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'   src='` + media.img + `'/></a></td>
  <td class='align-mid-vertical text-instafollow-td'>` + media.username + `</td>
  </tr>
  `;

    var like_bock = $("#like-linkedin-block");
    var like_table = $(like_bock).find("tbody");
    $(like_table).prepend(mediaRow);

    var table_rows = $(like_table).find("tr");
    var num_rows = table_rows.length;
    if (num_rows > DisplayLikesNum) {
        var start_delete = num_rows - (num_rows - DisplayLikesNum);
        $(table_rows).slice(start_delete).remove();
    }
}

function OnLikedMediaTwitter(media) {
    likeCount++;
    var mediaRow = `
  <tr>
  <td><a href='` + media.url + `' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'   src='` + media.img + `'/></a></td>
  <td class='align-mid-vertical text-instafollow-td'>` + media.username + `</td>
  </tr>
  `;

    var like_bock = $("#like-twitter-block");
    var like_table = $(like_bock).find("tbody");
    $(like_table).prepend(mediaRow);

    var table_rows = $(like_table).find("tr");
    var num_rows = table_rows.length;
    if (num_rows > DisplayLikesNum) {
        var start_delete = num_rows - (num_rows - DisplayLikesNum);
        $(table_rows).slice(start_delete).remove();
    }
}

function OnLikedMediaTinder(media) {
    likeCount++;
    var mediaRow = `
  <tr>
  <td><a href='https://` + media.url + `' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'   src='` + media.img + `'/></a></td>
  <td class='align-mid-vertical text-instafollow-td'>` + media.username + `</td>
  </tr>
  `;

    var like_bock = $("#like-tinder-block");
    var like_table = $(like_bock).find("tbody");
    $(like_table).prepend(mediaRow);

    var table_rows = $(like_table).find("tr");
    var num_rows = table_rows.length;
    if (num_rows > DisplayLikesNum) {
        var start_delete = num_rows - (num_rows - DisplayLikesNum);
        $(table_rows).slice(start_delete).remove();
    }
}

function OnLikedMediaPinterest(media) {
    likeCount++;
    var mediaRow = `
  <tr>
  <td><a href='` + media.url + `' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'   src='` + media.img + `'/></a></td>
  <td class='align-mid-vertical text-instafollow-td'>` + media.username + `</td>
  </tr>
  `;

    var like_bock = $("#like-pinterest-block");
    var like_table = $(like_bock).find("tbody");
    $(like_table).prepend(mediaRow);

    var table_rows = $(like_table).find("tr");
    var num_rows = table_rows.length;
    if (num_rows > DisplayLikesNum) {
        var start_delete = num_rows - (num_rows - DisplayLikesNum);
        $(table_rows).slice(start_delete).remove();
    }
}

function OnLikedMediaTikTok(media) {
    likeCount++;
    var mediaRow = `
  <tr>
  <td><a href='` + media.url + `' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'   src='` + media.img + `'/></a></td>
  <td class='align-mid-vertical text-instafollow-td'>` + media.username + `</td>
  </tr>
  `;

    var like_bock = $("#like-tiktok-block");
    var like_table = $(like_bock).find("tbody");
    $(like_table).prepend(mediaRow);

    var table_rows = $(like_table).find("tr");
    var num_rows = table_rows.length;
    if (num_rows > DisplayLikesNum) {
        var start_delete = num_rows - (num_rows - DisplayLikesNum);
        $(table_rows).slice(start_delete).remove();
    }
}

function OnLikedMediafacebook(media) {
    likeCount++;
    var mediaRow = `
  <tr>
  <td><a href='` + media.url + `' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'   src='` + media.img + `'/></a></td>
  <td class='align-mid-vertical text-instafollow-td'>` + media.username + `</td>
  </tr>
  `;

    var like_bock = $("#like-facebook-block");
    var like_table = $(like_bock).find("tbody");
    $(like_table).prepend(mediaRow);

    var table_rows = $(like_table).find("tr");
    var num_rows = table_rows.length;
    if (num_rows > DisplayLikesNum) {
        var start_delete = num_rows - (num_rows - DisplayLikesNum);
        $(table_rows).slice(start_delete).remove();
    }
}

function OnLikedMedia(media) {
    likeCount++;
    var mediaRow = `
  <tr>
  <td><a href='https://www.instagram.com/` + media.shortcode + `/' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'   src='` + media.media_src + `'/></a></td>
  <td class='align-mid-vertical text-instafollow-td'>` + media.shortcode + `</td>
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
  <td><a href='https://www.instagram.com` + media.shortcode + `' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` + media.media_src + `'/></a></td>
  <td class='align-mid-vertical text-instafollow-td'>` + media.caption + `</td>
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