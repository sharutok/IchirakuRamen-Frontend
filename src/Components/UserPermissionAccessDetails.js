import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
function UserPermissionAccessDetails() {
    // const { email } = useParams();
    // const [vInfo, setVInfo] = useState({
    //     email: "", username: "", password: "", verify_password: "", plant: ""
    // })
    // const [dataget, setDataGet] = useState("");
    // const [hide, setHide] = useState({
    //     disabled: true,
    //     save: true,
    // });
    // const getUserByEmailId = `http://localhost:8080/login/email/${email}`
    // const getData = async () => {
    //     const respond = await fetch(getUserByEmailId);
    //     const data = await respond.json();
    //     console.log(data);
    //     setDataGet(data.result);
    //     if (data.status === 200) {
    //         data.result.map((x) => {
    //             setVInfo({
    //                 supplier_number: x.supplier_number,
    //                 organization: x.organization,
    //                 supplier_name: x.supplier_name,
    //                 type: x.type,
    //                 created_date: x.created_date,
    //                 // inactive_date: x.inactive_date,
    //                 // classification: x.classification,
    //                 certificate_no: x.certificate_no,
    //                 certificate_agency: x.certificate_agency,
    //                 certificate_expiration_date: x.certificate_expiration_date,
    //                 certificate_registration_date: x.certificate_registration_date,
    //                 upload_certificate: x.upload_certificate,
    //                 status: x.status,
    //                 vendor_email: x.vendor_email,
    //                 remarks: x.remarks
    //             });
    //         });
    //     } else {
    //         setVInfo({
    //             supplier_number: vInfo.supplier_number,
    //             organization: "",
    //             supplier_name: "",
    //             type: "",
    //             created_date: "",
    //             // inactive_date: "",
    //             // classification: "",
    //             certificate_no: "",
    //             certificate_agency: "",
    //             certificate_expiration_date: "",
    //             certificate_registration_date: "",
    //             upload_certificate: "",
    //             vendor_email: "",
    //             status: "",
    //             remarks: ""
    //         });

    //         // setMess({
    //         //     state: true,
    //         //     content: `There is no Supplier Number of ${vInfo.supplier_number} exist!!!`,
    //         // });
    //         // setTimeout(() => {
    //         //     setMess({ state: false, content: "" });
    //         // }, 2000);
    //     }
    // };
    // useEffect(() => {
    //     getData();
    // }, []);

    return (
        <div>
            <h1>UserPermissionAccessDetails</h1>
        </div>
    )
}

export default UserPermissionAccessDetails
