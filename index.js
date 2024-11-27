import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://users-5cafc-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database  = getDatabase(app)
const shoppingListInDB = ref(database, "userList")

const inputFieldEl = document.getElementById("username")
const addButtonEl = document.getElementById("listbutton")
const shoppingListEl = document.getElementById("userList")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
  
    push(userListInDB, inputValue)
  
    clearInputFieldEl()
  })

onValue(userListInDB, function(snapshot) {
    
     if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
    
        for (let i =0; i <itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
        
            appendItemToShoppingListEl(currentItem)
        }
    } else {
        userListEl.innerHTML = "No items here...yet"
    }
    
    
})

function clearuserListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemTouserListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.addEventListener("click", function() {
       
        let exactLocationOfItemInDB = ref(database, `userList/${itemID}`)
       
        remove(exactLocationOfItemInDB)
    })
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        
        let exactLocationOfItemInDB = ref(database, `userList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })   
    
    userListEl.append(newEl)
}
