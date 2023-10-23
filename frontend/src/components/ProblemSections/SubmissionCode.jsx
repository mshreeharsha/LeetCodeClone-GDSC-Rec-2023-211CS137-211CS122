import React from 'react';
import {useAuthContext} from '../../context/AuthContext'
const SubmissionCode = ({submissionCode,split}) => {
  const [auth,setAuth]=useAuthContext()
  return (
    <>
    <div style={{'padding':'1rem','max-height':`${split?'20rem':'35rem'}`,'overflow-y':'auto'}}>
        <div>
        <h6>{auth.user.username}</h6>
        <p>{`${new Date(submissionCode.createdAt).getDate()}/${new Date(submissionCode.createdAt).getMonth()+1}/${new Date(submissionCode.createdAt)
              .getFullYear()} ${new Date(submissionCode.createdAt).getHours()}:${new Date(submissionCode.createdAt).getMinutes()}:${new Date(submissionCode.createdAt).getSeconds()}`}</p>
        </div>
        <h4 style={{'color':`${submissionCode.status==='Accepted'?'green':'red'}`}}>
            {submissionCode.status}</h4>
        <div style={{'border':'2px solid black','padding':'1rem','margin-bottom':'1rem'}}>
            {submissionCode.status==='Accepted'?(
                <p style={{'color':'green'}}>All test cases passed</p>
            ):submissionCode.status==='Wrong Answer'?
            (<>
              <h5 style={{'color':'red'}}>{submissionCode?.passed}/{submissionCode.hidden_testcases} passed </h5>
            </>):(
                <>
                 <p style={{'color':'red'}}>{submissionCode.errors}</p>
                </>
            )}
        </div>
        
        <div style={{'border':'2px solid black','padding':'1rem'}}>
            {submissionCode.user_code.split('\n').map((code)=>(
                <p style={{'line-height':'1rem'}}>{code}</p>
            ))}
        </div>
    </div>
    </>
  );
}

export default SubmissionCode;
