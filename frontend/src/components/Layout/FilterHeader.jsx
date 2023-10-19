import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import ListOfProblems from '../ListOfProblems';
import { DownOutlined } from '@ant-design/icons'; // Import the down arrow icon


const FilterHeader = ()=>{

    //Fetch Color For Difficulties
    const getDifficultyClass = (difficulty) => {
        switch (difficulty) {
            case 'Easy':
                return 'text-success'; // Green text
            case 'Medium':
                return 'text-warning'; // Gold text
            case 'Hard':
                return 'text-danger'; // Red text
            default:
                return '';
        }
    };

    //Styles for Button
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
    const [tags, setTags] = useState([]);
    const [category, SetCategory] = useState([]);

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

    const getAllCategories = async()=>{
        try {
            const { data } = await axios.get(`${baseUrl}/api/categories/all-categories`);
            if (data?.success) {
                SetCategory(data.categories);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllProblems();
        getAllCategories();
    }, []);

    const fetchProblemsOnChoice =async()=>{
        try{
            console.log(difficulty)
            const {data} = await axios.post(`${baseUrl}/api/problems/problem-filter`,{difficulty,tags})
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
    },[difficulty,tags])

    //Options for Difficulty
    const options = [
        { value: 'Easy', label: 'Easy' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Hard', label: 'Hard' },
    ];

    //Menu for Selecting Difficulty
    const menu = (
        <Menu>
            {options.map((option) => (
            <Menu.Item className={getDifficultyClass(option.value)} key={option.value} onClick={()=>{setDifficulty(option.value)}} style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                {option.label}
            </Menu.Item>
            ))}
        </Menu>
    );


    //Selecting Multiple Tags Handling Function
    const handleOptionClick = (option) => {
        // Check if the option is already selected
        if (tags.includes(option)) {
          // Deselect the option
          setTags(tags.filter((item) => item !== option));
        } else {
          // Select the option
          setTags([...tags, option]);
        }
    };

    //If Selected the button will be Primary else will be default
    const menu2=(
        <Menu>
            <div className='text-center'>Select Tags</div>
            <div className="button-container">
                {category.map((option) => (
                    <Menu.Item key={option.name} onClick={() => handleOptionClick(option._id)}>
                        <Button
                        type={tags.includes(option._id) ? 'primary' : 'default'}
                        shape="round">
                        {option.name}
                        </Button>
                    </Menu.Item>
                ))}
            </div>
      </Menu>
    )
    
    const handleAllTopics=()=>{
        setDifficulty()
        setProblems([])
        setTags([])
        getAllProblems()
    }

    return (
        <>
            <div className="d-flex justify-content-center" style={{'backgroundColor':'#F6FDC3','margin-bottom':'60px','height':'40px'}}>
                <Button style={buttonStyle} onClick={()=>{handleAllTopics()}}>
                        All Topics
                </Button>
                <Dropdown overlay={menu} trigger={['click']}>
                    <Button style={buttonStyle}>
                        Difficulty <DownOutlined />
                    </Button>
                </Dropdown>
                <Dropdown overlay={menu2} trigger={['click']}>
                    <Button style={buttonStyle}>
                        Tags <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
            <ListOfProblems problems={problems}/>
        </>
    );
}
export default FilterHeader;
