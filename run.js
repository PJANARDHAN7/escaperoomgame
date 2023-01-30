var user_name;

var final_level = 5;
var current_level = 0;
var flag = 0;
var total_moves = 0;
var score = 0;
var question_index = 1;

var question_data = new Map();
question_data.set(1, ["What is value of 2%3 =", "2"]);
question_data.set(2, ["in python What is value of 3//2 =", "1"]);
question_data.set(3, ["What is the value of 8/4+2 =", "4"]);
question_data.set(4, ["What is the value of 1*2*3*4*5*0 =", "0"]);
question_data.set(5, ["What is the value of 3 - sqrt(9) =", "0"]);

    //hide get_question 
    document.getElementById("get_question").style.display = "none";

function start() {
    //get the user_name from alert box 
    user_name = prompt("Enter your name");

        while(user_name.length<1){
            alert("Please enter a valid name");
            user_name = prompt("Enter your name");
            if(user_name.length>0){
                break;
            }
        }
    
  
    //show the get_question img
    document.getElementById("get_question").style.display = "block";
  
    //disable get_question button
    document.getElementById("get_question").disabled = true;

    show_random();
    reset_or_start();
    flag = 1;
    //show random_number button
    document.getElementById("random_number").style.display = "block";

    //show end button
    document.getElementById("end").style.display = "block";

    //hide start button
    document.getElementById("start").style.display = "none";



}


function end() {
    store_score();
    
    //disable get_question button
    document.getElementById("get_question").disabled = true;

    //hide get_question 
    document.getElementById("get_question").style.display = "none";

    

    //hide random_number_box
    document.getElementById("random_number_box").style.display = "none";
    alert("Game over\nUser name :"+user_name+"\nTotal Moves: " + total_moves + "\ntotal score: " + score);
    reset_or_start();
    show_random();
    //enable start button
    document.getElementById("start").disabled = false;
    //reset the person to the left
    document.getElementById("person").style.left = 0;

    //show start button
    document.getElementById("start").style.display = "block";
    get_max_score();

}

//set the height of person according to device
function set_person_height() {
    //set the height of start button according to device

    var start_button_height = document.getElementById("start").clientHeight;
    document.getElementById("start").style.top = window.innerHeight - start_button_height;


    var person_height = document.getElementById("person").clientHeight;
    document.getElementById("person").style.top = window.innerHeight - person_height;
}

//hide random_number_text and random_number_box
function hide_random() {
    //hide random_number_text
    document.getElementById("random_number_text").style.display = "none";
    //hide random_number_box
    document.getElementById("random_number_box").style.display = "none";
}

hide_random();

//hide the get_question img



function show_random() {



    //reset the get_question position to left about 30 % of the screen
    // document.getElementById("get_question").style.left = window.innerWidth * 0.15   ;
    // document.getElementById("get_question").style.left = ;
    document.getElementById("get_question").style.left = window.innerWidth / 5 + "px";
 
    //disable get_question button
    // document.getElementById("get_question").disabled = true;
    //hide random_number button
    document.getElementById("random_number").style.display = "none";

    //show start button
    document.getElementById("start").style.display = "block";
    //enable start button
    document.getElementById("start").disabled = false;

    //hide the random_number button
    document.getElementById("random_number").style.display = "none";
    //hide the answer field
    document.getElementById("answer").disabled = true;
    //hide the check_answer button
    document.getElementById("check_answer").style.display = "none";

    //hide the question box
    document.getElementById("question_box").style.display = "none";
    //set score to 0
    document.getElementById("score_text").innerHTML = 0;
    //hide end button
    document.getElementById("end").style.display = "none";


}

var temp_array = [];


//store score in local storage
function store_score() {
   
    //store user_name as key and score, number of moves as array as value

    localStorage.setItem(user_name,[score,total_moves]);
   

}
//get score from local storage

