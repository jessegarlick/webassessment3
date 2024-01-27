console.log("Hello World")

const athDisplay = document.querySelector("#athDisplay")
const athForm = document.querySelector("form")


const createAthCard = (athObj) => {
const newAthCard = document.createElement("section")

newAthCard.className = "athCard"

newAthCard.innerHTML = `
    <img src=${athObj.picture} />
    <p>${athObj.name}</p>

    <section>
        <button onclick="updateAth(${athObj.id}, 'downvote')">-</button>
        Popularity: ${athObj.votes}
        <button onclick="updateAth(${athObj.id}, 'upvote')">+</button>
    </section>

    <br/>

    <button onclick="deleteAth(${athObj.id})">Delete Me</button>
`;

athDisplay.appendChild(newAthCard);
}

const displayAllAthletes = (athArr) => {
    for (let i = 0; i < athArr.length; i++) {
        createAthCard(athArr[i])
    }
}

const getAllAthletes = () => {
    axios.get("/athletes").then((res) => {
        displayAllAthletes(res.data.allAthletes);
    })
}

const handleSubmit = (evt) => {
    evt.preventDefault();

    let name = document.getElementById("athName");
    let athImg = document.getElementById("athImg");

    let bodyObj = {
        athName: name.value,
        athPic: athImg.value, 
    };

    athDisplay.innerHTML = "";
    name.value = "";
    athImg.value = "";

    axios.post("/addAth", bodyObj).then((res) => {
        displayAllAthletes(res.data.allAthletes);
    })
}

const deleteAth = (id) => {

axios.delete(`/deleteAth/${id}`).then((res) => {
    athDisplay.innerHTML = "";
    displayAllAthletes(res.data.allAthletes)
})
}


const updateAth = (id, type) => {
    let bodyObj = {
        voteType: type,
    }
    axios.put(`/updateAth/${id}`, bodyObj).then((res) => {
        athDisplay.innerHTML = ""
        displayAllAthletes(res.data.allAthletes)
    })
}

athForm.addEventListener('submit', handleSubmit);

getAllAthletes()