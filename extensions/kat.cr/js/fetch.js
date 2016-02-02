function fetchFeed() {
    chrome.extension.sendRequest({'action' : 'fetch_feed', 'url' : 'http://kickasstorrent.proxy-index.com/'},
        function (response) {
            displayHTML(response);
        }
    );
}

function displayHTML(htmlData) {
    var container = document.getElementById('container');
    var el = document.createElement('html');
    el.innerHTML = htmlData;
    var divisions = el.getElementsByClassName("data frontPageWidget");
    createTable(divisions[0], container, "movies");
    createTable(divisions[1], container, "episodes");  
}

function createTable(division, container, id) {
    var TRs = division.getElementsByTagName('tr');
    var columns;
    for (var i = 0; i < TRs.length; i++) {
    	var row = TRs[i];
    	if (i == 0) {
    		columns = row.getElementsByTagName('th');
    	} else {
    		columns = row.getElementsByTagName('td');
    		columns[3].firstChild.removeAttribute('title');
    		columns[3].firstChild.removeAttribute('data-age');
    		log(columns[3].innerHTML);
    	}
    	row.removeChild(columns[5]);
    	row.removeChild(columns[4]);
    	row.removeChild(columns[3]);
    	row.removeChild(columns[2]);
    	row.removeChild(columns[1]);
    }
    document.getElementById(id).appendChild(division);
}

function log(msg) {
    chrome.extension.getBackgroundPage().console.log(msg);
}

window.onload = function() {
    fetchFeed();
}

