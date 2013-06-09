var fuser;
var fbtoken;
var facebookFriends;

var fref = new Firebase('https://highground.firebaseIO.com');
var authClient = new FirebaseAuthClient(fref, function(error, user) {
  if (error) {
    console.log(error);
  } else if (user) {
    fuser = user;
    fbtoken = user.accessToken;
    saveFacebookFriends();
  } 
});

function saveFacebookFriends() {
  $.getJSON('https://graph.facebook.com/me/friends?access_token=' + fbtoken, function(data) {
    facebookFriends = data.data;
    $('#login').hide();
    $('#twitter').show();
  });
}

function getRandomFacebookFriend() {
  return facebookFriends[Math.floor(Math.random()*facebookFriends.length)];
}

function twitterMakeItMatter() {
  $(".tweet", $("#twitter-widget-1").contents()).each(function () {
    var rfriend = getRandomFacebookFriend();
    $(".p-name", $(this)).each(function() {
      $(this).text(rfriend.name);
    });
    $(".p-nickname", $(this)).each(function() {
      $(this).text('');
    });
    $(".avatar", $(this)).attr("src","https://graph.facebook.com/" + rfriend.id + "/picture");
  })

  $('#gdm').text('Guns Matter');
  $('#doesntmatter').hide();
  $('#doesmatter').show('slow');
}

$(function() {
  $('#twitter').hide();
  $('#login').on('click', function() {
    authClient.login('facebook');
  });

  $('#tmim').on('click', function() {
    twitterMakeItMatter();
  });
});
