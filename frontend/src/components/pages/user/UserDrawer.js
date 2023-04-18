import React, { useState } from 'react';
import { Drawer, Card, Avatar, Image } from 'antd';
import './draweruser.css'
import soleil from './soleil3.jpg'

const UserDrawer = ({ userData, closeDrawer, isDrawerOpen }) => {
  return (
    <Drawer
      title="User Data"
      placement="right"
      closable={true}
      onClose={closeDrawer}
      open={isDrawerOpen}
    >
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
        //   justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {userData && (
          <div 
            key={userData.id}
            style={{
              width: '94%',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
              border: '1px solid #ccc',
              margin: '0% 3%',
                transition: 'transform 0.3s ease',
              height:'300px',
              ':hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
                      <div style={{ color: 'black' }} >
                          
                      <div className='image_header'>
                          <Image src={soleil} />
                          </div>

                          <div style={{
                              width: '80%',
                            //   background: '#cbb9d1',
                              height: '160px', margin: '6% 9%'
                          }}>
                      <div style={{display:'flex',flexDirection:'column'}}>
                          <span className='texte_drawer'>{`${userData.nomUser}`}</span>
                       <span className='texte_drawer'> {`${userData.prenomUser}`}</span>
                          <span className='texte_drawer'>{userData.email}</span>
                          </div>
                      </div>
          </div>            
          </div>
        )}
                  </div>
                  
    </Drawer>
  );
};

export default UserDrawer;
