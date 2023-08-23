import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Search } from 'semantic-ui-react';
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = 
"https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
  
const SearchBar = () => (
 <div id='gfg'>
   <h1>GeeksforGeeks</h1>
   <h4>ReactJS semantic UI Search module</h4>
    <Search loading size='massive'/>
 </div>
)



export default function ArtzSuchen() {
    return(
        <>
         <div>
                <Header />
            </div>
            <SearchBar/>


            
        </>
    )
}