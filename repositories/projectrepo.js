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
                "/images/tezolmarket.jfif",
                "https://www.tezolmarket.com",
                "Lead Android software & search engine developer"
            ),
            new Project(
                "purescript-rxjs",
                `"purescript-rxjs" is the implementation of "Reactive Streams" in Purescript. The library allows writing 
                 streaming pipelines and reactive software based on functional 
                 programming combinators in an expressive and declarative way.`,
                "/images/purescript-rxjs.png",
                "https://github.com/amneshia/purescript-rxjs",
                "Source library & testing contributor"
            ),
            new Project(
                "tennis-kata",
                `"tennis-kata" is the implementation of the "Tennis Code Kata" in Haskell. Haskell is my No.1 favorite programming language. 
                Given Haskell's immutable and purely functional nature, in this tutorial library I demonstrate how one can model change of 
                state in Haskell utilizing the "State Monad".`,
                "/images/tennis-kata.png",
                "https://github.com/amneshia/tennis-kata",
                "Source library author"
            )
        ];
    }
};

module.exports = ProjectRepo