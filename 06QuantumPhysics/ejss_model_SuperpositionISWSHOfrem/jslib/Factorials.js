/**
 * Compute the factorial of an integer and functions closely related to factorials.
 */
function Factorials() {
    var val = 1;
    var maxN = 1;
	while(maxN<21) {  
      val = val*maxN;
      maxN++;
	  //console.log("val="+ val);
    }
    this.fac = new Array(maxN); // maxN should be ~21
    this.fac[0] = 1;
    for(var i = 1; i<maxN; i++) {
      this.fac[i] = this.fac[i-1]*i;
    }
}


Factorials.prototype.factorial = function(n){
    if(n<0) return null;
    if(n<this.fac.length) {
      return this.fac[n];
    }
    return null; // Math.exp(gammaln(n+1.0));
}
