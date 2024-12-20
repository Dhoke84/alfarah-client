import React, { useState } from "react";

const DeleteJob = () => {
  const [jobId, setJobId] = useState("");

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://alfarah-full-stack.vercel.app/jobs/${jobId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Job deleted successfully");
      } else {
        console.error("Error deleting job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div>
      <h1>Delete Job</h1>
      <input placeholder="Job ID" value={jobId} onChange={(e) => setJobId(e.target.value)} />
      <button onClick={handleDelete}>Delete Job</button>
    </div>
  );
};

export default DeleteJob;
