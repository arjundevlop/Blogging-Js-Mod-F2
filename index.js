const postBtn = document.getElementById("post-btn");
const modal = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName("close")[0];
postBtn.addEventListener("click", function(){
    modal.style.display = "block";
    // modal.querySelector(".heading-input").value = "";
    // modal.querySelector("#blog-content").value = "";
    
});

closeBtn.addEventListener("click", function(){
    modal.style.display = "none";
});

window.onclick = function(event){
    if(event.target==modal)
    {
        modal.style.display = "none";
    }
}
const editModal = document.getElementById("editing-modal");
const closeEditBtn = document.getElementById("close-btn-edit");
closeEditBtn.addEventListener("click", function(){
    editModal.style.display = "none";
});

const blogArr = [];


const publishBtn = document.getElementById("publish-btn");
const cancelPostBtn = document.getElementById("cancel-post");
publishBtn.addEventListener("click",publish);
 function publish(){
    var objInfo ={id:blogArr.length ,heading:"", blogText:"", creationTime:""};
    
    const headingInputValue = document.querySelector(".heading-input").value;
    const blogContent = document.getElementById("blog-content").value;
    
    objInfo.heading = headingInputValue;

    objInfo.blogText = blogContent;
    
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 

    const currDate = day+"/"+month+"/"+year;
    const currTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;
    
    var creationTimeandDate = "Created At : " +currDate+" "+ "at"+ " "+ currTime;
    objInfo.creationTime = creationTimeandDate;

    blogArr.push(objInfo);
    renderBlogs();
   

    document.querySelector(".heading-input").value = "";
    document.getElementById("blog-content").value = "";
    
    modal.style.display = "none";
    
};

function renderBlogs(){
    const blogsDivContainer = document.querySelector(".blogsDiv");
    blogsDivContainer.innerHTML = "";
    for(let i=0; i<blogArr.length; i++)
    {
        
        let blog = blogArr[i];
    const blogDiv = document.createElement("div");
    blogDiv.classList.add("blog-Container");

    const headDiv = document.createElement("div");
    headDiv.classList.add("blog-heading-div");

    const blogContentDiv = document.createElement("div");

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("blog-btn-div");
    const editPostBtn = document.createElement("button");
    editPostBtn.classList.add("edit-post-btn");

    const deletePostBtn = document.createElement("button");

    const timeDiv = document.createElement("span");
    timeDiv.classList.add("blog-time-div");

    buttonsDiv.appendChild(editPostBtn);
    buttonsDiv.appendChild(deletePostBtn);
    buttonsDiv.appendChild(timeDiv);
    blogDiv.appendChild(headDiv);
    blogDiv.appendChild(blogContentDiv);
    blogDiv.appendChild(buttonsDiv);

    editPostBtn.innerHTML = "Edit Post";
    editPostBtn.setAttribute("data-blog-id", blog.id);
    deletePostBtn.innerHTML = "Delete Post";
    deletePostBtn.setAttribute("data-blog-id", blog.id);

    headDiv.innerHTML = blog.heading;
    blogContentDiv.innerHTML = blog.blogText;
    timeDiv.innerHTML = blog.creationTime;
    
    blogsDivContainer.appendChild(blogDiv);

    editPostBtn.addEventListener("click", handleEditBtn);
    deletePostBtn.addEventListener("click", handleDeleteBtn);

    }
}

function handleEditBtn(event){
    let blogId = parseInt(event.target.dataset.blogId);

    let blogIndex = blogArr.findIndex(blog => blog.id===blogId);
    let blog = blogArr[blogIndex];

    let editModal = document.querySelector(".edit-modal");
    let modaltitle  = document.querySelector(".title");
    modaltitle.innerHTML = blog.heading;

    let modalInput = document.createElement("input");
    editModal.insertAdjacentElement("beforeend",modalInput);
     modalInput.value = blog.blogText;

    
     let saveBtn = document.querySelector(".save-btn");
    
    
    saveBtn.addEventListener("click", function(){

        blog.blogText = modalInput.value;

        const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 

    const currDate = day+"/"+month+"/"+year;
    const currTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;
    blog.creationTime = "Last Updated At :"+" "+currDate+" "+"at"+" "+currTime;
    editModal.removeChild(modalInput);
    renderBlogs();
    
    
    editModal.style.display = "none";
    });
    editModal.style.display = "block";
}

function handleDeleteBtn(event){
    let blogId = parseInt(event.target.dataset.blogId);
    let blogIndex = blogArr.findIndex(blog => blog.id === blogId);
    blogArr.splice(blogIndex, 1);
    renderBlogs();

}
