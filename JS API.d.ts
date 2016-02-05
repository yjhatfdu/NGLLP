/**
 * Created by yjh on 16/1/29.
 */
    ///<reference path='Engine_patch/lib/Promise.d.ts'/>
declare namespace Resource{
    export interface ResourceCtl{
        loadResources(list:Array<any>,progressCallBack?):Promise<any>
    }
}
declare namespace Network{
    export function HTTP(url,method?,config?,postObject?,onprogress?):Promise<any>
    export function GET(url,config?,onprogress?):Promise<any>
    export function POST(url,config?,postObject?,onprogress?):Promise<any>
}