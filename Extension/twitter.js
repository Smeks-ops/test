var ComPort;
var CurrentUser;

var LastUsername = "";
var SharedData = null;
var lastMsg;
var UserTag = "._7UhW9";
var StartStory = false;

var msg_user = "";
var tag_dict = {};
var account_dict = {};
var that = this;
var image_src = "";
var story_set = false;

function scrollTop(starter) {

    if (starter > 0) {
        window.scrollTo(0, document.body.scrollHeight);
        setTimeout(function() {
            scrollTop(starter - 1)
        }, 300);
    }

}

$(document).ready(function() {
    CreateComPort();
    console.log("SETUp!");
 
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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function scrollLike(num) {

    window.scrollBy(0, 600);



    var links = document.getElementsByTagName('div');


    if (num > 0) {

        var timer = getRandomInt(50000, 120000);



        setTimeout(function() {




                scrollLike(num - 1)
            }




            , timer);



    }
console.log(links);
    for (var kk = 0; kk < links.length; kk++) {

        if (links[kk] && links[kk].getAttribute("aria-label") && (links[kk].getAttribute("aria-label").includes("Like")) && links[kk].getAttribute("data-testid") && links[kk].getAttribute("data-testid") == "like") {




            console.log(links[kk]);
            links[kk].parentNode.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.firstElementChild.focus();
            console.log(links[kk].parentNode.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.firstElementChild.children[0].children[1].children[0].children[1]);


            console.log(links[kk].parentNode.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.firstElementChild);

            console.log(links[kk].parentNode.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute("href").split("/").join(""));
            console.log(links[kk].parentNode.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.firstElementChild.children[0].children[1].children[0].children[1].getAttribute("src"));


            var url = window.location.href;
            var username = links[kk].parentNode.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute("href").split("/").join("");
            var img = links[kk].parentNode.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.firstElementChild.children[0].children[1].children[0].children[1].getAttribute("src");
            var msg_data = {
                url: url,
                username: username,
                img: img
            };
    if (lastMsg.story.StartTwitterLike) {
                    links[kk].click();
                    SendMessage("DoneTwitterLike", "User", msg_data);
                }

            setTimeout(function() {

            
                console.log(img);
                console.log(username);
                console.log(lastMsg);
                console.log(msg_data);
                console.log(links[kk]);
                console.log(links[kk].parentNode);
                                console.log(links[kk].parentNode.parentNode);

                                console.log(links[kk].parentNode.parentNode.children[1]);

                console.log(links[kk].parentNode.parentNode.children[1].children[0]);
                links[kk].parentNode.parentNode.children[1].children[0].click();
                setTimeout(function() {
                    var links2 = document.getElementsByTagName('div');//tweetButton testid
                    for (var kk = 0; kk < links2.length; kk++) {
                        if (links2[kk].getAttribute("testid") && links2[kk].getAttribute("testid").includes("tweetButton") && lastMsg.story.StartTwitterFollow) {
                            console.log("try rewtweet");
                            console.log( links[kk].firstElementChild.firstElementChild.firstElementChild);
                            links2[kk].firstElementChild.firstElementChild.firstElementChild.click();
                            SendMessage("DoneTwitterRetweet", "User", msg_data);

                        }

                    }

                      var links2 = document.getElementsByTagName('span');//tweetButton testid
                    for (var kk = 0; kk < links2.length; kk++) {
                        if (links2[kk].innerHTML.includes("Retweet") && lastMsg.story.StartTwitterFollow) {
                            console.log("try rewtweet");
                            links2[kk].click();
                            SendMessage("DoneTwitterRetweet", "User", msg_data);

                        }

                    }
                }, 5000);


                  setTimeout(function() {
            

                      var links2 = document.getElementsByTagName('span');//tweetButton testid
                    for (var kk = 0; kk < links2.length; kk++) {
                        if (links2[kk].innerText.includes("Retweet") && lastMsg.story.StartTwitterFollow) {
                            console.log("try rewtweet");
                            links2[kk].click();
                            SendMessage("DoneTwitterRetweet", "User", msg_data);

                        }

                    }
                }, 5000);

            }, 1000);


            break;


break;
        }

    }

}




function CreateComPort() {
    ComPort = chrome.runtime.connect({
        name: "twitter"
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
    lastMsg = msg;
    if (msg.Tag == "UpdateTwitter") {
        console.log(msg.story);

    } else if (msg.Tag == "LikeFollow") {
        scrollLike(3);

    }
}