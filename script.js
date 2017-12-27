
var snake = [ {x:3, y:2},{x:2, y:2},{x:2, y:3},{x:1, y:3},{x:1, y:4}] ;
var appleExists = false;
var appleCoord;
var score = 0;
var gdiffX;
var gdiffY;
$(function() {

    $("#panel").html( createBoard()) ;
    
    drawSnake() ;
    
    $(window).keydown(function(e){
       removeSnake();
       switch(e.which) {
           case 38 : snakemove({x:0, y:-1}) ; break ;
           case 39 : snakemove({x:1, y:0}) ; break ;
           case 40 : snakemove({x:0, y:1}) ; break ;
           case 37 : snakemove({x:-1, y:0}) ; break ;
       }
           
       drawSnake();
    });
    $('input').click(function (params) {
        if(!params.target.checked){
            $('td').css('border','none');
            $('span').text('Grid OFF');

        }else {
        $('td').css('border','1px solid #ddd');
        $('span').text('Grid ON');
    }
    });
    

    $('td').click(function (e){
        
        appleCoord = {x:this.id[0],y:this.id[2]};
        //console.log(e);
        if(!appleExists && !onSnake()){
        $(this).css('background','rgba(0, 0, 0, 0) url("lib/snake-graphics.png") no-repeat scroll 0px -192px')
        //console.log(this.id[0]); 
        
        appleExists = true;
        console.log(appleCoord);

        navigate();

        
        }else appleExists = false;
    });

    
    
});
function onSnake(){
    for (let i = 0; i < snake.length; i++) {
        if(snake[i].x == appleCoord.x && snake[i].y == appleCoord.y)
        return true;
    }
    return false;
} 
function resetDiff(){

    gdiffX = (snake[0].x - appleCoord.x);
    gdiffY = (snake[0].y - appleCoord.y);
    
     if(gdiffX>0)gdiffX=-1;
     else if(gdiffX<0) gdiffX=1;
     else gdiffX=0;

     if(gdiffY>0)gdiffY=-1;
     else if(gdiffY<0) gdiffY=1;
     else gdiffY=0;

}
function navigate(){

    resetDiff();
     //console.log(gdiffX,gdiffY);

     if (Math.random*10>=5) {
         yfirst();
     }else xfirst();



}

function checkCollision(nexttile){
    for (let i = 1; i < 4; i++) {

        if ((nexttile.x === snake[i].x) && (nexttile.y === snake[i].y)) {

        //console.log(nexttile.x+" = "+snake[i].x+", "+nexttile.y+" = ",snake[i].y);
            return true;
        }
    }
    return false;
}
function antiCollision(dir){

    /*
        Check the tile for the next move(dir)
        if tile is occupied, 
            if check axis of direction
                then check for tile below or above depending on the position of apple
                if extra move axis is x then call xfirst else call yfirst

    */ 
    var nexttile = {x:(dir.x+snake[0].x),y:(dir.y+snake[0].y)};

    if (checkCollision(nexttile)) {
        //x axis move
        if (dir.x) {
            
            if (!checkCollision({x:nexttile.x,y:(nexttile.y+1)})) {
                removeSnake();
                snakemove({x:0, y:1});
                drawSnake();
                console.log("extra move at : "+nexttile.x + " and "+(nexttile.y+1));

            } else if (!checkCollision({x:nexttile.x,y:(nexttile.y-1)})) {
                removeSnake();
                snakemove({x:0, y:-1});
                drawSnake();

                console.log("extra move at : "+nexttile.x + " and "+(nexttile.y-1));
            }
                //reset directions
                resetDiff();
                xfirst();
                return 1;
            
        } else {
            if (!checkCollision({x:nexttile.x+1,y:(nexttile.y)})) {
                removeSnake();
                snakemove({x:1, y:0});
                drawSnake();

                console.log("extra move at : "+(nexttile.x+1) + " and "+(nexttile.y));

            } else if (!checkCollision({x:nexttile.x-1,y:(nexttile.y)})) {
                removeSnake();
                snakemove({x:-1, y:0});
                drawSnake();

                console.log("extra move at : "+(nexttile.x-1) + " and "+(nexttile.y));
            }
                //reset directions
                resetDiff();
                yfirst();
                return 1;
        }


        
    
}
//console.log("no collision");
        return 0;

}
function xfirst(){
    //Moves to the same X level as the apple, after that moves to the same Y level as the apple 
    var id = setInterval(function (e){
        if(snake[0].x-appleCoord.x==0){
        clearInterval(id);
        id = setInterval(function (e){
            if(snake[0].y-appleCoord.y==0){
            clearInterval(id);
            appleExists =false;
            score+=100;
            $('<div style="position: absolute;top: 300px;left:'+($(document).width()/2-175)+'px;font-size: 1px;">'+score+'</div>').appendTo($('body')).animate({'font-size':'200px'},1500).fadeOut(10);
            
            
        }
            else{
                if(antiCollision({x:0, y:gdiffY})) clearInterval(id);
                else{
                removeSnake();
                snakemove({x:0, y:gdiffY});
                //console.log('interval');
                drawSnake();
            }}
        },250);
    }
        else{
            if(antiCollision({x:gdiffX, y:0})) clearInterval(id);
            else{
                removeSnake();
                snakemove({x:gdiffX, y:0});
               // console.log('interval');
                drawSnake();
        }   }
    },250);

}
function yfirst(){
    

    //Moves to the same Y level as the apple, after that moves to the same X level as the apple 
   var id = setInterval(function (e){
       //if snake has reached correct y, start x move
        if(snake[0].y-appleCoord.y == 0){
        clearInterval(id);
        id = setInterval(function (e){
            if(snake[0].x-appleCoord.x==0){
            clearInterval(id);
            appleExists = false;
            score+=100;
            $('<div style="position: absolute;top: 300px;left:'+($(document).width()/2-175)+'px;font-size: 1px;">'+score+'</div>').appendTo($('body')).animate({'font-size':'200px'},1500).fadeOut(10);
            
        }
            else{
                if(antiCollision({x:gdiffX, y:0})) clearInterval(id);
                else{
                    removeSnake();
                    snakemove({x:gdiffX, y:0});
                    //console.log('interval');
                    drawSnake();
                }
            }
        },250);
    }
        else{
            if(antiCollision({x:0, y:gdiffY})) clearInterval(id);
            else{
                removeSnake();
                snakemove({x:0, y:gdiffY});
                //console.log('interval');
                drawSnake();
            }
        }
    },250);

}
function removeSnake() {
    // reset snakes
    for ( var i=0; i<snake.length; i++) {
        $("#" + snake[i].x + "_" + snake[i].y).css("background", "white").html("") ;
    }
}

