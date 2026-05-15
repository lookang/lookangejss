/*
 * Polynomial implements a mathematical polynomial:
 * c[0] + c[1] * x + c[2] * x^2 + ....
*/
function Polynomial(coef) {
	this.coef = coef.slice(0);  // copy array
}

Polynomial.prototype.evaluate = function(x){
    var n = this.coef.length-1;
    var y = this.coef[n];
    for(var i = n-1; i>=0; i--) {
      y = this.coef[i]+(y*x);
    }
	return y;
}

/**
  * Adds the given polynomial to this polynomial.
  * @param p Polynomial
  * @return Polynomial
*/
Polynomial.prototype.add = function(p){
    var n = Math.max(p.degree(), this.degree())+1;
    var coef = new Array(n); 
    for(var i = 0; i<n; i++) {
      coef[i] = this.coefficient(i)+p.coefficient(i);
    }
    return new Polynomial(coef);
}

/**
  * Adds the given polynomial to this polynomial.
  * @param p Polynomial
  * @return Polynomial
*/
Polynomial.prototype.subtract = function(p){
    var n = Math.max(p.degree(), this.degree())+1;
    var coef = new Array(n);
    for(var i = 0; i<n; i++) {
      coef[i] = this.coefficient(i)-p.coefficient(i);
    }
    return new Polynomial(coef);
}

/**
  * Multiplies this polynomial by another polynomial.
  * @param p Polynomial
  * @return Polynomial
*/
Polynomial.prototype.multiply = function(p){
    if(p instanceof Polynomial){
		var n = p.degree()+this.degree();
		var coef = new Array(n+1);
		for(var i = 0; i<=n; i++) {
		  coef[i] = 0;
		  for(var k = 0; k<=i; k++) {
			coef[i] += p.coefficient(k)*this.coefficient(i-k);
		  }
		}
		return new Polynomial(coef);
	} else{  // p is a number
		var n = this.coef.length;
		var coef = new Array(n);
		for(var i = 0; i<n; i++) {
		  coef[i] = this.coef[i]*p;
		}
		return new Polynomial(coef);
	} 
}

  /**
   * Gets the derivative of this polynomial.
   * @return Polynomial the derivative.
   */
Polynomial.prototype.derivative = function(){
    var n = this.degree();
    if(n===0) {
      return new Polynomial([0]);
    }
    var coef = new Array(n);
    for(var i = 1; i<=n; i++) {
      coef[i-1] = coef[i]*i;
    }
    return new Polynomial(coef);
}

/**
 * Gets the degree of this polynomial function.
 * @return int degree of this polynomial function
*/
Polynomial.prototype.degree = function(){
    return this.coef.length-1;
}

 /**
   * Gets the coefficient value at the desired position
   * @param n int    the position of the coefficient to be returned
   * @return double the coefficient value
 */
Polynomial.prototype.coefficient = function(n){
    return(n<this.coef.length) ? this.coef[n] : 0;
}

Polynomial.prototype.log = function(){
	console.log(this.coef.toString());
}
