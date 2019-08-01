
const form=document.querySelector('form');
const input=document.querySelector('#txtTaskName');
const btnDeleteAll=document.querySelector('#btnDeleteAll');
const taskList=document.querySelector('#task-list');
const items=['item1','item2','item3'];
eventListener();
loadItem();
function eventListener(){
form.addEventListener('submit',addNewItem); //item ekleme
taskList.addEventListener('click',deleteItem);//item silme
btnDeleteAll.addEventListener('click',deleteAll);//tum itemleri silme
}

function loadItem(){
    items.forEach(function(item){
        createItem(item);
    })
    
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
    e.preventDefault();
    
    input.value=""; //input value sıfırla
    }
}
function deleteItem(e){

    if(e.target.className=='fas fa-times'){
        if(confirm('Tüm verileri silmek istiyormusunuz?'))
        e.target.parentElement.parentElement.remove();
    }
    e.preventDefault() //scroll oynamasın diye
}
function deleteAll(e){

   // taskList.innerHTML=''; direk siler


   if(confirm('Tüm verileri silmek istiyormusunuz?')){

    taskList.childNodes.forEach(function(item){
        if(item.nodeType==1) //yani elements ise çünkü text de çekiyor
        item.remove();
    });
   }


   e.preventDefault();


}


