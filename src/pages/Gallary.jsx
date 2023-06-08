import { Autocomplete, Grid, TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import QuiltedImageList from '../components/QuiltedImageList'

const Gallary = () => {
    const fetchArtistList = () => axios.get('/artist/ma_list')
    const {data} = useQuery('artist-list',()=>fetchArtistList())
    console.log({data})
  return (
    <Grid container>
        <Grid item xs = {12}>
        <Autocomplete 
  disablePortal
  id="combo-box-demo"
  options={data || []}
//   sx={{ width: 300 }}    
  renderInput={(params) => <TextField {...params} label="Select Makeup Artist" />}
/>
        </Grid>
        <Grid item xs = {12}>
            <QuiltedImageList/>
        </Grid>
    </Grid>
  )
}

export default Gallary