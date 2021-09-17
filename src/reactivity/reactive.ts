
import {track} from './effect'
export function reactive(row){
    return new Proxy(row,{
        get(target,key){
            const res = Reflect.get(target,key)
            track(target,key)
            return res
        },
        set(target,key,value){
            const res = Reflect.set(target,key,value)
            return res
        }
    })
}