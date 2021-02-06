const Project = require('../models/project');

class ProjectRepo {
    constructor() { }
    projects() {
        return [
            new Project(
                "Tezol Market",
                `"Tezol Market" is the online groceries app operating in Iran. It allows users 
                to order groceries online from a nearby store of their choosing, and have them 
                delivered to their specified address at specified time.`,
                "/images/tezolmarket.png",
                "www.tezolmarket.com",
                "Lead Android software engineer",
            )
        ];
    }
};

module.exports = ProjectRepo