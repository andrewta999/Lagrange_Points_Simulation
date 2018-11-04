var canvas = document.getElementById('main_canvas');
var context = canvas.getContext('2d'); 
var canvas_bg = document.getElementById('bg_canvas');
var context_bg = canvas_bg.getContext('2d');

var sun;
var earth;
var obj;
var M = 2500;
var m = 100;
var m0 = 5;
var G = 1000;
var r = 200;
var R;
var velo_earth;
var velo_sun;
var velo_obj;
var t0, t, dt;
var anim;
var cm;
var distance, dist;
var sys = [];
var state = 0;
window.onload = init;

function init(){
	//initialize the sun
	sun = new Ball(30, 'red', M);
	sun.pos2D = new Vector2D(canvas.width/2, canvas.height/2);
	velo_sun = Math.sqrt(G*m*m/((M + m)*r));
	sun.velo2D = new Vector2D(0, velo_sun)
	sun.draw(context);

	//initialize the earth
	earth = new Ball(10, '#0000D8', m);
	earth.pos2D = new Vector2D(canvas.width/2 + r, canvas.height/2);
	velo_earth = Math.sqrt(G*M*M/((M + m)*r));
	earth.velo2D = new Vector2D(0, -velo_earth);
	earth.draw(context);

	//initialize the obj
	obj = new Ball(6, '#FE00FE', m0);
	R = r*(1 + 5*m/(12*M));
	obj.pos2D = new Vector2D(canvas.width/2 - R, canvas.height/2 );
	cm = (sun.pos2D.multiply(M).add(earth.pos2D.multiply(m))).multiply(1/(M + m));
	distance = obj.pos2D.subtract(cm);
	dist = distance.length();
	velo_obj = dist*Math.sqrt(G*(M+ m)/r)/r;
	obj.velo2D = new Vector2D(0, velo_obj);
	obj.draw(context);

	if(state == 0){
		//initialize some objs;
		for (let i = 0; i < 50; i++){
			let star = new Ball(3, '#00FE00', m0);
			star.pos2D = new Vector2D(canvas.width/2 - R, canvas.height/2 );
			star.velo2D = new Vector2D(0, velo_obj);
			let random_vect = new Vector2D(Math.random()*7 - 3, Math.random()*7 - 3);
			star.velo2D = star.velo2D.add(random_vect);
			sys.push(star);
		}
	}else{
		//initialize some objs;
		for (let i = 0; i < 50; i++){
			let star = sys[i];
			star.pos2D = new Vector2D(canvas.width/2 - R, canvas.height/2 );
			star.velo2D = new Vector2D(0, velo_obj);
			let random_vect = new Vector2D(Math.random()*7 - 3, Math.random()*7 - 3);
			star.velo2D = star.velo2D.add(random_vect);
	}
	}
	


}

function animate(){
	anim = requestAnimationFrame(animate, canvas);
	motion();
}

function motion(){
	var t1 = new Date().getTime();
	dt = (t1 - t0)*0.001;
	t += dt;
	t0 = t1;
	moveEarth();
}

function moveEarth(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	//update-earth
	earth.pos2D = earth.pos2D.addScaled(earth.velo2D, dt);
	var force = Forces.gravity(G, M, m, earth.pos2D.subtract(sun.pos2D));
	earth.velo2D = earth.velo2D.addScaled(force.multiply(1/m), dt);
	earth.draw(context);

	//update-sun
	sun.pos2D = sun.pos2D.addScaled(sun.velo2D, dt);
	var force_sun = Forces.gravity(G, M, m, sun.pos2D.subtract(earth.pos2D));
	sun.velo2D = sun.velo2D.addScaled(force_sun.multiply(1/M), dt);
	sun.draw(context);
	
	//update-object
	distance = earth.pos2D.subtract(sun.pos2D);
	distance = distance.multiply(1 + (5*m)/(12*M));
	var pos_eve = sun.pos2D.subtract(distance); 
	obj.pos2D = new Vector2D(pos_eve.x, pos_eve.y);
	obj.draw(context);

	//update-system-of-objects
	for(let i = 0; i < sys.length; i++){
		let star = sys[i];
		star.pos2D = star.pos2D.addScaled(star.velo2D, dt);
		force_obj_1 = Forces.gravity(G, M, m0, star.pos2D.subtract(sun.pos2D));
		force_obj_2 = Forces.gravity(G, m, m0, star.pos2D.subtract(earth.pos2D));
		total_force = force_obj_1.add(force_obj_2);
		star.velo2D = star.velo2D.addScaled(total_force.multiply(1/m0), dt);
		star.draw(context);
	}
	
}

$(document).ready(function(){
	$('#stop_anim').click(function(event){
		event.preventDefault();
		cancelAnimationFrame(anim);
	});
	$('#start_anim').click(function(event1){
		event1.preventDefault();
		t0 = new Date().getTime();
		animate();
	});
	$('#reset_anim').click(function(event2){
		event2.preventDefault();
		cancelAnimationFrame(anim);
		context.clearRect(0, 0, canvas.width, canvas.height);
		M = parseInt($('#sun').val());
		m = parseInt($('#earth').val());
		r = parseInt($('#distance').val());
		G = parseInt($('#G').val());
		state = 1;
		init();
	});
});