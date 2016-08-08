/**
 * Created by yjh on 16/2/2.
 // */
    ///<reference path='../../Engine/API.d.ts'/>

import {PMDLoader} from 'MMD/PMDLoader';
let model=new PMDLoader();
model.load('model/Miku_Hatsune_Ver2.pmd');
window['test']=model;