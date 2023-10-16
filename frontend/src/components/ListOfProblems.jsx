import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { Link, useNavigate } from 'react-router-dom';

const ListOfProblems = () => {
    const navigate=useNavigate()
    const [problems, setProblems] = useState([]);

    const getAllProblems = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/problems/all-problems`);
            if (data?.success) {
                setProblems([...data.problems]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProblems();
    }, []);

    // Function to get the CSS class for difficulty
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

    return (
        <div className="container">
            <div className="container text-center"><h4>All Problems</h4></div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th className='col-1'>Status</th>
                        <th className='col-3'>Title</th>
                        <th className='col-3'>Category</th>
                        <th className='col-2'>Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    {problems.map((problem, index) => (
                        <tr key={problem._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                            <td></td>
                            <td><Link to={`/problems/${problem.slug}`} className='problem-link'>{problem.title}</Link></td>
                            <td>{problem.category.name}</td>
                            <td className={getDifficultyClass(problem.difficulty)}>{problem.difficulty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListOfProblems;
