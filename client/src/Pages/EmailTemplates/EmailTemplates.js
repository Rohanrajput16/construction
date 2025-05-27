// import { useEffect } from "react";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
// import SideMenu from "../../Components/SideMenu";
// import EmailEditor from "./EmailEditor";
// import { useDispatch, useSelector } from "react-redux";


// function EmailTemplates() {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(
//       postApiEmailTemplate({
//         template: "signUp",
//       })
//     );
//     dispatch(
//       getEmailTemplates({
//         slug: "signUp",
//       })
//     );
//   }, []);
//   const { postApiEmailTemplateList, getEmailTemplatesList } = useSelector(
//     (state) => state.orderDetailReducer
//   );
//   const handleSelect = (key) => {
//     dispatch(
//       postApiEmailTemplate({
//         template: key,
//       })
//     );
//     dispatch(
//       getEmailTemplates({
//         slug: key,
//       })
//     );
//   };
//   return (
//     <>
//       <SideMenu />
//       <div className="mt-extra content container-fluid">
//         <Tabs
//           defaultActiveKey="signUp"
//           onSelect={handleSelect}
//           className="mb-3"
//           justify
//         >
//           <Tab
//             className="p-3"
//             eventKey="signUp"
//             title="User Signup & Verification"
//           >
//             {!!postApiEmailTemplateList &&
//               postApiEmailTemplateList.map((data, index) => {
//                 return <span key={index}>{`${data} `}</span>;
//               })}
//             <EmailEditor
//               desc={getEmailTemplatesList?.description}
//               tabid={getEmailTemplatesList?.id}
//               emailSub={getEmailTemplatesList?.subject}
//             />
//           </Tab>
//           <Tab className="p-3" eventKey="orderCreate" title="Order Create">
//             {!!postApiEmailTemplateList &&
//               postApiEmailTemplateList.map((data, index) => {
//                 return <span key={index}>{`${data} `}</span>;
//               })}
//             <EmailEditor
//               desc={getEmailTemplatesList?.description}
//               tabid={getEmailTemplatesList?.id}
//               emailSub={getEmailTemplatesList?.subject}
//             />
//           </Tab>
//           <Tab className="p-3" eventKey="orderUpdate" title="Order Status">
//             {!!postApiEmailTemplateList &&
//               postApiEmailTemplateList.map((data, index) => {
//                 return <span key={index}>{`${data} `}</span>;
//               })}
//             <EmailEditor
//               desc={getEmailTemplatesList?.description}
//               tabid={getEmailTemplatesList?.id}
//               emailSub={getEmailTemplatesList?.subject}
//             />
//           </Tab>
//           <Tab className="p-3" eventKey="offer" title="New Offer">
//             {!!postApiEmailTemplateList &&
//               postApiEmailTemplateList.map((data, index) => {
//                 return <span key={index}>{`${data} `}</span>;
//               })}
//             <EmailEditor
//               desc={getEmailTemplatesList?.description}
//               tabid={getEmailTemplatesList?.id}
//               emailSub={getEmailTemplatesList?.subject}
//             />
//           </Tab>
//         </Tabs>
//       </div>
//     </>
//   );
// }

// export default EmailTemplates;
