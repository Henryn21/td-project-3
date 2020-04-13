//set focus to first field
document.querySelector("input").focus();
//job role section
//"other" title hidden/visible
const other=document.querySelector("[value=other]");
const hidden=document.querySelector("#other-title");
const titleList= document.querySelector("#title");
//attach listner to each element in list
//if other, show hidden, else hide hidden
titleList.addEventListener("change", (e)=>{
    if(event.target.value === other.value){
        hidden.style.display="block";
    }
    else{
        hidden.style.display="none";
    }
});
