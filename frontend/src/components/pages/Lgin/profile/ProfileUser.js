import React from "react";
import "./profile.css";
import { Input } from "antd";

const ProfileUser = () => {
  const userInfo = [
    { label: "Email", value: "john.doe@example.com" },
    { label: "Location", value: "New York, USA" },
    { label: "Interests", value: "React, JavaScript, Web Development" },
  ];

  const renderUserInfoInputs = () => {
    return userInfo.map((info) => (
      <Input key={info.label} placeholder={info.label} defaultValue={info.value} />
    ));
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>User Profile</h2>
        <button>Edit Profile</button>
      </div>
      <div className="profile-content">
        <img src="user-profile-picture.jpg" alt="User Profile" />
              <div className="user-info">
                  {renderUserInfoInputs()}
              </div>
              
      </div>
      <div className="user-info_secondary">
        <h3>John Doe</h3>
        {userInfo.map((info) => (
          <p key={info.label}>
            {info.label}: {info.value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProfileUser;