//function to get max score if score is equal then get the user with less number of moves
function get_max_score() {
 
    
    var max_score = [-1,-1];
    var max_score_user = "";

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        if(value[0] == max_score[0] && value[1]<max_score[1]){
            max_score = value;
            max_score_user = key;
        }
        else if (value[0] > max_score[0]) {
            max_score = value;
            max_score_user = key;
        }
    }
    alert("Max score is " + max_score[0] + " by " + max_score_user);
}


show_random();



function reset_or_start(){
    
    flag = 0;
    //enable start button
    document.getElementById("start").disabled = false;


    final_level = 5;
    current_level = 0;
    total_moves = 0;
    score = 0;
    question_index = 1;
    //reset the person position
    document.getElementById("person").style.left = 0;

    show_random();
}



function checkAnswer() {
     
    
    
     //DISABLE get_question button

    var current_answer = document.getElementById("answer").value;
    var correct_answer = question_data.get(question_index)[1];
    //remove event listener from get_question 
    document.getElementById("get_question").removeEventListener("click", solveme);

    //show the random_number button
    document.getElementById("random_number").style.display = "block";
    //show the random_number_box
    document.getElementById("random_number_box").style.display = "block";
    //show the random_number_text
   

    if (current_answer == correct_answer) {
        //move get_question to the right
        // document.getElementById("get_question").style.left = 200 * current_level + "px";
        document.getElementById("get_question").style.left = parseInt(document.getElementById("get_question").style.left) + window.innerWidth / 6 + "px";


        
        alert("Correct Answer");
        //increase the score by 1
        score++;
        document.getElementById("score_text").innerHTML = score;

        if (current_level == final_level) {
            //show that user won the game
            alert("Congrats "+user_name+" you won the game\nTotal Moves: " + total_moves + "\ntotal score: " + score);
            get_max_score();


            reset_or_start();

        }
        else {

            document.getElementById("question_text").innerHTML = "for next question move first";
            question_index++;
            //disable the answer field
            document.getElementById("answer").disabled = true;
            //hide the answer button
            document.getElementById("check_answer").style.display = "none";


            //hide the random_number button
            document.getElementById("random_number").style.display = "block";
            //hide the answer field
            document.getElementById("answer").disabled = true;
            //hide the check_answer button
            document.getElementById("check_answer").style.display = "none";
            //hide the random_number_box
            document.getElementById("random_number_box").style.display = "none";
            //hide the question box
            document.getElementById("question_box").style.display = "none";

                //disable get_question button
    document.getElementById("get_question").disabled = true;

        }
    }


    else {
        alert("Wrong Answer");
        end();

    }
}


function solveme() {
//     //hide the random_number button
//     document.getElementById("random_number").style.display = "none";
//     //hide the random_number_box
//     document.getElementById("random_number_box").style.display = "none";
   //hide the random_number_text
   document.getElementById("random_number_text").style.display = "none";
   
   
   

    //show the question box
    document.getElementById("question_box").style.display = "block";

    //show the answer field
    document.getElementById("answer").disabled = false;

    //show question
    document.getElementById("question_text").innerHTML = question_data.get(question_index)[0];

    //show the check_answer button
    document.getElementById("check_answer").style.display = "block";


    //hide the random_number button
    document.getElementById("random_number").style.display = "none";



}

function randomNumber() {
    //show the random_number_text
    document.getElementById("random_number_text").style.display = "block";

    total_moves++;
    //show the random_number_box
    document.getElementById("random_number_box").style.display = "block";

    var random_number = Math.floor(Math.random() * 2);


  

    if (current_level == question_index - 1 && random_number == 1) {
       

        document.getElementById("random_number_text").innerHTML =  " 1 " + "\n click the 'can you solve me' box";
        // add event listener to get_question id
        document.getElementById("get_question").addEventListener("click", solveme);


        // move the person to the right by 1/4 of the screen to its current position 
        document.getElementById("person").style.left = parseInt(document.getElementById("person").style.left) + window.innerWidth / 6 + "px";

        //hide the random_number button
        document.getElementById("random_number").style.display = "none";




        current_level++;
        document.getElementById("question_text").innerHTML = question_data.get(question_index)[0];


    }
    else {
        document.getElementById("random_number_text").innerHTML = random_number + " You can't move";
    }

}