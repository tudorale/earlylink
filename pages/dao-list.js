import Navbar from "../components/Navbar";
import styles from "../styles/Daolist.module.css";
import {daolist} from "./api/daolist"
import {useEffect, useState} from "react";
import axios from "axios"
function DaoList() {

    const [data, setData] = useState("");

    useEffect(() =>{
        axios.get("https://earlylink-api.vercel.app/api/daos?key=Earlylink99")
        .then(res => {
            setData(res.data)
        })
    }, [])

  return (
    <div className={styles.daolist}>
        <Navbar/>

        <h1>EarlyLink DAOs <span>list</span></h1>

        <div className={styles.daoListTable}>
            <div className={styles.dlTableHeader}>
                <div>Index</div>
                <div>DAO</div>
                <div>Members</div>
            </div>

            {
                data ? 
                    data.map((data,index) => 
                        (
                            <div key={index}>
                                <div className={styles.dao}>
                                    <div>{index}</div>
                                    <div>{data.name}</div>
                                    <div>{data.members}</div>
                                </div>
                                <div className={styles.daoLine}></div>
                            </div>
                        )
                    )
                : "Loading..."
            }
        </div>
    </div>
  )
}

export default DaoList