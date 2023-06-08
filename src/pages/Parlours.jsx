import {
  Autocomplete,
  Avatar,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CustomTableLayout from "../components/Layout/CustomTableLayout";
import Img from "../assets/images/profile.png";
import ImageInput from "../components/formUI/ImageInput";
import { AccountCircle, Facebook, Instagram } from "@mui/icons-material";
import axios from "axios";
import StarRating from "../components/formUI/StarRating";

const Parlours = () => {
  const intialState = {
    name: "",
    contact: "",
    address: "",
    password: "",
    description: "",
    image: null,
    artist: "",
    user : 1,
    star_count : 0
  };
  const [formData, setFormData] = useState(intialState);
  const [profileImg, setProfileImg] = useState(null);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = 
    localStorage.getItem("_token");
    axios.get('accounts/user').then(res => setUserList(res.data.data.map(elt => ({...elt,label : elt.first_name + ' ' + elt.last_name}))))
  },[]);


  const formDataHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetFormData = () => {
    setFormData(intialState);
    setProfileImg(null);
  };
  const columns = [ 
    {
      field: "id",
      headerName: "ID",
      width: 110,
      renderCell: ({ row }) => row.id,
    },
    {
      field: "image",
      headerName: "Image",
      width: 210,
      renderCell: ({ row }) => (
        <Avatar
          width="50px"
          height="50px"
          style={{ borderRadius: "50%", ObjectFit: "cover" }}
          src={row.image}
          alt={row.image + " " + " profile picture"}
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 210,
     
    },
    {
      field: "contact",
      headerName: "Contact Number",
      width: 210,
    },
    {
      field: "address",
      headerName: "Address",
      width: 210,
    },
    {
      field: "star_count",
      headerName: "Star Count",
      width: 310,
      renderCell: ({ row }) => (
        <StarRating
        value={row.star_count}
        onChange={e => (e)}
       />
      ),
    },
    {
      field: "description",
      headerName: "Description",
      width: 210,
    },
    // {
    //   field: "artist",
    //   headerName: "Artist",
    //   width: 310,
    //   renderCell : ({row}) => {
    //     let user = userList.find(elt => elt.id == row.artist)

    //     return user?.first_name + ' ' + user?.last_name
    //   }
    // },
  ];

  let fd = new FormData();
  Object.keys(formData).forEach((f) =>
    typeof formData[f] == "string" && f == "image"
      ? null
      : fd.append(f, formData[f])
  );

console.log(userList,formData)

  return (
    <CustomTableLayout
      addSearch = {true}
      bulkUpload
      bulkUploadUrl = 'portal/saloon'
      url="accounts/parlours"
      columns={columns}
      formProps={{ formData, resetFormData, setFormData, formDataHandler }}
      isFormData={true}
      putFormData={fd}
    >
      <ImageInput
        name="PARLOUR IMAGE"
        required
        profile={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
      />
      <TextField
        required
        label="Name"
        name="name"
        value={formData.name}
        onChange={formDataHandler}
      />
      {/* <Autocomplete
        value = {userList.find(elt => elt.id == formData.artist) || []}
        onChange={(e, v) =>
        {console.log(v);
          formDataHandler({ target: { name: "artist", value: v.id } })}
      }disablePortal
        required
        options={userList}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Artist"
            helperText="If Parlour not found, Visit Parlour page to create it."
          />
        )}
      /> */}
         <StarRating
       value={formData.star_count}
       onChange={e => {
        console.log(e)
        setFormData({...formData, star_count : e})
       }
      }
      />
      <TextField
        required
        label="Contact Number"
        name="contact"
        value={formData.contact}
        onChange={formDataHandler}
      />
      <TextField
        required
        label="City"
        name="address"
        value={formData.address}
        onChange={formDataHandler}
      />
      <TextField
        required
        label="Description"
        name="description"
        value={formData.description}
        onChange={formDataHandler}
      />
    </CustomTableLayout>
  );
};

export default Parlours;
