
function GestionEclat(){

	var tabEclat=new Array;
	
	this.newEclat=function(img,x,y,width){
		
		tabEclat.push(new Eclat(x,y,width,img));
	
	}
	
	setInterval(function(){
	
		for(var i=0;i<tabEclat.length;i++)
			tabEclat[i].move();
	
	},50);
	
	this.deleteAll=function(){
		
		for(var i=0;i<tabEclat.length;i++){
			tabEclat[i].destruction();
			tabEclat[i]=null;
		}
		
		tabEclat=[];
	
	}

}