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
        name: "tinder"
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
//console.log(msg);

if(msg.Tag == "UpdateTinder"){

	}else if(msg.Tag == "LikeFollow"){

		console.log(msg.story);
                 	                          
console.log(msg);

if(msg.story.StartTinderLike && msg.story.LikedMediaTinderSize < msg.story.MaxTinderLikes){
 setTimeout(function() {
    var username;
    var img;
         var span = document.getElementsByTagName('span');
         for(var kk =0; kk < span.length; kk++){
            if(span[kk].getAttribute("itemprop") == "name"){
                username = span[kk].innerText;
            }
         }

          var span = document.getElementsByTagName('div');
         for(var kk =0; kk < span.length; kk++){
            if(span[kk].getAttribute("aria-label") == username && span[kk].getAttribute("style")){
                img = span[kk].getAttribute("style").split('"')[1];
            }
         }
console.log(img);
console.log(username);
var msg_data = {url: "tinder.com", username: username, img: img};
var buttons = document.getElementsByTagName('button');
  for(var kk = 0; kk < buttons.length; kk++){//Super Like
    console.log(buttons[kk]);
    if(buttons[kk].innerHTML.includes("Like")  && !buttons[kk].innerHTML.includes("Super Like")  ){
    buttons[kk].click();
     console.log(buttons[kk]);
    break;
    }
  }

                     SendMessage("DoneTinderLike", "User",msg_data);
setTimeout(function(){

var buttons = document.getElementsByTagName('button');
  for(var kk = 0; kk < buttons.length; kk++){//Super Like
    //console.log(buttons[kk].innerText);
    if(buttons[kk].innerText.includes("NO THANKS")){
    buttons[kk].click();
   // console.log(buttons[kk]);
    break;
    }
  }
},5000)


                }, 4000);

}



	}
}



