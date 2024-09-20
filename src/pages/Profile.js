import React, { useEffect, useState } from "react";
import { BaseUrl } from "../helper/BaseUrl";
import axios from "axios";
import { ApiUrl } from "../helper/ApiUrl";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

const Profile = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("John Doe");
  const [lastName, setLastName] = useState("Doe");
  const [photo, setPhoto] = useState(null);
  const [editPhoto, setEditPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [profileResponse, setProfileResponse] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    getProfile();
    getCountryList();
  }, []);

  useEffect(() => {
    if (selectedItem != null) getStatesList();
  }, [selectedItem]);

  const getProfile = async () => {
    const token = JSON.parse(localStorage.getItem("Token"));
    const apiUrl = BaseUrl.SERVER_URL + "api/GetUserProfile";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      validateStatus: () => true,
    };
    const response = await axios.get(apiUrl, config);
    if (response?.data?.statusCode === 200) {
      setFullName(response?.data?.datas[0]?.firstName);
      setLastName(response?.data?.datas[0]?.lastName);
      setPhoto(response?.data?.datas[0]?.image);
      setProfileResponse(response);
      setSelectedItem(
        response?.data?.datas[0]?.country
          ? response?.data?.datas[0]?.country
          : null
      );
      setSelectedState(
        response?.data?.datas[0]?.state ? response?.data?.datas[0]?.state : null
      );
    }
  };

  const getCountryList = async () => {
    const token = JSON.parse(localStorage.getItem("Token"));
    const apiUrl = BaseUrl.SERVER_URL + "api/GetCountryList";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      validateStatus: () => true,
    };
    const response = await axios.get(apiUrl, config);
    if (response?.data?.statusCode === 200) {
      const country = response.data?.country?.map((e, index) => {
        return {
          key: index,
          title: e.CountryName,
        };
      });
      setCountryList(country);
    }
  };

  const getStatesList = async () => {
    const token = JSON.parse(localStorage.getItem("Token"));
    const apiUrl = BaseUrl.SERVER_URL + "api/GetStateList/" + selectedItem;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      validateStatus: () => true,
    };
    const response = await axios.get(apiUrl, config);
    if (response?.data?.statusCode === 200) {
      const state = response.data?.StateList?.map((e, index) => {
        return {
          key: index,
          title: e.name,
        };
      });
      setStateList(state);
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEditPhoto(event.target.files[0]);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("firstName", fullName);
    formData.append("lastName", lastName);
    formData.append("country", selectedItem);
    formData.append("state", selectedState);
    if (editPhoto) {
      formData.append("image", editPhoto);
    }
    const apiUrl = BaseUrl.SERVER_URL + ApiUrl.EDIT_PROFILE;
    const token = JSON.parse(localStorage.getItem("Token"));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      validateStatus: () => true,
    };
    const response = await axios.put(apiUrl, formData, config);
    if (response?.data?.statusCode === 200) {
      toast.success(response?.data?.message);
      navigate("/Home");
    } else {
      toast.success("Something went wrong");
    }
  };

  let dropdownData = countryList.map((item) => (
    <Dropdown.Item key={item.key} eventKey={item.title}>
      {item.title}
    </Dropdown.Item>
  ));

  let stateDropdownData = stateList.map((item) => (
    <Dropdown.Item key={item.key} eventKey={item.title}>
      {item.title}
    </Dropdown.Item>
  ));

  return (
    <div className="container mt-5">
      <img
        src={BaseUrl.SERVER_URL + photo}
        alt="imagess"
        style={{ width: "50px", height: "50px" }}
      />
      <h1 className="mb-4" style={{ textAlign: "center" }}>
        Welcome {profileResponse?.data?.datas[0]?.firstName}{" "}
        {profileResponse?.data?.datas[0]?.lastName} to our home page
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="formFullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="formFullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="formLastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="formLastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="formPhoto" className="form-label">
                Edit Photo
              </label>
              <input
                type="file"
                className="form-control"
                id="formPhoto"
                onChange={handlePhotoChange}
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <Dropdown onSelect={(eventKey) => setSelectedItem(eventKey)}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedItem != null ? selectedItem : "Select Country"}
              </Dropdown.Toggle>
              <Dropdown.Menu>{dropdownData}</Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-md-4">
            <Dropdown onSelect={(eventKey) => setSelectedState(eventKey)}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedState != null ? selectedState : "Select State"}
              </Dropdown.Toggle>
              <Dropdown.Menu>{stateDropdownData}</Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {preview && (
          <div className="row mb-3">
            <div className="col">
              <img
                src={preview}
                alt="Selected"
                className="img-thumbnail"
                style={{ width: "150px", height: "auto" }}
              />
            </div>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Profile;
