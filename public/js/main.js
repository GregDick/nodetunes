$('.artistEdit').hide();
$('.albumEdit').hide();

$('.editButton').on('click', function(){
  $('.artistEdit').show();
})

$('.editAlbumButton').on('click', function(){
  $('.albumEdit').show();
})

if(window.location.pathname.split('albums')[1].length){
  var $title = $('.albumTitle').text();
  var $albumArt = $('.albumArt');
  $.get('https://api.spotify.com/v1/search?type=album&q=' + $title, function(data){
    var imgUrl = data.albums.items[0].images[0].url;
    console.log(imgUrl);
    $albumArt.append("<img class='pull-right' src='"+ imgUrl +"'>");
  })
}
