import { Button, Typography } from "@mui/material";
import React, { useState } from "react";

import Img from '../../assets/images/profile.png'

const ImageInput = ({ profile = null,onChange = () => {},name = null }) => {

  const [profileImg,setProfileImg] = useState(null)

    return  <Button
    component = 'label'
    variant = 'outlined' 
    sx ={{display : 'block',textAlign : 'center'}}
     > 
     <Typography  
     sx ={{
      m :'0.5rem auto',
      p : 1 ,
      border : '1px gray solid',
      borderRadius  :'10px',
      width : 'fit-content'
      }} > Select {name || "Profile Picture"}  </Typography> 
  <img 
    src ={typeof profile === "string" ? profile:  profileImg || Img} 
    style ={{
    width : '70%',
    height : '70%',
    borderRadius : '10px',
  }} />
    <input 
      type={'file'} 
      accept="image/png, image/gif, image/jpeg"
      onChange = {e => {
        onChange(e)
        // setFormData({...formData,profile : e.target.files[0]});
      function getBase64() {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
          setProfileImg(reader.result)

        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }
     getBase64()
      }} hidden/>
  </Button>
}

export default ImageInput