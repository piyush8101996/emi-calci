import { useEffect, useState } from "react";
import Card from "../card/card";

const UserHistory = (props) => {
    const [show, setShow] = useState(true);
    const [emid, setEmid] = useState([]);

    useEffect(()=>{
        // To get the localStroage to get the emi data
        let emidlist = localStorage.getItem('emilist');
        if(emidlist) {
            emidlist = JSON.parse(emidlist); // String --> object
            setEmid(emidlist);
        } 
        
   },[])

   //To save the emi data on localstorage
   useEffect(()=>{
    const emidlist = JSON.stringify(emid); // Object --> String
    localStorage.setItem('emilist',emidlist);
    
}, [props.user]);
    

    const users = () => {
        return (
            <Card>
                {props.user}
            </Card>
        )
    }

    return (

        <>
            <button type="button" onClick={() => setShow(!show)}>
             {show ? "Hide" : "show"}  User Emi
            </button>
            <br />
            <br />
            {show && users()}
        </>
    )
}
export default UserHistory;