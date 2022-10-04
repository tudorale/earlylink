import styles from '../styles/Home.module.css'
import Link from "next/link"
import {useState, useEffect, useRef} from "react";
import Typed from "typed.js";
import axios from "axios"

export default function Home() {


  let status = false;
  const handleMenu = () => {
    status = !status;

    let menu = document.querySelector(".menu");

    if(status){
      menu.style.left = "0px";
    }else{
      menu.style.left = "-300px";
    }

  }

  let changedChain = false;

  const changeChain = () => {
    changedChain = !changedChain;
    let eth = document.querySelector(".eth")
    if(changedChain){
      eth.style.display = "flex";
    }else{
      eth.style.display = "none";
    }
  }


  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Network", "Blockchain",],
      startDelay: 300,
      typeSpeed: 180,
      backSpeed: 50,
      backDelay: 100,
      smartBackspace: true,
      loop: true,
      showCursor: true,
      cursorChar: " "
    });

    return () => {
      typed.destroy();
    };
  }, [el]);

  // get data from api

  const [botUsers, setBotUsers] = useState("0");
  const [discordServers, setDiscordServers] = useState("0");

  const [data, setData] = useState("");

  const [rankingTrigger, setRankingTrigger] = useState(false);
  const [recentTrigger, setRecentTrigger] = useState(false);
  const [launchedTrigger, setLaunchedTrigger] = useState(false);
  const [newData, setNewData] = useState();

  const fetchData = () => {
    if(rankingTrigger == false && recentTrigger == false && launchedTrigger == false){
      axios.get("https://api.earlylink.io/votes")
      .then(res => {
        setData(res.data);
        console.log(res.data)
      })

    }else{
      setData(newData)
    }
    axios.get("https://api.earlylink.io/stats")
    .then(res => {
        setBotUsers(res.data.userCount);
        setDiscordServers(res.data.serverCount);
    })
  }

  useEffect(() => {
    fetchData();
  }, [rankingTrigger, recentTrigger])

  const [popUpName, setPopUpName] = useState("");
  const [popUpDescription, setPopUpDescription] = useState("");
  const [popUpTwitter, setPopUpTwitter] = useState("");
  const [popUpImage, setPopUpImage] = useState("");
  const [popUpVotes, setPopUpVotes] = useState("");
  const [popUpDiscord, setPopUpDiscord] = useState("");
  const [popUpWebsite, setPopUpWebsite] = useState("");

  const PopUpProject = (name, description, twitter, image, votes, discord, website) => {
    let popUp = document.querySelector(".popUp");
    popUp.style.display = "block";

    let addon = document.querySelector(".addon");
    addon.style.display = "block"; 

    setPopUpName(name);
    setPopUpDescription(description);
    setPopUpTwitter(twitter)
    setPopUpImage(image);
    setPopUpVotes(votes);
    setPopUpDiscord(discord);
    setPopUpWebsite(website);
  }

  const closePopUp = () => {
    let popUp = document.querySelector(".popUp");
    popUp.style.display = "none";

    let addon = document.querySelector(".addon");
    addon.style.display = "none"; 
  }

  const [launchedStatus, setLaunchedStatus] = useState(false);


  const recentProjects = () => {
    let recentBtn = document.querySelector(".recentButton");
    let rankingBtn = document.querySelector(".rankingButton");
    let launchedBtn = document.querySelector(".launchedButton");
    launchedBtn.style.background = "transparent";
    recentBtn.style.background = "#8900F4";
    rankingBtn.style.background = "transparent";

    const time = Date.now();

    let newArr = data
    .sort((a, b) => {

      const aTime = new Date(a._doc.createdAt).getTime();
      const bTime = new Date(b._doc.createdAt).getTime();

      const aDelta = Math.abs(time - aTime);
      const bDelta = Math.abs(time - bTime);

      return (aDelta - bDelta);
    });

    setRecentTrigger(true);
    setRankingTrigger(false);
    setNewData(newArr);
    setLaunchedTrigger(false);
    setLaunchedStatus(true)
  }

  const rankingFunctionality = () => {
    let recentBtn = document.querySelector(".recentButton");
    let rankingBtn = document.querySelector(".rankingButton");
    let launchedBtn = document.querySelector(".launchedButton");
    launchedBtn.style.background = "transparent";
    recentBtn.style.background = "transparent";
    rankingBtn.style.background = "#8900F4";

    let newD = data.sort((a,b) => {
      return b._doc.upvotes - a._doc.upvotes;
      }
    );

    setRankingTrigger(true);
    setRecentTrigger(false);
    setNewData(newD)
    setLaunchedTrigger(false);
  }

  const launchedFunctionality = () => {
    setLaunchedStatus((prevState) => !prevState);
    if(launchedStatus){
      let recentBtn = document.querySelector(".recentButton");
      let rankingBtn = document.querySelector(".rankingButton");
      let launchedBtn = document.querySelector(".launchedButton");
      recentBtn.style.background = "transparent";
      rankingBtn.style.background = "transparent";
      launchedBtn.style.background = "#8900F4"

      let newD = data.filter((data) => {
        return data._doc.launched == true;
        }
      );

      setRankingTrigger(false);
      setRecentTrigger(false);
      setLaunchedTrigger(true)
      setNewData(newD)
    }else{
      let launchedBtn = document.querySelector(".launchedButton");
      launchedBtn.style.background = "transparent";

      setRankingTrigger(false);
      setRecentTrigger(false);
      setLaunchedTrigger(false)

      axios.get("https://api.earlylink.io/votes")
      .then(res => {
        setData(res.data);
      })
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.backgroundAddon + " " + "addon"} onClick={() => closePopUp()}></div>

        <div className={styles.popUp + " " + "popUp"}>
          <svg clipRule="evenodd" onClick={() => closePopUp()} className={styles.closePopUp} fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" fillRule="nonzero"/></svg>
          <div className={styles.projectName}>
            <p>{popUpName}</p>
            <div className={styles.popUpIcons}>
              <a href={`${popUpTwitter}`} target="_blank" rel="noreferrer"><img src="/twitter.svg" style={{width: "65px", height: "65px"}}/></a>
              <a href={`${popUpWebsite}`} target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg"  width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <circle cx="12" cy="12" r="9" />
                              <line x1="3.6" y1="9" x2="20.4" y2="9" />
                              <line x1="3.6" y1="15" x2="20.4" y2="15" />
                              <path d="M11.5 3a17 17 0 0 0 0 18" />
                              <path d="M12.5 3a17 17 0 0 1 0 18" />
                            </svg>
              </a>
              <a href={`${popUpDiscord}`} target="_blank" rel="noreferrer"><img src="/discord.svg"/></a>
            </div>

          </div>
          <img className={styles.projectImage} src={`${popUpImage}`}/>          <p className={styles.projectDescription}>{popUpDescription}</p>
          <p className={styles.projectVotes}><span>DAO Votes: </span> {popUpVotes}</p>
        </div>

        <div className={styles.navbar}>
          <div className={styles.logo}>
            <Link href="/">
              <div className={styles.earlyLinkLogo}>
                <img src="/logo.png"/>
              </div>
            </Link>
          </div>

          <div className={styles.rightSide + " " + "menu"}>

            <svg  className={styles.closeMenu + " " + "closeMenu"} onClick={handleMenu} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>

            <div className={styles.changeChain} onClick={changeChain}>
                <img src="/solana.png"/>
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_5_160)">
                  <path d="M6 7.42859L9.33333 10.9207L12.6667 7.42859H6Z" fill="#8178A8"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_5_160">
                  <rect width="16" height="16.7619" fill="white" transform="translate(0 0.0952454)"/>
                  </clipPath>
                  </defs>
                </svg>
            </div>

            <div className={styles.ethereumChain + " " + "eth"}>
              <img src="/eth.png"/>
              <p>Ethereum</p>
              <p className={styles.ethStatus}>(coming soon)</p>
            </div>

            <Link href="/about">About</Link>
            <Link href="/install-bot">Discord Bot</Link>
            <Link href="/dao-list">DAOs</Link>

            <div className={styles.navIconsWrapper}>
              <a href="https://twitter.com/earlylinksol" target="_blank" rel="noreferrer"><img src="/twitter.svg"/></a>
              <a href="https://discord.gg/HZFPkX3r8j" target="_blank" rel="noreferrer"><img src="/discord.svg"/></a>
            </div>
          
          </div>
          
          <div className={styles.hamburger} onClick={handleMenu}>
            <div className={styles.hamburgerLine}></div>
            <div className={styles.hamburgerLine}></div>
            <div className={styles.hamburgerLine}></div>
          </div>
        </div>

        <div className={styles.hero}>
          <div className={styles.heroTitle}>
            Discover upcoming<br className={styles.break}/> projects<br className={styles.breakDesktop}/>
            launching on the <div style={{display: "inline"}}>Solana</div> <span ref={el}></span>
          </div>
        </div>

        <div>

          <div className={styles.topPart}>
            <button className={styles.changeTable + " " + "recentButton"} onClick={() =>recentProjects()}>Recent</button>
            <button className={styles.changeTable + " " + "rankingButton"} onClick={rankingFunctionality}>Ranking</button>
            <button className={styles.changeTable + " " + "launchedButton"} onClick={launchedFunctionality}>Launched</button>
          </div>

          <div className={styles.table + " " + "nftsTable"} style={{marginTop: "70px"}}>
            <div className={styles.tableHeader}>
                <div>No.</div>
                <div>Name</div>
                <div>Launched</div>
                <div style={{marginLeft: "7px"}}>Website</div>
                <div>Twitter</div>
                <div>Discord</div>
                <div>DAO Votes</div>
            </div>
 
            {
              data ? 
                data.map((d, index) => (
                  <div key={d._doc.id}>
                    <div className={styles.row} onClick={() => PopUpProject(d._doc.projectName, d._doc.projectDescription, d._doc.projectTwitterUrl, d._doc.projectImageUrl, d._doc.upvotes, d._doc.projectDiscordUrl, d._doc.projectWebsiteUrl)} >
                      <div><span className={styles.mobileInfo}>No.:&nbsp;</span>{index+1}</div>
                      <div className={styles.name}>
                        <span className={styles.mobileInfo}>Name:&nbsp;</span>
                        <img src={`${d._doc.projectLogoUrl}`}/>
                        <p>{d._doc.projectName}</p>
                      </div>
                      <div className={styles.launched}>
                      <span className={styles.mobileInfo}>Launched:&nbsp;</span>
                        {d._doc.launched ? 
                          <p className={styles.launched}>Launched</p>
                          :
                          <p className={styles.upcoming}>Upcoming</p>
                        }
                      </div>
                      <div className={styles.website}>
                        <span className={styles.mobileInfo}>Website:&nbsp;</span>
                          <a href={`${d._doc.projectWebsiteUrl}`} target="_blank" rel="noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <circle cx="12" cy="12" r="9" />
                            <line x1="3.6" y1="9" x2="20.4" y2="9" />
                            <line x1="3.6" y1="15" x2="20.4" y2="15" />
                            <path d="M11.5 3a17 17 0 0 0 0 18" />
                            <path d="M12.5 3a17 17 0 0 1 0 18" />
                          </svg>
                          </a>
                        </div>
                      <div className={styles.twitterNumbers}>
                        <span className={styles.mobileInfo}>Twitter:&nbsp;</span>
                        <a href={`${d._doc.projectTwitterUrl}`} target="_blank" rel="noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                        </a>
                      </div>
                      <div className={styles.discordNumbers}>
                        <span className={styles.mobileInfo}>Discord:&nbsp;</span>
                        <a href={`${d._doc.projectDiscordUrl}`} target="_blank" rel="noreferrer"><img src="/discord.svg"/></a>
                      </div>
                      <div className={styles.daoVotes}>
                        <span className={styles.mobileInfo}>DAO Votes:&nbsp;</span>
                        <p>{d._doc.upvotes}</p>
                        {d._doc.upvotes >= d._doc.downvotes ? <svg className={styles.up} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_5_54)">
                          <path d="M12 4.5L13.7175 6.2175L10.0575 9.8775L7.0575 6.8775L1.5 12.4425L2.5575 13.5L7.0575 9L10.0575 12L14.7825 7.2825L16.5 9V4.5H12Z" fill="#00DC3E"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_5_54">
                          <rect width="18" height="18" fill="white"/>
                          </clipPath>
                          </defs>
                        </svg> : 
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_5_109)">
                          <path d="M12.6667 14.25L14.4796 12.4371L10.6162 8.57375L7.44958 11.7404L1.58333 5.86625L2.69958 4.75L7.44958 9.5L10.6162 6.33333L15.6037 11.3129L17.4167 9.5V14.25H12.6667Z" fill="#DC0000"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_5_109">
                          <rect width="19" height="19" fill="white"/>
                          </clipPath>
                          </defs>
                        </svg>
                          
                        }
                      </div>
                    </div>
                    <div className={styles.line} key={index}></div>
                  </div>
                  )
                )

              : <p style={{marginTop: "15px"}}>Loading projects...</p>
            }
          </div>
        </div>

        
        <div className={styles.banner}>
            <div className={styles.bannerWrapper}>
              <div>
                <p>Discord Servers</p>
                <p>+{discordServers}</p>
              </div>
              <div>
                <p>Users</p>
                <p>+{botUsers}</p>
              </div>
            </div>
        </div>

      </div>
    </>
  )
}
