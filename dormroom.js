var imgone = document.getElementById("imgone");
var imgtwo = document.getElementById("imgtwo");
var imgthree = document.getElementById("imgthree");
var imgfour = document.getElementById("imgfour");
var imgfive = document.getElementById("imgfive");

imgone.style.zIndex = 0;
imgtwo.style.zIndex = 0;
imgthree.style.zIndex = 0;
imgfour.style.zIndex = 0;
imgfive.style.zIndex = 0;


function onLoad() {
    //console.log(furnitureArray[0]['image']);
    console.log("onload or restart");

    document.addEventListener("mousedown", continueDrag, false);

    document.getElementById("imgone").src = furnitureArray[0]['image'];
    document.getElementById("imgone").alt = furnitureArray[0]['name'];
    document.getElementById("imgone").width = furnitureArray[0]['dimensions']['width'];
    document.getElementById("imgone").height = furnitureArray[0]['dimensions']['height'];
    document.getElementById("imgone").style.top = `${20+1*18+50*0}px`;
    document.getElementById("imgone").style.left = "280px";
    //console.log(furnitureArray[0]['dimensions']['width'], document.getElementById("imgone").width);

    document.getElementById("imgtwo").src = furnitureArray[1]['image'];
    document.getElementById("imgtwo").alt = furnitureArray[1]['name'];
    document.getElementById("imgtwo").width = furnitureArray[1]['dimensions']['width'];
    document.getElementById("imgtwo").height = furnitureArray[1]['dimensions']['height'];
    document.getElementById("imgtwo").style.top = `${20+2*18+50*1}px`;
    document.getElementById("imgtwo").style.left = "280px";

    document.getElementById("imgthree").src = furnitureArray[2]['image'];
    document.getElementById("imgthree").alt = furnitureArray[2]['name'];
    document.getElementById("imgthree").width = furnitureArray[2]['dimensions']['width'];
    document.getElementById("imgthree").height = furnitureArray[2]['dimensions']['height'];
    document.getElementById("imgthree").style.top = `${20+3*18+50*2}px`;
    document.getElementById("imgthree").style.left = "280px";

    document.getElementById("imgfour").src = furnitureArray[3]['image'];
    document.getElementById("imgfour").alt = furnitureArray[3]['name'];
    document.getElementById("imgfour").width = furnitureArray[3]['dimensions']['width'];
    document.getElementById("imgfour").height = furnitureArray[3]['dimensions']['height'];
    document.getElementById("imgfour").style.top = `${20+4*18+50*3}px`;
    document.getElementById("imgfour").style.left = "280px";

    document.getElementById("imgfive").src = furnitureArray[4]['image'];
    document.getElementById("imgfive").alt = furnitureArray[4]['name'];
    document.getElementById("imgfive").width = furnitureArray[4]['dimensions']['width'];
    document.getElementById("imgfive").height = furnitureArray[4]['dimensions']['height'];
    document.getElementById("imgfive").style.top = `${20+5*18+50*4}px`;
    document.getElementById("imgfive").style.left = "280px";
    //set innerhtml of <p> elements to the value in other array
}
window.addEventListener("load", onLoad, false);
document.getElementById("restartbutton").addEventListener("click", onLoad, false);


/////// NOTE: Dragging code is rewritten from HW4, which was based on a combination of lecture code (specifically lecture 9), ////
////// and examplefrom W3Schools: https://www.w3schools.com/howto/howto_js_draggable.asp. I've added explanations
/////to further prove comprehension and changes.
////
//

// What to do when the mouse is down

