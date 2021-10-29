function scrapeconsistency(locale) {
	var currentLocation = window.location;
	var wind;
	wind = "myWindow";
	//console.debug("Locale:", locale);
	//var locale = "nl";
	// 09-08-2021 PSS fixed problem with not opening new windows in Chrome issue #114
	var consistsWindow = window.open("https://translate.wordpress.org/consistency/?search=&set=" + locale + "%2Fdefault","https://translate.wordpress.org/consistency/?search=&set=" + locale + "%2Fdefault");
	var myWindow = window.open("", "_blanc");

	//console.debug('myWindow:', myWindow);
	var meta = document.createElement('meta');
	meta.setAttribute('name', 'viewport');
	meta.setAttribute('content', 'width=device-width, initial-scale=1.0');
	meta.setAttribute('Content-Type', 'image/svg+xml');
	myWindow.document.getElementsByTagName('head')[0].appendChild(meta);
	//myWindow.focus();
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
	link.href = chrome.extension.getURL('cute-alert.css');
    myWindow.document.getElementsByTagName('head')[0].appendChild(link);

	const style = myWindow.document.createElement('style');
    style.innerHTML = `
      input.searchfor {
        background-color: lightgrey !important;
        color:black;
		padding :8px !important;
	    margin: 10px 10px !important;
      }
	  input.wrongverb {
        background-color: lightgrey !important;
        color:black;
		padding :8px !important;
	    margin: 10px 10px !important;
      }
	  input.replverb {
        background-color: lightgrey !important;
        color:black;
		padding :8px !important;
	    margin: 10px 10px !important;
      }
	  #submit-consist{ 

	   padding :8px !important;
	   margin: 10px 10px;
	   background: #0085ba !important;
       border-color: #0073aa #006799 #006799;
       box-shadow: 0 1px 0 #006799;
       color: #fff !important;
      }
	  button.return-button{
	  padding :8px !important;
	  margin: 10px 10px !important;
	  background: #0085ba !important;
      border-color: #0073aa #006799 #006799;
      box-shadow: 0 1px 0 #006799;
      color: #fff !important;
      }

	 h3 {
		color: #0085ba;  
        width: 100%;
	 }

     /**header of the script showing WordPress.org**/
	 #wptf_head{
		 background:lightgrey !important;
         margin: auto;
         width: 50%;
	 }
	 a { text-decoration: none;
        color:white;
       font-size:32;     
        width: 100%;
      	   }
     /**container decoration**/
     paranode { text-decoration: none;
        color:black;
        width: 100%;
      	   }
     #container {
        margin: auto;
        width: 50%;
      	   }
    `;
    myWindow.document.head.appendChild(style);
	//myWindow.focus();
	var dv = myWindow.document.createElement('div');
	dv.setAttribute('id', "wptf_head");
	myWindow.document.getElementsByTagName('body')[0].appendChild(dv);
		
    var a = myWindow.document.createElement('a');               
    var link = myWindow.document.createTextNode("WordPress.org");
    a.appendChild(link);                   
    a.title = "WordPress.org";                   
    a.href = "https://www.wordpress.org"; 				
    // Append the anchor element to my head.               
    myWindow.document.getElementById('wptf_head').appendChild(a);
	myWindow.document.getElementById('wptf_head').innerHTML +=
	"<h3>Enter verbs for Search, Wrong verb, Replace verb</h3>";
	
	var f = myWindow.document.createElement("form");
    f.setAttribute('method', "post");
	f.setAttribute('name', "myForm" );
	f.setAttribute('class', "myForm");
	f.setAttribute('id', "myForm");
    
    var i = myWindow.document.createElement("input"); //input element, text
    i.setAttribute('type', "text");
	i.setAttribute('class', "searchfor");
    i.setAttribute('name', "searchfor");
	i.setAttribute('id', "searchfor");
	
	i.setAttribute('placeholder', "Searchfor");
	
	
	var j = myWindow.document.createElement("input"); //input element, text
    j.setAttribute('type', "text");
	j.setAttribute('class', "wrongverb");
    j.setAttribute('name', "wrongverb");
	j.setAttribute('id', "wrongverb");
	
	j.setAttribute('placeholder', "Wrong verb");
	
	var k = myWindow.document.createElement("input"); //input element, text
	k.setAttribute('type', "text");
	k.setAttribute('class', "replverb");
    k.setAttribute('name', "replverb");
	k.setAttribute('id', "replverb");
	
	k.setAttribute('placeholder', "Replace verb");
	
    var s = myWindow.document.createElement("input"); //input element, Submit button
    s.setAttribute('type', "submit");
	s.setAttribute('id', "submit-consist");
	s.setAttribute('class', "submit-consist");
    s.setAttribute('value', "Submit");
	s.setAttribute('text', "Submit");
	
	s.onclick = function() {
        startsearch(myWindow,currentLocation,locale,consistsWindow);
    };
	
	var SavelocalButton = myWindow.document.createElement('button');
	
        SavelocalButton.id = "return-button";
        SavelocalButton.className = "return-button";
		SavelocalButton.innerText = "Close window";
        SavelocalButton.onclick = function() {
			submitClicked(myWindow, consistsWindow);
};
    
    const br = myWindow.document.createElement("br");
	
    i.appendChild(br);
	f.appendChild(i);
	f.appendChild(j);
	f.appendChild(k);
	f.appendChild(br);
    f.appendChild(s);
	f.appendChild(SavelocalButton);
	
	var container = myWindow.document.createElement('div');
	container.setAttribute('id', "container");
	myWindow.document.getElementsByTagName('body')[0].appendChild(container);
	myWindow.document.getElementById('container').appendChild(f);
	var paradiv = myWindow.document.createElement('div');
	paradiv.id = "paradiv";
	myWindow.document.getElementById('container').appendChild(paradiv);
	const para = myWindow.document.createElement("p");
	const paranode = myWindow.document.createTextNode("-->Please be patient it can sometimes take a bit before the result windows are opened!");
	myWindow.document.getElementById('paradiv').appendChild(paranode);	
}

