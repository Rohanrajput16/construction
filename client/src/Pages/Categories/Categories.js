import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../Components/SideMenu";
import CategoriesAdd from "./CategoriesAdd";
import { 
  // getCategories, 
  getCategory   ,
} from "../../reducers/commonReducer";
// import { categories } from "../../const";
// import { Button } from "react-bootstrap";
import CategoriesUpdate from "./CategoriesUpdate";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
  const categId = queryParameters.get("catId");

  useEffect(() => {
    dispatch(
      categId
        ? getCategory({ parent: categId })
        : getCategory()
    );

    if (!localStorage.getItem("x-auth-token")) {
      navigate("/");
    }
  }, [categId, dispatch, navigate]);

  const { getCategoryData} = useSelector((state) => state.commonReducer);

  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this category?")) {
  //     await dispatch(deleteCategorie(id));
  //     dispatch(getCategories());
  //   }
  // };

  return (
    <>
      <SideMenu />
      <div className="mt-extra content container-fluid">
        {/* <Link to={categories}>
          {/* Uncomment the button if you want to allow fetching all categories */}
          {/* <Button
            variant="success"
            className="m-2"
            onClick={() => {
              dispatch(getCategories());
            }}
          >
            All Categories
          </Button> */}
        {/* </Link> */} 
        <span className="m-2">
          <CategoriesAdd />
        </span>

        {/* {loading ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p>Error loading categories: {error.message}</p>
        ) : ( */}
          <table className="table table-scrolling">
            <thead className="normalplace">
              <tr>
                <th className="over-col-size">Name</th>
                <th className="over-col-size">Image</th>
                <th className="col-3">Description</th>
                <th className="over-col-size">Status</th>
                <th className="col-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {!!getCategoryData?.list &&
                getCategoryData?.list.map((data, index) => (
                  <tr key={index}>
                    <td>{data?.name} ({data?.codeNo})</td>
                    <td>
                      <img className="tbl-img" src={data?.image} alt={data?.name} />
                    </td>
                    <td>{data?.description}</td>
                    <td>
                      <b>{data.status ? <span className="text-success">Active</span> : <span className="text-danger">Inactive</span>}</b>
                    </td>
                    <td className="d-grid">
                      {/* <Button
                        className="mb-2"
                        variant="danger"
                        onClick={() => handleDelete(data?.id)}
                      >
                        <i className="bi bi-trash "></i>
                      </Button> */}
                      <CategoriesUpdate
                    
                        title="Update Category"
                        parent={data?.parent}
                        categorieName={data?.name}
                        categorieslug={data?.slug}
                        categoriedes={data?.description}
                        userStatus={data?.status}
                        calculateEstimation={data?.calculateEstimation}
                        excludedTerm={data?.excludedTerm}
                        codeNo={data?.codeNo}
                        id={data?.id}
                        catorderby={data?.orderby}
                        catImage={data?.image}
                       
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        
      </div>
    </>
  );
};

export default Categories;




// import React from "react";
// import { useSelector } from "react-redux";
// import { Link, } from "react-router-dom";
// import SideMenu from "../../Components/SideMenu";
// // import { Button } from "react-bootstrap";
// // import { deleteCategorie, getCategories } from "../../reducers/commonReducer";
// // import CategoriesUpdate from "./CategoriesUpdate";
// import CategoriesAdd from "./CategoriesAdd";
// import { categories,  } from "../../const";

// const Categories = () => {
//   // const navigate = useNavigate();
//   // const queryParameters = new URLSearchParams(window.location.search);
//   // const categId = queryParameters.get("catId");
//   // const dispatch = useDispatch();


//   // useEffect(() => {
//   //   dispatch(
//   //     categId
//   //       ? getCategories({
//   //           parent: categId,
//   //         })
//   //       : getCategories()
//   //   );
//   //   if (!localStorage.getItem("x-auth-token")) {
//   //     navigate(home);
//   //   }
//   // }, [categId]);

//   const { getCategoriesData } = useSelector((state) => state.commonReducer);
//   return (
//     <>
//       <SideMenu />
//       <div className="mt-extra content container-fluid">
//         <Link to={categories}>
//           {/* <Button
//             variant="success"
//             className="m-2"
//             onClick={() => {
//               dispatch(getCategories());
//             }}
//           >
//             All Categories
//           </Button> */}
//         </Link>
//         <span className="m-2">
//           {" "}
//           <CategoriesAdd />{" "}
//         </span>

//         <table className="table table-scrolling ">
//           <thead className="normalplace">
//             <tr>
//               <th className="over-col-size">Name</th>
//               {/* <th className="over-col-size">OrderBY</th> */}
//               {/* {!categId && (
//                 <th className="over-col-size">View SubCategories</th>
//               )} */}
//               <th className="over-col-size">Image</th>
//               {/* <th className="over-col-size">Slug</th> */}
//               <th className="over-col-size">Description</th>
//               <th className="over-col-size">Status</th>
//               {/* <th className="over-col-size">Action</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {!!getCategoriesData?.list &&
//               getCategoriesData?.list.map((data, index) => {
//                 return (
//                   <tr key={index}>
//                     <td>{data?.name}</td>
//                     {/* <td><b>{data?.orderby}</b></td> */}
//                     {/* {!categId && (
//                       <td>
//                         <Link
//                           to={`${categories}?catId=${data?.id}`}
//                           onClick={() => {
//                             dispatch(
//                               getCategories({
//                                 parent: data?.id,
//                               })
//                             );
//                           }}
//                         >
//                           <Button variant="warning">View</Button>
//                         </Link>
//                       </td>
//                     )} */}
//                     <td>
//                       <img className="tbl-img" src={data?.image} />
//                     </td>
//                     {/* <td>{data?.slug}</td> */}
//                     <td>{data?.description}</td>
//                     <td>
//                       <b>{data?.status === true ? "True" : "False"}</b>
//                     </td>
//                     {/* <td>
//                       <Button
//                         className="m-1"
//                         variant="danger"
//                         onClick={async () => {
//                           await dispatch(deleteCategorie(data?.id));
//                           dispatch(getCategories());
//                         }}
//                       >
//                         <i className="bi bi-trash"></i>
//                       </Button>
//                       <CategoriesUpdate
//                         title="Update Categorie"
//                         parent={data?.parent}
//                         categorieName={data?.name}
//                         categorieslug={data?.slug}
//                         categoriedes={data?.description}
//                         userStatus={data?.status}
//                         id={data?.id}
//                         catorderby={data?.orderby}
//                         catImage={data?.image}
//                       />
//                     </td> */}
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default Categories;
