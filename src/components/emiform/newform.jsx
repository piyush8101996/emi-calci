import Emiform from "./Emiform";
import "./newform.css";
import { useEffect, useState } from "react";
import "./style.css";
import Card from "../card/card";


const NewEmiform = (props) => {
    const [emid, setEmid] = useState([]);

    //receiving input data and update the state
    const emidataHandler = (enteredemidata) => {
        const updateEmi = [enteredemidata, ...emid];
        setEmid(updateEmi);
    };

    useEffect(() => {
        // To get the localStroage to get the emi data
        let emidlist = localStorage.getItem('emilist');
        if (emidlist) {
            emidlist = JSON.parse(emidlist); // String --> object
            setEmid(emidlist);
        }

    }, [])

    //To save the emi data on localstorage
    useEffect(() => {
        const emidlist = JSON.stringify(emid); // Object --> String
        localStorage.setItem('emilist', emidlist);

    }, [emid])



    //emi calculation 
    const showEmiTable = emid.map((elem, index) => {
        const r = elem.interests / 12 / 100; //monthly interest rate
        let balance = elem.amounts; // principle amount
        let monthemi = 0; //current month  paid emi
        let cPrinciple = 0; //current month principle
        let cInterest = 0; //current month interest
        let monthname = "";
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const d = new Date();
        const month = d.getMonth();   //current month value

        //const ar =new Array(elem.durations)

        return (
            <>
                <div key={index}>
                    <Card className="card">     {/*card use here to create UI of emi table*/}

                        <div className="App">
                            <div>
                                <label>Loan EMI: </label>
                                <span>{Math.round(elem.loanemis)}</span>
                            </div>
                            <br />
                            <div>
                                <label>Total interest : </label>
                                <span>{Math.round(elem.totalinterests)}</span>
                            </div>
                            <br />
                            <div>
                                <label>Total payment (amount + Totalinterest ): </label>
                                <span>{Math.round(elem.totalpayments)}</span>
                            </div>
                            <br />
                        </div>



                        <div className="table">
                            {/* headers */}
                            <tr className="tablerow">
                                <th>Month</th>
                                <th>Principle</th>
                                <th>Interest</th>
                                <th>EMI</th>
                                <th>Remaining Balance</th>
                            </tr>
                            <tr className="tablerow">
                                <th>({elem.durations})</th>
                                <th>({Math.round(elem.amounts)})</th>
                                <th>({Math.round(elem.totalinterests)})</th>
                                <th>({Math.round(elem.totalpayments)})</th>
                                <th>{Math.round(elem.amounts)}</th>

                            </tr>

                            <div>
                                {elem.durations > 0 &&
                                    Array.from(
                                        Array(elem.durations),
                                        (_, index) => index + 1
                                    ).map(
                                        (x, index) => {
                                            cInterest = balance * r; //interest due for each month 
                                            cPrinciple = elem.loanemis - cInterest; //principle amount of the current month
                                            monthemi = cInterest + cPrinciple; // monthly emi

                                            balance = balance - cPrinciple; //updating outstanding balance with the paid principle current month
                                            const newmonth = month + x ;    //updating month value 
                                            if (newmonth >= 12) {
                                                const up = newmonth % 12;
                                                monthname = months[up];       //for displaying month name
                                            } else {
                                                monthname = months[newmonth];
                                            }

                                            return (

                                                <div className="tablerow" key={index}>
                                                    <td>{monthname}</td>
                                                    <td>{Math.round(cPrinciple)}</td>
                                                    <td>{Math.round(cInterest)}</td>
                                                    <td>{Math.round(monthemi)}</td>
                                                    <td>{Math.round(balance)}</td>
                                                </div>

                                            );
                                        }
                                    )}
                            </div>
                        </div>
                    </Card>

                </div>

            </>
        );
    });

    return (
        <>
            <div className="new-emi">
                <Emiform onSaveemidata={emidataHandler} />
            </div>
            <div>{showEmiTable}</div>


        </>
    );
};

export default NewEmiform;
