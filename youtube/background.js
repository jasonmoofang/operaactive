window.addEventListener("load", function() {
    var theButton;
    var toolbar = opera.contexts.toolbar;
    ToolbarUIItemProperties = {
        title: "Play in smplayer",
        icon: "icons/youtube_logoround.png",

        popup: {
//            href: 'popup.html',
            width: 550,
            height: 420
        },

        onclick: function() {
            var extension = window.opera.extension;
            var tab = extension.tabs.getFocused();

            if (tab) {
                var url = encodeURIComponent(tab.url);
                var title = encodeURIComponent(tab.title);
		$.ajax({
			url:'http://localhost:1080/youtube.html',
			data: { url: url },
			type:'GET',
			success: function(msg){
				opera.postError('Success');
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				opera.postError(errorThrown);
			}
		});
		
		 //var data = "data:application/octet-stream," + url;
		//var data = "data:text/plain," + url;
		//location.href = data;
		//window.location.assign(data);
		 //opera.extension.tabs.create({ url: "test:/lol", focused: true });
		 //download(data, "new.nbm", false);
                // New variant with popup
                // theButton.popup.href = 'http://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk=' + url + '&title=' + title;

                // Old open in tab variant
                //newtab = extension.tabs.create({ url:'http://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk=' + url + '&title=' + title,
                //    focused: true
                //});
            }
        }
    };
    theButton = toolbar.createItem(ToolbarUIItemProperties);
    toolbar.addItem(theButton);
}, false);

/** Opens a file as a download in a new tab.
 *  @param {String} data A data URI or base64 encoded file data
 *  @param {String} filename The name of the file
 *  @param {String} [mimetype] The MIME type to open the file as (defaults to application/octet-stream) 
 *
function download(data, filename, mimetype) {
	sep = '--------' + window.btoa('This is a unique boundary');
	text = '';
	// If no MIME type provided, use application/octet-stream to force a download
	mimetype = mimetype || 'application/octet-stream';
	// If data is a data URI, grab the data and base64 encode it if it isn't already
	if (data.length > 5 && data.substr(0, 5) === 'data:') {
		index = data.indexOf(',');
		base64 = data.substr(0, index).indexOf('base64') !== -1;
		data = data.substr(index + 1);
		if (!base64)
			data = window.btoa(data);
	}

	// Build an MHTML file
	function w(line) { text += (line || '') + '\n'; }
	function boundary() { w('--' + sep); }

	w('Content-Type: multipart/related; boundary=' + sep);
	w('Content-Location: index.html');
	w('MIME-Version: 1.0');
	w();
	boundary();
	w('Content-Disposition: inline; filename=index.html');
	w('Content-Type: text/html; charset=utf-8; name=index.html');
	w('Content-Location: index.html');
	w('Content-Transfer-Encoding: 8bit');
	w();
	w('<!doctype html>');
	w('<html><head><meta charset="utf-8"><title>Download File</title></head>');
	// No way to know when the file is downloaded and close the tab,
	// so hide a message behind the download dialog
	w('<body style="text-align: center; margin-top: 60px;">')
	w('<p>You can close this tab now.</p>');
	// Link to the embedded file and automatically click it.
	w('<a href="' + filename + '">Redownload ' + filename + '</a>');
	w('<script>document.querySelector(\'a\').click();</script>');
	w('</body>');
	w('</html>');
	w();
	// Embed the file
	boundary();
	w('Content-Disposition: attachment; filename=' + filename);
	w('Content-Type: ' + mimetype + '; name=' + filename);
	w('Content-Location: ' + filename);
	w('Content-Transfer-Encoding: base64');
	w();
	w(data);
	w();
	w('--' + sep + '--')

	// Wrap it all up in a data URI and open it in a new tab
	opera.extension.tabs.create({ url: 'data:application/mime;base64;charset=utf-8,' + window.btoa(text), focused: true });
}/* */