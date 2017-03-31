               //var temp = new THREE.Vector3();
                //temp.copy(scattered_littleteeth[i].position);
                //if (temp.distanceTo(new THREE.Vector3(0, 0, -100)) < 10)
                //{
                //    scattered_littleteeth[i].position.z = -90;
                //}
				
				            ///////////////////////
            // Scatting generation
            ///////////////////////

            //var tempConfig = {
            //    position: new THREE.Vector3(0, 0, -85),
            //    radiusMin: 300,
            //    radiusMax: 300,
            //    scaleMin: 30,
            //    scaleMax: 30,
            //    variation: new THREE.Euler(0, Math.PI * 2, 0),
            //    count: 20,
            //    plane: true,
            //};

            // diminishing tooth spiral

            for (var i = 0; i < tempMass.length; i++)
            {
                AddStandardMeshObject('models/littletooth.gltf', tempMass[i]);
            }
            console.log(JSON.stringify(tempMass));
			
			
			            ////////////////// Alter tooth spiral
            var temp = [];
            var x1 = -7;
            var x2 = 7;
            var z1 = -104;
            var z2 = -96;
            var step = 2;
            var scale = 5;
            var y = 3;
            var circuits = 5;
            var stepFalloff = 0.8;
            var scaleFalloff = 0.7;
            for (var c = 0; c < circuits; c++)
            {
                for (var x = x1; x < x2; x += step)
                {
                    z = z1;
                    var rotation = new THREE.Euler(random.nextFloat() * 0.1, random.nextFloat() * Math.PI * 2, random.nextFloat() * 0.1);
                    temp.push({ path: 'models/littletooth.gltf', position: new THREE.Vector3(x, y, z), rotation: rotation, scale: new THREE.Vector3(scale, scale, scale) });
                }
                for (var z = z1 + step; z < z2; z += step)
                {
                    x = x2;
                    var rotation = new THREE.Euler(random.nextFloat() * 0.1, random.nextFloat() * Math.PI * 2, random.nextFloat() * 0.1);
                    temp.push({ path: 'models/littletooth.gltf', position: new THREE.Vector3(x, y, z), rotation: rotation, scale: new THREE.Vector3(scale, scale, scale) });
                }
                for (var x = x2 - step; x >= x1; x -= step)
                {
                    z = z2;
                    var rotation = new THREE.Euler(random.nextFloat() * 0.1, random.nextFloat() * Math.PI * 2, random.nextFloat() * 0.1);
                    temp.push({ path: 'models/littletooth.gltf', position: new THREE.Vector3(x, y, z), rotation: rotation, scale: new THREE.Vector3(scale, scale, scale) });
                }
                for (var z = z2 - step; z >= z1; z -= step)
                {
                    x = x1;
                    var rotation = new THREE.Euler(random.nextFloat() * 0.1, random.nextFloat() * Math.PI * 2, random.nextFloat() * 0.1);
                    temp.push({ path: 'models/littletooth.gltf', position: new THREE.Vector3(x, y, z), rotation: rotation, scale: new THREE.Vector3(scale, scale, scale) });
                }
                step *= stepFalloff;
                scale *= scaleFalloff;
                x1 -= step;
                x2 += step;
                z1 -= step;
                z2 += step;
            }
            for (var i = 0; i < temp.length; i++)
            {
                AddStandardMeshObject(temp[i].path, temp[i]);
            }
            console.log(JSON.stringify(temp))