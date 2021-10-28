var ComPort;
var CurrentUser;

var LastUsername = "";
var SharedData = null;

var UserTag = "._7UhW9";
var StartStory = false;

var msg_user = "";
var tag_dict = {};
var account_dict = {};
var that = this;
var image_src = "";
var story_set = false;



$(document).ready(function() {
    CreateComPort();
    console.log("SETUp!");
    if (window.location.href.includes("tag")) {
        window.scrollTo(0, document.body.scrollHeight);



      //  scrollTop(20);
    }
});

function SendMessage(tag, msgTag, msg) {
    var sendObj = {
        "Tag": tag
    };
    sendObj[msgTag] = msg;
    console.log(sendObj);
    console.log(ComPort);
    ComPort.postMessage(sendObj);
}


function CreateComPort() {
    ComPort = chrome.runtime.connect({
        name: "tiktok"
    });
    ComPort.onMessage.addListener(OnMessageReceive);

    window.addEventListener("message", function(event) {
        // We only accept messages from ourselves
        if (event.source != window)
            return;

        if (event.data.Tag && (event.data.Tag == "SharedData")) {
            SharedData = event.data.SharedData;
        }
    }, false);
}

function OnMessageReceive(msg) {
    console.log(msg);

    if (msg.Tag == "UpdateTikTok") {
        console.log(msg.story);
        if (true) {
            console.log("Start");

            var videos = document.getElementsByTagName('a');
            for (var kk = 0; kk < videos.length; kk++) {
                console.log(videos[kk]);
                console.log(videos[kk].getAttribute("class"));
                if (videos[kk].getAttribute("class").includes("result-item")) {
                    console.log(videos[kk].getAttribute("href"));

                    SendMessage("TikTokTarget", "target", videos[kk].getAttribute("href"));




                }
            }



        }
    } else if (msg.Tag == "LikeFollow") {

        console.log(msg.story);
        SendMessage("DoneTikTok", "target", "window.location.href");
        var vid = parseInt(Math.floor(Math.random() * 6) + 1 ) ;
        console.log(vid);
        var counter = 0;
        var videos = document.getElementsByTagName('a');
        for (var kk = 0; kk < videos.length; kk++) {
            console.log(counter);
            if (videos[kk].getAttribute("class") && videos[kk].getAttribute("class").includes("video-feed-item") ) {
                counter ++;
                if(counter == vid){
                    videos[kk].click();
                
                setTimeout(function() {
                    var username = window.location.href.split("/")[3];
                    console.log(window.location.href.split("/"));
                    var url = window.location.href;

                    var img = "https://instoo.com/logo.png";
                    var videos = document.getElementsByTagName('a');
                    for (var kk = 0; kk < videos.length; kk++) {
                        if (videos[kk].getAttribute("class") && videos[kk].getAttribute("class").includes("user-avatar")) {
                            console.log(videos[kk].firstElementChild.firstElementChild.src);
                            img = videos[kk].firstElementChild.firstElementChild.src;
                            break;
                        }
                    }
                    var msg_data = {
                        url: url,
                        username: username,
                        img: img,
                        website: "none",
                        twitter: "none",
                        sales: 0,
                        email: "none",
                        connected: "none"
                    };
                    SendMessage("DoneTikTokData", "User", msg_data);

                    if (msg.story.StartTikTokFollow && msg.story.FollowedPoolTikTokSize < msg.story.MaxTikTokFollows) {
                        //setTimeout(function() {
                        var buttons = document.getElementsByTagName('button');
                        console.log(buttons);
                        for (var jj = 0; jj < buttons.length; jj++) {
                            if (buttons[jj].getAttribute("class").includes("follow") && !buttons[jj].innerText.includes("Following")) {
                                buttons[jj].click();
                                break;
                            }

                        }
                        var url = window.location.href;
                        var username = window.location.href.split("/")[3];
                        console.log(window.location.href.split("/"));

                        var img = "https://instoo.com/logo.png";
                        var videos = document.getElementsByTagName('a');
                        for (var kk = 0; kk < videos.length; kk++) {
                            if (videos[kk].getAttribute("class") && videos[kk].getAttribute("class").includes("user-avatar")) {
                                console.log(videos[kk].firstElementChild.firstElementChild.src);
                                img = videos[kk].firstElementChild.firstElementChild.src;
                                break;
                            }
                        }

                        console.log(img);
                        console.log(username);
                        var msg_data = {
                            url: url,
                            username: username,
                            img: img
                        };
                        SendMessage("DoneTikTokFollow", "User", msg_data);

                        //}, 2000);
                    }

                    if (msg.story.StartTikTokLike && msg.story.LikedMediaTikTokSize < msg.story.MaxTikTokLikes) {
                        setTimeout(function() {
                            var buttons = document.getElementsByTagName('div');
                            console.log(buttons);
                            for (var jj = 0; jj < buttons.length; jj++) {
                                if (buttons[jj].getAttribute("class") && buttons[jj].getAttribute("class").includes("engagement-icon")) {
                                    buttons[jj].click();
                                    break;
                                }

                            }
                            var buttons = document.getElementsByTagName('span');
                            console.log(buttons);
                            for (var jj = 0; jj < buttons.length; jj++) {
                                if (buttons[jj].getAttribute("class") && buttons[jj].getAttribute("class").includes("icons like")) {
                                    buttons[jj].click();
                                    break;
                                }

                            }
                            var url = window.locatio
                            var url = window.location.href;
                            var username = window.location.href.split("/")[3];
                            var img = "https://instoo.com/logo.png";
                            var videos = document.getElementsByTagName('a');
                            for (var kk = 0; kk < videos.length; kk++) {
                                if (videos[kk].getAttribute("class") && videos[kk].getAttribute("class").includes("user-avatar")) {
                                    console.log(videos[kk].firstElementChild.firstElementChild.src);
                                    img = videos[kk].firstElementChild.firstElementChild.src;
                                    break;
                                }
                            }
                            console.log(img);
                            console.log(username);
                            var msg_data = {
                                url: url,
                                username: username,
                                img: img
                            };

                            SendMessage("DoneTikTokLike", "User", msg_data);

                        }, 4000);

                    }

                }, 5000);
                
                break;
            }
            }

        }


    }
}