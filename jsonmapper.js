function JSONMapper() {

}

JSONMapper.fromJSON = function(objects, constructor) {
    return objects.map(function(item) {
        var instance = new constructor(); //Problem how to pass arguments;but can safely ignore them
        instance.fromJSON(item);
        return instance;
    });
}

JSONMapper.toJSON = function(objects) {
    return objects.map(function(item) {
        return item.toJSON();
    });
}

function Person() {
    this.name = "unknown";
    this.age = 0;
    this.dob = null;
    this.hobbies = [];
}

Person.prototype = {
    constructor: Person,
    initialize: function() {
        console.log('convention constructor called');
    },
    isSeniorCitizen: function() {
        return this.age > 59;
    },
    fromJSON: function(response) {
        this.name = response.name || "unknown";
        this.age = response.age;
        this.dob = new Date(response.dob);
        this.hobbies = JSONMapper.fromJSON(response.hobbies, Hobbies);

        this.initialize();
    },
    toJSON: function() {
        return {
            name: this.name,
            age: this.age,
            dob: this.dob.toString(),
            hobbies: JSONMapper.toJSON(this.hobbies),
        };
    }
}

function Hobbies() {
    this.name = '';
    this.interest = 1; //1 to 5 
}

Hobbies.prototype = {
    constructor: Hobbies,
    initialize: function() {
        console.log('Like constructor');
    },
    fromJSON: function(response) {
        this.name = response.name;
        this.rating = response.rating;

        this.initialize();
    },
    toJSON: function() {
        return {
            name: this.name,
            rating: this.rating
        };
    }
};


//Usage

var persons = [{
    name: "Kumar",
    age: 0,
    dob: "02-02-1989",
    hobbies: [{
        name: 'Cricket',
        rating: 5
    }]
}, {
    name: "Raja",
    age: 0,
    dob: "09-02-1989",
    hobbies: [{
        name: 'Watching TV',
        rating: 4
    }]
}];

var typedPersons = JSONMapper.fromJSON(persons, Person);

console.log('TypedPersons ', typedPersons);
console.log('TypedPersons[0] ', typedPersons[0]);
console.log('TypedPersons[0].hobbies ', typedPersons[0].hobbies);

console.log('To JSON ', JSON.stringify(JSONMapper.toJSON(typedPersons), null, 2));
