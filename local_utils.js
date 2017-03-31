function AddSnag(config)
{
    var config = {
        position: config.position || new THREE.Vector3(0, 0, 0),
        radiusMin: config.radiusMin || 0,
        radiusMax: config.radiusMax || 10,
        scaleMin: config.scaleMin || 1,
        scaleMax: config.scaleMax || 3,
        count: config.count || 10,
        angleVariation: config.angleVariation || new THREE.Euler(0, 0, 0),
        plane: true,
        alignY: true
    }

    var geo = new THREE.PlaneGeometry(1, 1);
    var mat = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load('models/Snag.png'),
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
    });

    var snagTemplate = new THREE.Mesh(geo, mat);
    var snags = randomMass(config, snagTemplate);
    for (var i = 0; i < snags.length; i++)
    {
        root.add(snags[i]);
    }
}

//function AddBlocks(config)
//{
//    var config = {
//        position: config.position || new THREE.Vector3(0, 0, 0),
//        radiusMin: config.radiusMin || 0,
//        radiusMax: config.radiusMax || 10,
//        scaleMin: config.scaleMin || 1,
//        scaleMax: config.scaleMax || 3,
//        count: config.count || 10,
//        angleVariation: config.angleVariation || new THREE.Euler(0, 0, 0),
//        plane: true,
//        alignY: true
//    }

//    var geo = new THREE.BoxGeometry(1, 1, 1);
//    var mat = new THREE.MeshLambertMaterial({
//        map: new THREE.TextureLoader().load('models/horrorstone.png'),
//    });

//    var blockTemplate = new THREE.Mesh(geo, mat);
//    var blocks = randomMass(config, blockTemplate);
//    for (var i = 0; i < blocks.length; i++)
//    {
//        new NativeComponent('n-mesh-collider', { convex: false }, blocks[i]).addTo(root)
//    }
//}

function GetGround()
{
    var geo = new THREE.CircleGeometry(200);
    var mat = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load('../common/models/RoughBrownCement.png'),
        color: new THREE.Color(0x333333),
        side: THREE.FrontSide
    });
    mat.map.wrapS = THREE.RepeatWrapping;
    mat.map.wrapT = THREE.RepeatWrapping;
    mat.map.repeat.set(20, 20);

    var mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, 0, -85);
    mesh.rotateX(Math.PI / -2);
    return mesh;
}

function GetSky()
{
    var geo = new THREE.SphereGeometry(500);
    var mat = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load('../common/models/Nothing.png'),
    });
    var mesh = new THREE.Mesh(geo, mat);
    mesh.scale.x = -1;
    return mesh;
}

function AddHorror()
{
    var horrorGroup = new THREE.Group();
    UltimateLoader.load('models/horrorwhirl.gltf', function (object)
    {
        var mesh = object;
        mesh.position.set(0, 0, 0);
        mesh.addBehavior(ConstantRotation({ x: 0, y: 0.003, z: 0 }));
        horrorGroup.add(mesh);
    });

    //UltimateLoader.load('models/teeth.gltf', function (object)
    //{
    //    var mesh = object;
    //    mesh.position.set(0, 0, 0);
    //    mesh.addBehavior(ConstantRotation({ x: 0, y: -0.0005, z: 0 }));
    //    horrorGroup.add(mesh);
    //});

    horrorGroup;
    horrorGroup.scale.set(20, 20, 20);
    horrorGroup.position.set(0, 110, -100);
    root.add(horrorGroup)

}

function AddClouds()
{
    UltimateLoader.load('models/clouds.gltf', function (object)
    {
        var clouds = object;
        clouds.scale.set(20, 20, 20);
        clouds.position.set(0, 75, -100);
        clouds.addBehavior(ConstantRotation({ x: 0, y: 0.0001, z: 0 }));
        root.add(clouds);
    });
}

function AddRuneColumn(config)
{
    var dim = config.scale.x * 0.5
    for (var i = 0; i < config.height; i++)
    {
        // build four sides per level
        AddStandardMeshObject(config.path, {
            position: new THREE.Vector3(
                config.position.x,
                config.position.y + (i * dim),
                config.position.z + (dim / 2)
                ),
            rotation: new THREE.Euler(0, config.rotation.y + (Math.PI / 2), 0),
            scale: config.scale
        });
        AddStandardMeshObject(config.path, {
            position: new THREE.Vector3(
                config.position.x,
                config.position.y + (i * dim),
                config.position.z - (dim / 2)
                ),
            rotation: new THREE.Euler(0, config.rotation.y + (Math.PI / -2), 0),
            scale: config.scale
        });
        AddStandardMeshObject(config.path, {
            position: new THREE.Vector3(
                config.position.x + (dim / 2),
                config.position.y + (i * dim),
                config.position.z
                ),
            rotation: new THREE.Euler(0, config.rotation.y + Math.PI, 0),
            scale: config.scale
        });
        AddStandardMeshObject(config.path, {
            position: new THREE.Vector3(
                config.position.x - (dim / 2),
                config.position.y + (i * dim),
                config.position.z
                ),
            rotation: new THREE.Euler(0, config.rotation.y + 0, 0),
            scale: config.scale
        });
    }
}

