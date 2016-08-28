function DataMapper() {

}

DataMapper.map = function(objects, constructor) {
    return objects.map(function(item) {
        var instance = new constructor(); //Problem how to pass arguments;but we can safely ignore them
        instance.map(item);
        return instance;
    });
}

DataMapper.toObject = function(objects) {
    return objects.map(function(item) {
        return item.toObject();
    });
}

function Talent() {
    this.name = "unknown";
    this.age = 0;
    this.skills = [];
}

Talent.prototype.isQualified = function() {
    return this.skills.length > 5;
}

Talent.prototype.map = function(response) {
    this.name = response.name || "unknown";
    this.age = response.age;
    this.skills = DataMapper.map(response.skills, Skills);
}

Talent.prototype.toObject = function() {
    return {
        name: this.name,
        age: this.age,
        skills: DataMapper.toObject(this.skills),
    };
}

function Skills() {
    this.name = '';
    this.rating = 0;
}

Skills.prototype.map = function(response) {
    this.name = response.name;
    this.rating = response.rating;
}

Skills.prototype.toObject = function() {
    return {
        name: this.name,
        rating: this.rating
    };
}

//Usage

var talentlist = [{
    name: "Kumar",
    age: 0,
    skills: [{
        name: 'Javascript',
        rating: 5
    }]
}, {
    name: "Raja",
    age: 0,
    skills: [{
        name: 'Node',
        rating: 4
    }]
}];

var typedTalents = DataMapper.map(talentlist, Talent);

console.log('TypedTalents ', typedTalents);
console.log('TypedTalents[0] ', typedTalents[0]);
console.log('TypedTalents[0].skills ', typedTalents[0].skills);

console.log('To JSON ', JSON.stringify(DataMapper.toObject(typedTalents), null, 2));