function drawSnake() {
    var head = snake[0] ;
    var headTile =  findHeadTile() ;

    //Remove tooltip from previous tiles
    $('td').each(function (element){
        if ($(this).data("qtip")) {
            // the 'true' makes the difference
            $(this).qtip("destroy",true);
            // extra cleanup
            $(this).removeData("hasqtip");
            $(this).removeAttr("data-hasqtip");
        }
    });

    $("#" + head.x + "_" + head.y).css("background", "url(lib/snake-graphics.png) no-repeat " + tile(headTile)).qtip({ // Grab some elements to apply the tooltip to
        content: {
            text: 'Please some food!',
            title:'Snake says:'
        }
    }) ;
    
    var tail = snake[snake.length-1] ;
    var tailTile =  findTailTile() ;
    $("#" + tail.x + "_" + tail.y).css("background", "url(lib/snake-graphics.png) no-repeat " + tile(tailTile));
    
    for ( var i=1; i<snake.length-1; i++) {
        var body = snake[i];
		var bodyTail = findBodyTile(i) ;
        $("#" + body.x + "_" + body.y).css("background", "url(lib/snake-graphics.png) no-repeat " + tile(bodyTail)) ;
    }
}

function findHeadTile() {
    var diffX = snake[0].x-snake[1].x;
    var diffY = snake[0].y-snake[1].y;
   
    switch (diffX) {
        case 1:
            return 4;
        case -1:
            return 8;
    
       case 0:
       if (diffY==1) {
           return 9;
       } else {
           return 3;
       }
    }
}

function findTailTile() {
    var diffX = snake[4].x-snake[3].x;
    var diffY = snake[4].y-snake[3].y;
   
    switch (diffX) {
        case 1:
            return 18;
        case -1:
            return 14;
    
       case 0:
       if (diffY==1) {
           return 13;
       } else {
           return 19;
       }
    }
   
}

function findBodyTile(index) {
	var diff0x = snake[index].x-snake[index+1].x;
    var diff1x = snake[index].x-snake[index-1].x;
    var diff0y = snake[index].y-snake[index+1].y;
    var diff1y = snake[index].y-snake[index-1].y;
    
    if ((diff1x==-1 && diff0y==-1) || (diff0x==-1 && diff1y==-1)) {
        return 0;
    }else if ((diff1y==-1 && diff0x==1) || (diff0y==-1 && diff1x==1)) {
        return 2;
    }else if ((diff0y==1 && diff1x==-1) || (diff1y==1 && diff0x==-1)) {
        return 5;
    }else if ((diff0x==1 && diff1y==1)|| (diff1x==1 && diff0y==1)) {
        return 12;
    }else if ((diff0y==-1 && diff1y==1) || (diff1y==-1 && diff0y==1)) {
        return 7;
    }else
        return 1;



}

function createBoard() {
    var out = "<table id='gameTable'>" ;
    for ( var y=0; y<10; y++) {
        out +="<tr>" ;
        for ( var x=0; x<10; x++) {
            out +="<td id='" + x + "_" + y + "'></td>" ;
        }
        out +="</tr>" ;
    }
    out += "</table>" ;
    return out;
}

function tile(no) {
    var left = (no%5) * -64 + "px" ;
    var top = Math.floor(no/5) * -64 + "px";
    return  " " + left + " " + top ;
}

function snakemove(dir) {
    for ( var i=snake.length-2; i >= 0; i--) {
        snake[i+1] = snake[i] ;
    }
    head = snake[0] ;
    snake[0] = { x: head.x +dir.x, y : head.y + dir.y } ;
}


