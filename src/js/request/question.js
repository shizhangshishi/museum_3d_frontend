export function getQuestions(axios, params, callback){
    axios.post("/getProblem", params)
        .then(res => {
            // 根据后端的返回数据修改
            if (res.data.responseCode === 200){
                callback(res.data.responseBody);
            }
        })
        .catch(error => {
           console.log(error);
        })
}
export function getResults(axios, params, callback){
    axios.post("/getResult", params)
        .then(res => {
            // 根据后端的返回数据修改
            if (res.data.responseCode === 200){
                callback(res.data.responseBody);
            }
        })
        .catch(error => {
            console.log(error);
        })
}
