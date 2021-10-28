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

	function scrollTop(starter){

		if(starter > 0){
window.scrollTo(0,document.body.scrollHeight);
			    setTimeout(function(){scrollTop(starter - 1)}, 300);
		}

	}

$(document).ready(function() {
    CreateComPort();
    console.log("SETUp!");
if(window.location.href.includes("tag")){
    window.scrollTo(0,document.body.scrollHeight);



scrollTop(20);
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

function OnMessageReceive(msg){
console.log(msg);

f(msg.Tag == "LikeFollow"){

                     SendMessage("DoneLinkedinLike", "User",msg_data);




	}
}



