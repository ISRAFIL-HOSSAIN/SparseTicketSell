import React, { useState } from "react";
import TableHeader from "../../components/common/TableHeader";
import axiosInstance from "../../components/config/Api";
import FormAction from "../../components/form/FormAction";
import { userAddFields } from "../../components/form/formFields";
import Input, { fixedInputClass } from "../../components/form/Input";
import useGetRoles from "../../hooks/useGetRoles";
import Layout from "../../layout/Layout";

const fields = userAddFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

function UserAddPage() {
  // let navigate = useNavigate();
  const [userAddState, setUserAddState] = useState(fieldsState);
  const userRoles = useGetRoles();
  const handleChange = (e) => {
    console.log(e.target.id);
    setUserAddState({ ...userAddState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userAddState);
    UserAddCall();
  };
  function UserAddCall() {
    userAddState.createdBy = localStorage.getItem("loginUserId");
    console.log(axiosInstance.cmsUrl);

    axiosInstance
      .post("api/user/", userAddState)
      .then((data) => {
        console.log(data);
        // setSuccess(data.data)
        // navigate("/", { replace: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Layout>
      <div>
        <div className="m-5 p-5 border-2 rounded-md shadow-lg">
          <TableHeader heading={"User Details"} btnText={"Back"} btnLink={"/users"}/>

          <div className="p-3">
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-3 gap-5 ">
                {fields.map((field) => (
                  <Input
                    key={field.id}
                    handleChange={handleChange}
                    value={userAddFields[field.id]}
                    labelText={field.labelText}
                    labelFor={field.labelFor}
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    isRequired={field.isRequired}
                    placeholder={field.placeholder}
                  />
                ))}

                <div className="">
                  <label htmlFor="roleType" className="">
                    Role Type
                  </label>
                  <select
                    name="roleType"
                    id="roleId"
                    className={fixedInputClass}
                    onChange={handleChange}
                  >
                    <option defaultValue>---Select User Type---</option>
                    {userRoles.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <FormAction
                handleSubmit={handleSubmit}
                className="w-20 ml-auto"
                text="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UserAddPage;
