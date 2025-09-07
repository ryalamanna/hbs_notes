
function formatText(command, value = null) {
    document.execCommand(command, false, value);
  }

  function changeFontSize(fontSize) {
    document.execCommand("fontSize", false, Number(fontSize)+2 );
  }

  // youtube 
  var ytArray = [];
  ytArray = temporaryYtVar ? temporaryYtVar.split(',') : [];
  console.log(ytArray);

  function handleAddYoutubeVideo(){
    let ytInput = document.getElementById('youtubeAddInput');
    let extractedYtKey = extractVideoKey(ytInput.value);
    if(extractedYtKey){
        ytArray.push(extractedYtKey);
    }
    ytInput.value = '';
    populateYtView();
  }

  function populateYtView(){
    let ytViewContainer = document.getElementById('ytViewContainer');

    let template = Handlebars.compile("{{#each ytArray}}<div class='col-3'><button type='button' onclick='deleteYtVideo(\"{{this}}\")'>X</button><iframe height='180' src='https://www.youtube.com/embed/{{this}}' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen></iframe></div>{{/each}}");
    ytViewContainer.innerHTML = template({ytArray});
  }

  function extractVideoKey(url) {
    var shortRegex = /youtu\.be\/([^&?/]+)/;
    var fullRegex = /[?&]v=([^&]+)/;

    var shortMatch = url.match(shortRegex);

    if (!shortMatch) {
        var fullMatch = url.match(fullRegex);
        if (fullMatch) {
            return fullMatch[1];
        }
    } else {
        return shortMatch[1];
    }

    return null;
}

function deleteYtVideo(videoKey){
  console.log(videoKey);
  let indexOfVideo = ytArray.indexOf(videoKey);
  ytArray = ytArray.filter(ele => ytArray.indexOf(ele) !== indexOfVideo);
  populateYtView();
}


// reference 

var referenceArray = [];
referenceArray = tempRefVar ? tempRefVar.split(',') : [];
console.log(referenceArray);

function handleAddReference(){
  let referenceLink = document.getElementById('referenceAddInput');
  if(referenceLink.value){
    referenceArray.push(referenceLink.value);
  }
  referenceLink.value = '';
  populateReference();
}

function deleteRef(currentRef){
  console.log(currentRef);
  let indexOfRef = referenceArray.indexOf(currentRef);
  referenceArray = referenceArray.filter(ele => referenceArray.indexOf(ele) !== indexOfRef);
  populateReference();
}

function populateReference(){
  let referenceViewContainer = document.getElementById('referenceViewContainer');

  let template = Handlebars.compile("<ul>{{#each referenceArray}}<li class='position-relative mt-1'><div class='border border-1 p-2 mx-1 '><a target='_blank' href='{{this}}'>{{this}}</a></div><button class='position-absolute top-0 end-0 m-2 py-1 btn btn-danger' type='button' data-target='{{this}}' onclick='deleteRef(this.dataset.target)' >-</button></li>{{/each}}</ul>");
  referenceViewContainer.innerHTML = template({referenceArray});
}


// post data 

function handlePostData (url, data) {
  return fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(responseData => {
      // Handle the successful response data
      console.log(responseData.message);
      showSnacbar('Added Successfully !' , true);
      setTimeout(() => {
        window.location.href = "/list";
      }, 1000);
  })
  .catch(error => {
      // Handle errors
      console.error('Error:', error);
      showSnacbar(`${error}` , false)
  }).finally(()=>{
    hideLoader()
  }
  )
}

// Example usage:
var apiUrl = '/notes';
function createPostObj () {
  let postObj =  {
    title: document.getElementById('titleInput').value,
    content : document.getElementById('editor').innerHTML,
    youtubeLinks : ytArray,
    references : referenceArray,
    image : document.getElementById('imageInput').value,
  };

  return postObj;
}

function handleAddNote(){
  showLoader()
  handlePostData(apiUrl, createPostObj());
}


// show snackbar 

function showSnacbar(text , state) {
  var x = document.getElementById("snackbar");
  if(state === true){
    x.classList.add('success');
    console.log('yes');
  }else if(state === false){
    x.classList.add('fail');
  }
  x.innerText = text
  x.classList.add("show");
  setTimeout(function(){ 
    x.className = x.className.replace("show", ""); 
    x.classList.remove('success');
    x.classList.remove('fail');
  }, 3000);
}

// show loader 


function showLoader () {
  let loaderContainer = document.getElementById("loaderContainer");
  loaderContainer.className = 'show';
}
function hideLoader () {
  let loaderContainer = document.getElementById("loaderContainer");
  loaderContainer.classList.remove("show");
}


// delete data 

function handleDeleteData(id , title){
  if(confirm(`Do you Want to delete ${title} ?`)){
    showLoader();
    return fetch(`/notes?id=${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(responseData => {
        // Handle the successful response data
        console.log(responseData.message);
        showSnacbar(responseData.message , true)
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
        showSnacbar(`${error}` , false)
    }).finally(()=>{
      hideLoader();
      location.reload()
    }
    )
  }
  
}



// edit note 

function createEditPostObj () {
  let postObj =  {
    id,
    title: document.getElementById('titleInput').value,
    content : document.getElementById('editor').innerHTML,
    youtubeLinks : ytArray,
    references : referenceArray,
    image : document.getElementById('imageInput').value,
  };

  console.log(postObj);
  return postObj
}

function handleEditNote(){
  if(confirm(`Do you Want to Update "${title}" ?`)){
    showLoader();
    return fetch(`/notes`, {
        method: 'PUT',
        body : JSON.stringify(createEditPostObj()),
        headers : {
          'Content-Type' : 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(responseData => {
        console.log(responseData.message);
        showSnacbar(responseData.message , true)
    })
    .catch(error => {
        console.error('Error:', error);
        showSnacbar(`${error}` , false)
    }).finally(()=>{
      hideLoader();
      setTimeout(() => {
        // location.reload();
      }, 1000);
    }
    )
  }
  
}