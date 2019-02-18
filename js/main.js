//Listen for form Submit
document.getElementById('myform').addEventListener('submit', saveBookmark);

//Save bookmark
function saveBookmark(e){
  //Get form values
  var siteName =document.getElementById('siteName').value;
  var siteURL =document.getElementById('siteURL').value;

  var bookmark = {
    name: siteName,
    url: siteURL
  }

/*
localStorage.setItem('test', 'Hello World');
console.log(localStorage.getItem('test'));
localStorage.removeItem('test');
*/

//Test if bookmarks is null
if(localStorage.getItem('bookmarks') === null){
  //Init array
  var bookmarks = [];
  //Add to array
  bookmarks.push(bookmark);
  //Set to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else {
  //Get bookmarks from local localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Add bookmark to array
    bookmarks.push(bookmark);
    //Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

}

// Re-fetch bookmarks
  fetchBookmarks();

//Prevent form from submitting
  e.preventDefault();
}
//Delete bookmarks

function deleteBookmark(url){
  //Get bookmarks from LocalStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through bookmarksResults
  for(var i = 0; i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      //Remove from array
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  // Re-fetch bookmarks
  fetchBookmarks();
}
//Fetch bookmarks

function fetchBookmarks(){
  //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarksResults = document.getElementById('bookmarksResults');

    //Build Output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
      var name = bookmarks[i].name;
      var url = bookmarks[i].url;

      bookmarksResults.innerHTML += '<div class="card bg-light text-dark card-body">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank"  href="'+addhttp(url)+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
    }
}
