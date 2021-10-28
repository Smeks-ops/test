var result = "";
var completed = [];
        $('body').append("<div id='contact' style='background-color:white;opacity:.8;position:fixed; top:0px;left:0px; z-index:10000;width:25%;height:100%;'></div>");

function scrollLike(num) {

    window.scrollBy(0, 300);



    var links = document.getElementsByTagName('a');

    //data-control-name="search_srp_result"
    for (var kk = 0; kk < links.length; kk++) {

        if (links[kk] && links[kk].getAttribute("data-control-name") && (links[kk].getAttribute("data-control-name") == "search_srp_result") && !(completed.includes(links[kk].getAttribute("href") ))) {



            console.log(links[kk]);

            completed.push(links[kk].getAttribute("href"));

console.log(completed);
            links[kk].click();
            var contacts = "";

            if (num > 0) {

console.log(result);
        $('#contact').html(result);


                setTimeout(function() {

                        var links = document.getElementsByTagName('a');

                        //data-control-name="search_srp_result"
                        for (var kk = 0; kk < links.length; kk++) {

                            if (links[kk] && links[kk].getAttribute("data-control-name") && (links[kk].getAttribute("data-control-name") == "contact_see_more")) {




                                console.log(links[kk]);


                                links[kk].click();


                                setTimeout(function() {

                                    var links = document.getElementsByTagName('div');

                                    //data-control-name="search_srp_result"
                                    for (var kk = 0; kk < links.length; kk++) {

                                        if (links[kk] && links[kk].getAttribute("class") && (links[kk].getAttribute("class").includes("section-info"))) {
                                            console.log(links[kk]);
                                            if(!result.includes(links[kk].outerHTML)){
                                            result += links[kk].outerHTML;
                                        }
                                            window.history.back(2);
                                            window.history.back(2);
                                                if(num > 0 ){
setTimeout(function(){
scrollLike(num - 1);

},7000);

                                                }

                                        }

                                    }
                                }, 7000);

                            }


                        }


                    }




                    , 7000);
                break;



            }




        }

    }

}




alert("Navigate to any search on Linkedin before running this script.");

scrollLike(50);