const { default: axios } = require("axios");

const duplicationCheckAPI = async(email, nickName) => {
    let return_value;
    await axios.post("http://localhost:3000/login", {
        email: email,
        nickName: nickName,
    })
    .then((response) => {
        return_value = response.data;
    })
    .catch(function (error) {
        console.log(error);
        return_value = true;
    });
    return return_value
};

export default duplicationCheckAPI;

// response가 존재하면, return value = response
// response가 존재하지 않으면, return value = true 
// 기본값 = false