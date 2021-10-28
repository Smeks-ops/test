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
        name: "facebook"
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
function scrollLike(num){
                        var t1 = parseInt(Math.floor(Math.random() * 30000) + 1000);

     setTimeout(function() {
                        window.scrollTo(0, document.body.scrollHeight);
                        var total = 0;
                                                var videos = document.getElementsByTagName('div');

                            for (var kk = 0; kk < videos.length; kk++) {
                            //console.log(videos[kk]);
                            //console.log(videos[kk].getAttribute("class"));
                            if (videos[kk] && videos[kk].getAttribute("aria-label") && videos[kk].getAttribute("aria-label").includes("Add Friend")) {
                                total++;

                            }

                        }

                        var counter = 0;
                        var vid = parseInt(Math.floor(Math.random() * total) + 1);

                        for (var kk = 0; kk < videos.length; kk++) {
                            //console.log(videos[kk]);
                            //console.log(videos[kk].getAttribute("class"));
                            if (videos[kk] && videos[kk].getAttribute("aria-label") && videos[kk].getAttribute("aria-label").includes("Add Friend")) {
                                counter++;
                                if (vid == counter) {
                                    videos[kk].click();
                                    var msg_data = {
                            url: "https://facebook.com/" + videos[kk].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[0].children[0].getAttribute("href"),
                            username: videos[kk].parentNode.parentNode.parentNode.parentNode.parentNode.children[0].innerText,
                            img: videos[kk].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].getAttribute("xlink:href")
                        };
                        SendMessage("DonefacebookFollow", "User", msg_data);
        window.scrollTo(0, document.body.scrollHeight);

                                break;

                              
                                }


                            }


                        }


                              if (num > 0) {
                                        scrollLike(num - 1);

                                    }

                    }, t1);
}
function OnMessageReceive(msg) {
    console.log(msg);

    if (msg.Tag == "Updatefacebook") {
        console.log(msg.story);

    } else if (msg.Tag == "LikeFollow") {

        window.scrollTo(0, document.body.scrollHeight);


       if(msg.story.StartfacebookFollow && msg.story.FollowedPoolfacebookSize < msg.story.MaxfacebookFollows){
        scrollLike(5);
    }

    }
}