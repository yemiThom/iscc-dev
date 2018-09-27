var reel = document.querySelector('.tab_reel');
var tab1 = document.querySelector('.tab1');
var tab2 = document.querySelector('.tab2');
var panel1 = document.querySelector('.tab_panel1');
var panel2 = document.querySelector('.tab_panel2');

function slideLeft(e) {
	tab2.classList.remove('active');
	this.classList.add('active');
	reel.style.transform = "translateX(0%)";
}

function slideRight(e) {
	tab1.classList.remove('active');
	this.classList.add('active');
	reel.style.transform = "translateX(-50%)";
}

if(tab1){
	tab1.addEventListener('click', slideLeft);
}
if(tab2){
	tab2.addEventListener('click', slideRight);
}