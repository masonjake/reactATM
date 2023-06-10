const ATMDeposit = ( { onChange,valid,atmMode }) => {
    return <label className="label huge">
        <div style={{fontSize:"1.5em"}}>{atmMode}:</div>
        <input type="number" onChange={onChange}></input>
        <input type='submit' disabled={!valid}></input>
        {!valid &&<div style={{color:'red'}}>Insufficient Funds</div>}
    </label>
}

const Account = () => {
    const [amount, setAmount] = React.useState(0)
    const [balance, setBalance] = React.useState(0)
    const [valid, setValid] = React.useState(true)
    const [atmMode, setAtmMode] = React.useState("")

    const handleChange = event => {
        let newAmount = Number(event.target.value)
        setAmount(newAmount)
        if((newAmount > balance ) && atmMode === 'Cash Back') {
            setValid(false)
        } else {
            setValid(true)
        }
    }
    const handleSubmit = event => {
        event.preventDefault()
        if(atmMode==='Cash Back' && amount > balance) {
            setValid(false)
            return
        }
        setBalance(atmMode==="Deposit" ? balance + Number(amount) : balance - Number(amount) )
        
    }
    
    const handleMode = (e) => {
        setAtmMode(e.target.value)
    }


    return (<form onSubmit={handleSubmit}>
        <h2>Account Balance: ${balance}</h2>
        <h4>Select Mode:</h4>
            <input onChange={handleMode} type='radio' name='selectMode' value='Deposit'></input>
            <label>Deposit</label>
            <input style={{marginLeft:"10px"}} onChange={handleMode} type='radio' name='selectMode'value='Cash Back'></input>
            <label>Cash Back</label>
        <div>
        {atmMode&&<ATMDeposit onChange={handleChange} valid={valid} atmMode={atmMode}></ATMDeposit>}
        </div>
    </form>)
}

ReactDOM.render(<Account/>, document.getElementById('root'))