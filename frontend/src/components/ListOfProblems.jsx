import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

const ListOfProblems = () => {
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
                        <th>Status</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    {problems.map((problem, index) => (
                        <tr key={problem._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                            <td></td>
                            <td>{problem.title}</td>
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
