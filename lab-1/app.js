///#access_token=513059489.8aae704.a82aca91f55b4dddb850021b9a502eff
(function() {
   "use strict";
var doc = document;

const access_token='513059489.8aae704.a82aca91f55b4dddb850021b9a502eff';
var pathUser = "https://api.instagram.com/v1/users/self/?access_token="+access_token;
var pathContent = "https://api.instagram.com/v1/users/self/media/recent/?access_token="+access_token+"&count=5";


// inf about User
var xmlh = new XMLHttpRequest();
xmlh.open('GET', pathUser, false);
xmlh.send();
var userFull =JSON.parse(xmlh.responseText);

// inf about Content
var xhr = new XMLHttpRequest();
xhr.open('GET', pathContent, false);
xhr.send();
var dataFull =JSON.parse(xhr.responseText);

var max_id = dataFull.pagination.next_max_id;// Глобальная переменная с индексом фото следующим за выборкой

doc.img.src = userFull.data.profile_picture;//Изменяем изображение по умолчанию на аватар пользователя

//Заполняем шапку
var header = doc.getElementById("header");
var headName = userFull.data.username;
var headCount = userFull.data.counts.media;
header.innerHTML = headName +'<br/>Публикаций '+ headCount;


//Загрузка первых 5 фото
var content = doc.getElementById('content');
for (var i = 0; i< 5 ; i++) {
    var intent = doc.createElement('div');
    intent.className = "intent";

    var photo = doc.createElement('div');
    photo.className = "photo";
    var srcPh = dataFull.data[i].images.standard_resolution.url;
    var ph = doc.createElement('img');
        ph.src=srcPh;
        ph.name = "pht";
    photo.appendChild(ph);
    intent.appendChild(photo);
//var date = new Date(1524766958 * 1000);

    var description = doc.createElement('div');
    description.className = "description";
    var descText = dataFull.data[i].caption.text;
    var descLike = dataFull.data[i].likes.count;
    var descComm =  dataFull.data[i].comments.count;
    var crTime = dataFull.data[i].created_time;

   description.innerHTML = descText +"<br/><br/><img name='heart' src='image/heart.png'class ='pict'/> "
       + descLike + "  <img name='heart' src='image/bubble.png' class ='pict'/> " + descComm +  "<br/>" + getCreatedTime(crTime);
    intent.appendChild(description);

     var tags = dataFull.data[i].tags;
     if(tags.length > 0){
         var tagsDiv = doc.createElement('div');
         tagsDiv.className = 'tags';
         var j = 0;
         var str ="";
         while(j < tags.length)
         {
            var tag = "#" + tags[j];
            str = str +" "+ tag;
            j++;
         }
         tagsDiv.innerHTML = str;
         intent.appendChild(tagsDiv);
     }

    content.appendChild(intent);
}
if (!isEmptyObject(dataFull.pagination))
{
    var button = doc.createElement('input');
    button.type = "button";
    button.className = "button";
    button.onclick = loadPhoto;
    button.value = "Загрущить еще";
    content.appendChild(button);
}


//Функция обработчик нажатия на кнопку. Загружает следующие 5 фото
function loadPhoto()
{
    var pathCont = "https://api.instagram.com/v1/users/self/media/recent/?access_token="+access_token+"&max_id="+max_id+"&count=5";
    var xxx = new XMLHttpRequest();
    xxx.open('GET',pathCont,false);
    xxx.send();
    var nextPhotos =JSON.parse(xxx.responseText);
    max_id = nextPhotos.pagination.next_max_id;
    if (nextPhotos.data.length>0)
    {
        var content = doc.getElementById('content');
        button.style.display = "none";
        for (var i = 0; i< 5 ; i++) {
            if (nextPhotos.data[i]) {
                var intent = doc.createElement('div');
                intent.className = 'intent';

                var photo = doc.createElement('div');
                photo.className = "photo";
                var srcPh = nextPhotos.data[i].images.standard_resolution.url;
                var ph = doc.createElement('img');
                ph.src = srcPh;
                ph.name = "pht";
                photo.appendChild(ph);
                intent.appendChild(photo);


                var description = doc.createElement('div');
                description.className = "description";
                var descText = nextPhotos.data[i].caption.text;
                var descLike = nextPhotos.data[i].likes.count;
                var descComm = nextPhotos.data[i].comments.count;
                var crTime = nextPhotos.data[i].created_time;

                description.innerHTML = descText +"<br/><br/><img name='heart' src='image/heart.png'class ='pict'/> "
                    + descLike + "  <img name='heart' src='image/bubble.png' class ='pict'/> " + descComm +  "<br/>" + getCreatedTime(crTime);
                intent.appendChild(description);

                var tags = nextPhotos.data[i].tags;
                if(tags.length > 0){
                    var tagsDiv = doc.createElement('div');
                    tagsDiv.className = 'tags';
                    var j = 0;
                    var str ="";
                    while(j < tags.length)
                    {
                        var tag = "#" + tags[j];
                        str = str +" "+ tag;
                        j++;
                    }
                    tagsDiv.innerHTML = str;
                    intent.appendChild(tagsDiv);
                }

                content.appendChild(intent);


            }
            else break;
        }
        if (!isEmptyObject(nextPhotos.pagination)) {
            button.style.display ="block";
            content.appendChild(button);

        }
}
}
//Функция проверки объекта на пустоту
function isEmptyObject(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}
//Функция преобразует JSON дату в строку формата дд.мм.гггг
function getCreatedTime(crTime) {
    var ret = "";
    var date = new Date(parseInt(crTime,10) * 1000);

    var d = date.getDate();
    if(d<10) ret = ret + "0" + d;
    else ret = ret + d;

    var m = date.getMonth();
    if(m<10) ret = ret + ".0" + m;
    else ret = ret + "." + m;

    var y = date.getFullYear();
    ret = ret + "." + y;
    return ret;

}
}());