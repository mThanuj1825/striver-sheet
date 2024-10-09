import axios from "axios";
import { useEffect, useState } from "react";

export function Students() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [leaderboards, setLeaderboards] = useState(true);
	const [searchStudents, setSearchStudents] = useState(false);
	const [student, setStudent] = useState("");
	const [searchedStudent, setSearchedStudent] = useState({});
	
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get("https://striver-sheet.onrender.com/api/users");
				const sortedUsers = response.data.sort((a, b) => b.completedQuestions.length - a.completedQuestions.length);
				setUsers(sortedUsers);
			} catch (error) {
				console.error("Failed to fetch users:", error);
			} finally {
				setLoading(false);
			}
		};
		
		fetchUsers();
	});
	
	const handleSearchStudent = () => {
		const foundStudent = users.find(user => user.username === student);
		
		if (foundStudent) {
			setSearchedStudent(foundStudent);
		} else {
			setSearchedStudent(null);
		}
	};
	
	if (loading) {
		return <h1>Loading...</h1>;
	}
	
	return (
		<div>
			{
				leaderboards ? (
					<div>
						<button onClick={ () => {
							setLeaderboards(false);
							setSearchStudents(true);
						} }>Search Students
						</button>
						<h1>Leaderboards</h1>
						<table>
							<thead>
							<tr>
								<th>Rank</th>
								<th>Username</th>
								<th>Completed Questions</th>
							</tr>
							</thead>
							<tbody>
							{ users.map((user, index) => (
								<tr key={ user._id }>
									<td>{ index + 1 }</td>
									<td>{ user.username }</td>
									<td>{ user.completedQuestions.length }</td>
								</tr>
							)) }
							</tbody>
						</table>
					</div>
				) : (
					searchStudents && (
						<div>
							<button onClick={ () => {
								setLeaderboards(true);
								setSearchStudents(false);
								setSearchedStudent({});
							} }>Leaderboards
							</button>
							<h1>Search Students</h1>
							<input placeholder={ "Enter username" } name={ "student" } id={ "student" } value={ student }
							       onChange={ (e) => setStudent(e.target.value) } />
							<button onClick={ handleSearchStudent }>Submit
							</button>
							
							{ searchedStudent &&
								(
									<div>
										<h2>Student Details</h2>
										<p><strong>Username:</strong> { searchedStudent.username }</p>
										<p><strong>Completed
										           Questions:</strong> { searchedStudent.completedQuestions ? searchedStudent.completedQuestions.length : 0 }
										</p>
									</div>
								)
							}
							
							{ searchedStudent === null && student && (
								<p>No student found with that username.</p>
							) }
						</div>
					)
				)
			}
		</div>
	);
}
