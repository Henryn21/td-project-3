//set focus to first field
document.querySelector("input").focus();

//Job role section

//"other" title hidden/visible
const other=document.querySelector("[value=other]");
const hidden=document.querySelector("#other-title");
const titleList= document.querySelector("#title");
//attach listner to each element in list
//if other, show hidden, else hide hidden
hidden.style.display="none";
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

//payment info

//list
let paymentOptions= document.querySelector("#payment");
paymentOptions.value="credit card";

//information divs
let creditCardInfo=document.querySelector("#credit-card");
let paypalInfo=document.querySelector("#paypal");
let bitcoinInfo=document.querySelector("#bitcoin");

//display only selected, start on credit card

creditCardInfo.style.display="block";
paypalInfo.style.display="none";
bitcoinInfo.style.display="none";

document.querySelector("#payment").addEventListener("change", (e)=>{
    if(e.target.value=="select method"){
        creditCardInfo.style.display="none";
        paypalInfo.style.display="none";
        bitcoinInfo.style.display="none";
    }
    else if(e.target.value=="credit card"){
        creditCardInfo.style.display="block";
        paypalInfo.style.display="none";
        bitcoinInfo.style.display="none";
    }
    else if(e.target.value=="paypal"){
        creditCardInfo.style.display="none";
        paypalInfo.style.display="block";
        bitcoinInfo.style.display="none";
    }
    else if(e.target.value=="bitcoin"){
        creditCardInfo.style.display="none";
        paypalInfo.style.display="none";
        bitcoinInfo.style.display="block";
    }
});

//form validation
let valid=false;
let name=document.querySelector("#name");
let email=document.querySelector("#mail");
let activityError= document.createElement('p');
//error p element, intially hidden
activityError.textContent="Pick one or more activities";
activityError.style.color="red";
activityError.style.display="none";
activities.appendChild(activityError);
let cardNumber=document.querySelector("#cc-num");
let ccRegex=/^[0-9]{13,16}$/;//13-16 numbers
let zip=document.querySelector("#zip");
let zipRegex=/^[0-9]{5}$/;//5 numbers
let cvv=document.querySelector("#cvv");
let cvvRegex=/^[0-9]{3}$/;//3 digits

//valid field variables
let validName=false;
let validEmail=false;
let validActivities=false;
let validCardNumber=false;
let validZip=false;
let validCVV=false;
let validPayment=false;

//regex starts with letter,then can include otters, has a @ followed by characters, a dot, then more lettersher charac
let emailRegex=/^[a-zA-Z][a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
document.querySelector("form").addEventListener("submit", (e)=>{
    //check if valid
    valid=isValid();
    //if not valid, dont submit
    console.log("Valid is "+valid);
    if(!valid){
        e.preventDefault();
    }

    //name
    if(name.value.length<1){
        name.style.borderColor="red";
        validName=false;
    }
    else{
        name.style.borderColor="#9BBEEF"; 
        validName=true;
    }
    //email
    if(!emailRegex.test(email.value)){
        email.style.borderColor="red";
        validEmail=false;
    }
    else{
        email.style.borderColor="#9BBEEF";
        validEmail=true; 
    }
    //activity
    if(totalCost==0){
        activityError.style.display="block";
        validActivities=false;
    }
    else{
        activityError.style.display="none";
        validActivities=true;
    }
    //credit card
    //card number
    if(!ccRegex.test(cardNumber.value)){
        cardNumber.style.borderColor="red";
        validCardNumber=false;
    }
    else{
        cardNumber.style.borderColor="#9BBEEF";
        validCardNumber=true; 
    }
    //zip
    if(!zipRegex.test(zip.value)){
        zip.style.borderColor="red";
        validZip=false;
    }
    else{
        zip.style.borderColor="#9BBEEF"; 
        validZip=true;
    }
    //cvv
    if(!cvvRegex.test(cvv.value)){
        cvv.style.borderColor="red";
        validCVV=false;
    }
    else{
        cvv.style.borderColor="#9BBEEF";
        validCVV=true; 
    }
    //valid payment
    if(creditCardInfo.style.display=="block"){
        if(validCVV&&validCardNumber&&validZip){
            validPayment=true;
        }
        else{
            validPayment=false;
        }
    }
    else{
        validPayment=true;
    }
});

//if all fields are fine, set valid to true
function isValid(){
    if(validName&&validEmail&&validActivities&&validPayment){
        return true;
    }
    else{
        return false;
    }
}