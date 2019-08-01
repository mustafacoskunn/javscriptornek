
const form=document.querySelector('form');
const input=document.querySelector('#txtTaskName');
const btnDeleteAll=document.querySelector('#btnDeleteAll');
const taskList=document.querySelector('#task-list');
let items;
eventListener();
loadItem();


function eventListener(){
form.addEventListener('submit',addNewItem); //item ekleme
taskList.addEventListener('click',deleteItem);//item silme
btnDeleteAll.addEventListener('click',deleteAll);//tum itemleri silme
}

function loadItem(){
    items=getItemsFromLS(); //LOCAL STROGE
    items.forEach(function(item){
        createItem(item);
    })
    
}
//getItemfromLocalStroge
function getItemsFromLS(){
    if(localStorage.getItem("items")==null){
        items=[];
    }
    else {
        items=JSON.parse(localStorage.getItem("items"));
    }
    return items;


}
function setItemLS(text){
    items=getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));//String bir ifade olsun diye json.stringify kullanıyoruz
}
function createItem(text){
    const li=document.createElement("li");
    li.className='list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));
    const a=document.createElement('a');
    a.className='delete-item float-right';
    a.setAttribute('href','#');
    a.innerHTML='<i class="fas fa-times"></i>';

    li.appendChild(a); //li ye chield ekle a yı
    taskList.appendChild(li);

    

}

function addNewItem(e){
    if(input.value.length==0) alert("Boş Bırakılamaz");
    else if(input.value.length>0){
    createItem(input.value);
    setItemLS(input.value); //LOCAL STROGE YE EKLİYORUZ
   
    
    input.value=""; //input value sıfırla
    }
    e.preventDefault();
}
function deleteItem(e){

    if(e.target.className=='fas fa-times'){
        if(confirm('Tüm verileri silmek istiyormusunuz?'))
        e.target.parentElement.parentElement.remove();
        console.log(e.target.parentElement.parentElement.textContent); // elementdeki texti alıyor
        deleteItemLS(e.target.parentElement.parentElement.textContent);
    }
    e.preventDefault() //scroll oynamasın diye
}
function deleteAll(e){
    

   // taskList.innerHTML=''; direk siler


   if(confirm('Tüm verileri silmek istiyormusunuz?')){

  
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }//sıra sıra gezip hepsini sil
    localStorage.clear();// lsden sil

    
   }


   e.preventDefault();


}
function deleteItemLS(text){
    items=getItemsFromLS();
    items.forEach(function(item,index){
        if(item==text){ //text ile item aynısı ise Local Strogeden o elamanı sil
            items.splice(index,1);
        }
    });
    localStorage.setItem('items',JSON.stringify(items));


    
}


