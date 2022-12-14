function Bonus() {

	this.vitesse=0;
	this.vie=0;
	this.porteeBombe=0;
	
	n=parseInt(Math.random()*3);
	
	if(n==0)
		this.vitesse=1;
	if(n==1)
		this.vie=1;
	if(n==2)
		this.porteeBombe=1;
		
	this.getBonus = function(){
	
		if(!(this.vitesse || this.vie || this.porteeBombe))
			return 1;
		else
			return 0;
	}
}
