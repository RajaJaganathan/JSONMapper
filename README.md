# Simple Javascript Data Mapper Utility
Simle data mapper javascript for convert the JSON response into instances of particular type.

```
function DataMapper() {

}

DataMapper.map = function(objects, constructor) {
    return objects.map(function(item) {
        var instance = new constructor(); //Problem how to pass arguments;but can safely ignore them
        instance.map(item);
        return instance;
    });
}

DataMapper.toObject = function(objects) {
    return objects.map(function(item) {
        return item.toObject();
    });
}

function Person() {
    this.name = "unknown";
    this.age = 0;
    this.hobbies = [];
}

Person.prototype = {
    constructor: Person,
    isSeniorCitizen: function() {
        return this.age > 59;
    },
    map: function(response) {
        this.name = response.name || "unknown";
        this.age = response.age;
        this.hobbies = DataMapper.map(response.hobbies, Hobbies);
    },
    toObject: function() {
        return {
            name: this.name,
            age: this.age,
            hobbies: DataMapper.toObject(this.hobbies),
        };
    }
}

function Hobbies() {
    this.name = '';
    this.interest = 1; //1 to 5 
}

Hobbies.prototype = {
    constructor: Hobbies,
    map: function(response) {
        this.name = response.name;
        this.rating = response.rating;
    },
    toObject: function() {
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
    hobbies: [{
        name: 'Cricket',
        rating: 5
    }]
}, {
    name: "Raja",
    age: 0,
    hobbies: [{
        name: 'Watching TV',
        rating: 4
    }]
}];

var typedPersons = DataMapper.map(persons, Person);

console.log('TypedPersons ', typedPersons);
console.log('TypedPersons[0] ', typedPersons[0]);
console.log('TypedPersons[0].hobbies ', typedPersons[0].hobbies);

console.log('To JSON ', JSON.stringify(DataMapper.toObject(typedPersons), null, 2));

```
