import * as THREE from 'three'
import gsap from 'gsap' // little dancy dance



const parameters = {
    materialColor: '#1b1533'
}

/**
 * Base
 */

// Canvas
// looks for the first <canvas class="webgl">
const canvas = document.querySelector('canvas.webgl')


// Scene
// creating a scene
const scene = new THREE.Scene()

/**
 * Objects
 */

// textures:::
const textureLoader = new THREE.TextureLoader() // loads texture lol
// uses url as shadow gradient, not a texture pack like minecraft
const gradientTexture = textureLoader.load('/texture/gradients/5.jpg')
gradientTexture.magFilter = THREE.NearestFilter // pixel art looks retains properties

// Material
// cartoon like appearance, we are going to be using same one for all 3 shapes
const material = new THREE.MeshToonMaterial({
                                                color: parameters.materialColor,
                                                gradientMap: gradientTexture
                                            })

// meshes = shape/geometry and material (yes diff from object... but why????)
// answer: ...
// 'geometry'
// radius
const mesh1 = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1),
    material
)
const mesh2 = new THREE.Mesh(
    new THREE.OctahedronGeometry(1),
    material
)
const mesh3  = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
)
const objectDistance = 4



// essentially just alternating left right left.repeat()
mesh1.position.y = 0 // will always be at top
mesh1.position.x = 2 // to the right
mesh2.position.y = - objectDistance // 4 units away
mesh2.position.x = -2 // to the left
mesh3.position.y = - objectDistance * 2 // double distance from last object and so on
mesh3.position.x = 2 // right
scene.add(mesh1, mesh2, mesh3)

// why are we adding meshes to an array instead of a group (for those of you have done blender)
// why is an array better in this case...
const sectionMeshse = [mesh1, mesh2, mesh3 ]



// Why vectors are a pain D:
// light falls off
// who knows why light remains in the same world position, even though camera moves w scroll????
// answer:
const directionalLight = new THREE.DirectionalLight('#ffffff', 4)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)


/**
 * Sizes
 */
// essentially we just want to fill the screen
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// for those of you who have worked with big bang or are going to are in fundies 2...
// welcome...

// what type of thing is resize!?
window.addEventListener('resize', () =>
{
    // Update sizes - new sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // Update camera - where we look
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    // Update renderer - aka your 3D scene
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



/**
 * Camera
 */

// now we know an array is best for modifying each mesh individually
// but why we only group one object? -- we will find out later :D


const cameraGroup = new THREE.Group()
scene.add(cameraGroup)
// Base camera
// field of view, aspect ratio (avoid stretch), and ranges
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6 // location
cameraGroup.add(camera)





/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
                                             canvas: canvas, // remember equery selector
                                             alpha: true // enables transparency for background
                                         })
renderer.setSize(sizes.width, sizes.height) // same thing we did with line 35.... and 88,
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // pixels yes

/**
 * scroll
 */

// this returns a number, why is this important
// whats the point of a let in js?
let scrollY = window.scrollY // scrollX people are dangerous
// whats the error?
// let num = 5;
// num = 10;  // hehe
// console.log(num); // 10
// let num = 20; // hehe^2


// divide each shape based off of section (don't forget their spaced out as regions)
let currentSection = 0

// fundies pt 2
window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY
    const newSection = Math.round(scrollY / sizes.height) // scrollY nice good number

    if (newSection !== currentSection) // if in new section
    {
        currentSection = newSection // update section
        gsap.to( // documentation to make it dance
            sectionMeshse[currentSection].rotation,
            {
                duration: 1.5,
                ease: 'power2.inout',
                x: '+= 6',
                y: '+= 3',
                z: '+= 1.5'
            }
        )
    }
})


/**
 * cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = (event.clientY / sizes.height - 0.5)
})






/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime() // what is elapsed time
    const deltatime = elapsedTime - previousTime
    previousTime = elapsedTime // gettign user screen frequence

    // animate camera
    camera.position.y = - scrollY / sizes.height * objectDistance
    const parallexX = cursor.x
    const parallexY = - cursor.y

    // here is why camera group is important
    // If we animate or move the camera directly, it affects its position relative to the world.
    // Instead, by moving cameraGroup, we can offset the camera naturally while keeping its position relative to the group.
    // Moving the camera directly → Like picking up a drone and flying it around.
    // Moving the camera group → Like placing the drone on a moving platform and moving the platform instead.
    // The drone moves, but its position relative to the platform stays the same
    cameraGroup.position.x += (parallexX - cameraGroup.position.x) * 2 * deltatime
    cameraGroup.position.y += (parallexY - cameraGroup.position.y) * 2 * deltatime


    // animat meshes
    for( const mesh of sectionMeshse)
    {
        mesh.rotation.x += 0.1 * deltatime
        mesh.rotation.y += 0.12 * deltatime
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()









//answer: light won’t follow the camera unless you update its position dynamically
// in other words the scene is static, never moving, the objects move dynamically (not the light position)







//answer: Best for modifying each mesh individually