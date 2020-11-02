/**
 * A simple circular data structure
 */
export default function Circular(arr, startIntex) {
  this.arr = arr;
  this.index = startIntex || 0;
}

Circular.prototype.next = function() {
  var i = this.index, arr = this.arr;
  this.index = i < arr.length - 1 ? i + 1 : 0;
  return this.curr();
};

Circular.prototype.prev = function() {
  var i = this.index, arr = this.arr;
  this.index = i > 0 ? i - 1 : arr.length - 1;
  return this.curr();
};

Circular.prototype.curr = function() {
  return this.arr[this.index];
};

/**
 *     USAGE
 */
// var c = new Circular([1,2,3,4]);
// c.curr(); // 1
// c.next();    // 2
// c.curr(); // 2
// c.next();    // 3
// c.next();    // 4
// c.next();    // 1
// c.next();    // 2
// c.prev();    // 1
// c.curr(); // 1
// c.prev();    // 4
// c.curr(); // 4
