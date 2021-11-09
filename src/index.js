document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(function(data) {
        renderData(data)
    }) //end of second .then

    function renderData(dogs) {
        dogs.forEach(renderSingleData)
    }

    function renderSingleData(singleDog){
        //console.log(singleDog) pulls the nested object and lists them all out
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        let td4 = document.createElement('td')
        let editBtn = document.createElement('button')
        
        td1.innerText = `Dog ${singleDog.name}`
        td2.innerText = `${singleDog.breed}`
        td3.innerText = `${singleDog.sex}`
        editBtn.innerText = "Edit Dog"
        td4.append(editBtn)

        tr.append(td1, td2, td3, td4)
        document.querySelector('#table-body').append(tr)
        
        editBtn.addEventListener('click', (e) => {
            editDog(e, singleDog.name, singleDog.breed, singleDog.sex, singleDog.id)
        })
    }

    //populates the form when clicked
    function editDog(event, currentName, currentBreed, currentSex, id){
        //console.log(event.target, name, breed, sex)
        document.querySelector('#dog-form').children[0].value = currentName
        document.querySelector('#dog-form').children[1].value = currentBreed
        document.querySelector('#dog-form').children[2].value = currentSex

        let submitBtn = document.querySelector('#dog-form').children[3]
        submitBtn.addEventListener('click', (e) =>{
            //e.preventDefault()
            handlePatch(id)
        })
    }

    function handlePatch(id) {
        let revisedName = document.querySelector('#dog-form').children[0].value
        let revisedBreed = document.querySelector('#dog-form').children[1].value
        let revisedSex = document.querySelector('#dog-form').children[2].value

        //console.log(revisedName, revisedBreed, revisedSex)

        fetch(`http://localhost:3000/dogs/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name: revisedName,
                breed: revisedBreed,
                sex: revisedSex
            })
        })
        .then(resp => resp.json())
        .then(function() {
            reRender()
        })


    }
    
    function reRender() {
        fetch("http://localhost:3000/dogs")
        .then(resp => resp.json())
        .then(function(data) {
            renderData(data)
        })
    }


}) //end of DOMContentLoaded