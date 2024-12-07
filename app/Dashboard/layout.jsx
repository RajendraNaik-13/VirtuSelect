import React from "react"
import Header from "./_components/Header"
function Dashboardlayout({children}){
    return (
        <div>
            
            <div className=" mx-5 md:px-20 lg:max-36 ">
            {children}
            </div>
        </div>
    )
}
export default Dashboardlayout