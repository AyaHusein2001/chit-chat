import React from "react";

const RegisterPage = () => {
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4">
        <h3>Welcome to ChitChat</h3>
        <form>
          {/* when I click on name label , it will automatically focus on that text field */}
          <label htmlFor="name">Name :</label>
          <input type="text" id="name" 
          placeholder="Enter Your Name"
          className="bg-slate-100 px-2 py-1"
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
