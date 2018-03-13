function Exit(){


}
Exit.prototype.isClicked = function(x, y) {
//ASSETS CLICK
    var xMaximum = width-25; // righter-most x
    var yMaximum = (height/4)+75; // bottom-most y
    // return NOT whether the Block WASN'T clicked
    return !(x < width-100|| x > xMaximum || y < height/4 || y > yMaximum)
  }
