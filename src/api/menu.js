import axios from "./axios"
import {
    ERR_OK
} from "./config"

//  获取菜单数据的API
export async function getMenuData() {
    let ret = await axios.get('/getMenuData').then(res => {
        if (res.status === 200 && res.data.code === ERR_OK) {
            return Promise.resolve(res.data.data)
        }
    })
    return (ret.length) ? ret : []
}