function submitClicked(myWindow, consistsWindow)
{
	consistsWindow.close();
	myWindow.close();
}

function startsearch(myWindow, curloc, locale, consistsWindow) {

	event.preventDefault();

	var searchverb = myWindow.document.getElementById("myForm").elements.namedItem("searchfor").value;
	var replverb = myWindow.document.getElementById("myForm").elements.namedItem("replverb").value;
	var wrongverb = myWindow.document.getElementById("myForm").elements.namedItem("wrongverb").value;
	//console.debug("search:",searchverb,"  ",replverb,"  ",wrongverb);
	if (typeof locale != 'undefined' && locale != "") {
		if (searchverb && replverb && wrongverb != null) {
			var search_url = 'https://translate.wordpress.org/consistency/?search=' + searchverb + '&set=' + locale + '%2Fdefault&project=&search_case_sensitive=1';
			//console.debug("Searchfor:",search_url);
			const myInit = {
				redirect: "error"
			};

			confirm_msg = 'A log of replaced translations will be downloaded.\n';
			confirm_msg += 'Before downloading the file the windows will be opened!\n';
			confirm_msg += 'The records will be replaced are you sure to continue?';
			//console.debug("myWindow:", myWindow);
			cuteAlert({
				type: "question",
				title: "Create a back-up for check afterwards",
				message: "To proceed it is necessary to create a back-up!",
				confirmText: "Yes proceed",
				cancelText: "No stop",
				closeStyle: "",
				myWindow: myWindow,
			}).then((e) => {

				if (e == "confirm") {
					cuteToast({
						type: "info",
						message: "Please wait while data is fetched",
						timer: 5000,
						myWindow,
					});
					fetch(search_url, myInit)
						.then(function (response) {
							// When the page is loaded convert it to text
							return response.text();
						})
						.then(function (html) {
							// Initialize the DOM parser
							//console.debug("html:",html);
							var parser = new DOMParser();

							// Parse the text
							var doc = parser.parseFromString(html, "text/html");

							// console.debug(doc);
							//var trs = doc.getElementsByTagName("tr");
							var table = doc.getElementById("consistency-table");
							var mytable = doc.getElementsByTagName("table")[0];
							console.debug("myTable:", mytable);
							if (typeof mytable != 'undefined') {
								var mytablebody = mytable.getElementsByTagName("tbody")[0];
								var Rows = mytable.rows.length;
								var rowCount = 0;
								var replCount = 0;
								if (Rows > 500) {
									Rows = 500;
								}
								var replace_links = '';
								for (var i = 1; i < Rows - 2; i++) {
									rowCount++;
									let myrow = mytablebody.getElementsByTagName("tr")[rowCount];
									var mycel1 = myrow.getElementsByTagName("td")[0];
									if (mycel1 != undefined) {
										var orgtext = mycel1.childNodes[0].innerText;
										var mycel11 = mycel1.childNodes[2];
										var myceltext12 = mycel11.getElementsByTagName("a");
										var myorglink = myceltext12.item(0).href;
										var textorglink = myorglink.innerText;
										var mycel2 = myrow.getElementsByTagName("td")[1];
										var transtext = mycel2.childNodes[0].innerText;
										var myceltext3 = mycel2.childNodes[2];
										var myceltext4 = myceltext3.getElementsByTagName("a");
										var mylink = myceltext4.item(0).href;
										//console.debug('Translated:',transtext);

										if (transtext == wrongverb) {
											let isFound = myorglink.search("dev");
											if (isFound == -1) {
												-i;
												replCount++;
												// Max25 windows will be opened
												if (replCount < 25) {
													newWindow = window.open(mylink + "&wrongverb=" + wrongverb + "&replverb=" + replverb, mylink + "&wrongverb=" + wrongverb + "&replverb=" + replverb);
													replace_links += mylink + '\n';
												}
											}
										}
										else {
											-i;
										}
									}
								}
								//console.debug("Replcount:", replCount);
								if (replCount == 0) {
									//console.debug("mywindow:", myWindow);
									cuteAlert({
										type: "info",
										title: "Message",
										message: "OK no records to replace!",
										buttonText: "OK",
										myWindow: myWindow,
										closeStyle: "alert-close",
									});
								}
								//console.debug("Search ended:");
								if (replCount != 0) {
									var current_date = new Date();
									wptf_download('[' + current_date.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' wptf replace log.txt]', replace_links, myWindow);
								}
								consistsWindow.close();
							}
							else {
								cuteAlert({
									type: "error",
									title: "Message",
									message: "No records found!",
									buttonText: "OK",
									myWindow: myWindow,
									closeStyle: "alert-close",
								});
							}
						})
						.catch(function (err) {
							console.log('Failed to fetch page: ', err);
							cuteAlert({
								type: "error",
								title: "Message",
								message: "Missing fieldvalue" + err,
								buttonText: "OK",
								myWindow: myWindow,
								closeStyle: "alert-close",
							});
						});
				}
				else {
					cuteAlert({
						type: "info",
						title: "Message",
						message: "OK cancelled no replacements!",
						buttonText: "OK",
						myWindow: myWindow,
						closeStyle: "alert-close",
					});
				}
			});
		}
		else {
			event.preventDefault();
			cuteAlert({
				type: "error",
				title: "Message",
				message: "Missing fieldvalue",
				buttonText: "OK",
				myWindow: myWindow,
				closeStyle: "alert-close",
			});
			consistsWindow.close();
		}

	}
	else {
		cuteAlert({
			type: "error",
			title: "Message",
			message: "Locale option not set!!",
			buttonText: "OK",
			myWindow: myWindow,
			closeStyle: "alert-close",
		});
		consistsWindow.close();
	}
}
 
function wptf_download( filename, text,myWindow) {
        var element = myWindow.document.createElement( 'a' );
        element.setAttribute( 'href', 'data:text/plain;charset=utf-8,' + encodeURIComponent( text ) );
        element.setAttribute( 'download', filename );
        element.style.display = 'none';
        myWindow.document.body.appendChild( element );
        element.click();
        myWindow.document.body.removeChild( element );
}