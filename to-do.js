let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let clearDone = document.querySelector(".clear-done");
let activebtn = document.querySelector(".active");
let allbtn = document.querySelector(".all");
let completebtn = document.querySelector(".completed");
let taskArr =[];
if (localStorage.getItem("task")){
taskArr = JSON.parse(localStorage.getItem("task"));
}
// when window load get Data from Local Storage and يعرضها فى الصفحة 
getDatafromLocal()


// when submit btn is clicked
submit.addEventListener("click",()=>{
    if(input.value !== ""){
        addTasktoarray(input.value);
        input.value="";
    }
})
// Example with document object
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // Call your function here
   if (input.value !== "") {
     addTasktoarray(input.value);
     input.value = "";
   }
  }
});
// Show All btn
allbtn.addEventListener("click",()=>{
    addtasktoDiv(taskArr);
})
// Active Button
completebtn.addEventListener("click",()=>{
   let compArr = taskArr.filter((task) => task.complete == true);
   addtasktoDiv(compArr);
})

// Clear Completed Button 
clearDone.addEventListener("click",()=>{
    taskArr =taskArr.filter(task=> task.complete == false)
    console.log("active",taskArr)
storArrtolocal(taskArr);
addtasktoDiv(taskArr);
})

// Active Button
activebtn.addEventListener("click",()=>{
   let activetArr = taskArr.filter((task) => task.complete == false);
   addtasktoDiv(activetArr);
})

tasksDiv.addEventListener("click", (e) => {
  // Check if clicked on delete button
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    deletfromlocal(e.target.parentElement.getAttribute("id"));
  }
  if(e.target.classList.contains("task")){
    e.target.classList.toggle("done");
    completeTask(e.target.getAttribute("id"));

  }

});


// Delet Task From Local Storage when press Delete button
function deletfromlocal(taskId){
   taskArr =taskArr.filter(task => task.id != taskId )
storArrtolocal(taskArr);
}

// Add Task To Array of Tasks 
function addTasktoarray(tasktext){
  let task = {
    id: Date.now(),
    text: tasktext,
    complete: false,
  };

  taskArr.push(task); // add Task to save in array of tasks

  addtasktoDiv(taskArr); // add task to show in Tasks Div

  storArrtolocal(taskArr); // Save Array to Local  Storage
}


// Add task to Show to Tasks Div
function addtasktoDiv(taskArr){
  tasksDiv.innerHTML = ""; // Empty Tasks Container
  taskArr.forEach((task) => {
    tasksDiv.innerHTML += `<div class="task ${
      task.complete ? "done" : ""
    }" id=${task.id} >${task.text} 
        <span class ="del" >X</span> </div>`;
  });
}

// Store Array of tasks to Local Storage  
function storArrtolocal(taskArr){
 localStorage.setItem("task", JSON.stringify(taskArr));    
}
// Get Data updeted From Local Storage 
function getDatafromLocal(){
    let data = localStorage.getItem("task");
    if( data ){
        let tasks = JSON.parse(data)
        
        addtasktoDiv(tasks);
    }
}

function completeTask(taskID){
 taskArr.forEach(task =>{
    if(task.id == taskID){
        task.complete= !task.complete;
        console.log()
    }
    storArrtolocal(taskArr);
 })
}

let haybtn = document.querySelector(".Haybtn");


haybtn.addEventListener("click",()=>{
    
    document.getElementById("pag").style.transition = " height 0.5s ease-in-out";
    document.getElementById("pag").style.height = "0vh";
    document.getElementById("haybtn").style.display= "none"
    document.getElementById("text").style.display= "none"

})

const quotes = [
  {
    quote: `"You only live once, but if you do it right, once is enough."`,
    writer: `– Mae West`,
  },
  {
    quote: `"If you want to live a happy life, tie it to a goal, not to people or things."`,
    writer: `– Albert Einstein`,
  },
  {
    quote: `"Never let the fear of striking out keep you from playing the game."`,
    writer: `– Babe Ruth`,
  },
  {
    quote: `"Your time is limited, so don’t waste it living someone else’s life."`,
    writer: `– Steve Jobs`,
  },
  {
    quote: `"In order to write about life first you must live it."`,
    writer: `– Ernest Hemingway`,
  },
  {
    quote: `"Life is not a problem to be solved, but a reality to be experienced."`,
    writer: `– Soren Kierkegaard`,
  },
  {
    quote: `"The unexamined life is not worth living."`,
    writer: `– Socrates`,
  },
  {
    quote: `"Turn your wounds into wisdom."`,
    writer: `– Oprah Winfrey`,
  },
  {
    quote: `"The purpose of our lives is to be happy."`,
    writer: `- Dalai Lama`,
  },
  {
    quote: `"Live for each second without hesitation."`,
    writer: `- Elton John`,
  },
];

let btn = document.querySelector("#Qbtn");

let quote = document.querySelector(".quote");

let writer = document.querySelector(".writer");

btn.addEventListener("click", function () {
  let random = Math.floor(Math.random() * quotes.length);

  quote.innerHTML = quotes[random].quote;

  writer.innerHTML = quotes[random].writer;
});
