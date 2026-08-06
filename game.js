let level = 1;

let lesson = 1;

let score = 0;

let questionNumber = 0;

let currentLesson;


let progress = JSON.parse(
    localStorage.getItem("progress")
) || {

    level1: {
        lesson1:true,
        lesson2:false,
        lesson3:false,
        test:false
    },


    level2:{
        lesson1:false,
        lesson2:false,
        lesson3:false,
        test:false
    }

};


let level2Unlock =
localStorage.getItem("level2Unlock") === "true";


function updateMenu(){


    if(level2Unlock){


        document.getElementById("level2Btn").disabled=false;


        document.getElementById("level2Btn").innerHTML=
        "🚀 Bài 1<br>Cộng không nhớ";


    }
    else{


        document.getElementById("level2Btn").disabled=true;


        document.getElementById("level2Btn").innerHTML=
        "🔒 Level 2<br>Hoàn thành Level 1";


    }


}


function startGame(lv,ls=1){


    level=lv;

    lesson=ls;



    currentLesson =
    lessons["level"+lv][ls-1];


    score=0;

    questionNumber=0;



    document.getElementById("menu").style.display="none";

    document.getElementById("play").style.display="block";



    document.getElementById("levelTitle").innerHTML =
    currentLesson.name;



    document.getElementById("score").innerHTML=0;



    nextQuestion();

}




function nextQuestion(){


    if(questionNumber >= currentLesson.total){

        finishGame();

        return;

    }



    questionNumber++;


    document.getElementById("count").innerHTML =
    questionNumber;



    let max = currentLesson.max;



    let type = currentLesson.type || "normal";



    let questionText="";

    let correct;



    // Dạng cộng bình thường
    if(type=="normal"){


        let a =
        Math.floor(Math.random()*max);


        let b =
        Math.floor(Math.random()*max);



        correct=a+b;



        questionText =
        a+" + "+b+" = ?";


    }



    // Dạng tìm số còn thiếu
    else if(type=="missing"){


        correct =
        Math.floor(Math.random()*max);



        let b =
        Math.floor(Math.random()*max);



        let a =
        correct-b;



        if(a<0){

            a=Math.abs(a);

            correct=a+b;

        }



        questionText =
        "? + "+b+" = "+correct;



    }



    // Dạng cộng vượt 10
    else if(type=="carry"){


        let a =
        Math.floor(Math.random()*10)+5;


        let b =
        Math.floor(Math.random()*10)+5;



        correct=a+b;



        questionText =
        a+" + "+b+" = ?";


    }



    document.getElementById("question").innerHTML =
    questionText;



    createAnswers(correct);

}






function checkAnswer(user,correct){


    if(user==correct){


        score+=10;


        let good=[
            "🎉 Giỏi quá!",
            "⭐ Chính xác!",
            "👏 Bé làm tốt!",
            "🥳 Tuyệt vời!"
        ];


        document.getElementById("result").innerHTML =
        good[Math.floor(Math.random()*good.length)];


    }

    else{


        document.getElementById("result").innerHTML =
        "😊 Cố lên bé nhé!";


    }



    document.getElementById("score").innerHTML =
    score;



    setTimeout(nextQuestion,700);


}









function finishGame(){

    let star="";

    if(score>=90){
        star="⭐⭐⭐";
    }
    else if(score>=70){
        star="⭐⭐";
    }
    else{
        star="⭐";
    }

// Mở khóa Level 2 khi hoàn thành Level 1
if(score>=70){

    progress["level"+level]
    ["lesson"+lesson] = true;


    if(lesson < 3){

        progress["level"+level]
        ["lesson"+(lesson+1)] = true;

    }


    saveProgress();




}

    document.getElementById("play").style.display="none";

    document.getElementById("finish").style.display="block";

    document.getElementById("finalStar").innerHTML = star;

    document.getElementById("finalScore").innerHTML = score;

}



function createAnswers(correct){

    let max=currentLesson.max;

    let arr=[correct];

    while(arr.length<4){

        let fake=Math.floor(Math.random()*max*2);

        if(!arr.includes(fake)){
            arr.push(fake);
        }

    }


    arr.sort(()=>Math.random()-0.5);


    let html="";


    arr.forEach(function(value){

        html +=
        `<button onclick="checkAnswer(${value},${correct})">
        ${value}
        </button>`;

    });


    document.getElementById("answers").innerHTML=html;

}



function restartGame(){

    document.getElementById("finish").style.display="none";

    document.getElementById("play").style.display="block";


    score=0;

    questionNumber=0;


    document.getElementById("score").innerHTML=0;


    document.getElementById("count").innerHTML=0;


    nextQuestion();

}



function backMenu(){

    location.reload();

}

function saveProgress(){

    localStorage.setItem(
        "progress",
        JSON.stringify(progress)
    );

}

updateMenu();