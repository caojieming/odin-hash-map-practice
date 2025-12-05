class HashMap {

    constructor() {
        // our array of buckets, including the max # of buckets
        this.buckets = new Array(16);
        // once the buckets are filled up to this percentage, double the buckets size
        this.loadFactor = 0.75;
        // number of stored key/vals
        this.numKeys = 0;
    }


    // key: string
    // output: int
    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            
            // putting the modulo here instead of set prevents edgecase of hashCode int overflowing
            hashCode = hashCode % this.buckets.length;
        }

        return hashCode;
    }


    set(key, value) {
        const index = this.hash(key);

        // I don't think this should ever trigger since index is modulo'ed, but just in case
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds: " + index);
        }

        // first time adding a key, value to this hash
        if(this.buckets[index] === undefined) {
            this.buckets[index] = new LinkedList();
            this.buckets[index].append(key, value);
            this.numKeys++;
        }
        // not first time adding a key, value to this hash
        else {
            // traverse bucket, searching if key already exists
            let currNode = this.buckets[index].firstNode;

            while(currNode !== null) {
                // found key, replace value, and exit
                if(currNode.key === key) {
                    currNode.value = value;
                    return;
                }
                currNode = currNode.next;
            }

            // reaching here means the key was not found, so add the value to the end of the linked list
            this.buckets[index].append(key, value);
            this.numKeys++;
        }

        // check if load factor capacity threshold has been crossed
        const threshold = this.buckets.length * this.loadFactor;
        if(this.numFilledBuckets() >= threshold) {
            this.expandHashMap();
        }
        
    }


    numFilledBuckets() {
        let out = 0;

        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i] !== undefined && this.buckets[i].length !== 0) {
                out++;
            }
        }

        return out;
    }


    expandHashMap() {
        const oldMapEntries = this.entries();
        this.buckets = new Array(this.buckets.length * 2);

        for(let i = 0; i < oldMapEntries.length; i++) {
            const key = oldMapEntries[i][0];
            const val = oldMapEntries[i][1];
            this.set(key, val);
        }
    }


    get(key) {
        const index = this.hash(key);

        // hashed key index has no linked list at all
        if(this.buckets[index] === undefined) {
            return null;
        }
        // hashed key index has content, search for key
        else {
            let currNode = this.buckets[index].firstNode;

            // traverse linked list, searching for key
            while(currNode !== null) {
                if(currNode.key === key) {
                    return currNode.value;
                }
                currNode = currNode.next;
            }

            // didn't find key in linked list
            return null;
        }
    }


    has(key) {
        const index = this.hash(key);

        // hashed key index has no linked list at all
        if(this.buckets[index] === undefined) {
            return false;
        }
        // hashed key index has content, search for key
        else {
            let currNode = this.buckets[index].firstNode;

            // traverse linked list, searching for key
            while(currNode !== null) {
                if(currNode.key === key) {
                    return true;
                }
                currNode = currNode.next;
            }

            // didn't find key in linked list
            return false;
        }
    }


    remove(key) {
        const index = this.hash(key);

        // hashed key index has no linked list at all
        if(this.buckets[index] === undefined) {
            return false;
        }
        // hashed key index has content, search for key
        else {
            let bucketList = this.buckets[index];
            const bucketInd = bucketList.find(key);

            if(bucketInd !== -1) {
                bucketList.removeAt(bucketInd);
                this.numKeys--;
                return true;
            }
            else {
                return false;
            }
        }
    }


    length() {
        return this.numKeys;
    }


    clear() {
        this.buckets = new Array(16);
        this.numKeys = 0;
    }


    keys() {
        const out = [];
        
        for(let i = 0; i < this.buckets.length; i++) {
            // bucket is not undefined and is not an empty linked list
            if(this.buckets[i] !== undefined && this.buckets[i].length !== 0) {
                let currNode = this.buckets[i].firstNode;

                while(currNode !== null) {
                    out.push(currNode.key);
                    currNode = currNode.next;
                }
            }
        }

        return out;
    }


    values() {
        const out = [];
        
        for(let i = 0; i < this.buckets.length; i++) {
            // bucket is not undefined and is not an empty linked list
            if(this.buckets[i] !== undefined && this.buckets[i].length !== 0) {
                let currNode = this.buckets[i].firstNode;

                while(currNode !== null) {
                    out.push(currNode.value);
                    currNode = currNode.next;
                }
            }
        }

        return out;
    }


    entries() {
        const out = [];
        
        for(let i = 0; i < this.buckets.length; i++) {
            // bucket is not undefined and is not an empty linked list
            if(this.buckets[i] !== undefined && this.buckets[i].length !== 0) {
                let currNode = this.buckets[i].firstNode;

                while(currNode !== null) {
                    out.push([currNode.key, currNode.value]);
                    currNode = currNode.next;
                }
            }
        }

        return out;
    }

}

