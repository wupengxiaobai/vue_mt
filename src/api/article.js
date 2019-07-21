import axios from "./axios"
import {
    ERR_OK
} from "./config"

//  获取文章类别选项
export async function getArticleTypeData() {
    let ret = await axios.get('/getArticleTypeData').then(res => {
        if (res.status === 200 && res.data.code === ERR_OK) {
            return Promise.resolve(res.data.data)
        }
    })
    return (ret.length) ? ret : []
}

//  添加文章数据上传
export async function postArticleData(params) {
    let ret = await axios.post('/postArticleData', params).then(res => {
        if (res.status === 200 && res.data.code === ERR_OK) {
            return Promise.resolve(res.data.data)
        }
    })
    return ret
}

//  获取文章
export async function getArticleData(params) {
    let ret = await axios.get('/getArticleData', {
        params: params
    }).then(res => {
        if (res.status === 200 && res.data.code === ERR_OK) {
            return Promise.resolve(res.data.data)
        }
        return Promise.resolve([])
    })
    return ret
}

export async function deleteArticleData(params) {
    let ret = await axios.get('/deleteArticleData', {
        params: params
    }).then(res => {
        if (res.status === 200 && res.data.code === ERR_OK) {
            return Promise.resolve(res.data.data)
        }
        return Promise.resolve([])
    })
    return ret
}

export async function postEditArticleData(params) {
    let ret = await axios.post('/postEditArticleData', params).then(res => {
        if (res.status === 200 && res.data.code === ERR_OK) {
            return Promise.resolve(res.data)
        }
        return Promise.resolve([])
    })
    return ret
}