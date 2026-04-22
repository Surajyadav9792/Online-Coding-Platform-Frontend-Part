import { useState, useEffect } from "react";
import "../style/List.css";
import axiosClient from "../utils/axiosClient";

export default function AdminDelete() {
  const [problem, setProblem] = useState([]);
  useEffect(() => {
    getAllproblem();
  }, [problem]);

  const getAllproblem = async () => {
    try {
      const { data } = await axiosClient.get("/problem/getAllProblem");
      setProblem(data);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteProblem = async (id) => {
    if(!window.confirm('Are you sure you want to delete this problem')) return;
    try {
      await axiosClient.delete(`/problem/delete/${id}`);
      setProblem(problem.filter(problem=>problem._id!==id));
      //getAllproblem();
    } catch (error){
      console.error(error);
    }
  };
  return (
    <div className="listContainer">

      <h1 className="listTitle">
        Problem List
      </h1>

      <table className="todoTable">

        <thead>
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Tag</th>
            <th>Action</th>
            {/* <th>Reset</th> */}
          </tr>
        </thead>

        <tbody>

          {
            problem.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.difficulty}</td>
                <td>{item.tags}</td>
                <td>
                  <button onClick={() => deleteProblem(item._id)}>Delete</button>
                </td>
                {/* <td>
                  <Link to={"/update/" + item._id}>Update</Link>
                </td> */}
              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  );
}