function AddStandardMeshObject(path, config)
{
    UltimateLoader.load(path, function (object)
    {
        var mesh = object;
        mesh.scale.copy(config.scale);
        mesh.position.copy(config.position);
        mesh.rotation.copy(config.rotation);
        new NativeComponent('n-mesh-collider', { convex: false }, mesh).addTo(root);
    });
}

//function AddHorrorSuckDust()
//{
//    var dust = new THREE.Group();
//    dust.position.set(0, 0, -100);
//    //dust.rotateX(Math.PI / -2);
//    var dustFast = new THREE.Mesh(
//            new THREE.CylinderGeometry(0, 50, 0.5, 64),
//            new THREE.MeshLambertMaterial({
//                map: new THREE.TextureLoader().load('models/blackdust.png'),
//                transparent: true,
//                opacity: 0.7,
//            })
//        );
//    dustFast.position.y = 0.1;
//    dustFast.addBehavior(ScrollingTexture({ x: -0.0005, y: -0.001 }));
//    dustFast.userData.altspace = { collider: { enabled: false } };
//    dust.add(dustFast);
     
//    var dustSlow = new THREE.Mesh(
//            new THREE.CylinderGeometry(0, 50, 0.25, 64),
//            new THREE.MeshLambertMaterial({
//                map: new THREE.TextureLoader().load('models/blackdust.png'),
//                transparent: true,
//                opacity: 0.4,
//            })
//        );
//    dustSlow.addBehavior(ScrollingTexture({ x: -0.0005, y: -0.0005 }));
//    dustFast.userData.altspace = { collider: { enabled: false } };
//    dust.add(dustSlow);
//    dust.userData.altspace = { collider: { enabled: false } };
//    root.add(dust);
//}

//function AddHorrorSuck()
//{
//    var top = 135;
//    var step = 10;
//    for (var i = 0; i < top; i += step)
//    {
//        var gust = new THREE.Mesh(
//                new THREE.CircleGeometry(12),
//                new THREE.MeshBasicMaterial({
//                    visible: false,
//                    color: new THREE.Color(0x333333),
//                    side: THREE.DoubleSide
//                })
//            );
//        gust.position.set(0, i, -100);
//        gust.rotateX(Math.PI / -2);
//        gust.addBehavior(Elevator({
//            top: top,
//            speed: 0.01
//        }));
//        new NativeComponent('n-mesh-collider', { convex: false }, gust).addTo(root);
//    }
//}

//function AddHorrorBlast()
//{
//    var size = 300;
//    var step = 2;
//    var posX = 0;
//    var posY = 130;
//    var posZ = -100;

//    // cones
//    for (var i = 0; i < size; i += step)
//    {
//        var pusher = new THREE.Mesh(
//            new THREE.CylinderGeometry(0, size, i, 16, 1, true),
//            new THREE.MeshBasicMaterial({
//                visible: false,
//                color: new THREE.Color(0x333333),
//                side: THREE.DoubleSide
//            })
//        );

//        pusher.position.set(posX, posY + (i / 2), posZ);
//        new NativeComponent('n-mesh-collider', { convex: false }, pusher).addTo(root);
//    }

//    // cyls
//    for (var i = 0; i < size; i += step)
//    {
//        var pusher = new THREE.Mesh(
//            new THREE.CylinderGeometry(i, size, size, 16, 1, true),
//            new THREE.MeshBasicMaterial({
//                visible: false,
//                color: new THREE.Color(0x333333),
//                side: THREE.DoubleSide
//            })
//        );

//        pusher.position.set(posX, posY + (size / 2), posZ);
//        new NativeComponent('n-mesh-collider', { convex: false }, pusher).addTo(root);
//    }
//}

//function BlastPusher(config)
//{
//    var config = {
//        p: config.p || new THREE.Vector3(0, 0, 0),
//        scaleStart: config.scaleStart || 1,
//        scaleMin: config.scaleMin || 1,
//        scaleMax: config.scaleMax || 5,
//        speed: config.speed || 0.01
//    };

//    var object3d

//    function awake(o)
//    {
//        object3d = o;
//        object3d.scale.set(config.scaleStart, config.scaleStart * 0.7, config.scaleStart);
//    }

//    function update(deltaT)
//    {
//        var scale = object3d.scale.x + (config.speed * deltaT);
//        if (scale > config.scaleMax)
//        {
//            scale = config.scaleMin;
//        }
//        object3d.scale.set(scale, scale * 0.7, scale);
//    }

//    return { awake: awake, update: update };
//}