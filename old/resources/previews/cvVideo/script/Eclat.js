
function Eclat(x,y,width,background){

	this.x=x;
	this.y=y;
	this.width=width;
	this.background=background;
	var eclat = document.createElement("div");
		eclat.style.height=width;
		eclat.style.width=width;
		eclat.style.position="fixed";
		eclat.style.top=y;
		eclat.style.left=x;
		eclat.style.zIndex=101;
		eclat.style.backgroundImage=background;
		document.body.appendChild(eclat);
		
	var xPlus=Math.random()<0.5?true:false, yPlus=Math.random()<0.5?true:false;
	var vX=Math.floor(Math.random() * 10) + 1,
		vY=Math.floor(Math.random() * 10) + 1;
		
	var nbRaffraichissement=0;
		
	this.move=function(){
	
		x+=xPlus ? vX : -vX;
		y+=yPlus ? vY : -vY;
		
		if(x>window.innerWidth || x<0)
			xPlus=!xPlus;
		if(y>window.innerHeight || y<0)
			yPlus=!yPlus;
	
		eclat.style.top=y;
		eclat.style.left=x;
		
		if(nbRaffraichissement++>40)
			eclat.style.zIndex=1;
	
	}

	
	this.destruction=function(){
	
		var body=document.body;
		body.removeChild(eclat);
	
	}

}