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

  const [nfts, setNfts] = useState(true);
  const [products, setProducts] = useState(false);

  const nftTable = () => {
    setNfts(true);
    setProducts(false)
  }

  const productsTable = () => {
    setNfts(false);
    setProducts(true)
  }

  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Discover", "Dive in", "Invest in"],
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
  }, []);

  // get data from api

  const [data, setData] = useState("");

  useEffect(() => {
    axios.get("https://api.earlylink.io/votes")
      .then(res => {
        setData(res.data);
      })

  }, [])


  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img className={styles.earlyLinkLogo} src="/logo.png"/>
          <p>EarlyLink</p>
          <a href="https://twitter.com/earlylinksol" target="_blank" rel="noreferrer"><img src="/twitter.svg"/></a>
          <a href="https://discord.gg/HZFPkX3r8j" target="_blank" rel="noreferrer"><img src="/discord.svg"/></a>
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
            <abbr title="Coming Soon"><p>Ethereum</p></abbr>
          </div>

          <Link href="/">About Us</Link>
          <Link href="/">Our Discord Bot</Link>
          <Link href="/dao-list">DAOs list</Link>
          <div className={styles.shareLink}>
            <Link href="/share-link">Share your link</Link>
          </div>
        
        </div>
        
        <div className={styles.hamburger} onClick={handleMenu}>
          <div className={styles.hamburgerLine}></div>
          <div className={styles.hamburgerLine}></div>
          <div className={styles.hamburgerLine}></div>
        </div>
      </div>

      <div className={styles.hero}>
        <h1><span ref={el}></span>upcoming projects built on the <span>Solana Network</span></h1>
      </div>

      <div>
        <div className={styles.topPart}>
          <button className={styles.changeTable} onClick={nftTable}>NFTs Projects</button>
          <button className={styles.changeTable} onClick={productsTable}>Products</button>
        </div>

        <div className={styles.table + " " + "nftsTable"} style={nfts ? {display: "block"} : {display: "none"}}>
          <div className={styles.tableHeader}>
              <div>No.</div>
              <div>Name</div>
              <div style={{marginLeft: "13px"}}>Status</div>
              <div>Twitter</div>
              <div>Discord</div>
              <div>DAO Votes</div>
          </div>

          {
            data ? 
              data.map((d, index) => (
                <>
                  <div className={styles.row} key={d.id}>
                    <div><span className={styles.mobileInfo}>No.:</span>{index+1}</div>
                    <div className={styles.name}>
                      <span className={styles.mobileInfo}>Name:</span>
                      <img src={`${d.projectImageUrl}`}/>
                      <p>{d.projectName}</p>
                    </div>
                    <div className={styles.launched}><span className={styles.mobileInfo}>Status:</span>Launched</div>
                    <div className={styles.twitterNumbers}>
                      <span className={styles.mobileInfo}>Twitter:</span>
                      <p>3k</p>
                      <a href="#"><img src="/twitter.svg"/></a>
                    </div>
                    <div className={styles.discordNumbers}>
                      <span className={styles.mobileInfo}>Discord:</span>
                      <p>5k</p>
                      <a href="#"><img src="/discord.svg"/></a>
                    </div>
                    <div className={styles.daoVotes}>
                      <span className={styles.mobileInfo}>DAO Votes:</span>
                      <p>{d.projectValue}</p>
                      <svg className={styles.up} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_5_54)">
                        <path d="M12 4.5L13.7175 6.2175L10.0575 9.8775L7.0575 6.8775L1.5 12.4425L2.5575 13.5L7.0575 9L10.0575 12L14.7825 7.2825L16.5 9V4.5H12Z" fill="#00DC3E"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_5_54">
                        <rect width="18" height="18" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div className={styles.line} key={index}></div>
                </>
                )
              )

            : <p style={{marginTop: "15px"}}>Loading projects...</p>
          }
        </div>

        <div className={styles.table + " " + "productsTable"} style={products ? {display: "block"} : {display: "none"}}>
          <div className={styles.tableHeader}>
              <div>No.</div>
              <div>Product Name</div>
              <div style={{marginLeft: "13px"}}>Status</div>
              <div>Twitter</div>
              <div>Discord</div>
              <div>DAO Votes</div>
          </div>

          {
            data ? 
              data.map((d, index) => (
                <>
                  <div className={styles.row} key={d.id}>
                    <div><span className={styles.mobileInfo}>No.:</span>{index+1}</div>
                    <div className={styles.name}>
                      <span className={styles.mobileInfo}>Product Name:</span>
                      <img src={`${d.projectImageUrl}`}/>
                      <p>{d.projectName}</p>
                    </div>
                    <div className={styles.launched}><span className={styles.mobileInfo}>Status:</span>Launched</div>
                    <div className={styles.twitterNumbers}>
                      <span className={styles.mobileInfo}>Twitter:</span>
                      <p>3k</p>
                      <a href="#"><img src="/twitter.svg"/></a>
                    </div>
                    <div className={styles.discordNumbers}>
                      <span className={styles.mobileInfo}>Discord:</span>
                      <p>5k</p>
                      <a href="#"><img src="/discord.svg"/></a>
                    </div>
                    <div className={styles.daoVotes}>
                      <span className={styles.mobileInfo}>DAO Votes:</span>
                      <p>{d.projectValue}</p>
                      <svg className={styles.up} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_5_54)">
                        <path d="M12 4.5L13.7175 6.2175L10.0575 9.8775L7.0575 6.8775L1.5 12.4425L2.5575 13.5L7.0575 9L10.0575 12L14.7825 7.2825L16.5 9V4.5H12Z" fill="#00DC3E"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_5_54">
                        <rect width="18" height="18" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div className={styles.line}></div>
                </>
                )
              )

            : "wait"
          }
        </div>
      </div>

    </div>
  )
}
