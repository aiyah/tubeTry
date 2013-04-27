

function Tube(rTop, rBottom, rTopIn, rBottomIn, height, rSegments, hSegments, capTop, capBottom, material) {

	this.rTop = rTop;
	this.rBottom = rBottom;
	this.height = height;
	this.rSegments = rSegments;
	this.hSegments = hSegments;
	this.rTopIn = rTopIn;
	this.rBottomIn = rBottomIn;
	
	var tubeObj = new THREE.Object3D();
	var outerWallGeo = new THREE.CylinderGeometry(rTop, rBottom, height, rSegments, hSegments, true);
	var innerWallGeo = new THREE.CylinderGeometry(rTopIn, rBottomIn, height, rSegments, hSegments, true);

	var outerWall = new THREE.Mesh(outerWallGeo, material);
	var innerWall = new THREE.Mesh(innerWallGeo, material);

	if (rTop <= rTopIn || rBottom <= rBottomIn) {
		var msg = "Please check that the outer radius is greater than inner radius";
		console.error(msg);
		return null;
	}	
	
	//innerWall.geometry.dynamic = true;
	//innerWall.geometry.__dirtyVertices = true;
	//innerWall.geometry.__dirtyNormals = true;
	
	
	//scale x or z not y since can have diff inner radius for top and bottom
	innerWall.scale.x = -1;
	

	//so that inner wall is lit correctly
	//if the normal for y is negated it looks a little too bright
	for (var j = 0 ; j < innerWall.geometry.faces.length; j++) {
		innerWall.geometry.faces[j].normal.x = innerWall.geometry.faces[j].normal.x  * -1;
		//innerWall.geometry.faces[j].normal.y = innerWall.geometry.faces[j].normal.y  * -1;
		innerWall.geometry.faces[j].normal.z = innerWall.geometry.faces[j].normal.z  * -1;
	}
	
	innerWall.geometry.computeVertexNormals();
	//don't compute face normals, else yellow and blue inner wall light not correctly
	
	var yTop = height / 2;

	//make the top and bottom caps
	
	for (var i = 0; i < rSegments && (capTop || capBottom) ; i++) {
		var topCapGeo = new THREE.Geometry();

		//console.log(i + " of "  + rSegments);

		var theta = i * 2 * Math.PI / rSegments;	
		var thetaNext = (i+1) * 2 * Math.PI / rSegments;	

		if (capTop) {	
			//topCap
			var outerPtPrev = new THREE.Vector3(rTop * Math.cos(theta), yTop, rTop * Math.sin(theta));
			var innerPtPrev = new THREE.Vector3(rTopIn * Math.cos(theta), yTop, rTopIn * Math.sin(theta));	
			var outerPt = new THREE.Vector3(rTop * Math.cos(thetaNext), yTop, rTop * Math.sin(thetaNext));
			var innerPt = new THREE.Vector3(rTopIn * Math.cos(thetaNext), yTop, rTopIn * Math.sin(thetaNext));
		

			//console.log("outerPtPrev:" + outerPtPrev.x + " " + outerPtPrev.z);
			//console.log("outerPt:" + outerPt.x + " " + outerPt.z);
			//console.log("innerPtPrev:" + innerPtPrev.x + " " + innerPtPrev.z);
			//console.log("innerPt:" + innerPt.x + " " + innerPt.z);
	
			topCapGeo.vertices.push(innerPtPrev);
			topCapGeo.vertices.push(outerPtPrev);
			topCapGeo.vertices.push(outerPt);
			topCapGeo.vertices.push(innerPt);
			
			topCapGeo.faces.push(new THREE.Face4(3,2,1,0));		
			var topCap = new THREE.Mesh(topCapGeo, material);	
		
			topCap.geometry.__dirtyNormals = true;
			topCap.geometry.computeFaceNormals();
		    topCap.geometry.computeVertexNormals();
			tubeObj.add(topCap);		
		}


		if (capBottom) {
			
			//bottom cap
			outerPtPrev = new THREE.Vector3(rBottom * Math.cos(theta), -yTop, rBottom * Math.sin(theta));
			innerPtPrev = new THREE.Vector3(rBottomIn * Math.cos(theta), -yTop, rBottomIn * Math.sin(theta));	
			outerPt = new THREE.Vector3(rBottom * Math.cos(thetaNext), -yTop, rBottom * Math.sin(thetaNext));
			innerPt = new THREE.Vector3(rBottomIn * Math.cos(thetaNext), -yTop, rBottomIn * Math.sin(thetaNext));
			
			var bottomCapGeo = new THREE.Geometry();
			bottomCapGeo.vertices.push(innerPtPrev);
			bottomCapGeo.vertices.push(outerPtPrev);
			bottomCapGeo.vertices.push(outerPt);
			bottomCapGeo.vertices.push(innerPt);		
		
			bottomCapGeo.faces.push(new THREE.Face4(0,1,2,3));
			var bottomCap = new THREE.Mesh(bottomCapGeo, material);
		
			bottomCap.geometry.__dirtyNormals = true;
			bottomCap.geometry.computeFaceNormals();
		    bottomCap.geometry.computeVertexNormals();
			tubeObj.add(bottomCap);
		}
	}


	tubeObj.add(outerWall);
	tubeObj.add(innerWall);
	
	return tubeObj;
}

