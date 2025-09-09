let categoryData = ()=>{
    let url = `https://openapi.programming-hero.com/api/categories`
    fetch(url)
    .then(res => res.json())
    .then(Data => categoryDisplay(Data.categories))
}


let categoryDisplay = (category)=>{
    
    let categoryConatainer = document.getElementById("categorys")
   category.map(singleCategory =>{
    
       
    
    let divContainer = document.createElement('div')
    divContainer.classList.add("pt-2")
    divContainer.innerHTML  =`
    
    <button onclick ="singleCard('${singleCategory.id}')"  class="text-xl   w-full text-left  py-1   pl-2 rounded-md font-normal">${singleCategory.category_name}</button>
   
    `
    categoryConatainer.appendChild(divContainer)

  divContainer.addEventListener('click', function(e){
    let allBtn= document.querySelectorAll('button')
    
    for(let btn of allBtn){
        btn.classList.remove('bg-[#15803D]', 'text-white')
    }
   if(e.target.localName === 'button'){
    
    e.target.classList.add('bg-[#15803D]', 'text-white')
   }
  })

   })
}


let All_Trees = ()=>{
  
  let all_tree_url = `https://openapi.programming-hero.com/api/plants`  
  fetch(all_tree_url)
  .then(res => res.json())
  .then(data =>all_trees_display(data.plants))

}
 

let all_trees_display = (allTreeDisplay)=>{
    let allCard = document.getElementById("all_card_container")
    
    allCard.innerHTML = ''
    console.log(allCard.innerText)
    allTreeDisplay.map(trees =>{
      
        
        let div_container = document.createElement('div')
        
        div_container.innerHTML = `
        
        <div  class="card bg-base-100  shadow-sm p-4 mx-4 mt-3 md:mx-0 mt-0 ">
  <figure class="">
    <img class="rounded-lg w-full h-52 object-cover"
      src="${trees.image}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 onclick="categoryFruit('${trees.category}', '${trees.price}','${trees.description}', '${trees.image}','${trees.name}')" class="card-title">
      
      Mango Tree
    </h2>
    <p>${trees.description.slice(1,85)}</p>
    <div class="flex justify-between items-center">
      <div  class="px-4 py-1 bg-[#DCFCE7] text-[#15803D] text-base rounded-3xl">${trees.category}</div>
      <div class="text-xl font-medium">৳<span>${trees.price}</span></div>
    </div>
    <div class="pt-2"><button onclick="getCart('${encodeURIComponent(JSON.stringify(trees))}')" class="w-full bg-[#15803D] py-2  text-white text-xl rounded-3xl">Add to cart</button></div>
  </div>
             </div>
        
        
        `
        allCard.appendChild(div_container)
        
    })
}


let singleCard = (id)=>{
      
    let url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => Card(data.plants))
}
let Card = (card)=>{
    
    let appendDiv = document.getElementById("all_card_container")
    appendDiv.innerHTML = ''
 for(let cards of card){
    
     let createDiv = document.createElement('div')
     createDiv.innerHTML = `
     <div class="card bg-base-100  shadow-sm p-4">
  <figure class="">
    <img class="rounded-lg w-full h-52 object-cover"
      src="${cards.image}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 onclick="categoryFruit('${cards.category}', '${cards.price}','${cards.description}', '${cards.image}','${cards.name}')" class="card-title">
      
      ${cards.name}
    </h2>
    <p>${cards.description.slice(1,85)}</p>
    <div class="flex justify-between items-center">
      
      <div  class="px-4 py-1 bg-[#DCFCE7] text-[#15803D] text-base rounded-3xl">

      ${cards.category}
      
      </div>
      <div class="text-xl font-medium">৳<span>${cards.price}</span></div>
    </div>
    <div  class="pt-2"><button onclick="getCart('${encodeURIComponent(JSON.stringify(cards))}')"" class="w-full bg-[#15803D] py-2  text-white text-xl rounded-3xl add-to-cart">Add to cart</button></div>
  </div>
             </div>
        
     
     `
     appendDiv.appendChild(createDiv)
 }
}

// fruit click show modal

let categoryFruit = (fruits,price,description,img,name)=>{

    
    let head = document.getElementById("head")
    head.innerText = name

    let img_des = document.getElementById("img_des")
    img_des.src = `${img}`

    let modal_category = document.getElementById("modal_category")
    modal_category.innerText = fruits

    let modal_price = document.getElementById("modal_price")
    modal_price.innerText = price

    let modal_describe = document.getElementById('modal_describe')
    modal_describe.innerText = description


    
    let modals = document.getElementById("modal")
    let makeDiv = document.createElement("div")
   makeDiv.innerHTML  =
   `
   <button class="btn hidden" onclick="my_modal_5.showModal()"></button>
  



   `
   modals.appendChild(makeDiv)
   document.getElementById("my_modal_5").showModal()
}

// your cart

function getCart(e) {
  
  const item = JSON.parse(decodeURIComponent(e));
  
 
  
  let cartDiv = document.getElementById('youCart')
  let createDiv = document.createElement("div")
  createDiv.classList.add('flex','items-center', 'justify-between','px-5','py-2','mx-2','bg-green-100','rounded-xl')
  createDiv.innerHTML =`
  
  <div class='font-medium'>
<h3>${item.name} </h3>
<h3>${item.price} </h3>
  
  </div>
  <div class="cross">❌</div>
  
  
  
  
  `
  cartDiv.appendChild(createDiv)
  let totalPrice = document.getElementById("totalPrice").innerText
  let totalPriceConvert = parseInt(totalPrice)

  let price = item.price
 
  
  let plus = totalPriceConvert + price

document.getElementById("totalPrice").innerText = plus

let cros = document.querySelectorAll(".cross")

for(let btn of cros){
  let number = btn.parentNode.childNodes[1].childNodes[3].innerText
  let numbers = parseInt(number)
  btn.addEventListener('click', function(){
    console.log(btn, 'mil geya')
    btn.parentNode.remove()
    // let minus = plus - numbers
    // console.log(minus)
let minus = document.getElementById("totalPrice").innerText
let convert = parseInt(minus)
let minuss = convert - numbers
document.getElementById("totalPrice").innerText = minuss
      
  })
}



}

categoryData()
All_Trees()


