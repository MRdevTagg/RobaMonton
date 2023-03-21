const gScale =.5
const gOffset = .5

const px = (int,c) => window.innerWidth / 1000 * int
const py = (int,c) => window.innerHeight / 1000 * int
const ratio = (width, height) => width / height

function setPixelDensity(canvas) {

	// Get the device pixel ratio.
	let pixelRatio = window.devicePixelRatio;



	// Get the actual screen (or CSS) size of the canvas.
	let sizeOnScreen = canvas.getBoundingClientRect();

	// Set our canvas size equal to that of the screen size x the pixel ratio.
	canvas.width = sizeOnScreen.width * pixelRatio;
	canvas.height = sizeOnScreen.height * pixelRatio;

	// Shrink back down the canvas CSS size by the pixel ratio, thereby 'compressing' the pixels.
	canvas.style.width = (canvas.width / pixelRatio) + 'px';
	canvas.style.height = (canvas.height / pixelRatio) + 'px';
	
	// Fetch the context.
	let context = canvas.getContext('2d');

	// Scale all canvas operations by the pixelRatio, so you don't have to calculate these manually.
	context.scale(pixelRatio , pixelRatio);

	// Return the modified context.
	return context;
}
function responsiveCanvas(canvas) {
  let height = window.innerHeight
  let ratio = canvas.width / canvas.height
  let width = height * ratio
  
    if (window.innerHeight >= window.innerWidth) {
        canvas.width = width;
        canvas.height = height;
    } else {
        canvas.width = window.innerHeight;
        canvas.height = window.innerHeight;
    }
}
