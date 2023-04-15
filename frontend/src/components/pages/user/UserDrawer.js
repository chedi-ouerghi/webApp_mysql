import React, { useState } from 'react';
import { Drawer, Card, Avatar } from 'antd';

const UserDrawer = ({ userData, closeDrawer, isDrawerOpen }) => {
  return (
    <Drawer
      title="User Data"
      placement="right"
      closable={true}
      onClose={closeDrawer}
      open={isDrawerOpen}
    >
      {userData && (
        <Card >
          <Card.Meta style={{color:'black'}}
            avatar={<Avatar src={userData.photo} />}
            title={`${userData.nomUser} ${userData.prenomUser}`}
            description={userData.email}
          />
        </Card>
      )}
    </Drawer>
  );
};

export default UserDrawer;
