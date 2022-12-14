var cartes = new Array();
{                                                             // Donner la valeur des cartes sauf AS
cartes [51] = 10; 
cartes [50] = 10; 
cartes [49] = 10; 
cartes [48] = 10;  
cartes [47] = 9;  
cartes [46] = 8;
cartes [45] = 7;
cartes [44] = 6;
cartes [43] = 5;
cartes [42] = 4;
cartes [41] = 3;
cartes [40] = 2;
cartes [39] = 11;
cartes [38] = 10; 
cartes [37] = 10; 
cartes [36] = 10; 
cartes [35] = 10;  
cartes [34] = 9;  
cartes [33] = 8;
cartes [32] = 7;
cartes [31] = 6;
cartes [30] = 5;
cartes [29] = 4;
cartes [28] = 3;
cartes [27] = 2;
cartes [26] = 11;
cartes [25] = 10; 
cartes [24] = 10; 
cartes [23] = 10; 
cartes [22] = 10;  
cartes [21] = 9;  
cartes [20] = 8;
cartes [19] = 7;
cartes [18] = 6;
cartes [17] = 5;
cartes [16] = 4;
cartes [15] = 3;
cartes [14] = 2;
cartes [13] = 11; 
cartes [12] = 10; 
cartes [11] = 10; 
cartes [10] = 10; 
cartes [9] = 10;  
cartes [8] = 9;  
cartes [7] = 8;
cartes [6] = 7;
cartes [5] = 6;
cartes [4] = 5;
cartes [3] = 4;
cartes [2] = 3;
cartes [1] = 2;
cartes [0] = 11;  
}

var deck = new Array(); // Création du paquet de cartes qui permettra par la suite de savoir si une carte est déjà jouée
for(var i = 0; i<52; i++){
	deck[i] = i;
}

function pioche(joueur){ // Permet de piocher une carte au hasard et sans doublon
	var numero = Math.floor(52*Math.random());
	while (deck[numero] == 'ordi' || deck[numero] == 'j1' || deck[numero] == 'as_soustrait'){ // Tant que la commande hasard désigne une carte déjà utilisée, cette commande est réitérée
		numero = Math.floor(52*Math.random());
	}
	deck[numero] = joueur; // Remplace sa valeur pour signifier qu'elle est utilisée
	return numero; // Retourne la valeur d'une carte non utilisée
}

function as(joueur, somme){ // Vérifie si le joueur en question a un as, et si oui, renvoie le cumul de ses points soustrait de 10
	if( deck[0] == joueur){
		somme = somme - 10;
		deck[0] = "as_soustrait";
		return somme;
	}
	if( deck[13] == joueur){
		somme = somme - 10;
		deck[13] = "as_soustrait";
		return somme;
	}
	if( deck[26] == joueur){
		somme = somme - 10;
		deck[26] = "as_soustrait";
		return somme;
	}
	if( deck[39] == joueur){
		somme = somme - 10;
		deck[39] = "as_soustrait";
		return somme;
	}
}

var numero1 = pioche('ordi');
var numero2 = pioche('ordi');
var numero3 = pioche('j1');
var numero4 = pioche('j1');
var newcarte=newcarte2="";
var somme=somme2=gain=0;
var nb_de_cartes=0; // Variable comptant le nombre de cartes tirées en plus des 2 présentes
var mise = parseInt(prompt("Combien misez-vous ?"));


function action0() {
 
	document.getElementById("carte1").innerHTML                                  //Tirer une carte ordinateur
	="<img src='cartes/"+numero1+".GIF' class='carte'>";
	
	document.getElementById("carte2").innerHTML
	="<img src='doscarte.jpg' class='carte'>";

	document.valeurcarte1.valcarte1.value=cartes[numero1]
	
}
    
	

