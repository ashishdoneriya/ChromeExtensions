function fetch_feed() {
  chrome.extension.sendRequest({'action' : 'fetch_feed', 'url' : 'https://developer.chrome.com/extensions'}, 
    function(response) {
      display_stories(response);
    }
  );
}

function display_stories(feed_data) {
  var xml_doc = $.parseXML(feed_data);
  $xml = $(xml_doc);
  $('#popup').html('<img src="images/logo.png" id="logo" /><br clear="all" />');

}


$(document).ready(function() {
  fetch_feed();
});
