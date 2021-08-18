"use strict";

let currentDirection = 'right';

let count = 0;

let createTimer;
let dropObstacleTimer;
let checkCollisionTimer ;
let createPointsTimer

  document.onkeydown = checkKey;

  function checkKey(e) {
  
      e = e || window.event;
      let snake = document.getElementById('snake');
      if (e.keyCode == '38') {
          // up arrow
          snake.style.top = parseInt(getComputedStyle(snake).top.slice(0, -2),10) - parseInt(30,10) + 'px' ;
        }
        else if (e.keyCode == '40') {
            // down arrow

            snake.style.top = parseInt(getComputedStyle(snake).top.slice(0, -2),10) + parseInt(20,10) + 'px' ;
      }
      else if (e.keyCode == '37') {
         // left arrow
         snake.style.left = parseInt(getComputedStyle(snake).left.slice(0, -2),10) - parseInt(20,10) + 'px' ;
      }
      else if (e.keyCode == '39') {
         // right arrow
         snake.style.left = parseInt(getComputedStyle(snake).left.slice(0, -2),10) + parseInt(20,10) + 'px' ;

      }
  
  }

  const createObstacles = ()=>{
    let board = document.getElementsByClassName('board')[0];

    let obstacleEle = document.createElement('div');
    obstacleEle.classList.add('obstacle');
    obstacleEle.setAttribute('id',new Date().valueOf())
    obstacleEle.style.right = Math.floor(Math.random() * 100) + 'vw';
    board.appendChild(obstacleEle);

  }
  const createPoints = ()=>{
    let board = document.getElementsByClassName('board')[0];
    let pointsEle = document.createElement('div');
    pointsEle.classList.add('point');
    pointsEle.setAttribute('id',new Date().valueOf())
    pointsEle.style.right = Math.floor(Math.random() * 90) + 'vw';
    board.appendChild(pointsEle);

  }
  const dropObstacles = ()=>{
    let points = document.getElementsByClassName('obstacle');

    Array.from(points).map((ele)=>{
        ele.style.top = parseInt(getComputedStyle(ele).top.slice(0, -2),10) + parseInt(5,10) + 'px' ;
    })

  }
  const dropPoints = ()=>{
    let points = document.getElementsByClassName('point');

    Array.from(points).map((ele)=>{
        ele.style.top = parseInt(getComputedStyle(ele).top.slice(0, -2),10) + parseInt(5,10) + 'px' ;
    })

  }
  const checkCollision = () =>{
    
    let snake = document.getElementById('snake');
    let obs = document.getElementsByClassName('obstacle');
    let points = document.getElementsByClassName('point');
    Array.from(points).map((ele)=>{
       let a =  overlaps(snake , ele)
       if(a){
           count +=10;
           const pointsSpan = document.getElementById('totalPoints');
           pointsSpan.innerHTML = count;
        var myobj = document.getElementById(ele.id);
        myobj.remove();
    } 
    });
    Array.from(obs).map((ele)=>{
        let a =  overlaps(snake , ele)
        if(a){
         var myobj = document.getElementById(ele.id);
         const pointsSpan = document.getElementById('totalPoint');
         const gameOver = document.getElementById('game-over');
         gameOver.style.display = 'block';
         pointsSpan.innerHTML = count;
         myobj.remove();
         clearInterval(createTimer);
         clearInterval(dropObstacleTimer);
         clearInterval(checkCollisionTimer);
         clearInterval(createPointsTimer);
         
     } 
     });

  }
  let overlaps = (function () {
    function getPositions( elem ) {
        var width = parseFloat(getComputedStyle(elem, null).width.replace("px", ""));
        var height = parseFloat(getComputedStyle(elem, null).height.replace("px", ""));
        return [ [ elem.offsetLeft, elem.offsetLeft + width ], [ elem.offsetTop, elem.offsetTop + height ] ];
    }

    function comparePositions( p1, p2 ) {
        var r1 = p1[0] < p2[0] ? p1 : p2;
        var r2 = p1[0] < p2[0] ? p2 : p1;
        return r1[1] > r2[0] || r1[0] === r2[0];
    }

    return function ( a, b ) {

        var pos1 = getPositions( a ),
            pos2 = getPositions( b );
          
        return comparePositions( pos1[0], pos2[0] ) && comparePositions( pos1[1], pos2[1] );
    };
})();
const removePixels = ()=>{
    let intViewportHeight = window.innerHeight;
    let obs = document.getElementsByClassName('obstacle');
    let points = document.getElementsByClassName('point');
    Array.from(points).map((ele)=>{
       
        if(getComputedStyle(ele).top.slice(0, -2)> intViewportHeight){
             var myobj = document.getElementById(ele.id);
             myobj.remove();

        }
     });
     Array.from(obs).map((ele)=>{
       
        if(getComputedStyle(ele).top.slice(0, -2)> intViewportHeight){
             var myobj = document.getElementById(ele.id);
             myobj.remove();

        }
     });
}
const reload = ()=>{
    location.reload();
}
const start = ()=>{
    
    const gameOver = document.getElementById('rules');
    gameOver.style.display = 'none';

     createTimer = setInterval(()=>{
        createObstacles();
    },800)
     dropObstacleTimer = setInterval(()=>{
        
        dropObstacles();
        dropPoints();
    
    },100)
     checkCollisionTimer = setInterval(()=>{
        
        checkCollision();
    
    },50)
     createPointsTimer = setInterval(()=>{
    
        createPoints();
     
    },2000)
     setInterval(()=>{
    
        removePixels();
     
    },1000)
}


