import {inf as outInf} from './info.js';
import {getArray as getArray} from './request';
 
export function searchBox()
{
    const doc = document;   
    let parent = doc.getElementById('l');
    //фома
    let form = doc.createElement('form');
    let txtBox =  doc.createElement('input');
    txtBox.type ="text";
    txtBox.id = "key";

    let button =  doc.createElement('input');
    button.type ="button";
    button.name = "button";
    button.value = "Искать";
    button.addEventListener('click', filter, true);

    form.appendChild(txtBox);
    form.appendChild(button);
    parent.appendChild(form);

}

export function output( arr)
{
    const doc = document;
    let divL = doc.getElementById('l');
    let divCild = doc.createElement('div');
    divCild.id = 'divList';
    divL.appendChild(divCild);

    let parent = doc.getElementById('divList');
        
        let i; 
    for(i = 0; i < arr.length; i++) {
       
        //ссылка
        let child = doc.createElement('a');
        child.href="#";
        child.id = arr[i].id;
        child.addEventListener('click', outInf, true);
      //  child.addEventListener('click', outInf(arr[i]), true);
        child.innerText = arr[i].name;
        parent.appendChild(child);
       
        //перенос
        let br = doc.createElement('br');
        parent.appendChild(br);

    }
}
 function filter()
{   
    let arr = getArray();
    let keyBox = document.getElementById('key').value ;
    let key = new RegExp(keyBox,'i');
    let result = []; 
    let i;
if(keyBox.search(/:/) != -1)
{
// Фильтр по полю
keyBox = keyBox.replace(/\s+/g, '');
let flag = false;
let mass = keyBox.split(':');
let reg = new RegExp(mass[1],'i');
if(mass[0] === 'id'|| mass[0] === 'name'  || mass[0] === 'email' || mass[0] === 'phone' )
{
    for(i=0; i < arr.length; i++)
    {
        if(mass[0] === 'id' && arr[i].id === mass[1])
         {
            result.push(arr[i]);
            break;
         }

        else if(mass[0] === 'name' && arr[i].name.search(reg) != -1)
         {
            result.push(arr[i]);
            continue;
         }
        else if(mass[0] === 'email' && arr[i].email.search(reg) != -1)
         {
            result.push(arr[i]);            
            continue;
         }
        else if(mass[0] === 'phone' && arr[i].phone.search(reg) != -1)
         {
            result.push(arr[i]);
            continue;
         }
        
    } 
 } else  document.getElementById('key').value = "Неверное значение";
}

else // Фильтр по имени
for(i=0; i < arr.length; i++)
{
    if(arr[i].name.search(key) != -1)
     {
        result.push(arr[i]);
     }
} 

   // удаляем все ссылки
    let element = document.getElementById('divList');
    element.parentNode.removeChild(element);

  output(result);
  
}