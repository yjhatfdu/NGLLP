/**
 * Created by yjh on 2016/12/12.
 */
let pools = {};
export interface IPoll {
    getFromPool()
    returnToPool(item)
    clearPool()
}
class Pool implements IPoll {
    getFromPool() {
        let className = typeof this;
        if (!pools[className]) {
            pools[className] = []
        }
        let pool = pools[className];
        if (pool.length > 0) {
            return pool.pop()
        } else {
            return null
        }
    }

    returnToPool(item){
        let className = typeof this;
        if (!pools[className]) {
            pools[className] = []
        }
        pools[className].push(item)
    }
    clearPool(){
        let className = typeof this;
        if(!pools){

        }
    }
}