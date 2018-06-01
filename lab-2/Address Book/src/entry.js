import {output as outList, searchBox as searchBox } from './modules/list';
//import {inf as outInf} from './modules/info';
import {getArray as getArray} from './modules/request';
import './scss/main.scss';


const arrList = getArray();

searchBox();// Вывод строки поиска

outList(arrList);// Вывод списка
