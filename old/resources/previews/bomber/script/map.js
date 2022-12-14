
function Map(tailleMap, idDiv, longueurMeche) {

	this.tailleMap=tailleMap;
	this.idDiv=idDiv;
	this.longueurMeche=longueurMeche;


/********** Création du DOM table+tr+td pour initialiser Map **********/

	document.getElementById(idDiv).appendChild(document.createElement('table'));
	for (var i = 0; i < tailleMap ; i++){
		document.getElementsByTagName('table')[0].appendChild(document.createElement('tr'));
		for (var j = 0; j < tailleMap ; j++) 
			document.getElementsByTagName('tr')[i].appendChild(document.createElement('td'));
	}
	
	
/********** Création de la matrice **********/

	var td = document.getElementsByTagName('td');
	var matrice = new Array(tailleMap);
	for (var i = 0; i < tailleMap ; i++) {
		matrice[i]=new Array(tailleMap);
		for (var j = 0; j < tailleMap ; j++) {
			if(i%2==1 && j%2==1) // Mur incassable
				matrice[i][j]=new Items(0,0,0,1,0,0,0);
			else if((i==0 && j==0) || (i==1 && j==0) || (i==tailleMap-2 && j==0) || (i==tailleMap-1 && j==0) || (i==tailleMap-1 && j==1) || (i==tailleMap-1 && j==tailleMap-2) || (i==tailleMap-1 && j==tailleMap-1) || (i==tailleMap-2 && j==tailleMap-1) || (i==1 && j==tailleMap-1) || (i==0 && j==tailleMap-1) || (i==0 && j==tailleMap-2) || (i==0 && j==1)) // Espace libre
				matrice[i][j]=new Items(0,0,0,0,0,0,0);
			else // Mur cassable
				matrice[i][j]=new Items(0,0,1,0,0,0,0);
		}
	}
	
	
/********** Mise à jour du DOM en fonction de la matrice **********/
	
	this.raffraichirMap = function(){
		var k=0;
		for (var i = 0; i < tailleMap ; i++) {
			for (var j = 0; j < tailleMap ; j++) {
				td[k].style.backgroundImage = ""; // Réinitialisation des backgrounds
				td[k].style.backgroundColor = "white";
				td[k].innerHTML = ""; // Réinitialisation des textes
				if(matrice[i][j].murIndestructible)
					td[k].style.backgroundImage="url('img/BlocI.jpg')";
				else if(matrice[i][j].bonus != 0 && !matrice[i][j].murDestructible){
					if(matrice[i][j].bonus.vitesse)
						td[k].style.backgroundImage="url('img/vitesse.png')";
					else if(matrice[i][j].bonus.vie)
						td[k].style.backgroundImage="url('img/vie.gif')";
					else if(matrice[i][j].bonus.porteeBombe)
						td[k].style.backgroundImage="url('img/porteeBombe.png')";
				}
				else if(matrice[i][j].murDestructible)
					td[k].style.backgroundImage="url('img/BlocC.jpg')";
				else if(matrice[i][j].dynamite && matrice[i][j].feu){
					td[k].style.backgroundImage="url('img/dynamite.png')";
					td[k].style.backgroundColor="red";
				}
				else if(matrice[i][j].feu)
					td[k].style.backgroundColor="red";
				else if(matrice[i][j].bombe && matrice[i][j].joueur)
					td[k].style.backgroundImage = "url('img/dynamite.png'), url('img/worm.jpg')";
				else if(matrice[i][j].bombe)
					td[k].style.backgroundImage="url('img/dynamite.png')";
				else if(matrice[i][j].wormBrule)
					td[k].style.backgroundImage = "url('img/wormBurn.jpg')";
				else if(matrice[i][j].joueur)
					td[k].style.backgroundImage = "url('img/worm.jpg')";
				else if(matrice[i][j].tombe)
					td[k].style.backgroundImage = "url('img/tombe.png')";
					
				k++;
			}
		}
	};
	
	
/********** Vérifie puis modifie la nouvelle position d'un joueur **********/
	
	this.positionJoueur = function(joueur,x,y){
		if(x>=0 && y>=0 && x<this.tailleMap && y<this.tailleMap && matrice[y][x].zoneVierge()){
			matrice[joueur.y][joueur.x].joueur=0;
			joueur.y=y;
			joueur.x=x;
			matrice[joueur.y][joueur.x].joueur=1;
			if(matrice[joueur.y][joueur.x].bonus != 0){
				joueur.nouveauBonus(matrice[joueur.y][joueur.x].bonus);
				matrice[joueur.y][joueur.x].bonus=0;
			}
			map.raffraichirMap();
		}
	};
	
	
/********** Mort du joueur **********/
	
	this.mortJoueur = function(joueur){
	
		matrice[joueur.y][joueur.x].tombe=1;
		matrice[joueur.y][joueur.x].joueur=0;
		map.raffraichirMap();
		
	};
	
	
/********** Positionnement d'une bombe puis explosion **********/
	
	this.positionBombe = function(joueur){
		var x=joueur.x;
		var y=joueur.y;
		matrice[y][x].bombe=1;
		map.raffraichirMap();
		setTimeout(function(){
			matrice[y][x].bombe=0; // Supprime la bombe
			function embrasement(crementation, y, x){
				
				if(!matrice[y][x].murIndestructible){
					matrice[y][x].feu=1;
					if(matrice[y][x].joueur){
						joueur.perteVie();
						matrice[y][x].feu=0;
						matrice[y][x].wormBrule=1;
					}
					if(matrice[y][x].murDestructible){
						matrice[y][x].murDestructible=0;
						return crementation*100;
					}else
						return crementation;
				}else
					return crementation*100;
			}
		// Embrasement gauche
			var i=x;
			while(i>=0)
				i += embrasement(-1, y, i);
		// Embrasement droit
			i=x+1;
			while(i<tailleMap)
				i += embrasement(+1, y, i);
		// Embrasement haut
			i=y-1;
			while(i>=0)
				i += embrasement(-1, i, x);
		// Embrasement bas
			i=y+1;
			while(i<tailleMap)
				i += embrasement(+1, i, x);
			map.raffraichirMap();
		// Désembrasement
			setTimeout(function(){
				for (var i = 0; i < tailleMap ; i++)
					for (var j = 0; j < tailleMap ; j++)
						if(matrice[i][j].feu)
							matrice[i][j].feu=0;
						else if(matrice[i][j].wormBrule)
							matrice[i][j].wormBrule=0;
				map.raffraichirMap();
			}, 200);
		}, this.longueurMeche);
	};
	

}
