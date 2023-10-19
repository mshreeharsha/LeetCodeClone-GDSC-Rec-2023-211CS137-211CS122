import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import ListOfProblems from '../ListOfProblems';
import { DownOutlined } from '@ant-design/icons'; // Import the down arrow icon


const FilterHeader = ()=>{

    const buttonStyle = {
        backgroundColor: 'black', // Black background color
        color: 'white', // White text color
        padding: '19px 35px', 
        fontSize: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const [difficulty,setDifficulty]=useState('')
    const [problems, setProblems] = useState([]);

    const getAllProblems = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/problems/all-problems`);
            if (data?.success) {
                setProblems(data.problems);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProblems();
    }, []);

    const options = [
        { value: 'Easy', label: 'Easy' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Hard', label: 'Hard' },
    ];

    const fetchProblemsOnChoice =async()=>{
        try{
            console.log(difficulty)
            const {data} = await axios.post(`${baseUrl}/api/problems/problem-filter`,{difficulty})
            if(data?.success){                      
                setProblems(data.problems)   
            }
            else{                   
                console.log(data.message)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchProblemsOnChoice()
    },[difficulty])
    const menu = (
        <Menu>
            {options.map((option) => (
            <Menu.Item key={option.value} onClick={()=>{setDifficulty(option.value)}}>
                {option.label}
            </Menu.Item>
            ))}
        </Menu>
    );
    return (
        <>
            <div className="d-flex justify-content-center" style={{'backgroundColor':'#F6FDC3','margin-bottom':'60px','height':'40px'}}>
                <Dropdown overlay={menu} trigger={['click']}>
                    <Button style={buttonStyle}>
                        Difficulty <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
            <ListOfProblems problems={problems}/>
        </>
    );
}
export default FilterHeader;
