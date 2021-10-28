var ComPort;
var CurrentUser;

var LastUsername = "";
var SharedData = null;

var UserTag = "._7UhW9";

var tag_dict = {};
var account_dict = {};

function User(username, user_id, full_name, user_pic_url, followed_time)
{
	this.username = username;
	this.user_id = user_id;
	this.full_name = full_name;
	this.user_pic_url = user_pic_url;
	this.followed_time = followed_time;
}

function MediaTag(tag_name, cursor_key, eof)
{
	this.tag_name = tag_name;
	this.cursor_key = cursor_key;
	this.eof = eof;
}

var startLike = true;
$(document).ready(function()
{
var unansweredBtn   = $("#content");

//-- Add our button.
unansweredBtn.parent ().after (
    '<li><h2><a href="#" style="position:fixed; z-index:10000; top:10%; left:30%;" id="gmOurFirstButton">Stop Auto-Liker</a></h2></li>'
);

//-- Activate the button.
$("#gmOurFirstButton").click ( function () {
    console.log ("Something.");
	if(startLike){
		startLike = false;
$("#gmOurFirstButton").text("Start Auto-Liker");
	}else{
$("#gmOurFirstButton").text("Stop Auto-Liker");
		startLike = true;
	}	
} );


setInterval(function(){
var buttons = document.getElementsByTagName('button');
if(startLike){
  for(var kk = 0; kk < buttons.length; kk++){//Super Like
  	console.log(buttons[kk]);
    if(buttons[kk].innerHTML.includes("Like")  && !buttons[kk].innerHTML.includes("Super Like")  ){
	buttons[kk].click();
	console.log(buttons[kk]);
	break;
    }
  }
}
}, 10000);


 });
