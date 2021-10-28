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
var result = "";
var target = "";
var completed = [];
var story = {};
//  $('body').append("<div id='contact' style='background-color:white;opacity:.8;position:fixed; top:0px;left:0px; z-index:10000;width:25%;height:100%;'></div>");

function scrollLike(num) {

    window.scrollBy(0, 300);
    var counter = 0;
    var vid = parseInt(Math.floor(Math.random() * 6) + 1);

    var username = "none";
    var email = "none";
    var twitter = "none";
    var website = "none";
    var birthday = "none";
    var connected = "none";
    var profile = "none";

    var sales = "";
    var img = "https://instoo.com/logo.png";

    var links = document.getElementsByTagName('span');
    ////console.log(links);
    //data-control-name="search_srp_result"
    for (var kk = 0; kk < links.length; kk++) {
        //console.log(links[kk]);
        ////console.log(links[kk].getAttribute("data-control-name"));

        if (links[kk] && links[kk].getAttribute("class") && (links[kk].getAttribute("class").includes("entity-result__title-text ")) && !links[kk].innerHTML.includes("<img") && !(completed.includes(links[kk].getAttribute("href")))) {

            counter++;


            if (counter == vid) {

                //console.log(links[kk]);

                completed.push(links[kk].getAttribute("href"));
                console.log(story);
                ////console.log(completed);
                links[kk].children[0].click();
                var contacts = "";
                var old_link;
                if (num > 0) {

                    console.log(story);
                    $('#contact').html(result);

                    setTimeout(function() {
                        if (story.StartLinkedinFollow) {
                            var links = document.getElementsByTagName('button');

                            //data-control-name="search_srp_result"
                            for (var kk = 0; kk < links.length; kk++) {

                                if (links[kk] && links[kk].getAttribute("aria-label")  && links[kk].getAttribute("data-control-name") &&  links[kk].getAttribute("data-control-name").includes("connect") && (links[kk].getAttribute("aria-label").includes("Connect"))) {
                                    links[kk].click()
                                    console.log(links[kk].getAttribute("aria-label"));

                                    links[kk].click();


                                    setTimeout(function() {

                                        var links = document.getElementsByTagName('button');

                                        //data-control-name="search_srp_result"
                                        for (var kk = 0; kk < links.length; kk++) {

                                            if (links[kk] && links[kk].getAttribute("aria-label") && (links[kk].getAttribute("aria-label").includes("Send now"))) {
                                                links[kk].click()



                                            }


                                        }


                                    }, 2000);


                                    var msg_data = {
                                        target: target,
                                        username: username,
                                        url: profile,
                                        img: img
                                    };


                                    SendMessage("DoneLinkedinFollow", "User", msg_data);
                                    break;

                                }

                            }
                        }
                    }, 3000);

                    if (story.StartLinkedinLike || story.StartLinkedinFollow) {
                        setTimeout(function() {

                                var links = document.getElementsByTagName('a');

                                //data-control-name="search_srp_result"
                                for (var kk = 0; kk < links.length; kk++) {

                                    if (links[kk] && links[kk].getAttribute("data-control-name") && (links[kk].getAttribute("data-control-name") == "contact_see_more")) {


                                        ////console.log(links[kk]);


                                        links[kk].click();
                                        old_link = links[kk];

                                        setTimeout(function() {

                                            var links = document.getElementsByTagName('div');

                                            //data-control-name="search_srp_result" pv-contact-info
                                            for (var kk = 0; kk < links.length; kk++) {

                                                if (links[kk] && links[kk].getAttribute("class") && (links[kk].getAttribute("class").includes("section-info"))) {
                                                    ////console.log(links[kk]);
                                                    if (!result.includes(links[kk].outerHTML)) {
                                                        result += links[kk].outerHTML;
                                                        var links2 = document.getElementsByTagName('h1');


                                                        for (var kk = 0; kk < links2.length; kk++) {

                                                            if (links2[kk] && links2[kk].getAttribute("id") && (links2[kk].getAttribute("id").includes("pv-contact-info"))) {
                                                                ////console.log(links2[kk].innerText);
                                                                username = links2[kk].innerText;
                                                            }

                                                        }



                                                        var links2 = document.getElementsByTagName('section');


                                                        for (var kk = 0; kk < links2.length; kk++) {

                                                            if (links2[kk] && links2[kk].getAttribute("class") && (links2[kk].getAttribute("class").includes("vanity"))) {
                                                                ////console.log(links2[kk].innerText);
                                                                profile = links2[kk].innerText;
                                                            }

                                                        }

                                                        var links2 = document.getElementsByTagName('section');


                                                        for (var kk = 0; kk < links2.length; kk++) {

                                                            if (links2[kk] && links2[kk].getAttribute("class") && (links2[kk].getAttribute("class").includes("email"))) {
                                                                ////console.log(links2[kk].innerText);
                                                                email = links2[kk].innerText;
                                                            }

                                                        }


                                                        var links2 = document.getElementsByTagName('section');


                                                        for (var kk = 0; kk < links2.length; kk++) {

                                                            if (links2[kk] && links2[kk].getAttribute("class") && (links2[kk].getAttribute("class").includes("birthday"))) {
                                                                ////console.log(links2[kk].innerText);
                                                                birthday = links2[kk].innerText;
                                                            }

                                                        }

                                                        var links2 = document.getElementsByTagName('section');


                                                        for (var kk = 0; kk < links2.length; kk++) {

                                                            if (links2[kk] && links2[kk].getAttribute("class") && (links2[kk].getAttribute("class").includes("connected"))) {
                                                                ////console.log(links2[kk].innerText);
                                                                connected = links2[kk].innerText;
                                                            }

                                                        }


                                                        var links2 = document.getElementsByTagName('section');


                                                        for (var kk = 0; kk < links2.length; kk++) {

                                                            if (links2[kk] && links2[kk].getAttribute("class") && (links2[kk].getAttribute("class").includes("twitter"))) {
                                                                ////console.log(links2[kk].innerText);
                                                                twitter = links2[kk].innerText;
                                                            }

                                                        }


                                                        var links2 = document.getElementsByTagName('section');


                                                        for (var kk = 0; kk < links2.length; kk++) {

                                                            if (links2[kk] && links2[kk].getAttribute("class") && (links2[kk].getAttribute("class").includes("website"))) {
                                                                ////console.log(links2[kk].innerText);
                                                                website = links2[kk].innerText;
                                                            }

                                                        }

                                                        var msg_data = {
                                                            target: target,
                                                            sales: 0,
                                                            email: email,
                                                            html: "",
                                                            username: username,
                                                            birthday: birthday,
                                                            connected: connected,
                                                            twitter: twitter,
                                                            url: profile,
                                                            img: img
                                                        };
                                                        ////console.log(msg_data);
                                                        SendMessage("LinkedinLead", "User", msg_data);
                                                        window.history.back(2);
                                                       


                                                    }


                                                    setTimeout(function() {

                                                        window.history.back(2);
                                                        if (num > 0) {
                                                            setTimeout(function() {
                                                                console.log("RESTART");
                                                                scrollLike(num - 1);

                                                            }, 10000);

                                                        }
                                                    }, 7000);


                                                }

                                            }
                                        }, 7000);

                                    }


                                }


                            }




                            , 7000);

                    }


                    break;



                }


            }

        }

    }

}

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
    ////console.log("SETUp!");
    if (window.location.href.includes("tag")) {
        window.scrollTo(0, document.body.scrollHeight);



        scrollTop(20);
    }
});

function SendMessage(tag, msgTag, msg) {
    var sendObj = {
        "Tag": tag
    };
    sendObj[msgTag] = msg;
    ////console.log(sendObj);
    ////console.log(ComPort);
    ComPort.postMessage(sendObj);
}


function CreateComPort() {
    ComPort = chrome.runtime.connect({
        name: "linkedin"
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

    if (msg.Tag == "LikeFollow") {
        target = msg.story.target;
        story = msg.story;
        scrollLike(10);
        //      SendMessage("DoneLinkedinLike", "User",msg_data);




    }
}