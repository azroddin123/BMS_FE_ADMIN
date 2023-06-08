import axios from "axios";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { baseUrl } from "../utils/urls";

const useCustomTable = ({ url,search = '', defaultData,onPostApi = null, bulkUploadUrl }) => {
  // for tableData ---START------------------------------------
  const [page, setPage] = React.useState(1);
  const [length, setLength] = React.useState(0);

  const { isLoading, data, refetch } = useQuery([url, page], () =>
    axios.get("/" + url + "?page=" + Number(page + 1) + '&search=' + search, { withCredentials: true } )
  );
  const rows = data?.data?.data || [];
  React.useEffect(
    ()=>{setTimeout(() => setPage(0),100)},[]
  )
  React.useEffect(() => {   
    setLength(data?.data?.total_count);
  }, [data,length,page]);

  const tableData = {
    rows,
    length,
    setLength,
    isLoading,
    page,
    setPage,
  };

  // for tableData ---END------------------------------------
  // for tablePost/Put ---START------------------------------
  let postApi = onPostApi || url
  const postRequest = (data) => axios.post(  "/" + postApi, data);
  const putRequest = (data) =>
    axios.put(`/${postApi}/${data instanceof FormData ? data.get('id') : data?.id}`, data);
  
  const { mutate } = useMutation(defaultData ? putRequest : postRequest, {
    onSuccess: () => refetch(),
    onError: (err) => console.log(err),
  });

  // for tablePost/Put ---END------------------------------------

  // for tableDelete ---START------------------------------------
  const { mutate: deleteMutate } = useMutation(
    (id) => axios.delete( "/" + postApi + "/" + id),
    {
      onSuccess: () => refetch(),
    }
  );
  // for tableDelete ---END------------------------------------

  // to bulk upload  ----START---------------------------------------

  const uploadExcel = (file) => {
    const fd = new FormData();
    console.log({ file, s: 0 });
    fd.set("file", file[0]);
    console.log("file");
    return axios.post(bulkUploadUrl, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  const { mutate: uploadMutate } = useMutation(uploadExcel, {
    onSuccess: () => {
      refetch();
      console.log("work");
      toast.success("New Parlours Added")
    },
    onError: (err) => toast.error("Something went wrong"),
  });

  // to bulk upload  ----END---------------------------------------
const getSearch = search => {
  refetch()
  console.log({search})
}
console.log({_search : search})

  return { tableData, mutate, deleteMutate, uploadMutate , refetch,getSearch};
};

export default useCustomTable;
