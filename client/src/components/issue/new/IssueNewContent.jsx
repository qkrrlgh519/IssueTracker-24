import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import IssueNewTitle from './IssueNewTitle';
const IssueNewContentWrapper = styled.div`
    width:50%;
    height:500px;
    background-color:#ffffff;
    border-radius:4px;
    border:1px solid #E8E9EC;
    margin-left:50px;
    &:before{
        position:absolute;
        display:block;
        content: "";
        width:0;
        height:0;
        margin-left:-12px;
        margin-top:30px;
        transform: scale(3);
        border-right-color:#E8E9EC;
        border-left-color:rgba(255,255,255,0);
        border-top-color:rgba(255,255,255,0);
        border-bottom-color:rgba(255,255,255,0);
        border-style:solid solid outset;
      }
    .write-btn{
        width:70px;
        height:40px;
        border-radius:6px 6px 0 0;
        border:1px solid #E8E9EC;
        border-bottom:0px;
        margin-left:20px;
        background-color:#fff;
        z-index:1;
        cursor:pointer;
    }
    .write-content{
        border:1px solid #F4F4F6;
        margin-top:-2px;
        border-bottom:0px;
    }
    .main-content{
        margin-top:20px;
        margin-left:20px;
    }
    .character-length{
      position:absolute;
      width:100px;
      height:0;
      margin-left:500px;
      margin-top:-30px;
    }
`;
const IssueNewContent = () =>{
  const [value, setValue] = useState([0]);
  const [results, setResults] = useState(['']); 
  const onChangeTextarea = (e) =>{
      setValue(e.target.value);
  }
  useEffect(()=>{
      const timeoutId = setTimeout(() => {
        if (value) setResults(`${value.length} Characters`);
        else setResults(`0 Characters`);
        
        setTimeout(()=>{
          setResults('');
        },2000);
      }, 2000);
      return () => {
        clearTimeout(timeoutId);
      };
    }, [value]);
  
  return(
    <>
      <IssueNewContentWrapper>
      <IssueNewTitle/>
      <div className="tabnav-tabs">
          <button className="write-btn">Write</button>
      </div>
      <div className="write-content">
          <textarea className="main-content" cols="70" rows="15" placeholder="Leave comment" onChange={onChangeTextarea}></textarea>
          <div className="character-length">{results} </div>
          <input type="file"></input>
      </div>
      </IssueNewContentWrapper>
    </>
  );
} 

export default IssueNewContent;