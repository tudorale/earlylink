import Navbar from "../components/Navbar";
import styles from "../styles/Daolist.module.css";
import {daolist} from "./api/daolist"

function DaoList() {
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
                daolist.map((data,index) => 
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
            }
        </div>
    </div>
  )
}

export default DaoList