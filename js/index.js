// Sample YouTube parser function. Taken from: https://stackoverflow.com/a/8260383/4509457
function youtubeParser(url){
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}

// Play Video
function playYoutubeVideo(e) {
  const link = this.getAttribute('href');
  const videoId = youtubeParser(link);
  // Video was parsed correctly. Append it. Else the preventDefault() will not fire and user will be redirected to the href attribute location.
  if (videoId) {
    e.preventDefault();
    
    // Create the iframe
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoId + '?autoplay=1');  
    iframe.setAttribute('width', 560); 
    iframe.setAttribute('height', 315); 
    iframe.setAttribute('allow', 'autoplay; encrypted-media'); 
    iframe.setAttribute('frameborder', 0); 
    
    // Append the iframe
    this.parentElement.appendChild(iframe);
    
    // Remove the link
    this.remove();
  }
}

// Bind the events
const buttons = document.querySelectorAll('.js-video');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', playYoutubeVideo);
}