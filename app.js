let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let kittenName = form.name.value

  let currentKitten = kittens.find(kitten => kitten.name == kittenName)
  if (currentKitten){
    window.alert(`Cannot add kitten. A kitten named ${kittenName} already exists.`)
  }
  else{
    let newKitten = {
      id: generateId(),
      name: kittenName,
      mood: '',
      affection: 5
    }
    setKittenMood(newKitten)
    kittens.push(newKitten)

    saveKittens()
  }

  form.reset()
  drawKittens()

}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))

  if (kittensData) {
      kittens = kittensData
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let template = ""

  kittens.forEach(kitten => {
    template += `
    <div class="card mt-1 mb-1">
      <h4 class="mt-1 mb-1 display-label">${kitten.name}</h4>
      <div class="kitten ${kitten.mood}">
        <img src="moody-kitten.png" alt="">
      </div>
      <div class="d-flex space-between">
        <p class="display-label">
          <span>Mood: ${kitten.mood}</span><br />
          <span>Affection: ${kitten.affection}</span>
        </p>
      </div>
      <div class="d-flex space-between">
        <p>
          <button class="btn-dark" onclick="pet('${kitten.id}')">Pet</button>
          <button class="btn-dark" onclick="catnip('${kitten.id}')">Catnip</button>
        
          <button class="btn-dark" onclick="slap('${kitten.id}')">Slap</button>
          <button class="btn-dark" onclick="groom('${kitten.id}')">Groom</button>
          
          <i class="action fa fa-trash text-danger" onclick="removeKitten('${kitten.id}')"></i>
        </p>
      </div>
    </div>
    `
})

document.getElementById("kittens").innerHTML = template
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(kitten => kitten.id == id)
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let kitten = findKittenById(id)
  console.log(kitten)
  if (Math.random() > .5){
    kitten.affection += 1
  }
  else{
    kitten.affection -= 1
  }
  setKittenMood(kitten)
  saveKittens()
  drawKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id)
  kitten.mood = 'tolerant'
  kitten.affection = 5

  saveKittens()
  drawKittens()
}

/**
 * Decrease affection by 1
 * @param {string} id
 */
function slap(id) {
  let kitten = findKittenById(id)
  kitten.affection -= 1
  setKittenMood(kitten)

  saveKittens()
  drawKittens()
}

/**
 * Increase affection by 1
 * @param {string} id
 */
function groom(id) {
  let kitten = findKittenById(id)
  kitten.affection += 1
  setKittenMood(kitten)

  saveKittens()
  drawKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  let affection = kitten.affection
  if (affection < 3){
    kitten.mood = 'gone'
  }
  else if(affection < 5){
    kitten.mood = 'angry'
  }
  else if(affection < 7){
    kitten.mood = 'tolerant'
  }
  else{
    kitten.mood = 'happy'
  }

  saveKittens()
  drawKittens()
}

/**
 * Removes single kitten from the array
 * @param {string} id
 */
function removeKitten(id){
  let index = kittens.findIndex(kitten => kitten.id === id)
  if (index == -1) {
    throw new Error("Invalid Kitten Id")
  }
  kittens.splice(index, 1)
  saveKittens()
  drawKittens()
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens = []
  saveKittens()
  drawKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("kittens")?.classList.remove("hidden")
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
