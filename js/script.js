//set focus to first field
document.querySelector("input").focus();

//Job role section

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

//T shirt menu section

//variables for color list and design list
const designList= document.querySelector("#design");
const colorList=document.querySelector("#color");

//initially hide colors
for(let i=0;i<colorList.length;i++){
    colorList[i].style.display="none";
}
//set placeholder
const placeholder= document.createElement('option');
placeholder.textContent="Please select a T-shirt theme";
placeholder.selected=true;
colorList.appendChild(placeholder);


//add listner to elements in design menu
designList.addEventListener("change",(e)=>{
    //if design selected, show colors
    //if puns, show only pun shirt colors
    if(event.target.value=="js puns"){
        for(let i=0;i<=2;i++){
            colorList[i].style.display="block";
        }
        //hide heart
        for(let i=3;i<colorList.length;i++){
            colorList[i].style.display="none";
        }
        //remove placeholder if present
        if(colorList.contains(placeholder)){
            colorList.removeChild(placeholder);
        }
    }
    //if heart, show only heart shirt colors
    else if(event.target.value=="heart js"){
        for(let i=3;i<colorList.length;i++){
            colorList[i].style.display="block";
        }
        //hide puns
        for(let i=0;i<=2;i++){
            colorList[i].style.display="none";
        }
        //remove placeholder if present
        if(colorList.contains(placeholder)){
            colorList.removeChild(placeholder);
        }
    }
    //else hide colors
    else{
        for(let i=0;i<colorList.length;i++){
            colorList[i].style.display="none";
        }
        colorList.appendChild(placeholder);
    }
});

//Activities section

let activities=document.querySelector(".activities");
let checkboxes = document.querySelectorAll('.activities input');
let totalCost=0;
let costBox= document.createElement("p");
activities.appendChild(costBox);
activities.addEventListener('change', (e)=>{
    let clicked=e.target;

    //add cost
    if(clicked.checked){
        totalCost+=parseInt(clicked.getAttribute("data-cost"));
    }
    else{
        totalCost-=parseInt(clicked.getAttribute("data-cost"));
    }
    //if two activities are at same time, hide them
    for(let i=0;i<checkboxes.length;i++){
        //if not same element
        if(clicked!=checkboxes[i]){
            //if time is same
            if(checkboxes[i].getAttribute("data-day-and-time")==clicked.getAttribute("data-day-and-time")){
                //if box clicked is checked, disable all other boxes
                if(clicked.checked){
                    checkboxes[i].disabled=true;
                }
                else{
                    checkboxes[i].disabled=false;
                }
            }
        }        
    }
    //display cost
    costBox.innerText=(`Total: $${totalCost}`);
});
