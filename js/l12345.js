var r = 200;
var canvas = document.getElementById('main_canvas');
var context = canvas.getContext('2d'); 
var canvas_bg = document.getElementById('bg_canvas');
var context_bg = canvas_bg.getContext('2d');

var sun;
var earth;
var obj1, onbj2, obj3, obj4, obj5;
var M = 5000;
var m = 100;
var m0 = 5;
var G = 1000;
var r = 200;
var velo_earth;
var velo_sun;
var velo_obj1, velo_obj2, velo_obj3, velo_obj4;
var t0, t, dt;
var anim;
var cm;
var distance1, dist1, distance2, dist2, distance3, dist3, distance4, dist4, distance5, dist5;
var sys1 = [];
var sys2 = [];
var sys3 = [];
var sys4 = [];
var sys5 = [];
var R1, R2, R3;
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
	earth = new Ball(10, 'green', m);
	earth.pos2D = new Vector2D(canvas.width/2 + r, canvas.height/2);
	velo_earth = Math.sqrt(G*M*M/((M + m)*r));
	earth.velo2D = new Vector2D(0, -velo_earth);
	earth.draw(context);

	//initialize the obj5
	obj5 = new Ball(6, 'FE0000', m0);
	obj5.pos2D = new Vector2D(canvas.width/2 + r/2, canvas.height/2 - r*Math.sqrt(3)/2);
	cm = (sun.pos2D.multiply(M).add(earth.pos2D.multiply(m))).multiply(1/(M + m));
	distance5 = obj5.pos2D.subtract(cm);
	dist5 = distance5.length();
	distance5 = new Vector2D(distance5.y, -distance5.x);
	distance5 = distance5.multiply(1/distance5.length());
	velo_obj5 = Math.sqrt(G*(M+m)/r)*dist5/r;
	obj5.velo2D = distance5.multiply(velo_obj5);
	console.log(obj5.velo2D);
	obj5.draw(context);

	//initialize the obj4
	obj4 = new Ball(6, '#00D7D7', m0);
	obj4.pos2D = new Vector2D(canvas.width/2 + r/2, canvas.height/2 + r*Math.sqrt(3)/2);
	cm = (sun.pos2D.multiply(M).add(earth.pos2D.multiply(m))).multiply(1/(M + m));
	distance4 = obj4.pos2D.subtract(cm);
	dist4 = distance4.length();
	distance4 = new Vector2D(distance4.y, -distance4.x);
	distance4 = distance4.multiply(1/distance4.length());
	velo_obj4 = Math.sqrt(G*(M+m)/r)*dist4/r;
	obj4.velo2D = distance4.multiply(velo_obj4);
	console.log(obj4.velo2D);
	obj4.draw(context);

	//initialize the obj3
	obj3 = new Ball(6, '#E74C3C', m0);
	R3 = r*(1 + 5*m/(12*M));
	obj3.pos2D = new Vector2D(canvas.width/2 - R3, canvas.height/2 );
	cm = (sun.pos2D.multiply(M).add(earth.pos2D.multiply(m))).multiply(1/(M + m));
	distance3 = obj3.pos2D.subtract(cm);
	dist3 = distance3.length();
	velo_obj3 = dist3*Math.sqrt(G*(M+ m)/r)/r;
	obj3.velo2D = new Vector2D(0, velo_obj3);
	obj3.draw(context);

	//initialize the obj1
	obj1 = new Ball(6, 'purple', m0);
	R1 = r*(1 - Math.cbrt(m/(3*M)));
	obj1.pos2D = new Vector2D(canvas.width/2 + R1, canvas.height/2 );
	cm = (sun.pos2D.multiply(M).add(earth.pos2D.multiply(m))).multiply(1/(M + m));
	distance1 = obj1.pos2D.subtract(cm);
	dist1 = distance1.length();
	velo_obj1 = dist1*Math.sqrt(G*(M+ m)/r)/r;
	obj1.velo2D = new Vector2D(0, -velo_obj1);
	obj1.draw(context);

	//initialize the obj2
	obj2 = new Ball(6, '#311BFF', m0);
	R2 = r*(1 + Math.cbrt(m/(3*M)));
	obj2.pos2D = new Vector2D(canvas.width/2 + R2, canvas.height/2 );
	cm = (sun.pos2D.multiply(M).add(earth.pos2D.multiply(m))).multiply(1/(M + m));
	distance2 = obj2.pos2D.subtract(cm);
	dist2 = distance2.length();
	velo_obj2 = dist2*Math.sqrt(G*(M+ m)/r)/r;
	obj2.velo2D = new Vector2D(0, -velo_obj2);
	obj2.draw(context);


	if(state == 0){
			//initialize some objs5;
	for (let i = 0; i < 50; i++){
		let star = new Ball(3, 'FE0000', m0);
		star.pos2D = new Vector2D(canvas.width/2 + r/2, canvas.height/2 - r*Math.sqrt(3)/2);
		star.velo2D = distance5.multiply(velo_obj5);
		let random_vect = new Vector2D(Math.random()*7 - 3, Math.random()*7 - 3);
		star.velo2D = star.velo2D.add(random_vect);
		sys5.push(star);
	}
		//initialize some objs4;
	for (let i = 0; i < 50; i++){
		let star = new Ball(3, '#00D7D7', m0);
		star.pos2D = new Vector2D(canvas.width/2 + r/2, canvas.height/2 + r*Math.sqrt(3)/2);
		star.velo2D = distance4.multiply(velo_obj4);
		let random_vect = new Vector2D(Math.random()*7 - 3, Math.random()*7 - 3);
		star.velo2D = star.velo2D.add(random_vect);
		sys4.push(star);
	}

		//initialize some objs3;
	for (let i = 0; i < 50; i++){
		let star = new Ball(3, '#E74C3C', m0);
		star.pos2D = new Vector2D(canvas.width/2 - R3, canvas.height/2 );
		star.velo2D = new Vector2D(0, velo_obj3);
		let random_vect = new Vector2D(Math.random()*7 - 3, Math.random()*7 - 3);
		star.velo2D = star.velo2D.add(random_vect);
		sys3.push(star);
	}

		//initialize some objs1;
	for (let i = 0; i < 50; i++){
		let star = new Ball(3, 'purple', m0);
		star.pos2D = new Vector2D(canvas.width/2 + R1, canvas.height/2 );
		star.velo2D = new Vector2D(0, -velo_obj1);
		let random_vect = new Vector2D(Math.random()*7 - 3, Math.random()*7 - 3);
		star.velo2D = star.velo2D.add(random_vect);
		sys1.push(star);
	}

		//initialize some objs2;
	for (let i = 0; i < 50; i++){
		let star = new Ball(3, '#311BFF', m0);
		star.pos2D = new Vector2D(canvas.width/2 + R2, canvas.height/2 );
		star.velo2D = new Vector2D(0, -velo_obj2);
		let random_vect = new Vector2D(Math.random()*7 - 3, Math.random()*7 - 3);
		star.velo2D = star.velo2D.add(random_vect);
		sys2.push(star);
	}


	}else{

	for (let i = 0; i < 50; i++){
		let star = sys5[i];
		star.pos2D = new Vector2D(canvas.width/2 + r/2, canvas.height/2 - r*Math.sqrt(3)/2);
		star.velo2D = distance5.multiply(velo_obj5);
		let random_vect = new Vector2D(Math.random()*7 - 3, Math.random()*7 - 3);
		star.velo2D = star.velo2D.add(random_vect);
	}
		//initialize some objs4;
	for (let i = 0; i < 50; i++){
		let star = sys4[i];
		star.pos2D = new Vector2D(canvas.width/2 + r/2, canvas.height/2 + r*Math.sqrt(3)/2);
		star.velo2D = distance4.multiply(velo_obj4);
		let random_vect = new Vector2D(Math.random()*7 - 3, Math.random()*7 - 3);
		star.velo2D = star.velo2D.add(random_vect);
	}

		//initialize some objs3;
	for (let i = 0; i < 50; i++){
		let star = sys3[i];
		star.pos2D = new Vector2D(canvas.width/2 - R3, canvas.height/2 );
		star.velo2D = new Vector2D(0, velo_obj3);
		let random_vect = new Vector2D(Math.random()*7 - 3, Math.random()*7 - 3);
		star.velo2D = star.velo2D.add(random_vect);
	}

		//initialize some objs1;
	for (let i = 0; i < 50; i++){
		let star = sys1[i];
		star.pos2D = new Vector2D(canvas.width/2 + R1, canvas.height/2 );
		star.velo2D = new Vector2D(0, -velo_obj1);
		let random_vect = new Vector2D(Math.random()*7 - 3, Math.random()*7 - 3);
		star.velo2D = star.velo2D.add(random_vect);
	}

		//initialize some objs2;
	for (let i = 0; i < 50; i++){
		let star = sys2[i];
		star.pos2D = new Vector2D(canvas.width/2 + R2, canvas.height/2 );
		star.velo2D = new Vector2D(0, -velo_obj2);
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
	
	//update-object5
	obj5.pos2D = obj5.pos2D.addScaled(obj5.velo2D, dt);
	var force_obj_51 = Forces.gravity(G, M, m0, obj5.pos2D.subtract(sun.pos2D));
	var force_obj_52 = Forces.gravity(G, m, m0, obj5.pos2D.subtract(earth.pos2D));
	var total_force_5 = force_obj_51.add(force_obj_52);
	obj5.velo2D = obj5.velo2D.addScaled(total_force_5.multiply(1/m0), dt);
	obj5.draw(context);

	//update-system-of-objects5
	for(let i = 0; i < sys5.length; i++){
		let star = sys5[i];
		star.pos2D = star.pos2D.addScaled(star.velo2D, dt);
		force_obj_51 = Forces.gravity(G, M, m0, star.pos2D.subtract(sun.pos2D));
		force_obj_52 = Forces.gravity(G, m, m0, star.pos2D.subtract(earth.pos2D));
		total_force_5 = force_obj_51.add(force_obj_52);
		star.velo2D = star.velo2D.addScaled(total_force_5.multiply(1/m0), dt);
		star.draw(context);
	}

	//update-object4
	obj4.pos2D = obj4.pos2D.addScaled(obj4.velo2D, dt);
	var force_obj_41 = Forces.gravity(G, M, m0, obj4.pos2D.subtract(sun.pos2D));
	var force_obj_42 = Forces.gravity(G, m, m0, obj4.pos2D.subtract(earth.pos2D));
	var total_force_4 = force_obj_41.add(force_obj_42);
	obj4.velo2D = obj4.velo2D.addScaled(total_force_4.multiply(1/m0), dt);
	obj5.draw(context);

	//update-system-of-objects4
	for(let i = 0; i < sys4.length; i++){
		let star = sys4[i];
		star.pos2D = star.pos2D.addScaled(star.velo2D, dt);
		force_obj_41 = Forces.gravity(G, M, m0, star.pos2D.subtract(sun.pos2D));
		force_obj_42 = Forces.gravity(G, m, m0, star.pos2D.subtract(earth.pos2D));
		total_force_4 = force_obj_41.add(force_obj_42);
		star.velo2D = star.velo2D.addScaled(total_force_4.multiply(1/m0), dt);
		star.draw(context);
	}

	//update-object1
	distance1 = earth.pos2D.subtract(sun.pos2D);
	distance1 = distance1.multiply(1 - Math.cbrt(m/(3*M)));
	var pos_eve1 = sun.pos2D.add(distance1); 
	obj1.pos2D = new Vector2D(pos_eve1.x, pos_eve1.y);
	obj1.draw(context);

	//update-system-of-objects1
	for(let i = 0; i < sys1.length; i++){
		let star = sys1[i];
		star.pos2D = star.pos2D.addScaled(star.velo2D, dt);
		force_obj_11 = Forces.gravity(G, M, m0, star.pos2D.subtract(sun.pos2D));
		force_obj_12 = Forces.gravity(G, m, m0, star.pos2D.subtract(earth.pos2D));
		total_force_1 = force_obj_11.add(force_obj_12);
		star.velo2D = star.velo2D.addScaled(total_force_1.multiply(1/m0), dt);
		star.draw(context);
	}

	//update-object3
	distance3 = earth.pos2D.subtract(sun.pos2D);
	distance3 = distance3.multiply(1 + (5*m)/(12*M));
	var pos_eve3 = sun.pos2D.subtract(distance3); 
	obj3.pos2D = new Vector2D(pos_eve3.x, pos_eve3.y);
	obj3.draw(context);

	//update-system-of-objects3
	for(let i = 0; i < sys3.length; i++){
		let star = sys3[i];
		star.pos2D = star.pos2D.addScaled(star.velo2D, dt);
		force_obj_31 = Forces.gravity(G, M, m0, star.pos2D.subtract(sun.pos2D));
		force_obj_32 = Forces.gravity(G, m, m0, star.pos2D.subtract(earth.pos2D));
		total_force_3 = force_obj_31.add(force_obj_32);
		star.velo2D = star.velo2D.addScaled(total_force_3.multiply(1/m0), dt);
		star.draw(context);
	}

	//update-object2
	distance2 = earth.pos2D.subtract(sun.pos2D);
	distance2 = distance2.multiply(1 + Math.cbrt(m/(3*M)));
	var pos_eve2 = sun.pos2D.add(distance2); 
	obj2.pos2D = new Vector2D(pos_eve2.x, pos_eve2.y);
	obj2.draw(context);

	//update-system-of-objects2
	for(let i = 0; i < sys2.length; i++){
		let star = sys2[i];
		star.pos2D = star.pos2D.addScaled(star.velo2D, dt);
		force_obj_21 = Forces.gravity(G, M, m0, star.pos2D.subtract(sun.pos2D));
		force_obj_22 = Forces.gravity(G, m, m0, star.pos2D.subtract(earth.pos2D));
		total_force_2 = force_obj_21.add(force_obj_22);
		star.velo2D = star.velo2D.addScaled(total_force_2.multiply(1/m0), dt);
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