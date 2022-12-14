
function Joueur(pseudo) {

	this.pseudo=pseudo;
	this.x=0;
	this.y=0;
	this.id=10;
	this.vie=3;
	this.delaiInterMouvement=200;
	this.delaiInterBombe=1000;
	this.dernierMouvement=new Date().getTime();
	this.derniereBombe=new Date().getTime();
	
	
/********** Reçoit les mouvements **********/
	
	this.mouvementJoueur = function(e, time){

		this.dernierMouvement=time;
		if(e == 83) // Bas
			map.positionJoueur(this, this.x, this.y+1);
		else if(e == 90) // Haut
			map.positionJoueur(this, this.x, this.y-1);
		else if(e == 81) // Gauche
			map.positionJoueur(this, this.x-1, this.y);
		else if(e == 68) // Droite
			map.positionJoueur(this, this.x+1, this.y);
		else if(e == 32){ // Espace => Bombe
			this.derniereBombe=time;
			map.positionBombe(this);
		}
	
	};
	
	

/********** Reçoit les actions du clavier, puis redistribue **********/
	
	this.actionJoueur = function(e){
		if(this.vie>0){
			var time = new Date().getTime();
			if((e == 83 || e == 90 || e == 81 || e == 68) && time-this.dernierMouvement>this.delaiInterMouvement) // Si c'est un mouvement + vérifie l'intervalle
				this.mouvementJoueur(e, time);
			if(e == 32 && time-this.derniereBombe>this.delaiInterBombe) // Si c'est une bombe + vérifie l'intervalle
				this.mouvementJoueur(e, time);
		}
	};
	
	
/********** Perte d'une vie **********/
	
	this.perteVie = function(){
	
		if(this.vie>1)
			this.vie--;
		else{ // La mort...
			this.vie--;
			map.mortJoueur(this);
		}
	
	};


	this.nouveauBonus = function(bonus){
	
		if(bonus.vitesse)
			this.delaiInterMouvement /= 2;
		else if(bonus.vie)
			this.vie++;
		else if(bonus.porteeBombe)
			this.delaiInterBombe /= 2;
	
	};
	
}