function continueDrag(evt) {
    imgone.style.zIndex = 0;
    imgtwo.style.zIndex = 0;
    imgthree.style.zIndex = 0;
    imgfour.style.zIndex = 0;
    imgfive.style.zIndex = 0;
    // Arrow function to reset all stored values for new calculations when mouse is down
    () => {
        var newX = 0, newY = 0, initialX = 0, initialY = 0;
    }
    evt.preventDefault(); // Fixes behavior of drag and drop
    // Variable stores the event target for later use
    clickedTarget = evt.target;
    clickedTarget.style.zIndex = clickedTarget.style.zIndex + 100;

    document.removeEventListener("mousedown", continueDrag, false);

    document.addEventListener("mouseup", stopDrag, false); // This stops the dragging and removes event listeners when mouse released.
    document.addEventListener("mousemove", mapDragMove, false); // This calculates new position of map when dragged
    document.body.style.cursor = "move"; // Changes cursor as long as dragging is occurring

    // Getting the position of the initial click (for calculations)
    initialX = clickedTarget.clientX;
    initialY = clickedTarget.clientY;
 }

 function mapDragMove(evt) {
    evt.preventDefault(); // Fixes behavior of drag and drop
    // Find the new position (change in position) of the mouse, then updates initial position
    newX = evt.clientX - initialX;  // New = new - old positioon
    newY = evt.clientY - initialY;
    // Sets map's position based on prior calculation to find top/left distance. Map is the image (see first global variables)
    evt.target.style.top = `${evt.target.offsetTop + newY}px`;  // the offsetTop/Left is pretty much the reason why I used w3schools. Functions inspired as well
    evt.target.style.left = `${evt.target.offsetLeft + newX}px`;
    console.log(evt.target);
    initialX = evt.clientX; // Updating to reflect the new "new" position
    initialY = evt.clientY;
 }

 function stopDrag() {
    //console.log("stop");
    // Removes event handlers so no more dragging, changes cursor back to default
    // console.log(event.target, "stopdrag hihihi");
    document.removeEventListener("mouseup", stopDrag, false);
    document.removeEventListener("mousemove", mapDragMove, false);
    document.body.style.cursor = "auto";
    document.addEventListener("mousedown", continueDrag, false)

    var boundsEvt = event.target.getBoundingClientRect()
    // Compare all possible cases that bounding rectangles overlap, I drew it out
    if (event.target != document.getElementById("imgone")) {
        var boundsOther = document.getElementById("imgone").getBoundingClientRect();
        // console.log(boundsOther, "bounds other", boundsEvt)
        if (boundsEvt.right >= boundsOther.left && boundsOther.top <= boundsEvt.bottom && boundsEvt.left <= boundsOther.right && boundsEvt.top <= boundsOther.bottom) {
            snapBack(event);
        }
    }
    if (event.target != document.getElementById("imgtwo")) {
        var boundsOther = document.getElementById("imgtwo").getBoundingClientRect();
        if (boundsEvt.right >= boundsOther.left && boundsOther.top <= boundsEvt.bottom && boundsEvt.left <= boundsOther.right && boundsEvt.top <= boundsOther.bottom) {
            snapBack(event);
        }
    }
    if (event.target != document.getElementById("imgthree")) {
        var boundsOther = document.getElementById("imgthree").getBoundingClientRect();
        if (boundsEvt.right >= boundsOther.left && boundsOther.top <= boundsEvt.bottom && boundsEvt.left <= boundsOther.right && boundsEvt.top <= boundsOther.bottom) {
            snapBack(event);
        }
    }
    if (event.target != document.getElementById("imgfour")) {
        var boundsOther = document.getElementById("imgfour").getBoundingClientRect();
        if (boundsEvt.right >= boundsOther.left && boundsOther.top <= boundsEvt.bottom && boundsEvt.left <= boundsOther.right && boundsEvt.top <= boundsOther.bottom) {
            snapBack(event);
        }
    }
    if (event.target != document.getElementById("imgfive")) {
        var boundsOther = document.getElementById("imgfive").getBoundingClientRect();
        if (boundsEvt.right >= boundsOther.left && boundsOther.top <= boundsEvt.bottom && boundsEvt.left <= boundsOther.right && boundsEvt.top <= boundsOther.bottom) {
            snapBack(event);
        }
    }
 }

 function snapBack(evt) {
     if (evt.target == document.getElementById("imgone")) {
         document.getElementById("imgone").style.top = `${20+1*18+50*0}px`;
         document.getElementById("imgone").style.left = "280px";
     } else if (evt.target == document.getElementById("imgtwo")) {
         document.getElementById("imgtwo").style.top = `${20+2*18+50*1}px`;
         document.getElementById("imgtwo").style.left = "280px";
     } else if (evt.target == document.getElementById("imgthree")) {
         document.getElementById("imgthree").style.top = `${20+3*18+50*2}px`;
         document.getElementById("imgthree").style.left = "280px";
     } else if (evt.target == document.getElementById("imgfour")) {
         document.getElementById("imgfour").style.top = `${20+4*18+50*3}px`;
         document.getElementById("imgfour").style.left = "280px";
     } else if (evt.target == document.getElementById("imgfive")) {
         document.getElementById("imgfive").style.top = `${20+5*18+50*4}px`;
         document.getElementById("imgfive").style.left = "280px";
     }
 }

 var roomLeft = 25;
 var roomTop = 25;
 var roomRight = 225;
 var roomBottom = 225;
 function cleanUpButton() {
     console.log("cleanupbutton");

     var getBoxHeight = imgone.height;
     var getBoxWidth = imgone.width;
     var getBoxTop = parseInt(imgone.style.top);
     var getBoxLeft = parseInt(imgone.style.left);
     var getBoxRight = getBoxLeft + getBoxWidth;
     var getBoxBottom = getBoxTop + getBoxHeight;
     if (getBoxTop < roomTop || getBoxBottom > roomBottom || getBoxLeft < roomLeft || getBoxRight > roomRight) {
         document.getElementById("imgone").style.top = `${20+1*18+50*0}px`;
         document.getElementById("imgone").style.left = "280px";
     }

     var getBoxHeight = imgtwo.height;
     var getBoxWidth = imgtwo.width;
     var getBoxTop = parseInt(imgtwo.style.top);
     var getBoxLeft = parseInt(imgtwo.style.left);
     var getBoxRight = getBoxLeft + getBoxWidth;
     var getBoxBottom = getBoxTop + getBoxHeight;
     if (getBoxTop < roomTop || getBoxBottom > roomBottom || getBoxLeft < roomLeft || getBoxRight > roomRight) {
         document.getElementById("imgtwo").style.top = `${20+2*18+50*1}px`;
         document.getElementById("imgtwo").style.left = "280px";
     }

     var getBoxHeight = imgthree.height;
     var getBoxWidth = imgthree.width;
     var getBoxTop = parseInt(imgthree.style.top);
     var getBoxLeft = parseInt(imgthree.style.left);
     var getBoxRight = getBoxLeft + getBoxWidth;
     var getBoxBottom = getBoxTop + getBoxHeight;
     if (getBoxTop < roomTop || getBoxBottom > roomBottom || getBoxLeft < roomLeft || getBoxRight > roomRight) {
         document.getElementById("imgthree").style.top = `${20+3*18+50*2}px`;
         document.getElementById("imgthree").style.left = "280px";
     }

     var getBoxHeight = imgfour.height;
     var getBoxWidth = imgfour.width;
     var getBoxTop = parseInt(imgfour.style.top);
     var getBoxLeft = parseInt(imgfour.style.left);
     var getBoxRight = getBoxLeft + getBoxWidth;
     var getBoxBottom = getBoxTop + getBoxHeight;
     if (getBoxTop < roomTop || getBoxBottom > roomBottom || getBoxLeft < roomLeft || getBoxRight > roomRight) {
         document.getElementById("imgfour").style.top = `${20+4*18+50*3}px`;
         document.getElementById("imgfour").style.left = "280px";
     }

     var getBoxHeight = imgfive.height;
     var getBoxWidth = imgfive.width;
     var getBoxTop = parseInt(imgfive.style.top);
     var getBoxLeft = parseInt(imgfive.style.left);
     var getBoxRight = getBoxLeft + getBoxWidth;
     var getBoxBottom = getBoxTop + getBoxHeight;
     if (getBoxTop < roomTop || getBoxBottom > roomBottom || getBoxLeft < roomLeft || getBoxRight > roomRight) {
         document.getElementById("imgfive").style.top = `${20+5*18+50*4}px`;
         document.getElementById("imgfive").style.left = "280px";
     }
 }
 document.getElementById("cleanupb").addEventListener("click", cleanUpButton, false);
