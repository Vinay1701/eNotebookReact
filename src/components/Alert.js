import React, { useContext } from 'react'
import AlertContext from '../context/Alerts/AlertContext';

export default function Alert() {

    const {alert} = useContext(AlertContext)

    const capitalize = (word)=>{
        if(word) {
            if(word === "danger") return "Error"
            const lower = word.toLowerCase();
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        }
    }
    const isAlert = (alert) => {
        if(alert) return true
        return false
    }
    return (
        <small>
            {isAlert(alert) && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(alert.type)}</strong>  {alert.msg} 
            </div>}
        </small>
    )
}