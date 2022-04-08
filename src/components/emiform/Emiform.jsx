import { useState, useEffect } from "react";
import "./emiform.css";

const Emiform = (props) => {
  const [amount, setAmount] = useState();
  const [interest, setInterest] = useState();
  const [duration, setDuration] = useState();

  const [loanEMI, setLoanEMI] = useState();
  const [totalInterest, setTotalInterest] = useState();
  const [totalPayment, setTotalPayment] = useState();

  const [amounterrormsg, setAmounterrormsg] = useState("");
  const [interesterrormsg, setInteresterrormsg] = useState("");
  const [durationerrormsg, setDurationerrormsg] = useState("");



  //onchange Handler created
  const amountHandler = (e) => {
    setAmount(parseInt(e.target.value));
  };
  const interestHandler = (e) => {
    setInterest(parseInt(e.target.value));
  };
  const durationHandler = (e) => {
    setDuration(parseInt(e.target.value));
  };

   // useEffect to update loan EMI and total Interest
  useEffect(() => {
    const r = interest / 12 / 100;
    const localLoanEMI =
      (amount * r * Math.pow(1 + r, duration)) /
      (Math.pow(1 + r, duration) - 1);
    setLoanEMI(localLoanEMI);
    const localTotalInterest = localLoanEMI * duration - amount;
    setTotalInterest(localTotalInterest);
  }, [amount, interest, duration]);


  // useEffect to update totalpayement .
  useEffect(() => {
    const total = parseInt(amount) + totalInterest;
    setTotalPayment(total);
  }, [amount, totalInterest]);


//Submit Button Handler
  const submitHandler = (e) => {
    e.preventDefault();
    setAmounterrormsg("");                       //Form validation purpose
    setInteresterrormsg("");                    
    setDurationerrormsg("");

    //form validation
    if (!amount) {
      setAmounterrormsg("Entered the principle amount");
      return;
    } else if (!interest) {
      setInteresterrormsg("Entered the Interest");
      return;
    } else if (!duration) {
      setDurationerrormsg("Entered the duration");
      return;
    }
    //Passing user entered data 

    const emidata = {
      amounts: amount,
      interests: interest,
      durations: duration,
      loanemis: loanEMI,
      totalinterests: totalInterest,
      totalpayments: totalPayment
    };
    props.onSaveemidata(emidata);   //callback 
    console.log(emidata);

    setAmount("");
    setInterest("");
    setDuration("");
  };

  return (
    <>
      <form>
        <div className="forms">
          <div className="form">
            <label>Principle Amount</label>
            <input
              value={amount}
              onChange={amountHandler}
              type="number"
            ></input>
            <div className="errormsg">{amounterrormsg}</div>
          </div>

          <div className="form">
            <label>Rate of interest</label>
            <input
              value={interest}
              onChange={interestHandler}
              type="number"
            ></input>
            <div className="errormsg">{interesterrormsg}</div>
          </div>

          <div className="form">
            <label>Duration(In Months)</label>
            <input
              value={duration}
              onChange={durationHandler}
              type="number"
            ></input>
            <div className="errormsg">{durationerrormsg}</div>
          </div>
        </div>
        <div className="actions">
          <button onClick={submitHandler}>submit</button> <br />
          <br />
          <br />
        </div>
      </form>
      <br />
    </>
  );
};
export default Emiform;
