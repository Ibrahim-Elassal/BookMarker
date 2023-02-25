var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteURL");
var addBtn = document.getElementById("addUrl");
var searchInput = document.getElementById("searchInput");
var invalidName = document.getElementById("invalidName");
var invalidUrl = document.getElementById("invalidUrl");
var validName = document.getElementById("validName");

var bookmarkContainer = []; 
var mainIndex = 0 ;

if(localStorage.getItem('bookmarks') != null){
    bookmarkContainer  = JSON.parse(localStorage.getItem('bookmarks'));
    
    displayBookmarks (bookmarkContainer);
}

function addBookmark (){
        if(siteNameInput.value == ""  && siteUrlInput.value == ""){
            invalidName.classList.replace("d-none" , "d-block");
            validName.classList.replace("d-block" , "d-none");
            invalidUrl.classList.replace("d-none" , "d-block");
        }
        else if(siteNameInput.value == ""  ){
            invalidName.classList.replace("d-none" , "d-block");
            invalidUrl.classList.replace("d-block" , "d-none");
        }
        else if(siteUrlInput.value == ""){
            invalidUrl.classList.replace("d-none" , "d-block");
            
            if(siteNameInput.value != ""){
                validName.classList.replace("d-none" , "d-block");
                invalidName.classList.replace("d-block" , "d-none");
            }
        }

        else {
            validName.classList.replace("d-block" , "d-none");
            invalidName.classList.replace("d-block" , "d-none");
            invalidUrl.classList.replace("d-block" , "d-none");
           
            invalidName.classList.replace("d-block" , "d-none");
            invalidUrl.classList.replace("d-block" , "d-none");
            var bookmarks ={
                siteName :siteNameInput.value  , 
                siteURL :siteUrlInput.value  , 
            }
            if(addBtn.innerHTML == "Add Bookmark" ){
                bookmarkContainer.push(bookmarks);
            }
            else {
                bookmarkContainer.splice(mainIndex , 1 ,bookmarks );
                addBtn.innerHTML = "Add Bookmark" ;
            }
            localStorage.setItem("bookmarks" , JSON.stringify(bookmarkContainer) )
                displayBookmarks (bookmarkContainer);
                clearForm ();
        }
}

function clearForm () {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function displayBookmarks(arr){
    var cartoona = ``;
    mainIndex = i  ;
    for(var i=0 ;i< arr.length ; i++){
        
        cartoona += `
        <tr class="bg-body-tertiary rounded p-5">
            <td>${arr[i].siteName}</td>
            <td> <a href="${arr[i].siteURL}" target="_blank"  class="btn btn-outline-primary">Visit</a>  </td>
            <td> <button onclick="updateBookmarks(${i})" id="updateBtn" class="btn btn-outline-warning">Update</button>  </td>
            <td> <button onclick="deleteBookmarks (${i})" class="btn btn-outline-danger">Delete</button>  </td>
        </tr> <br> ` 
        
    }
    document.getElementById('tableBody').innerHTML = cartoona   ;
}

function deleteBookmarks (productIndex) {
    bookmarkContainer.splice( productIndex , 1   )
    localStorage.setItem("bookmarks" , JSON.stringify(bookmarkContainer) )
    displayBookmarks(bookmarkContainer);
}

function updateBookmarks (index) {
    mainIndex = index ;
    siteNameInput.value =bookmarkContainer[index].siteName ;
    siteUrlInput.value =bookmarkContainer[index].siteURL ;

    addBtn.innerHTML = "Update Bookmark"
}

function searchBookmarkName (term ){
    var matchedBookmarks =[];
   for(var i=0 ; i<bookmarkContainer.length ; i++){
       if(bookmarkContainer[i].siteName.toLowerCase().includes(term.toLowerCase()) ===true){
        matchedBookmarks.push(bookmarkContainer[i]);
       }
   }
  displayBookmarks(matchedBookmarks)
}