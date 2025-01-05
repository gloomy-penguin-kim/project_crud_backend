import { useEffect, useState } from 'react' 

import { Modal } from 'react-bootstrap'; 
 
const LoadingModal = ({ loading }) => { 
 
    return (
        <Modal show={loading}>  
            <Modal.Body>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%'}}>
                <div>
                    <img src="loading.gif" alt="/plublic/loading.gif" style={{ height: '40px', width: '40px' }}/> 
                </div>
                <div style={{paddingLeft:'10px', height:'40px', verticalAlign:'middle', lineHeight:'2.5'}}> 
                    Loading...
                </div>
            </div> 
            </Modal.Body>  
      </Modal> 
  );
}

export default LoadingModal