import {
  Autocomplete,
  Avatar,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CustomTableLayout from "../components/Layout/CustomTableLayout";
import Img from "../assets/images/profile.png";
import ImageInput from "../components/formUI/ImageInput";
import { AccountCircle, Facebook, Instagram } from "@mui/icons-material";
import StarRating from "../components/formUI/StarRating";

const MakeupArtist = () => {
  const intialState = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    image: null,
    mob_num: "",
    ig_link: "",
    fb_link: "",
    user: {},
    city: "",
    star_count: 0,
  };
  const [formData, setFormData] = useState(intialState);
  const [profileImg, setProfileImg] = useState(null);

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
      headerName: "Profile",
      width: 210,
      renderCell: ({ row }) => (
        <Avatar
          width="50px"
          height="50px"
          style={{ borderRadius: "50%", ObjectFit: "cover" }}
          src={row.image}
          alt={row.first_name + " " + row.last_name + " profile picture"}
        />
      ),
    },
    {
      field: "first_name",
      headerName: "First Name",
      width: 210,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 210,
    },
    {
      field: "mob_num",
      headerName: "Phone Number",
      width: 210,
    },
    {
      field: "email",
      headerName: "Email",
      width: 210,
      // renderCell: ({ row }) => row.user.email,
    },
    {
      field: "city",
      headerName: "City",
      width: 310,
    },
    {
      field: "ig_link",
      headerName: "IG Link",
      width: 310,
      renderCell: ({ row }) => (
        <a href={row.ig_link} target="_ig-link">
          {row.ig_link}
        </a>
      ),
    },
    {
      field: "star_count",
      headerName: "Star Count",
      width: 310,
      renderCell: ({ row }) => (
        <StarRating value={row.star_count} onChange={(e) => e} />
      ),
    },
  ];

  let fd = new FormData();
  Object.keys(formData).forEach((f) =>
    typeof formData[f] == "string" && f == "image"
      ? null
      : fd.append(f, formData[f])
  );

  console.log({ formData });
  return (
    <CustomTableLayout
      addSearch = {true}
      url="accounts/register"
      bulkUpload
      bulkUploadUrl="portal/artist-upload"
      columns={columns}
      formProps={{ formData, resetFormData, setFormData, formDataHandler }}
      isFormData={true}
      putFormData={fd}
      updateDataBeforePost={(data) => {
        data.delete("user");
        return data;
      }}
    >
      <ImageInput
        required
        profile={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
      />
      <TextField
        required
        label="First Name"
        name="first_name"
        value={formData.first_name}
        onChange={formDataHandler}
      />
      <TextField
        required
        label="Last Name"
        name="last_name"
        value={formData.last_name}
        onChange={formDataHandler}
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        value={formData.email || formData.user.email}
        onChange={(e) =>
          setFormData({
            ...formData,
            email: e.target.value,
            user: { email: e.target.value },
          })
        }
      />
      <TextField
        required
        label="Phone Number"
        name="mob_num"
        value={formData.mob_num}
        onChange={formDataHandler}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={formDataHandler}
      />{" "}
      <TextField
        required
        label="City"
        name="city"
        value={formData.city}
        onChange={formDataHandler}
      />{" "}
      <StarRating
        value={formData.star_count}
        onChange={(e) => {
          console.log(e);
          setFormData({ ...formData, star_count: e });
        }}
      />
      <TextField
        required
        label="Instagram Link"
        name="ig_link"
        value={formData.ig_link}
        onChange={formDataHandler}
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Instagram />
            </InputAdornment>
          ),
        }}
      />
      {/* <TextField
        required
        label="Facebook Link"
        name="fb_link"
        value={formData.fb_link}
        onChange={formDataHandler}
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Facebook />
            </InputAdornment>
          ),
        }}
      /> */}
    </CustomTableLayout>
  );
};

export default MakeupArtist;
