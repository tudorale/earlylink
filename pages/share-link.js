import React from 'react'
import Navbar from '../components/Navbar'
import styles from "../styles/Share.module.css";
import {useState} from "react";

function ShareLink() {

    const [projectName, setProjectName] = useState("");
    const [twitter, setTwitter] = useState("");
    const [discord, setDiscord] = useState("");
    const [contact, setContact] = useState("");
    const [description, setDescription] = useState("");


   const handleInput = (id) =>{
    const label = document.querySelector(`${id}`)
    label.style.fontSize = "1rem";
    label.style.top = "12px";
   }

   const handleInputBlur = (id, input) =>{
    const label = document.querySelector(`${id}`);
    const inp = document.querySelector(`${input}`)
    if(inp.value === ""){
        label.style.fontSize = "1.2rem";
        label.style.top = "40px";
    }
   }

   const handleSubmit = () => {
    // here should be the data from form sent to the database
    // ui code

        setProjectName("");
        setTwitter("");
        setDiscord("");
        setContact("");
        setDescription("");

        let labels = document.querySelectorAll(".label");
        labels.forEach(label => {
            label.style.fontSize = "1.2rem";
            label.style.top = "40px";
        })
    }


  return (
    <div>
        <Navbar />

        <h1 className={styles.title}>Share your <span>Link</span></h1>

        <div className={styles.form}>
            <div>
                <div>
                    <label htmlFor="projectName" id="projectLabel" className={styles.label + " " + "label"}>Project Name</label>
                    <input id="projectName"value={projectName}  type="text" onChange={(e) => setProjectName(e.target.value)} onFocus={() => handleInput("#projectLabel")} onBlur={() => handleInputBlur("#projectLabel", "#projectName")} />
                </div>
                <div>
                    <label htmlFor="twitter" id="twitterLabel" className={styles.label + " " + "label"}>Twitter Link</label>
                    <input id="twitter" value={twitter} type="text" onChange={(e) => setTwitter(e.target.value)} onFocus={() => handleInput("#twitterLabel")} onBlur={() => handleInputBlur("#twitterLabel", "#twitter")}/>
                </div>
                <div>
                    <label htmlFor="discord" id="discordLabel" className={styles.label + " " + "label"}>Discord Link</label>
                    <input id="discord" value={discord} type="text" onChange={(e) => setDiscord(e.target.value)} onFocus={() => handleInput("#discordLabel")} onBlur={() => handleInputBlur("#discordLabel", "#discord")}/>
                </div>
                <div>
                    <label htmlFor="email" id="emailLabel" className={styles.label + " " + "label"}>Contact (email)</label>
                    <input id="email" value={contact} type="email" onChange={(e) => setContact(e.target.value)} onFocus={() => handleInput("#emailLabel")} onBlur={() => handleInputBlur("#emailLabel", "#email")}/>
                </div>
            </div>
            <div>
                <label htmlFor="description" id="descriptionLabel" className={styles.label + " " + "label"}>Description</label>
                <textarea id="description" value={description} onChange={(e) => {setDescription(e.target.value);}} onFocus={() => handleInput("#descriptionLabel")} onBlur={() => handleInputBlur("#descriptionLabel", "#description")}/>
            </div>

            <div>
                <button onClick={() => handleSubmit()} className={styles.submitBtn}>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default ShareLink