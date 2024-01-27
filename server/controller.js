import athletes from "./db.json" assert {type: "json"};

let globalId = 7;

const handlerFunctions = {
    sayHello: (req, res) => {
        res.send({
            message: "Hello there",
        })
    },

    getAllAthletes: (req, res) => {
        res.send({
            message: "Here are the players.",
            allAthletes: athletes
        })
    },

    addAth: (req, res) => {
        const athName = req.body.athName
        const athPic = req.body.athPic
        const newAth = {
            id: globalId,
            name: athName,
            picture: athPic,
            votes: 0,
        };
        athletes.push(newAth)

        globalId++;

        res.send({
            message: "Player added successfully",
            allAthletes: athletes,
        })
    },

    deleteAth: (req, res) => {
        const athId = req.params.id;
        
        for (let i = 0; i < athletes.length; i++) {
                if (athletes[i].id === +athId) {
                athletes.splice(i, 1)
                break;
            }
        }
        
        res.send({
            message: "Player deleted",
            allAthletes: athletes,
        })
    },
        updateAth: (req, res) => {
            const athId = req.params.id
            const voteType = req.body.voteType;

            const athIdx = athletes.findIndex((athlete) => {
                return athlete.id === +athId
            })

            if (voteType === "upvote") {
                athletes[athIdx].votes += 1
            } else if (voteType === "downvote") {
                athletes[athIdx].votes -= 1
            }

            res.send({
                message: "Vote count updated",
                allAthletes: athletes
            })
        }
}

export default handlerFunctions