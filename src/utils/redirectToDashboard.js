import React from "react";

const redirectToDashboard = async (responseData) => {
  console.log(`USER ID: ${responseData.data.user._id}`);
  try {
    const response = await fetch(
      `https://kaizenflo-01afa622f2f4.herokuapp.com/api/users/dashboard/${responseData.data.user._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const resData = await response.json();
    console.log(resData.status);
    return resData;
  } catch (err) {
    console.log(err); //for debugging
  }
};

export default redirectToDashboard;
