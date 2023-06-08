import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { baseUrl } from "../utils/urls";

const useCustomTable = ({
  url,
  defaultData,
  onPostApi = null,
  bulkUploadUrl,
}) => {
  // for tableData ---START------------------------------------
  const [tableData, setTableData] = useState({});
  const [page, setPage] = React.useState(0);
  const [length, setLength] = React.useState(0);

  const { isLoading, data, refetch } = useQuery(
    [url, page],
    () =>
      axios.get("/" + url + "?page=" + Number(page + 1), {
        withCredentials: true,
      }),
    {
      // onSuccess : res => {
      //   setTableData({
      //     rows : res.data.data,
      //     length : res.data?.total_count,
      //     setLength,
      //     isLoading,
      //     page,
      //     setPage,
      //   });
      // }
    }
  );
  useEffect(() => {
    {
      setTableData({
        rows: data.data.data,
        length: data.data?.total_count,
        setLength,
        isLoading,
        page,
        setPage,
      });
    }
  }, []);
  // const rows = data?.data?.data || [];
  // React.useEffect(
  //   ()=>{page == 0 && setPage(1)},[]
  // )
  // React.useEffect(() => {
  //   setLength(data?.data?.total_count);
  // }, [rows,length]);

  // let tableData = {
  //   rows,
  //   length,
  //   setLength,
  //   isLoading,
  //   page,
  //   setPage,
  // };

  // useEffect(()=>{
  //   setTableData({

  //    ...tableData
  //   });
  // },[rows, page, length])

  // for tableData ---END------------------------------------
  // for tablePost/Put ---START------------------------------
  let postApi = useMemo(() => onPostApi || url, [url]);
  const postRequest = (data) => axios.post("/" + postApi, data);
  const putRequest = (data) =>
    axios.put(
      `/${postApi}/${data instanceof FormData ? data.get("id") : data?.id}`,
      data
    );

  const { mutate } = useMutation(defaultData ? putRequest : postRequest, {
    onSuccess: () => refetch(),
    onError: (err) => console.log(err),
  });

  // for tablePost/Put ---END------------------------------------

  // for tableDelete ---START------------------------------------
  const { mutate: deleteMutate } = useMutation(
    (id) => axios.delete("/" + postApi + "/" + id),
    {
      onSuccess: () => refetch(),
    }
  );
  // for tableDelete ---END------------------------------------

  // to bulk upload  ----START---------------------------------------
  const uploadExcel = useCallback((file) => {
    const fd = new FormData();
    console.log({ file, s: 0 });
    fd.set("file", file[0]);
    console.log("file");
    return axios.post(bulkUploadUrl, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }, []);
  const { mutate: uploadMutate } = useMutation(uploadExcel, {
    onSuccess: () => {
      refetch();
      console.log("work");
    },
    onError: (err) => toast.error("Something went wrong"),
  });
  // to bulk upload  ----END---------------------------------------

  // to search Rows -----START-----
  const searchRows = useCallback((search) => {
    console.log({ search });
    return axios.get("/portal/user_search?search=" + search);
  }, []);
  const { mutate: searchMutate } = useMutation(searchRows, {
    onSuccess: (res) => {
      console.log("red");
      console.log(res);
      setTableData({
        rows: res.data,
        length: res?.data.length,
        setLength,
        isLoading,
        page,
        setPage,
      });
    },
    // onSuccess: (res) => (tableData = {rows : res.data, ...tableData}),
    onError: (err) => toast.error("Something went wrong"),
  });
  // console.log(tableData);
  // to search Rows -----END-------
  return { tableData, mutate, deleteMutate, uploadMutate, searchMutate };
};

export default useCustomTable;
