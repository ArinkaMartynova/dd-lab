import {output as outList , filter as filter  } from './list';
export function getArray()
{

     const url = './src/users.json';
  
        var xhr = new XMLHttpRequest();
  
        xhr.open('GET',url, false);
        xhr.send();

      
        if (xhr.status != 200) {
          // обработать ошибку
          alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
        } else {
          // вывести результат
          return JSON.parse(xhr.responseText);
        }

      

}