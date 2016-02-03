function fetchFeed() {
    chrome.extension.sendRequest({'action' : 'fetch_feed', 'url' : 'http://kickasstorrent.proxy-index.com/'},
        function (response) {
            displayHTML(response);
        }
    );
}
var divisions;
function displayHTML(htmlData) {
    var container = document.getElementById('container');
    var tabsUL = document.getElementById('tabsUL');
    var tabsContentDIV = document.getElementById('tabsContentDIV');
    
    // Parsing html
    var el = document.createElement('html');
    el.innerHTML = htmlData;
    
    divisions = el.getElementsByClassName("data frontPageWidget");
    for (var i = 0; i < divisions.length; i++) {
        createTable(divisions[i], container, tabsUL, tabsContentDIV);

    }
    tabsUL.firstChild.setAttribute('class', 'active');
    tabsContentDIV.firstChild.setAttribute('class', 'tab-pane fade in active');
    var els = document.getElementsByTagName("::before");
    for (var i = 0; i < els.length; i++) {
        els[i].parentNode.removeChild(els[i]);
    }
}

function createTable(division, container, tabsUL, tabsContentDIV) {
    var TRs = division.getElementsByTagName('tr');
    var columns;
    for (var i = 0; i < TRs.length; i++) {
    	var row = TRs[i];
    	if (i == 0) {
    		columns = row.getElementsByTagName('th');
    	} else {
    		columns = row.getElementsByTagName('td');
    	}
    	row.removeChild(columns[5]);
    	row.removeChild(columns[4]);
    	row.removeChild(columns[3]);
    	row.removeChild(columns[2]);
    	row.removeChild(columns[1]);
    }
    appendLiAndDiv(tabsUL, tabsContentDIV, division);
}

function appendLiAndDiv(tabsUL, tabsContentDIV, division) {
    var tableName = getTableName(division);
    var tableNameId = tableName.replace(/ /g,'');
    tabsUL.appendChild(getLI(tableName, tableNameId));
    tabsContentDIV.appendChild(getDiv(division, tableNameId));
}

function getTableName(division) {
    var len = division.parentElement.parentElement.children[0].getElementsByClassName('plain').length;
    var tableName;
    if (len != 0) {
        tableName = division.parentElement.parentElement.children[0].getElementsByClassName('plain')[0].innerHTML;
    } else {
        tableName = division.parentElement.parentElement.children[1].getElementsByClassName('plain')[0].innerHTML;
    }
    return tableName;
}

function getLI(tableName, tableNameId) {
    var a = document.createElement('a');
    a.appendChild(document.createTextNode(tableName));
    a.href = "#" + tableNameId;
    a.setAttribute('data-toggle', 'tab');
    var li = document.createElement('li');
    li.appendChild(a);
    return li;
}

function getDiv(division, tableNameId) {
    var div = document.createElement('div');
    div.className = "tab-pane fade";
    div.id = tableNameId;
    div.appendChild(division.cloneNode(true));
    return div;
}

function log(msg) {
    chrome.extension.getBackgroundPage().console.log(msg);
}

window.onload = function() {
    fetchFeed();
}