function action2() {

    document.getElementById("carte3").innerHTML                                          // Ajouter la valeur des cartes 
	="<img src='cartes/"+numero3+".GIF' class='carte'>";
	
	document.getElementById("carte4").innerHTML
	="<img src='cartes/"+numero4+".GIF' class='carte'>";

	document.valeurcarte2.valcarte2.value=cartes[numero3]+cartes[numero4];
	
	if(cartes[numero3]+cartes[numero4] == 21){ // Si le joueur obtient 21 points du premier coup soit un as + 10, c'est un BlackJack
		alert('BLACK JACK !');
		actionStand();
	}
}
	
	
	
	
function actionHit() { // Tirer une nouvelle carte

	nb_de_cartes++; // Incrémentation de la variable, soit +1 carte
	if(nb_de_cartes<=3){ // Teste si le nombre de cartes supplémentaires aux 2 initiales, est inférieur à 3
		tirage =pioche('j1');
		
		newcarte=newcarte+"<img src='cartes/"+tirage+".GIF' class='carte'>";
		
		document.getElementById("carte5").innerHTML
		=newcarte;
		
		somme = somme + cartes[tirage];
		document.valeurcarte2.valcarte2.value=cartes[numero3]+cartes[numero4]+somme;

	}else{ // Sinon alerte !
		alert('Un maximum de 5 cartes ont été tirées');
	}
	
	var score_joueur_un = cartes[numero3]+cartes[numero4]+somme; // Score du joueur 1
	if(score_joueur_un > 21){ // Si ce score dépasse 21, défaite...
		somme = as('j1', somme); // Vérifie si le joueur 1 possède un as
		score_joueur_un = cartes[numero3]+cartes[numero4]+somme;
		if(score_joueur_un <= 21){ // Si oui, la partie continue
			document.valeurcarte2.valcarte2.value=score_joueur_un;
			alert("La cumul de points étant supérieur à 21, la valeur de l'as est convertie à 1");
		}else{
			lose.style.right = '51%'; // modification du CSS pour faire apparaitre la fenêtre de défaite
			alert('You lose !');
			gain = gain-mise;
			document.valeurgain.valgain.value=gain;
		}
	}
	if(score_joueur_un == 21){
		actionStand();
	}
}

 
function actionStand() {
	document.getElementById("carte2").innerHTML                                    // Retourner la carte
	="<img src='cartes/"+numero2+".GIF' class='carte'>";

	document.valeurcarte1.valcarte1.value=cartes[numero1]+cartes[numero2];
	
	var score_ordinateur = cartes[numero1]+cartes[numero2]; // Score de l'ordinateur
	var score_joueur_un = cartes[numero3]+cartes[numero4]+somme; // Score du joueur 1
	
	while(score_ordinateur < score_joueur_un && score_ordinateur < 17){ // Si l'ordinateur a un score inférieur à l'humain ou inférieur à 17, celui-ci repioche une carte
		tirage =pioche('ordi');
		
		newcarte2=newcarte2+"<img src='cartes/"+tirage+".GIF' class='carte'>";
		
		document.getElementById("carte6").innerHTML
		=newcarte2;
		
		somme2 = somme2 + cartes[tirage];
		document.valeurcarte1.valcarte1.value=cartes[numero1]+cartes[numero2]+somme2;
		
		score_ordinateur = cartes[numero1]+cartes[numero2]+somme2;
	}
	
	if(score_ordinateur < score_joueur_un){ // Teste si joueur 1 a un meilleur score que l'ordinateur (toujours inférieur à 21)
		win.style.right = '51%';
		alert('You win !');
		gain = gain+mise;
		document.valeurgain.valgain.value=gain;
	}else if(score_ordinateur > score_joueur_un){ // Si ordinateur à un score supérieur à joueur 1
	
		if(score_ordinateur <= 21){ // Si celui-ci reste inférieur à 21
			lose.style.right = '51%';
			alert('You lose !');
			gain = gain-mise;
			document.valeurgain.valgain.value=gain;
		}else{
			somme2 = as('ordi', somme2); // Vérifie si le joueur 1 possède un as
			score_ordinateur = cartes[numero1]+cartes[numero2]+somme2;
			if(score_ordinateur <= 21){ // Si oui, la partie continue
				document.valeurcarte1.valcarte1.value=score_ordinateur;
				actionStand();
			}else{
				win.style.right = '51%';
				alert('You win !');
				gain = gain+mise;
				document.valeurgain.valgain.value=gain;
			}
		}

	}else{ // Si égalité
		egale.style.right = '51%';
		alert('Egalité !');
	}
	
}

function restart(){ // Réinitialisation du jeu et du paquet de carte
	document.getElementById("carte5").innerHTML='';
	document.getElementById("carte6").innerHTML='';
	for(var i = 0; i<52; i++){
		deck[i] = i;
	}
	numero1 = pioche('ordi');
	numero2 = pioche('ordi');
	numero3 = pioche('j1');
	numero4 = pioche('j1');
	newcarte=newcarte2="";
	somme=somme2=0;
	nb_de_cartes=0;
	mise = parseInt(prompt("Combien misez-vous ?"));
	action0();
	action2();
	egale.style.right = '-51%';
	win.style.right = '-51%';
	lose.style.right = '-51%';
}

function actionDouble(){ // Double la mise
	mise=mise*2;
	alert('Votre mise est doublée !');
}