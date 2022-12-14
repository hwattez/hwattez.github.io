function Items(joueur, bombe, murDestructible, murIndestructible, feu, wormBrule, tombe) {

	this.joueur=joueur;
	this.bombe=bombe;
	this.murDestructible=murDestructible;
	this.murIndestructible=murIndestructible;
	this.feu=feu;
	this.wormBrule=wormBrule;
	this.tombe=tombe;
	this.bonus=0;
	
	this.zoneVierge = function(){
		if(!(this.joueur || this.bombe || this.murDestructible || this.murIndestructible || this.feu || this.wormBrule || this.tombe))
			return true;
		else
			return false;
	}
	
	if(murDestructible){
	
		if(parseInt(Math.random()*2)==0)
			this.bonus=new Bonus();
	
	}

}
