import React from 'react'
import styles from "./Navbar.module.css";
import Link from "next/link"

function Navbar() {
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
  
  return (
    <div className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">
              <div className={styles.earlyLinkLogo}>
                <img src="/logo.png"/>
                <p>Earlylink.</p>
              </div>
          </Link>
        </div>

        <div className={styles.rightSide + " " + "menu"}>

          <svg  className={styles.closeMenu + " " + "closeMenu"} onClick={handleMenu} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>

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
  )
}

export default Navbar