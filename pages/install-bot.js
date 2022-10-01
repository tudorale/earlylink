import {useEffect} from "react";

function installbot() {
    useEffect(() =>{
        let a= document.createElement('a');
        a.href="https://discord.com/oauth2/authorize?client_id=994177521614589972&permissions=0&scope=applications.commands%20bot"
        a.click()
    }, [])
}

export default installbot