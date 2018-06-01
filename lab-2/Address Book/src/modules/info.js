import {getArray as getArray} from './request';

export function inf(/* item */)
{
    
 /*    const doc = document;
    let parent = doc.getElementById('i');
    parent.innerHTML= `
    <img src = ` + item.avatar + ` class = "avatar" />
    <p>`+ item.name +`</p>
    <p>`+ item.email +`</p>
    <p>`+ item.phone +`</p>`; */

 const doc = document;
 const arr = getArray();
 let i;
 for(i=0;i < arr.length; i++)
 {
     if(this.id === arr[i].id)
     {
    let parent = doc.getElementById('i');
    parent.innerHTML= `
    <img src = ` + arr[i].avatar + ` class = "avatar" />
    <p>`+ arr[i].name +`</p>
    <p>`+ arr[i].email +`</p>
    <p>`+ arr[i].phone +`</p>`; 
     }
 }
    
}