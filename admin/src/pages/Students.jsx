import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
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
		<div className={ "flex flex-col mt-24 items-center justify-center min-w-screen" }>
			<div className={ " w-3/4" }>
				{
					leaderboards ? (
						<div>
							<Button onClick={ () => {
								setLeaderboards(false);
								setSearchStudents(true);
							} }>Search Students
							</Button>
							<h1
								className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">Leaderboards</h1>
							<div className="my-6 w-full overflow-y-auto">
								<table className="w-full">
									<thead>
									<tr className="m-0 border-t p-0 even:bg-muted">
										<th
											className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Rank
										</th>
										<th
											className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Username
										</th>
										<th
											className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Completed
										                                                                                                             Questions
										</th>
									</tr>
									</thead>
									<tbody>
									{ users.map((user, index) => (
										<tr key={ user._id } className="m-0 border-t p-0 even:bg-muted">
											<td
												className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">{ index + 1 }</td>
											<td
												className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">{ user.username }</td>
											<td
												className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">{ user.completedQuestions.length }</td>
										</tr>
									)) }
									</tbody>
								</table>
							</div>
						</div>
					) : (
						searchStudents && (
							<div className={ "space-y-4" }>
								<Button onClick={ () => {
									setLeaderboards(true);
									setSearchStudents(false);
									setSearchedStudent({});
								} }>Leaderboards
								</Button>
								<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">Search
								                                                                                           Students</h1>
								<Input placeholder={ "Enter username" } name={ "student" } id={ "student" } value={ student }
								       onChange={ (e) => setStudent(e.target.value) } />
								<Button onClick={ handleSearchStudent }>Submit
								</Button>
								
								{ searchedStudent &&
									(
										<div>
											<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Student
											                                                                                           Details</h2>
											<p className="leading-7 [&:not(:first-child)]:mt-6">
												<p className="text-lg font-semibold">Username:</p> { searchedStudent.username }</p>
											<p className="leading-7 [&:not(:first-child)]:mt-6"><p className="text-lg font-semibold">Completed
											                                                                                         Questions:</p> { searchedStudent.completedQuestions ? searchedStudent.completedQuestions.length : 0 }
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
		</div>
	);
}
