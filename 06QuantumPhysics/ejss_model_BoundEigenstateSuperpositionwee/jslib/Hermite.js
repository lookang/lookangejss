/*
 * Polynomial implements a mathematical polynomial:
 * c[0] + c[1] * x + c[2] * x^2 + ....
*/
function Hermite() {
    this.hermiteList=new Array(0);
    this.hermiteList.push(new Polynomial([1.0]));
	this.hermiteList.push(new Polynomial([0, 2.0]));
    this.twoX=new Polynomial([0, 2.0]);  
}


Hermite.prototype.getPolynomial = function(n){
    if(n<0) return null;
	//console.log("n="+n);
	if(n<this.hermiteList.length) {
      return this.hermiteList[n];
    }
	var p1 = this.getPolynomial(n-1).multiply(this.twoX);
	var p2 = this.getPolynomial(n-2).multiply(2*(n-1));
    var p = p1.subtract(p2);
    this.hermiteList.push(p); // polynomial was not on the list so add it.
    return p;
}
