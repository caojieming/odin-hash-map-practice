console.log("creating HashMap and inserting key,vals: length = 12");
const test = new HashMap();

// ideally, 12 buckets should be filled
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log(test.length());

// note, with my hash function, 10 buckets are filled with 2 buckets having 1 collision each
console.log("# filled buckets: " + test.numFilledBuckets());
console.log(test.entries());
console.log();


console.log("testing get(): gray, purple, golden, null");
console.log(test.get("elephant"));
console.log(test.get("grape"));
console.log(test.get("lion"));
console.log(test.get("snepard"));
console.log();

console.log("testing has(): true, true, true, false");
console.log(test.has("elephant"));
console.log(test.has("grape"));
console.log(test.has("lion"));
console.log(test.has("snepard"));
console.log();


console.log("testing remove(): elephant = true, elephant = false, grape = true, lion = true, snepard = false");
console.log(test.remove("elephant"));
console.log(test.remove("elephant"));
console.log(test.remove("grape"));
console.log(test.remove("lion"));
console.log(test.remove("snepard"));
console.log();


console.log("testing keys(): return a list of 9 unique keys with no elephant, grape, or lion");
console.log(test.keys());
console.log();


console.log("testing values(): return a list of 9 values, each corresponding to the above keys");
console.log(test.values());
console.log();


console.log("testing entries(): return a list of 9 key/value pairs");
console.log(test.entries());
console.log();


console.log("testing replacing value with set(): replacing apple's red with yellow");
console.log("before: " + test.get("apple"));
test.set("apple", "yellow");
console.log("after: " + test.get("apple"));
console.log(test.entries());
console.log();


console.log("testing clear():");
test.clear();
console.log("# filled buckets: " + test.numFilledBuckets());
console.log(test.entries());
console.log();


console.log("testing expansion, repopulating buckets, 12 is the threshold");
test.set('a', 'a');
test.set('b', 'b');
test.set('c', 'c');
test.set('d', 'd');
test.set('e', 'a');
test.set('f', 'b');
test.set('g', 'c');
test.set('h', 'd');
test.set('i', 'a');
test.set('j', 'b');
test.set('k', 'c');
console.log("# filled buckets: " + test.numFilledBuckets());
console.log(test.entries());
console.log("adding 1 more to cross threshold");
test.set('l', 'd');
console.log("# filled buckets: " + test.numFilledBuckets() );
console.log(test.entries());
console.log("adding more to test");
test.set('m', 'd');
test.set('n', 'd');
test.set('z', 'd');
console.log(test.buckets);
console.log();
